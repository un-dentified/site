import React from "react"
import PageWrapper from "../components/PageWrapper"

export default props => (
  <PageWrapper
    {...props}
    currentPage={"music"}
    menuAccess={true}
    invertLinkColor
    menuOpen={true}
    defaultLinks={["", "about", "shop", "shows"]}
  >
    <div>MUSIC</div>
  </PageWrapper>
)
