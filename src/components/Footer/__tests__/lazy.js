import React from "react"
import Footer from "../index"
import { render, waitForElement } from "@testing-library/react"

test("lazy loads the video in", async () => {
  const { queryByTestId, getByTestId } = render(
    <Footer menuOpen={false} invert={false} toggleMenu={jest.fn()} />
  )

  const testId = "footerContent"

  expect(queryByTestId(testId)).toBeNull()
  await waitForElement(() => getByTestId(testId))
  expect(queryByTestId(testId)).not.toBeNull()
})
