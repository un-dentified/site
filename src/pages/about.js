import React from "react"
import { graphql } from "gatsby"
import Image from "gatsby-image"
import PageWrapper from "../components/PageWrapper"
import styles from "./styles/about.module.scss"

export default props => {
  const { fluid } = props.data.about.frontmatter.image.childImageSharp

  return (
    <PageWrapper
      {...props}
      currentPage={"about"}
      menuAccess={true}
      invertLinkColor
      menuOpen={true}
      defaultLinks={["", "shop", "music", "shows"]}
    >
      <main className={styles.aboutPage}>
        <section className={styles.pageContent}>
          <div className={styles.textWrapper}>
            <h1 className={styles.header}>
              <svg
                id="Layer_1"
                data-name="Layer 1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 150.35 50.31"
              >
                <title>Untitled-1</title>
                <g>
                  <path
                    d="M21.73,40.21H11.62L9.42,51H1L12.66,1h8L32.35,51H23.93Zm-1.62-8.09L16.67,15.28,13.24,32.12Z"
                    transform="translate(-0.81 -0.85)"
                    fill="none"
                    stroke="#fff"
                    stroke-miterlimit="10"
                    stroke-width="0.31"
                  />
                  <path
                    d="M56.91,1l4,4.08V21.4l-4,4.08,4,4.07V46.92l-4,4.08H36V1ZM51.8,21.53l.9-1V10l-.9-1H44.28V21.53Zm0,8.09H44.28V42.84H51.8l.9-1V30.54Z"
                    transform="translate(-0.81 -0.85)"
                    fill="none"
                    stroke="#fff"
                    stroke-miterlimit="10"
                    stroke-width="0.31"
                  />
                  <path
                    d="M90.87,5.08V46.92l-4,4.08H70.27l-4-4.08V5.08l4-4.08H86.85ZM81.6,9.16H75.39l-.91.92V42l.91.92H81.6l1-.92V10.08Z"
                    transform="translate(-0.81 -0.85)"
                    fill="none"
                    stroke="#fff"
                    stroke-miterlimit="10"
                    stroke-width="0.31"
                  />
                  <path
                    d="M121.19,46.92l-4,4.08H100.6l-4-4.08V1h8.23V42l.9.92h6.35L113,42V1h8.22Z"
                    transform="translate(-0.81 -0.85)"
                    fill="none"
                    stroke="#fff"
                    stroke-miterlimit="10"
                    stroke-width="0.31"
                  />
                  <path
                    d="M151,9.09h-8.87V51H133.9V9.09H125V1h26Z"
                    transform="translate(-0.81 -0.85)"
                    fill="none"
                    stroke="#fff"
                    stroke-miterlimit="10"
                    stroke-width="0.31"
                  />
                </g>
              </svg>
            </h1>
            <p className={styles.aboutText}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime
              delectus dignissimos architecto impedit debitis blanditiis quaerat
              ipsam magni laborum nemo quos modi placeat voluptates,
              exercitationem odio? Nulla perspiciatis eaque facilis?
            </p>
          </div>
          <Image className={styles.aboutImg} fluid={fluid} />
        </section>
      </main>
    </PageWrapper>
  )
}

export const query = graphql`
  query About {
    about: markdownRemark(frontmatter: { Type: { eq: "about" } }) {
      id
      excerpt
      frontmatter {
        description
        image {
          childImageSharp {
            fluid(maxWidth: 900, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
