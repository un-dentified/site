import React from "react"
import { render } from "@testing-library/react"
import AudioPreview from "../"
import setupDefaultProps from "../jest-utils/setDefaultProps"

/* Keyboard focus test had to be moved to jest bc of a bug in JSDOM where active element is
always the body */

/* THESE ARE JUST HERE SO THAT TESTS BREAKS IF WE REMOVE ARIA ATTRIBUTES FOR SOME REASON */

test("play button has aria-label bc it doenst have meaningful text", () => {
  const { getByTestId } = render(<AudioPreview {...setupDefaultProps()} />)

  const playBtn = getByTestId("playBtn")

  expect(playBtn).toHaveAttribute("aria-label")
})

test("pause button has aria-label bc it doenst have meaningful text", () => {
  const { getByTestId } = render(
    <AudioPreview
      {...setupDefaultProps({
        playing: "super_secret_id",
      })}
    />
  )

  const pauseBtn = getByTestId("pauseBtn")

  expect(pauseBtn).toHaveAttribute("aria-label")
})

test("links both have aria-labels", () => {
  const { getByTestId } = render(<AudioPreview {...setupDefaultProps()} />)

  const apple = getByTestId("appleMusicLink")
  const spotify = getByTestId("spotifyLink")

  expect(apple).toHaveAttribute("aria-label")
  expect(spotify).toHaveAttribute("aria-label")
})
