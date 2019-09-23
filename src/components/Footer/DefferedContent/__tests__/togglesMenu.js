import React from "react"
import { render } from "@testing-library/react"
import { Simulate } from "react-dom/test-utils"
import Content from "../"

test("menu button shows correct toggle based on menuOpen prop", async () => {
  let menuOpen = false

  const { rerender, getByTestId } = render(
    <Content
      menuOpen={menuOpen}
      invert={true}
      toggleMenu={() => {
        menuOpen = !menuOpen
        rerender(
          <Content
            menuOpen={menuOpen}
            invert={true}
            togggleMenu={() => {
              menuOpen = !menuOpen

              rerender(
                <Content
                  menuOpen={menuOpen}
                  invert={true}
                  toggleMenu={jest.fn()}
                />
              )
            }}
          />
        )
      }}
    />
  )

  const button = getByTestId("menuButton")
  const icon = getByTestId("buttonIcon")

  expect(icon).not.toHaveClass("menuOpen")

  Simulate.click(button)

  expect(icon).toHaveClass("menuOpen")
})
