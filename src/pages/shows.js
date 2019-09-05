import React from "react"
import PageWrapper from "../components/PageWrapper"

export default props => (
  <PageWrapper
    {...props}
    currentPage={"shows"}
    menuAccess={true}
    menuOpen={true}
    defaultLinks={["", "about", "music", "shop"]}
  >
    <div>SHOWS</div>
  </PageWrapper>
)
