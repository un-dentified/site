import React from "react"
import { render, wait } from "@testing-library/react"
import MusicPage from "../"
import fakeData from "../jest-utls/fakeData"
import { useStaticQuery } from "gatsby"

beforeEach(() => {
  useStaticQuery.mockImplementation(() => ({
    site: {
      buildTime: "2019-09-23",
      siteMetadata: {
        siteUrl: "https://officialunidentified.com",
        defaultTitle: "Official site of Unidentified",
        defaultDescription: "Home of Vancouver based rap trio Unidentified",
        defaultBanner: "/static/img/logo.svg",
        headline: "Unidentified",
        siteLanguage: "en",
        author: "Shawn Sangha",
        twitter: "offunidentified",
      },
    },
  }))
})

test("renders the correct ammount of previews based on the page query", () => {
  const { container, rerender } = render(
    <MusicPage
      path=""
      data={fakeData(3)}
      pageContext={{
        currentPage: 0,
        numPages: 1,
      }}
    />
  )

  expect(container.querySelectorAll("audio")).toHaveLength(4)

  rerender(
    <MusicPage
      path=""
      data={fakeData(1)}
      pageContext={{
        currentPage: 0,
        numPages: 1,
      }}
    />
  )

  expect(container.querySelectorAll("audio")).toHaveLength(2)
})

test("hides previous link when on the first page, or there is only one page", () => {
  const { queryByTestId, rerender } = render(
    <MusicPage
      path=""
      data={fakeData(3)}
      pageContext={{
        currentPage: 0,
        numPages: 1,
      }}
    />
  )

  expect(queryByTestId("prevPage")).toBe(null)

  rerender(
    <MusicPage
      path=""
      data={fakeData(1)}
      pageContext={{
        currentPage: 0,
        numPages: 2,
      }}
    />
  )
  expect(queryByTestId("prevPage")).toBe(null)
})
test("hides next link when on the last page, or there is only one page", () => {
  const { queryByTestId, rerender } = render(
    <MusicPage
      path=""
      data={fakeData(3)}
      pageContext={{
        currentPage: 1,
        numPages: 1,
      }}
    />
  )

  expect(queryByTestId("nextPage")).toBe(null)

  rerender(
    <MusicPage
      path=""
      data={fakeData(1)}
      pageContext={{
        currentPage: 2,
        numPages: 2,
      }}
    />
  )

  expect(queryByTestId("nextPage")).toBe(null)
})

test("shows both pagination links when not on the first or last page", () => {
  const { getByTestId } = render(
    <MusicPage
      path=""
      data={fakeData(3)}
      pageContext={{
        currentPage: 1,
        numPages: 3,
      }}
    />
  )

  expect(getByTestId("prevPage")).toBeInTheDocument()
  expect(getByTestId("nextPage")).toBeInTheDocument()

  expect(getByTestId("prevPage")).toHaveAttribute("href", "/music")
  expect(getByTestId("nextPage")).toHaveAttribute("href", "/music/2")
})
