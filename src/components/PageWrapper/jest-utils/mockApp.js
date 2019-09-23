import React from "react"
import { Home, About, Shows, Shop, Music, NoMatch } from "./mockPages"
import { Router } from "@reach/router"
const App = () => {
  return (
    <div>
      <Router>
        <Home path="/" />
        <About path="/about" />
        <Shows path="/shows" />
        <Music path="/music" />
        <Shop path="/shop" />
        <NoMatch default />
      </Router>
    </div>
  )
}

export default App
