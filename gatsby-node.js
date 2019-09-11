const path = require("path")
const { fmImagesToRelative } = require("gatsby-remark-relative-images")

exports.onCreateNode = ({ node }) => {
  fmImagesToRelative(node)
}

exports.createPages = ({ actions: { createPage }, graphql, reporter }) => {
  return graphql(`
    query MyQuery {
      music: allMarkdownRemark(
        filter: { frontmatter: { Type: { eq: "music" } } }
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

      const musicEntriesPerPage = 5

      const musicPages = Math.ceil(musicEntries / musicEntriesPerPage)

      Array.from({ length: musicPages }).map((_, index) => {
        createPage({
          path: index === 0 ? "/music" : `/music/${index}`,
          component: path.resolve("./src/templates/music/index.js"),
          context: {
            limit: musicEntriesPerPage,
            skip: index * musicEntriesPerPage,
            numPages: musicPages,
            nextPage: index + 1,
          },
        })
      })
    })
    .catch(e => {
      reporter.panicOnBuild(e.message, "error in node")
    })
}
