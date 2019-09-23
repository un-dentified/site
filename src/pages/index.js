import React from "react"
import PageWrapper from "../components/PageWrapper"
import Seo from "../components/Seo"
import AnimatedIndex from "../components/AnimatedIndex"

const Index = props => (
  <>
    <Seo />
    <PageWrapper
      {...props}
      currentPage=""
      menuAccess={false}
      menuOpen={true}
      defaultLinks={["shop", "about", "music", "shows"]}
      dataCy="index"
    >
      <AnimatedIndex />
    </PageWrapper>
  </>
)

export default Index
