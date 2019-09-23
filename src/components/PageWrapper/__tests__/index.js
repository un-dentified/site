import React from "react"
import { wait } from "@testing-library/react"
import { Simulate } from "react-dom/test-utils"
import App from "../jest-utils/mockApp"
import renderWithRouter from "../jest-utils/renderWithRouter"

jest.useFakeTimers()

beforeAll(() => {
  global.___loader = {
    enqueue: jest.fn(),
  }
})

test("utilized the default props if entry not defined (first visit)", async () => {
  const { getByTestId } = renderWithRouter(<App />)

  await wait(() => expect(getByTestId("link0")))

  const link0 = getByTestId("link0")
  const link1 = getByTestId("link1")
  const link2 = getByTestId("link2")
  const link3 = getByTestId("link3")

  expect(link0).toHaveAttribute("href", "/shop")
  expect(link1).toHaveAttribute("href", "/about")
  expect(link2).toHaveAttribute("href", "/music")
  expect(link3).toHaveAttribute("href", "/shows")
})

test("navigation works as expected", async () => {
  const { getByTestId, getByText } = renderWithRouter(<App />)

  await wait(() => expect(getByTestId("link0")))

  const link0 = getByTestId("link0")
  const link1 = getByTestId("link1")
  const link2 = getByTestId("link2")
  const link3 = getByTestId("link3")

  // button 0 is something reach-router checks for internally

  Simulate.click(link0, { button: 0 })
  await wait(() => expect(getByText("Shop Page")))

  Simulate.click(link1, { button: 0 })
  await wait(() => expect(getByText("About Page")))

  Simulate.click(link2, { button: 0 })
  await wait(() => expect(getByText("Music Page")))

  Simulate.click(link3, { button: 0 })
  await wait(() => expect(getByText("Shows Page")))
})
