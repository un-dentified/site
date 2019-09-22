import React from "react"
import AnimatedIndex from "../index"
import { render, waitForElement } from "@testing-library/react"

test("lazy loads the video in", async () => {
  const { queryByTestId, getByTestId } = render(<AnimatedIndex />)

  const testId = "animated_home_vid"

  expect(queryByTestId(testId)).toBeNull()
  await waitForElement(() => getByTestId(testId))
  expect(queryByTestId(testId)).not.toBeNull()
})
