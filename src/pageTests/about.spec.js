import React from "react"
import About from "../pages/about"
import { render } from "@testing-library/react"
import { useStaticQuery } from "gatsby"

const fakeData = {
  about: {
    id: "id",
    excerpt: "excerpt",
    frontmatter: {
      description: "",
      image: {
        childImageSharp: {
          fluid: {
            base64:
              "data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wgARCAANABQDASIAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAAAAMEAv/EABQBAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhADEAAAAZxCi8wH/8QAGxAAAQQDAAAAAAAAAAAAAAAAAgABESEDEiP/2gAIAQEAAQUCc+kymtZqLZ5Ch//EABQRAQAAAAAAAAAAAAAAAAAAABD/2gAIAQMBAT8BP//EABQRAQAAAAAAAAAAAAAAAAAAABD/2gAIAQIBAT8BP//EABoQAAICAwAAAAAAAAAAAAAAAAABEBESMYH/2gAIAQEABj8CxK1CZwR//8QAGRAAAwEBAQAAAAAAAAAAAAAAAAERIVFh/9oACAEBAAE/IZJ0bxWGmobpLSzpRWmYXh//2gAMAwEAAgADAAAAEPDP/8QAFBEBAAAAAAAAAAAAAAAAAAAAEP/aAAgBAwEBPxA//8QAFBEBAAAAAAAAAAAAAAAAAAAAEP/aAAgBAgEBPxA//8QAHBABAAMAAwEBAAAAAAAAAAAAAQARITFBUXGB/9oACAEBAAE/EE4Ol37kHiJu0sTyYtnWxQw4jVfkV5aMG8deSh22Xfk//9k=",
            aspectRatio: 1.5,
            src: "/static/95d1d5484a285a338b0587b2b5ed69c7/f5395/img_1519.jpg",
            srcSet:
              "/static/95d1d5484a285a338b0587b2b5ed69c7/ab823/img_1519.jpg 225w,\n/static/95d1d5484a285a338b0587b2b5ed69c7/fe64b/img_1519.jpg 450w,\n/static/95d1d5484a285a338b0587b2b5ed69c7/f5395/img_1519.jpg 900w,\n/static/95d1d5484a285a338b0587b2b5ed69c7/5d6cb/img_1519.jpg 1350w,\n/static/95d1d5484a285a338b0587b2b5ed69c7/1a713/img_1519.jpg 1800w,\n/static/95d1d5484a285a338b0587b2b5ed69c7/fe333/img_1519.jpg 2436w",
            sizes: "(max-width: 900px) 100vw, 900px",
          },
        },
      },
    },
  },
}

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

test("sets the image src and except properly", () => {
  const { getByTestId, getByAltText } = render(<About data={fakeData} />)

  expect(getByTestId("excerpt")).toHaveTextContent(fakeData.about.excerpt)
  expect(getByAltText("Photo of the group")).toHaveAttribute(
    "src",
    fakeData.about.frontmatter.image.childImageSharp.src
  )
})

test("snapshop to make sure nothing breaks", () => {
  expect(render(<About data={fakeData} />)).toMatchSnapshot()
})
