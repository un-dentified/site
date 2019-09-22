import React from "react"
import { render, waitForDomChange, wait } from "@testing-library/react"
import Form from "../"
import { Simulate } from "react-dom/test-utils"

//jest.useFakeTimers()

const defaultProps = () => ({
  toggleForm: jest.fn(),
  invert: false,
})

beforeEach(() => {
  jest.resetAllMocks()
  fetch.resetMocks()
})

describe("submission flow works as expected", () => {
  test("Error when mail service is unreachable ", async () => {
    const props = defaultProps()

    fetch.mockReject(new Error())

    const { getByTestId, queryByTestId } = render(<Form {...props} />)

    const nameInput = getByTestId("name")
    const emailInput = getByTestId("email")
    const subjectInput = getByTestId("subject")
    const messageInput = getByTestId("message")
    const form = getByTestId("form")

    Simulate.change(nameInput, { target: { value: "newName", name: "name" } })
    Simulate.change(emailInput, {
      target: { value: "validemail@shaw.ca", name: "email" },
    })
    Simulate.change(subjectInput, {
      target: { value: "not empty", name: "subject" },
    })
    Simulate.change(messageInput, {
      target: { value: "not empty", name: "message" },
    })

    Simulate.submit(form)

    await wait(() =>
      expect(queryByTestId("formError")).toHaveTextContent(
        "Mail server unreachable try again later"
      )
    )
  })

  test("Error when mail service has a failure ", async () => {
    const props = defaultProps()

    fetch.mockResponseOnce(JSON.stringify({}), { status: 400 })

    const { getByTestId, queryByTestId } = render(<Form {...props} />)

    const nameInput = getByTestId("name")
    const emailInput = getByTestId("email")
    const subjectInput = getByTestId("subject")
    const messageInput = getByTestId("message")
    const form = getByTestId("form")

    Simulate.change(nameInput, { target: { value: "newName", name: "name" } })
    Simulate.change(emailInput, {
      target: { value: "validemail@shaw.ca", name: "email" },
    })
    Simulate.change(subjectInput, {
      target: { value: "not empty", name: "subject" },
    })
    Simulate.change(messageInput, {
      target: { value: "not empty", name: "message" },
    })

    Simulate.submit(form)

    await wait(() =>
      expect(queryByTestId("formError")).toHaveTextContent(
        "Mail service error try again later"
      )
    )
  })

  test("error when somehow form info is invalid (should never actually happen) ", async () => {
    const props = defaultProps()

    fetch.mockResponseOnce(JSON.stringify({}), { status: 422 })

    const { getByTestId, queryByTestId } = render(<Form {...props} />)

    const nameInput = getByTestId("name")
    const emailInput = getByTestId("email")
    const subjectInput = getByTestId("subject")
    const messageInput = getByTestId("message")
    const form = getByTestId("form")

    Simulate.change(nameInput, { target: { value: "newName", name: "name" } })
    Simulate.change(emailInput, {
      target: { value: "validemail@shaw.ca", name: "email" },
    })
    Simulate.change(subjectInput, {
      target: { value: "not empty", name: "subject" },
    })
    Simulate.change(messageInput, {
      target: { value: "not empty", name: "message" },
    })

    Simulate.submit(form)

    await wait(() =>
      expect(queryByTestId("formError")).toHaveTextContent(
        "Invalid form data check fields and try agin"
      )
    )
  })

  test("happy path gets 200 response ", () => {
    const props = defaultProps()

    fetch.mockResponseOnce(JSON.stringify({}), { status: 200 })

    const { getByTestId, queryByTestId } = render(<Form {...props} />)

    const nameInput = getByTestId("name")
    const emailInput = getByTestId("email")
    const subjectInput = getByTestId("subject")
    const messageInput = getByTestId("message")
    const form = getByTestId("form")

    Simulate.change(nameInput, { target: { value: "newName", name: "name" } })
    Simulate.change(emailInput, {
      target: { value: "validemail@shaw.ca", name: "email" },
    })
    Simulate.change(subjectInput, {
      target: { value: "not empty", name: "subject" },
    })
    Simulate.change(messageInput, {
      target: { value: "not empty", name: "message" },
    })

    Simulate.submit(form)

    expect(queryByTestId("formError")).toHaveTextContent("")
  })
})

test("Values are initialized to empty stings", () => {
  const { getByTestId } = render(<Form {...defaultProps()} />)

  const nameInput = getByTestId("name")
  const emailInput = getByTestId("email")
  const subjectInput = getByTestId("subject")
  const messageInput = getByTestId("message")

  expect(nameInput).toHaveAttribute("value", "")
  expect(emailInput).toHaveAttribute("value", "")
  expect(subjectInput).toHaveAttribute("value", "")
  expect(messageInput).toHaveTextContent("")
})

test("onChange works based off of input names", () => {
  const { getByTestId } = render(<Form {...defaultProps()} />)

  const nameInput = getByTestId("name")
  const emailInput = getByTestId("email")
  const subjectInput = getByTestId("subject")
  const messageInput = getByTestId("message")

  Simulate.change(nameInput, { target: { value: "newName", name: "name" } })

  expect(nameInput).toHaveAttribute("value", "newName")

  Simulate.change(emailInput, { target: { value: "newEmail", name: "email" } })

  expect(emailInput).toHaveAttribute("value", "newEmail")

  Simulate.change(subjectInput, {
    target: { value: "newSubject", name: "subject" },
  })

  expect(subjectInput).toHaveAttribute("value", "newSubject")

  Simulate.change(messageInput, {
    target: { value: "newMessage", name: "message" },
  })

  expect(messageInput).toHaveTextContent("newMessage")
})

test("className applied to field when visited", () => {
  const { getByTestId } = render(<Form {...defaultProps()} />)

  const nameInput = getByTestId("name")
  const emailInput = getByTestId("email")
  const subjectInput = getByTestId("subject")
  const messageInput = getByTestId("message")

  const nameField = getByTestId("nameField")
  const emailField = getByTestId("emailField")
  const subjectField = getByTestId("subjectField")
  const messageField = getByTestId("messageField")

  expect(nameField).not.toHaveClass("visited")
  expect(emailField).not.toHaveClass("visited")
  expect(subjectField).not.toHaveClass("visited")
  expect(messageField).not.toHaveClass("visited")

  Simulate.focus(nameInput)
  expect(nameField).toHaveClass("visited")

  Simulate.focus(emailInput)
  expect(emailField).toHaveClass("visited")

  Simulate.focus(subjectInput)
  expect(subjectField).toHaveClass("visited")

  Simulate.focus(messageInput)
  expect(messageField).toHaveClass("visited")
})

test("invert class gets applied according to invert prop", () => {
  const { getByTestId, rerender } = render(<Form {...defaultProps()} />)
  const nameField = getByTestId("nameField")
  const emailField = getByTestId("emailField")
  const subjectField = getByTestId("subjectField")
  const messageField = getByTestId("messageField")

  expect(nameField).not.toHaveClass("invert")
  expect(emailField).not.toHaveClass("invert")
  expect(subjectField).not.toHaveClass("invert")
  expect(messageField).not.toHaveClass("invert")
  expect(getByTestId("confirm")).not.toHaveClass("invert")

  rerender(<Form invert={true} toggleForm={jest.fn()} />)

  expect(nameField).toHaveClass("invert")
  expect(emailField).toHaveClass("invert")
  expect(subjectField).toHaveClass("invert")
  expect(messageField).toHaveClass("invert")
  expect(getByTestId("confirm")).toHaveClass("invert")
})

test("name input behaves as expected", () => {
  const { getByTestId, queryByTestId } = render(<Form {...defaultProps()} />)

  const nameInput = getByTestId("name")

  expect(queryByTestId("nameError")).toBe(null)

  Simulate.change(nameInput, {
    target: { value: "", name: "name" },
  })

  expect(queryByTestId("nameError")).toBe(null)

  Simulate.blur(nameInput)

  expect(getByTestId("nameError")).toBeInTheDocument()

  Simulate.change(nameInput, {
    target: { value: "no longer empty", name: "name" },
  })

  expect(getByTestId("nameError")).toHaveTextContent("")
})

test("email input behaves as expected", () => {
  const { getByTestId, queryByTestId } = render(<Form {...defaultProps()} />)

  const emailInput = getByTestId("email")

  expect(queryByTestId("emailError")).toBe(null)

  Simulate.change(emailInput, {
    target: { value: "", name: "email" },
  })

  expect(queryByTestId("emailError")).toBe(null)

  Simulate.blur(emailInput)

  expect(getByTestId("emailError")).toBeInTheDocument()

  Simulate.change(emailInput, {
    target: { value: "no longer empty", name: "name" },
  })

  expect(getByTestId("emailError")).toHaveTextContent("")
})
test("subject input behaves as expected", () => {
  const { getByTestId, queryByTestId } = render(<Form {...defaultProps()} />)

  const subjectInput = getByTestId("subject")

  expect(queryByTestId("subjectError")).toBe(null)

  Simulate.change(subjectInput, {
    target: { value: "", name: "subject" },
  })

  expect(queryByTestId("subjectError")).toBe(null)

  Simulate.blur(subjectInput)

  expect(getByTestId("subjectError")).toBeInTheDocument()

  Simulate.change(subjectInput, {
    target: { value: "no longer empty", name: "subject" },
  })

  expect(getByTestId("subjectError")).toHaveTextContent("")
})
test("message input behaves as expected", () => {
  const { getByTestId, queryByTestId } = render(<Form {...defaultProps()} />)

  const messageInput = getByTestId("message")

  expect(queryByTestId("messageError")).toBe(null)

  Simulate.change(messageInput, {
    target: { value: "", name: "message" },
  })

  expect(queryByTestId("messageError")).toBe(null)

  Simulate.blur(messageInput)

  expect(getByTestId("messageError")).toBeInTheDocument()

  Simulate.change(messageInput, {
    target: { value: "no longer empty", name: "message" },
  })

  expect(getByTestId("messageError")).toHaveTextContent("")
})
