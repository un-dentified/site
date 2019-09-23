import React from "react"
import PageWrapper from "../"

const Home = props => {
  return (
    <PageWrapper
      {...props}
      currentPage=""
      menuAccess={false}
      menuOpen={true}
      defaultLinks={["shop", "about", "music", "shows"]}
    >
      <div>Home Page</div>
    </PageWrapper>
  )
}

const About = props => {
  return (
    <PageWrapper
      {...props}
      currentPage="about"
      menuAccess={true}
      invertLinkColor
      menuOpen={true}
      defaultLinks={["", "shop", "music", "shows"]}
    >
      <div>About Page</div>
    </PageWrapper>
  )
}

const Shop = props => {
  return (
    <PageWrapper
      {...props}
      currentPage="shop"
      menuAccess={true}
      menuOpen={true}
      defaultLinks={["", "about", "music", "shows"]}
    >
      <div>Shop Page</div>
    </PageWrapper>
  )
}

const Music = props => {
  return (
    <PageWrapper
      {...props}
      currentPage="music"
      menuAccess={true}
      invertLinkColor
      menuOpen={true}
      defaultLinks={["", "about", "shop", "shows"]}
    >
      <div>Music Page</div>
    </PageWrapper>
  )
}

const Shows = props => {
  return (
    <PageWrapper
      {...props}
      currentPage="shows"
      menuAccess={true}
      menuOpen={true}
      defaultLinks={["", "about", "music", "shop"]}
    >
      <div>Shows Page</div>
    </PageWrapper>
  )
}

const NoMatch = () => <div>No Match</div>

export { Home, About, Shows, Music, Shop, NoMatch }
