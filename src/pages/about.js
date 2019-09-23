import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import Image from "gatsby-image"
import Seo from "../components/Seo"
import PageWrapper from "../components/PageWrapper"
import styles from "./styles/about.module.scss"

const About = props => {
  const {
    excerpt,
    frontmatter: {
      image: {
        childImageSharp: { fluid },
      },
    },
  } = props.data.about

  return (
    <>
      <Seo />
      <PageWrapper
        {...props}
        currentPage="about"
        menuAccess={true}
        invertLinkColor
        menuOpen={true}
        defaultLinks={["", "shop", "music", "shows"]}
        dataCy="about"
      >
        <main className={styles.aboutPage}>
          <section className={styles.pageContent}>
            <div className={styles.textWrapper}>
              <h1 className={styles.header}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 150.35 50.31"
                >
                  <g>
                    <path
                      d="M21.73,40.21H11.62L9.42,51H1L12.66,1h8L32.35,51H23.93Zm-1.62-8.09L16.67,15.28,13.24,32.12Z"
                      transform="translate(-0.81 -0.85)"
                      fill="none"
                      stroke="#fff"
                      strokeMiterlimit="10"
                      strokeWidth="0.31"
                    />
                    <path
                      d="M56.91,1l4,4.08V21.4l-4,4.08,4,4.07V46.92l-4,4.08H36V1ZM51.8,21.53l.9-1V10l-.9-1H44.28V21.53Zm0,8.09H44.28V42.84H51.8l.9-1V30.54Z"
                      transform="translate(-0.81 -0.85)"
                      fill="none"
                      stroke="#fff"
                      strokeMiterlimit="10"
                      strokeWidth="0.31"
                    />
                    <path
                      d="M90.87,5.08V46.92l-4,4.08H70.27l-4-4.08V5.08l4-4.08H86.85ZM81.6,9.16H75.39l-.91.92V42l.91.92H81.6l1-.92V10.08Z"
                      transform="translate(-0.81 -0.85)"
                      fill="none"
                      stroke="#fff"
                      strokeMiterlimit="10"
                      strokeWidth="0.31"
                    />
                    <path
                      d="M121.19,46.92l-4,4.08H100.6l-4-4.08V1h8.23V42l.9.92h6.35L113,42V1h8.22Z"
                      transform="translate(-0.81 -0.85)"
                      fill="none"
                      stroke="#fff"
                      strokeMiterlimit="10"
                      strokeWidth="0.31"
                    />
                    <path
                      d="M151,9.09h-8.87V51H133.9V9.09H125V1h26Z"
                      transform="translate(-0.81 -0.85)"
                      fill="none"
                      stroke="#fff"
                      strokeMiterlimit="10"
                      strokeWidth="0.31"
                    />
                  </g>
                </svg>
              </h1>
              <p data-testid="excerpt" className={styles.aboutText}>
                {excerpt}
              </p>
            </div>
            <Image
              alt="Photo of the group"
              className={styles.aboutImg}
              fluid={fluid}
            />
          </section>
        </main>
      </PageWrapper>
    </>
  )
}

About.propTypes = {
  data: PropTypes.shape({
    about: PropTypes.shape({
      excerpt: PropTypes.string,
      frontmatter: PropTypes.shape({
        image: PropTypes.shape({
          childImageSharp: PropTypes.shape({
            fluid: PropTypes.object.isRequired,
          }),
        }),
      }),
    }),
  }),
}

export const query = graphql`
  query About {
    about: markdownRemark(frontmatter: { Type: { eq: "about" } }) {
      id
      excerpt(pruneLength: 10000)
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
export default About
