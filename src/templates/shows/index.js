import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import Link from "gatsby-plugin-transition-link"
import Seo from "../../components/Seo"
import fade from "../../utils/fade"
import PageWrapper from "../../components/PageWrapper"
import styles from "./style.module.scss"

const Shows = props => {
  const {
    data: {
      shows: { edges },
    },
    pageContext: { currentPage, numPages },
    path,
  } = props

  const nextPath =
    currentPage < numPages - 1 ? `/shows/${currentPage + 1}` : path
  const prevPath =
    currentPage > 0
      ? currentPage - 1 > 0
        ? `/shows/${currentPage - 1}`
        : `/shows`
      : path

  return (
    <>
      <Seo />
      <PageWrapper
        {...props}
        currentPage="shows"
        menuAccess={true}
        menuOpen={true}
        defaultLinks={["", "about", "music", "shop"]}
      >
        <div className={styles.showsPage}>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={styles.header}
              viewBox="0 0 83.86 36"
            >
              <title>Untitled-1</title>
              <g>
                <path
                  d="M9.14,11.09V7.4l-.48-.69H5.55l-.48.69v7.28l.48.69h5.71l2,2.85V33.14l-2,2.86H3L1,33.14V25.92H5.07v3.72l.48.7H8.66l.48-.7V21.72L8.66,21H3L1,18.18V3.86L3,1h8.27l2,2.86v7.23Z"
                  transform="translate(-0.5 -0.5)"
                  fill="none"
                  stroke="#231f20"
                  strokeMiterlimit="10"
                />
                <path
                  d="M19.93,1V15.46h4.58V1h4.07V36H24.51V21.12H19.93V36H15.85V1Z"
                  transform="translate(-0.5 -0.5)"
                  fill="none"
                  stroke="#231f20"
                  strokeMiterlimit="10"
                />
                <path
                  d="M43.6,3.86V33.14l-2,2.86H33.4l-2-2.86V3.86L33.4,1h8.21ZM39,6.71H35.93l-.45.65V29.69l.45.65H39l.48-.65V7.36Z"
                  transform="translate(-0.5 -0.5)"
                  fill="none"
                  stroke="#231f20"
                  strokeMiterlimit="10"
                />
                <path
                  d="M65.38,36H60.25L57.71,12,55.18,36H50.05L45.4,1h4.14l3,25.28L55.47,1H60l2.92,25.28L65.89,1H70Z"
                  transform="translate(-0.5 -0.5)"
                  fill="none"
                  stroke="#231f20"
                  strokeMiterlimit="10"
                />
                <path
                  d="M79.76,11.09V7.4l-.48-.69H76.17l-.49.69v7.28l.49.69h5.7l2,2.85V33.14l-2,2.86H73.6l-2-2.86V25.92h4.07v3.72l.49.7h3.11l.48-.7V21.72L79.28,21H73.6l-2-2.85V3.86L73.6,1h8.27l2,2.86v7.23Z"
                  transform="translate(-0.5 -0.5)"
                  fill="none"
                  stroke="#231f20"
                  strokeMiterlimit="10"
                />
              </g>
            </svg>
          </div>
          <ul className={styles.showList}>
            {edges.map(edge => {
              const {
                node: {
                  id,
                  frontmatter: {
                    link,
                    title,
                    date,
                    image: {
                      childImageSharp: { fluid },
                    },
                  },
                },
              } = edge
              return (
                <li className={styles.show} key={id}>
                  <div className={styles.description}>
                    <h3>{title}</h3>
                    <span>{date}</span>
                    <a className={styles.link} href={link}>
                      Tickets
                    </a>
                  </div>
                  <Img className={styles.image} fluid={fluid} />
                </li>
              )
            })}
          </ul>
          <div className={styles.navigationContainer}>
            {currentPage > 0 && (
              <Link
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
                  id="Layer_1"
                  data-name="Layer 1"
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
                  id="Layer_1"
                  data-name="Layer 1"
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

Shows.propTypes = {
  path: PropTypes.string.isRequired,
  pageContext: PropTypes.shape({
    currentPage: PropTypes.number.isRequired,
    numPages: PropTypes.number.isRequired,
  }),
  data: PropTypes.shape({
    shows: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            id: PropTypes.string.isRequired,
            frontmatter: PropTypes.shape({
              title: PropTypes.string.isRequired,
              date: PropTypes.string.isRequired,
              image: PropTypes.shape({
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

export default Shows

export const query = graphql`
  query Shows($skip: Int!, $limit: Int!) {
    shows: allMarkdownRemark(
      filter: { frontmatter: { Type: { eq: "shows" } } }
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            link
            date
            Type
            image {
              childImageSharp {
                fluid(maxWidth: 900) {
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
