import React from "react"
import PageWrapper from "../components/PageWrapper"
import Footer from "../components/Footer"

export default props => (
  <PageWrapper
    {...props}
    currentPage={"about"}
    menuAccess={true}
    invertLinkColor
    menuOpen={true}
    defaultLinks={["", "shop", "music", "shows"]}
  >
    ABOUT
  </PageWrapper>
)
