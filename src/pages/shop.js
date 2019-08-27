import React from "react"
import PageWrapper from "../components/PageWrapper"

export default props => (
  <PageWrapper
    {...props}
    currentPage={"shop"}
    defaultLinks={["", "about", "music", "shows"]}
  />
)
