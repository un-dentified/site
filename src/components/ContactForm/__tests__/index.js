import React from "react"
import { render } from "@testing-library/react"
import { Simulate } from "react-dom/test-utils"
import ContactForm from "../"

test("Component has the form closed on mount", () => {
  const { queryByTestId } = render(<ContactForm />)

  expect(queryByTestId("form")).not.toBeInTheDocument()
})

test("clcking the button toggles form being visible", () => {
  const { queryByTestId, getByTestId } = render(<ContactForm />)

  const button = getByTestId("button")

  expect(queryByTestId("form")).not.toBeInTheDocument()

  Simulate.click(button)

  expect(queryByTestId("form")).toBeInTheDocument()

  Simulate.click(button)

  expect(queryByTestId("form")).not.toBeInTheDocument()
})
