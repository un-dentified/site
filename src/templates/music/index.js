import React, { Component, createRef } from "react"
import { graphql } from "gatsby"
import PropTypes from "prop-types"
import fade from "../../utils/fade"
import PageWrapper from "../../components/PageWrapper"
import AudioPreview from "../../components/AudioPreview"
import Seo from "../../components/Seo"
import styles from "./style.module.scss"
import Link from "gatsby-plugin-transition-link"

export default class MusicPage extends Component {
  contentRef = createRef()

  state = {
    playing: "",
  }

  setPlaying = (trackId = "") => {
    this.setState({ playing: trackId })
  }

  render() {
    const {
      data: {
        allMarkdownRemark: { edges },
      },
      pageContext: { currentPage, numPages },
      path,
    } = this.props

    const nextPath =
      currentPage < numPages - 1 ? `/music/${currentPage + 1}` : path
    const prevPath =
      currentPage > 0
        ? currentPage - 1 > 0
          ? `/music/${currentPage - 1}`
          : `/music`
        : path

    return (
      <>
        <Seo />
        <PageWrapper
          {...this.props}
          currentPage="music"
          menuAccess={true}
          invertLinkColor
          menuOpen={true}
          defaultLinks={["", "about", "shop", "shows"]}
        >
          <div ref={this.contentRef} className={styles.musicPage}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="126"
              className={styles.header}
              height="49"
              viewBox="0 0 126 49"
            >
              <g>
                <path
                  d="M30.67,38.7h-3.8L19.8,16.6V49H12.5V1h9.09l7.18,22.67L36,1H45V49h-7.3V16.6Z"
                  transform="translate(-12 -0.5)"
                  fill="none"
                  stroke="#fff"
                  strokeMiterlimit="10"
                />
                <path
                  d="M72,45.08,68.41,49H53.69l-3.57-3.92V1h7.31V40.35l.8.88h5.64l.8-.88V1H72Z"
                  transform="translate(-12 -0.5)"
                  fill="none"
                  stroke="#fff"
                  strokeMiterlimit="10"
                />
                <path
                  d="M91.25,14.83V9.78l-.86-.95H84.81L84,9.78v10l.86.95H95l3.57,3.91V45.08L95,49H80.21l-3.57-3.92V35.17H84v5.11l.86.95h5.58l.86-.95V29.42l-.86-1H80.21l-3.57-3.91V4.92L80.21,1H95l3.57,3.92v9.91Z"
                  transform="translate(-12 -0.5)"
                  fill="none"
                  stroke="#fff"
                  strokeMiterlimit="10"
                />
                <path
                  d="M103.28,49V1h7.3V49Z"
                  transform="translate(-12 -0.5)"
                  fill="none"
                  stroke="#fff"
                  strokeMiterlimit="10"
                />
                <path
                  d="M115.65,45.08V4.92L119.22,1h14.72l3.56,3.92v9.91h-7.3V9.78l-.86-.95h-5.52l-.87.95V40.22l.87,1h5.52l.86-1v-5h7.3v9.91L133.94,49H119.22Z"
                  transform="translate(-12 -0.5)"
                  fill="none"
                  stroke="#fff"
                  strokeMiterlimit="10"
                />
              </g>
            </svg>

            <div className={styles.content}>
              {edges.map(edge => {
                const {
                  node: { id, frontmatter },
                } = edge

                return (
                  <AudioPreview
                    key={id}
                    id={id}
                    {...frontmatter}
                    playing={this.state.playing}
                    setPlaying={this.setPlaying}
                  />
                )
              })}
            </div>
            <div className={styles.navigationContainer}>
              {currentPage > 0 && (
                <Link
                  data-testid="prevPage"
                  exit={{
                    length: 0.5,
                    trigger: ({ exit, node }) =>
                      fade({ exit, node, direction: "out" }),
                  }}
                  entry={{
                    length: 0,
                    trigger: ({ exit, node }) =>
                      fade({ exit, node, direction: "in" }),
                  }}
                  className={styles.paginationLink}
                  to={prevPath}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 94.15 94.15"
                  >
                    <polygon
                      className={styles.svgLink}
                      points="2.87 47.07 92.87 2.07 92.87 92.07 2.87 47.07"
                      fill="#fff"
                      stroke="#231f20"
                      strokeMiterlimit="10"
                      strokeWidth="2.56"
                    />
                  </svg>
                </Link>
              )}
              {currentPage < numPages - 1 && (
                <Link
                  data-testid="nextPage"
                  exit={{
                    length: 0.5,
                    trigger: ({ exit, node }) =>
                      fade({ exit, node, direction: "out" }),
                  }}
                  entry={{
                    length: 0,
                    trigger: ({ exit, node }) =>
                      fade({ exit, node, direction: "in" }),
                  }}
                  className={styles.paginationLink}
                  to={nextPath}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 94.15 94.15"
                  >
                    <polygon
                      className={styles.svgLink}
                      points="91.28 47.07 1.28 92.07 1.28 2.07 91.28 47.07"
                      fill="#fff"
                      stroke="#231f20"
                      strokeMiterlimit="10"
                      strokeWidth="2.56"
                    />
                  </svg>
                </Link>
              )}
            </div>
          </div>
        </PageWrapper>
      </>
    )
  }
}

MusicPage.propTypes = {
  path: PropTypes.string.isRequired,
  pageContext: PropTypes.shape({
    currentPage: PropTypes.number.isRequired,
    numPages: PropTypes.number.isRequired,
  }),
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            id: PropTypes.string.isRequired,
            frontmatter: PropTypes.shape({
              Apple: PropTypes.string.isRequired,
              Spotify: PropTypes.string.isRequired,
              title: PropTypes.string.isRequired,
              preview: PropTypes.string.isRequired,
              cover: PropTypes.shape({
                childImageSharp: PropTypes.shape({
                  fluid: PropTypes.object.isRequired,
                }),
              }),
            }),
          }),
        })
      ),
    }),
  }),
}

export const query = graphql`
  query Music($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      filter: { frontmatter: { Type: { eq: "music" } } }
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          id
          frontmatter {
            Apple
            Spotify
            preview
            title
            cover {
              childImageSharp {
                fluid(maxWidth: 500) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`
