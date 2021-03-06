import React from "react"
import {
  createHistory,
  createMemorySource,
  LocationProvider,
} from "@reach/router"
import { render } from "@testing-library/react"

function renderWithRouter(
  ui,
  { route = "/", history = createHistory(createMemorySource(route)) } = {}
) {
  return {
    ...render(<LocationProvider history={history}>{ui}</LocationProvider>),

    history,
  }
}

export default renderWithRouter
