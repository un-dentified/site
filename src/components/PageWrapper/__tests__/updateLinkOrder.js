import updateLinkOrder from "../utils/updateLinkOrder"

const defaultLinks = ["one", "two", "three", "four"]
const defaultPrevLinks = ["two", "three", "four", "five"]
const defaultPrevPage = "one"

test("returns links as if if directions is invalid", () => {
  expect(updateLinkOrder([], "any", -1, defaultLinks)).toEqual(
    expect.arrayContaining(defaultLinks)
  )

  expect(updateLinkOrder([], "any", 4, defaultLinks)).toEqual(
    expect.arrayContaining(defaultLinks)
  )
  expect(updateLinkOrder([], "any", null, defaultLinks)).toEqual(
    expect.arrayContaining(defaultLinks)
  )
  expect(updateLinkOrder([], "any", "string", defaultLinks)).toEqual(
    expect.arrayContaining(defaultLinks)
  )
})

test("case top-left", () => {
  expect(
    updateLinkOrder(defaultPrevLinks, defaultPrevPage, 0, defaultLinks)
  ).toEqual(expect.arrayContaining(["three", "four", "five", "one"]))
})
test("case bottom-left", () => {
  expect(
    updateLinkOrder(defaultPrevLinks, defaultPrevPage, 1, defaultLinks)
  ).toEqual(expect.arrayContaining(["four", "five", "one", "two"]))
})
test("case top-right", () => {
  expect(
    updateLinkOrder(defaultPrevLinks, defaultPrevPage, 2, defaultLinks)
  ).toEqual(expect.arrayContaining(["five", "one", "two", "three"]))
})
test("case bottom-right", () => {
  expect(
    updateLinkOrder(defaultPrevLinks, defaultPrevPage, 3, defaultLinks)
  ).toEqual(expect.arrayContaining(["one", "two", "three", "four"]))
})
