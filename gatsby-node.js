/* eslint-disable array-callback-return */
const path = require("path")
const { fmImagesToRelative } = require("gatsby-remark-relative-images")

exports.onCreateNode = ({ node }) => {
  fmImagesToRelative(node)
}

exports.createPages = ({ actions: { createPage }, graphql, reporter }) => {
  return graphql(`
    query Pages {
      shows: allMarkdownRemark(
        filter: { frontmatter: { Type: { eq: "shows" } } }
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        edges {
          node {
            id
          }
        }
      }

      music: allMarkdownRemark(
        filter: { frontmatter: { Type: { eq: "music" } } }
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        edges {
          node {
            id
          }
        }
      }
    }
  `)
    .then(result => {
      const musicEntries = result.data.music.edges.length

      const musicEntriesPerPage = 4

      const musicPages = Math.ceil(musicEntries / musicEntriesPerPage)

      Array.from({ length: musicPages }).map((_, index) => {
        createPage({
          path: index === 0 ? "/music" : `/music/${index}`,
          component: path.resolve("./src/templates/music/index.js"),
          context: {
            limit: musicEntriesPerPage,
            skip: index * musicEntriesPerPage,
            numPages: musicPages,
            currentPage: index,
          },
        })
      })

      const showEntries = result.data.shows.edges.length

      const showEntriesPerPage = 4

      const showPages = Math.ceil(showEntries / showEntriesPerPage)

      Array.from({ length: showPages }).map((_, index) => {
        createPage({
          path: index === 0 ? "/shows" : `/shows/${index}`,
          component: path.resolve("./src/templates/shows/index.js"),
          context: {
            limit: showEntriesPerPage,
            skip: index * showEntriesPerPage,
            numPages: showPages,
            currentPage: index,
          },
        })
      })
    })
    .catch(e => {
      reporter.panicOnBuild(e.message, "error in node")
    })
}
