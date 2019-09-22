import React from "react"
import AudioPreview from ".."

import { Simulate } from "react-dom/test-utils" // ES6
import { render, fireEvent } from "@testing-library/react"
import setupDefaultProps from "../jest-utils/setDefaultProps"

beforeEach(() => {
  jest.resetAllMocks()
})

test("Case No audio is playing and user clicks the play button", () => {
  const { getByTestId, queryByTestId, rerender } = render(
    <AudioPreview
      {...setupDefaultProps({
        setPlaying: () => {
          rerender(
            <AudioPreview
              {...setupDefaultProps({
                playing: "super_secret_id",
              })}
            />
          )
        },
      })}
    />
  )

  const audio = getByTestId("audioPlayer")

  // this only works bc non-trusted event handlers run syncronously
  const event = new Event("canplay")
  audio.dispatchEvent(event)

  expect(audio.play).not.toHaveBeenCalled()
  expect(audio.pause).not.toHaveBeenCalled()
  expect(queryByTestId("pauseBtn")).toBe(null)

  fireEvent.click(getByTestId("playBtn"))

  expect(audio.play).toHaveBeenCalledTimes(1)
  expect(audio.pause).not.toHaveBeenCalled()
})

test("Case another component is playing and user clicks play button", () => {
  const { getByTestId, queryByTestId, rerender } = render(
    <AudioPreview
      {...setupDefaultProps({
        playing: "some-other-song",
        setPlaying: () => {
          rerender(
            <AudioPreview
              {...setupDefaultProps({
                playing: "super_secret_id",
              })}
            />
          )
        },
      })}
    />
  )

  const audio = getByTestId("audioPlayer")

  // this only works bc non-trusted event handlers run syncronously
  const event = new Event("canplay")
  audio.dispatchEvent(event)

  expect(audio.play).not.toHaveBeenCalled()
  expect(audio.pause).not.toHaveBeenCalled()
  expect(queryByTestId("pauseBtn")).toBe(null)

  fireEvent.click(getByTestId("playBtn"))

  expect(audio.play).toHaveBeenCalledTimes(1)
  expect(audio.pause).not.toHaveBeenCalled()
})

test("Audio gets paused properly when pause button is clicked", () => {
  const { getByTestId, queryByTestId, rerender } = render(
    <AudioPreview
      {...setupDefaultProps({
        playing: "super_secret_id",
        setPlaying: () => {
          rerender(
            <AudioPreview
              {...setupDefaultProps({
                playing: "",
              })}
            />
          )
        },
      })}
    />
  )

  const audio = getByTestId("audioPlayer")
  expect(queryByTestId("playBtn")).toBe(null)
  expect(audio.pause).not.toHaveBeenCalled()
  fireEvent.click(getByTestId("pauseBtn"))
  expect(audio.pause).toHaveBeenCalledTimes(1)
})

test("Makes sure that player cant be started until the canplay event fires", () => {
  const { getByTestId, rerender } = render(
    <AudioPreview
      {...setupDefaultProps({
        setPlaying: () => {
          rerender(
            <AudioPreview
              {...setupDefaultProps({
                playing: "super_secret_id",
              })}
            />
          )
        },
      })}
    />
  )

  const audio = getByTestId("audioPlayer")

  fireEvent.click(getByTestId("playBtn"))
  expect(audio.play).not.toHaveBeenCalled()

  // this only works bc non-trusted event handlers run syncronously
  const event = new Event("canplay")
  audio.dispatchEvent(event)

  fireEvent.click(getByTestId("playBtn"))

  expect(audio.play).toHaveBeenCalledTimes(1)
  expect(audio.pause).not.toHaveBeenCalled()
})

test("handles seeking as expected", () => {
  const { getByTestId } = render(<AudioPreview {...setupDefaultProps()} />)

  const progress = getByTestId("audioProgress")
  const audio = getByTestId("audioPlayer")

  expect(progress).toHaveAttribute("value", "0")
  expect(audio.currentTime).toEqual(0)

  // needed to use Simulate from react-dom utils bc testing library wont let you mock target

  Simulate.click(progress, {
    pageX: 200,
    target: {
      offsetLeft: 100,
      offsetWidth: 400,
    },
  })

  // MOCK DURATION IS 10s just incase values dont make sense

  expect(progress).toHaveAttribute("value", "25")
  expect(audio.currentTime).toEqual(2.5)

  Simulate.click(progress, {
    pageX: 300,
    target: {
      offsetLeft: 100,
      offsetWidth: 400,
    },
  })

  expect(progress).toHaveAttribute("value", "50")
  expect(audio.currentTime).toEqual(5)
})

test("pauses audio at the end of the track", () => {
  const { getByTestId, rerender } = render(
    <AudioPreview
      {...setupDefaultProps({
        playing: "super_secret_id",
        setPlaying: () => {
          rerender(<AudioPreview {...setupDefaultProps()} />)
        },
      })}
    />
  )

  const audio = getByTestId("audioPlayer")

  const fakeEndEvent = new Event("ended")
  fireEvent(audio, fakeEndEvent)

  expect(audio.pause).toHaveBeenCalledTimes(1)
})

test("progressBar responds to time updating", () => {
  const { getByTestId } = render(<AudioPreview {...setupDefaultProps()} />)

  const audio = getByTestId("audioPlayer")
  const progress = getByTestId("audioProgress")

  // just going to mock this happening a few times
  // normally it just runs every 250 ms

  expect(progress).toHaveAttribute("value", "0")

  audio.currentTime = 5
  // bc the duration is 10 by default in my mocks
  expect(progress).toHaveAttribute("value", "50")

  audio.currentTime = audio.ondurationchange
  // want the value to reset at the end
  expect(progress).toHaveAttribute("value", "0")
})
