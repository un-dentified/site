import React from "react"
import PageWrapper from "../components/PageWrapper"
import AnimatedIndex from "../components/AnimatedIndex"

export default props => (
  <PageWrapper
    {...props}
    currentPage={""}
    menuAccess={false}
    menuOpen={true}
    defaultLinks={["shop", "about", "music", "shows"]}
  >
    <AnimatedIndex />
  </PageWrapper>
)
