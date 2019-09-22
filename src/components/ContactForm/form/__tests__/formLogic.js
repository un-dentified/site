import React from "react"
import {
  render,
  fireEvent,
  wait,
  waitForDomChange,
} from "@testing-library/react"
import FormLogic from "../formLogic"
import { Simulate } from "react-dom/test-utils"

const mockValidationAsyncFails = () =>
  jest.fn(() => {
    return new Promise(res => {
      res("Error")
    })
  })

const mockSyncValidationPasses = () => jest.fn(() => null)

const mockSyncValidationFails = () =>
  jest.fn(() => {
    return "ERRROR"
  })

const defaultInitialValues = {
  name: "name",
  email: "email",
  password: "password",
}

beforeEach(() => {
  jest.resetAllMocks()
})

test("sets inital form state correctly", () => {
  render(
    <FormLogic initialValues={defaultInitialValues}>
      {({ values, errors, touched, visited }) => {
        expect(values).toMatchObject({
          name: "name",
          email: "email",
          password: "password",
        })

        expect(errors).toMatchObject({
          name: null,
          email: null,
          password: null,
        })

        expect(touched).toMatchObject({
          name: false,
          email: false,
          password: false,
        })

        expect(visited).toMatchObject({
          name: false,
          email: false,
          password: false,
        })

        return null
      }}
    </FormLogic>
  )
})

test("sets field to visted on focus", () => {
  const { getByTestId, queryByTestId } = render(
    <FormLogic initialValues={defaultInitialValues}>
      {({ setVisited, visited }) => {
        return (
          <>
            <input
              data-testid="name"
              onFocus={setVisited}
              name="name"
              value=""
            />
            {visited.name && (
              <div data-testid="nameVisited">Shows if name is touched</div>
            )}
            <input
              data-testid="email"
              onFocus={setVisited}
              name="email"
              value=""
            />
            {visited.email && (
              <div data-testid="emailVisited">Shows if email is touched</div>
            )}
          </>
        )
      }}
    </FormLogic>
  )

  const nameInput = getByTestId("name")
  const emailInput = getByTestId("email")

  expect(queryByTestId("nameVisited")).not.toBeInTheDocument()

  fireEvent.focus(nameInput)
  expect(queryByTestId("emailVisited")).not.toBeInTheDocument()
  expect(getByTestId("nameVisited")).toBeInTheDocument()

  fireEvent.focus(emailInput)

  expect(queryByTestId("emailVisited")).toBeInTheDocument()
  expect(getByTestId("nameVisited")).toBeInTheDocument()
})

test("sets field to touched on blur", () => {
  const { getByTestId, queryByTestId } = render(
    <FormLogic initialValues={defaultInitialValues}>
      {({ setDirty, touched }) => {
        return (
          <>
            <input data-testid="name" onBlur={setDirty} name="name" value="" />
            {touched.name && (
              <div data-testid="nameTouched">Shows if name is touched</div>
            )}
            <input
              data-testid="email"
              onBlur={setDirty}
              name="email"
              value=""
            />
            {touched.email && (
              <div data-testid="emailTouched">Shows if email is touched</div>
            )}
          </>
        )
      }}
    </FormLogic>
  )

  const nameInput = getByTestId("name")
  const emailInput = getByTestId("email")

  expect(queryByTestId("nameTouched")).not.toBeInTheDocument()

  fireEvent.blur(nameInput)
  expect(queryByTestId("emailTouched")).not.toBeInTheDocument()
  expect(getByTestId("nameTouched")).toBeInTheDocument()

  fireEvent.blur(emailInput)

  expect(queryByTestId("emailTouched")).toBeInTheDocument()
  expect(getByTestId("nameTouched")).toBeInTheDocument()
})

test("runs validation on blur", async () => {
  const nameValidator = mockSyncValidationFails()

  const { getByTestId, queryByTestId } = render(
    <FormLogic
      initialValues={defaultInitialValues}
      validators={{
        name: nameValidator,
      }}
    >
      {({ setDirty, errors }) => (
        <>
          <input data-testid="name" type="text" name="name" onBlur={setDirty} />
          {errors.name && <div data-testid="nameError">Error on name</div>}
        </>
      )}
    </FormLogic>
  )

  const name = getByTestId("name")
  expect(queryByTestId("nameError")).toBeNull()
  expect(nameValidator).not.toHaveBeenCalled()

  Simulate.blur(name)

  await wait(() => expect(getByTestId("nameError")).toBeInTheDocument())

  expect(nameValidator).toHaveBeenCalledTimes(1)
})

test("renders if no validation present", () => {
  expect(() =>
    render(
      <FormLogic initialValues={defaultInitialValues}>{() => null}</FormLogic>
    )
  ).not.toThrow()
})

test("changes value of form elements based on the name", () => {
  const { getByTestId } = render(
    <FormLogic initialValues={defaultInitialValues}>
      {({ values, handleChange }) => {
        return (
          <form>
            <input
              data-testid="name"
              type="name"
              onChange={handleChange}
              value={values.name}
            />
            <input
              data-testid="email"
              type="name"
              onChange={handleChange}
              value={values.email}
            />
          </form>
        )
      }}
    </FormLogic>
  )

  const name = getByTestId("name")
  const email = getByTestId("email")

  expect(name).toHaveAttribute("value", "name")
  expect(email).toHaveAttribute("value", "email")

  Simulate.change(name, { target: { value: "newName", name: "name" } })

  expect(name).toHaveAttribute("value", "newName")
  expect(email).toHaveAttribute("value", "email")

  Simulate.change(email, { target: { value: "newEmail", name: "email" } })

  expect(name).toHaveAttribute("value", "newName")
  expect(email).toHaveAttribute("value", "newEmail")
})

test("sets all fields vith validation to touched when submitted", async () => {
  const nameValidator = mockValidationAsyncFails()
  const emailValidator = mockSyncValidationFails()

  const { getByTestId, queryByTestId } = render(
    <FormLogic
      validators={{
        name: nameValidator,
        email: emailValidator,
      }}
      initialValues={defaultInitialValues}
    >
      {({ handleSubmit, touched }) => (
        <>
          {touched.name && (
            <div data-testid="name">Indication name field was touched</div>
          )}
          {touched.email && (
            <div data-testid="email">Indication email field was touched</div>
          )}
          {touched.password && (
            <div data-testid="password">
              Indication pasword field was touched
            </div>
          )}
          <button data-testid="submit" onClick={handleSubmit} />
        </>
      )}
    </FormLogic>
  )

  const button = getByTestId("submit")

  expect(queryByTestId("name")).toBeNull()
  expect(queryByTestId("email")).toBeNull()
  expect(queryByTestId("password")).toBeNull()

  Simulate.click(button)

  await wait(() => expect(getByTestId("name")).toBeInTheDocument())
  await wait(() => expect(getByTestId("email")).toBeInTheDocument())
  expect(queryByTestId("password")).not.toBeInTheDocument()
})

test("validates on change if field takes validation", async () => {
  const nameValidator = mockSyncValidationFails()

  const { getByTestId, queryByTestId } = render(
    <FormLogic
      initialValues={defaultInitialValues}
      validators={{
        name: nameValidator,
      }}
    >
      {({ values, errors, handleChange }) => (
        <>
          <input
            type="text"
            name="name"
            onChange={handleChange}
            value={values.name}
            data-testid="name"
          />

          {errors.name && (
            <div data-testid="nameError">Some mock error message</div>
          )}
        </>
      )}
    </FormLogic>
  )

  const name = getByTestId("name")

  expect(queryByTestId("nameError")).toBeNull()

  Simulate.change(name, { target: { value: "any change", name: "name" } })

  await wait(() => expect(getByTestId("nameError")).toBeInTheDocument())
})

test("runs all validations on submit", async () => {
  const nameValidator = mockValidationAsyncFails()
  const emailValidator = mockSyncValidationPasses()

  const { getByTestId, queryByTestId } = render(
    <FormLogic
      initialValues={defaultInitialValues}
      validators={{
        name: nameValidator,
        email: emailValidator,
      }}
    >
      {({ errors, handleSubmit }) => (
        <>
          {errors.name && <div data-testid="name">Name Error</div>}
          {errors.email && <div data-testid="email">Email Error</div>}
          <button data-testid="btn" onClick={handleSubmit} />
        </>
      )}
    </FormLogic>
  )

  const button = getByTestId("btn")

  expect(nameValidator).not.toHaveBeenCalled()
  expect(emailValidator).not.toHaveBeenCalled()
  expect(queryByTestId("name")).not.toBeInTheDocument()
  expect(queryByTestId("email")).not.toBeInTheDocument()

  Simulate.click(button)

  await wait(() => expect(getByTestId("name")).toBeInTheDocument())

  expect(nameValidator).toHaveBeenCalledTimes(1)
  expect(emailValidator).toHaveBeenCalledTimes(1)
})

test("prevents default on submit", () => {
  const { getByTestId } = render(
    <FormLogic initialValues={defaultInitialValues}>
      {({ handleSubmit }) => (
        <button data-testid="submit" onClick={handleSubmit} />
      )}
    </FormLogic>
  )

  const button = getByTestId("submit")

  const fakeEvent = {
    preventDefault: jest.fn(),
  }

  Simulate.click(button, fakeEvent)

  expect(fakeEvent.preventDefault).toHaveBeenCalledTimes(1)
})

test("prevents form from submitting if errors exist", async () => {
  const fakeSubmit = jest.fn()
  const nameValidator = mockSyncValidationFails()

  const { getByTestId } = render(
    <FormLogic
      submitFn={fakeSubmit}
      initialValues={defaultInitialValues}
      validators={{
        name: nameValidator,
      }}
    >
      {({ handleSubmit, errors }) => (
        <>
          <button data-testid="submit" onClick={handleSubmit} />
          {errors.name && <div data-testid="name">Name Err</div>}
        </>
      )}
    </FormLogic>
  )

  const button = getByTestId("submit")

  expect(fakeSubmit).not.toHaveBeenCalled()

  Simulate.click(button)

  await wait(() => expect(getByTestId("name")).toBeInTheDocument())

  expect(fakeSubmit).not.toHaveBeenCalled()
})
test("calls submit if all validation succeeds", async () => {
  const fakeSubmit = jest.fn()
  const nameValidator = mockSyncValidationPasses()

  const { getByTestId } = render(
    <FormLogic
      submitFn={fakeSubmit}
      initialValues={defaultInitialValues}
      validators={{
        name: nameValidator,
      }}
    >
      {({ handleSubmit, submitting }) => (
        <>
          <button data-testid="submit" onClick={handleSubmit} />
          {submitting && (
            <div data-testid="submitting">ui to show while submitting</div>
          )}
        </>
      )}
    </FormLogic>
  )

  const button = getByTestId("submit")

  expect(fakeSubmit).not.toHaveBeenCalled()

  Simulate.click(button)

  await waitForDomChange()

  expect(fakeSubmit).toHaveBeenCalledTimes(1)
})
