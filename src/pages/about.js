import React from "react"
import PageWrapper from "../components/PageWrapper"

export default props => (
  <PageWrapper
    {...props}
    currentPage={"about"}
    defaultLinks={["", "shop", "music", "shows"]}
  />
)
