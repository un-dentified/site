import React from "react"
import { render } from "@testing-library/react"
import setupDefaultProps from "../jest-utils/setDefaultProps"
import AudioPreview from "../"

beforeEach(() => {
  jest.resetAllMocks()
})

test("hides the play button when playing", () => {
  const { queryByTestId } = render(
    <AudioPreview
      {...setupDefaultProps({
        playing: "super_secret_id",
      })}
    />
  )

  expect(queryByTestId("playBtn")).toBe(null)
  expect(queryByTestId("pauseBtn")).not.toBe(null)
})

test("hides the pause button when paused", () => {
  const { queryByTestId } = render(
    <AudioPreview
      {...setupDefaultProps({
        playing: "",
      })}
    />
  )

  expect(queryByTestId("playBtn")).not.toBe(null)
  expect(queryByTestId("pauseBtn")).toBe(null)
})

test("links get setup with the correct href", () => {
  const defaultProps = setupDefaultProps()

  const { getByTestId } = render(<AudioPreview {...defaultProps} />)

  const appleLink = getByTestId("appleMusicLink")
  const spotifyLink = getByTestId("spotifyLink")

  expect(appleLink).toHaveAttribute("href", defaultProps.Apple)
  expect(spotifyLink).toHaveAttribute("href", defaultProps.Spotify)
})
test("Make sure component throws if it is missing required props", () => {
  // expect(() => render(<AudioPreview />)).toThrowError()

  expect(() =>
    render(<AudioPreview {...setupDefaultProps()} />)
  ).not.toThrowError()
})
