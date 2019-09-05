import React from "react"
import PageWrapper from "../components/PageWrapper"

export default props => (
  <PageWrapper
    {...props}
    currentPage={"shop"}
    menuAccess={true}
    menuOpen={true}
    defaultLinks={["", "about", "music", "shows"]}
  >
    <div>SHOP</div>
  </PageWrapper>
)
