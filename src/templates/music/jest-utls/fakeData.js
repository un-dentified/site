const fakeData = {
  allMarkdownRemark: {
    edges: [
      {
        node: {
          id: "619e98e4-a8ef-5cb1-bcc9-2c49fb8fda6d",
          frontmatter: {
            Apple:
              "https://music.apple.com/ca/album/never-been-the-same-single/1449801077",
            Spotify: "https://open.spotify.com/track/2g4RczV82W19gshn5OnJXh",
            preview:
              "https://p.scdn.co/mp3-preview/99ba61736aca412e33c5f3b8261624f75d645521?cid=36a6d368e4c347afa4e7d00da3c5527a",
            title: "Never Been the Same",
            cover: {
              childImageSharp: {
                fluid: {
                  base64:
                    "data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wgARCAAUABQDASIAAhEBAxEB/8QAGAABAQADAAAAAAAAAAAAAAAAAAMCBAX/xAAYAQACAwAAAAAAAAAAAAAAAAAAAQIDBP/aAAwDAQACEAMQAAAB6cmOd1CeyL4gH//EABwQAAICAgMAAAAAAAAAAAAAAAABAhESEyEiMf/aAAgBAQABBQLsW4maRw34JSrBCgjXE//EABQRAQAAAAAAAAAAAAAAAAAAACD/2gAIAQMBAT8BH//EABcRAQEBAQAAAAAAAAAAAAAAAAABESH/2gAIAQIBAT8B11IyP//EAB8QAAIBAgcAAAAAAAAAAAAAAAAxARGBAiEiMjNxof/aAAgBAQAGPwLTGK4+zb6KlxwccGdZEI//xAAfEAEAAgEDBQAAAAAAAAAAAAABACERMUFhcYGRwfD/2gAIAQEAAT8hU6HqzNkjNiArWeZ0FnNYiA8eLJ7hlVk5ZuQ9ifJZ/9oADAMBAAIAAwAAABDUKH//xAAXEQADAQAAAAAAAAAAAAAAAAAAAREQ/9oACAEDAQE/EJjKf//EABoRAAICAwAAAAAAAAAAAAAAAAABETFBYfD/2gAIAQIBAT8Qb4ZPEIijUf/EAB8QAQEAAgEEAwAAAAAAAAAAAAERACFRMUGBoWGRwf/aAAgBAQABPxCHB5AFOHeFaEtSX4tclHdzVvnHZOTLVrhMeDkk3eAuIO8O4b7ytQXW3rpi0AjoJT6M3OxeC/c//9k=",
                  aspectRatio: 1,
                  src:
                    "/static/bcc23749e5ed49024b805709b42fbd0e/32ee9/img_0910.jpg",
                  srcSet:
                    "/static/bcc23749e5ed49024b805709b42fbd0e/0aa4b/img_0910.jpg 125w,\n/static/bcc23749e5ed49024b805709b42fbd0e/4d406/img_0910.jpg 250w,\n/static/bcc23749e5ed49024b805709b42fbd0e/32ee9/img_0910.jpg 500w,\n/static/bcc23749e5ed49024b805709b42fbd0e/9f583/img_0910.jpg 750w,\n/static/bcc23749e5ed49024b805709b42fbd0e/2f7e7/img_0910.jpg 1000w,\n/static/bcc23749e5ed49024b805709b42fbd0e/989b1/img_0910.jpg 1600w",
                  sizes: "(max-width: 500px) 100vw, 500px",
                },
              },
            },
          },
        },
      },
      {
        node: {
          id: "849ed4eb-8b6f-55bf-a44c-5253615ad60b",
          frontmatter: {
            Apple:
              "https://music.apple.com/ca/album/the-come-up-single/1456123123",
            Spotify: "https://open.spotify.com/track/6wX5TuUvGHnygiaAmvTdad",
            preview:
              "https://p.scdn.co/mp3-preview/b676099066c0e34dff8f418e9403f61e9d89e49a?cid=36a6d368e4c347afa4e7d00da3c5527a",
            title: "The Come Up",
            cover: {
              childImageSharp: {
                fluid: {
                  base64:
                    "data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wgARCAAUABQDASIAAhEBAxEB/8QAGAABAQEBAQAAAAAAAAAAAAAAAAECBAP/xAAXAQADAQAAAAAAAAAAAAAAAAABAgMA/9oADAMBAAIQAxAAAAGydUKczLH3wMsBP//EABwQAAICAgMAAAAAAAAAAAAAAAESABECAyEjMf/aAAgBAQABBQJyz9g2XA5lCPzh4cYtz//EABQRAQAAAAAAAAAAAAAAAAAAACD/2gAIAQMBAT8BH//EABQRAQAAAAAAAAAAAAAAAAAAACD/2gAIAQIBAT8BH//EABsQAAICAwEAAAAAAAAAAAAAAAABETECEDKh/9oACAEBAAY/AoaGoORRRUscLzVs7yP/xAAcEAEAAgIDAQAAAAAAAAAAAAABABEhMUFRYZH/2gAIAQEAAT8hKSMeymw6IFkKXwRXgnZ2SoF9E4CZhK7ZvarKxF5fBn//2gAMAwEAAgADAAAAENTHgf/EABYRAQEBAAAAAAAAAAAAAAAAAAEAEf/aAAgBAwEBPxDLIXIXL//EABcRAQEBAQAAAAAAAAAAAAAAAAERABD/2gAIAQIBAT8QWchdDf/EAB0QAQEAAwACAwAAAAAAAAAAAAERACExUZFhccH/2gAIAQEAAT8Qg2AKaEfCdcLdy9NzzvuG0QBr7+cYNB20fWACQ2CXHTOHTyyvCrFQuWS2wQE9Y1QvNB+Z/9k=",
                  aspectRatio: 1,
                  src:
                    "/static/df80bffe320ca81bc893ea78b2048c93/32ee9/samuri.jpg",
                  srcSet:
                    "/static/df80bffe320ca81bc893ea78b2048c93/0aa4b/samuri.jpg 125w,\n/static/df80bffe320ca81bc893ea78b2048c93/4d406/samuri.jpg 250w,\n/static/df80bffe320ca81bc893ea78b2048c93/32ee9/samuri.jpg 500w,\n/static/df80bffe320ca81bc893ea78b2048c93/9f583/samuri.jpg 750w,\n/static/df80bffe320ca81bc893ea78b2048c93/2f7e7/samuri.jpg 1000w,\n/static/df80bffe320ca81bc893ea78b2048c93/989b1/samuri.jpg 1600w",
                  sizes: "(max-width: 500px) 100vw, 500px",
                },
              },
            },
          },
        },
      },
      {
        node: {
          id: "0972c641-dfed-51d1-8404-5cce4bce3ad7",
          frontmatter: {
            Apple:
              "https://music.apple.com/ca/album/bring-that-body-single/1458723446",
            Spotify: "https://open.spotify.com/track/6nEpEGpNGiCfpzBUsSSlUv",
            preview:
              "https://p.scdn.co/mp3-preview/8c16f123a7fd16aa2dbc2df9a832efc7d2135e6e?cid=36a6d368e4c347afa4e7d00da3c5527a",
            title: "Bring That Body",
            cover: {
              childImageSharp: {
                fluid: {
                  base64:
                    "data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wgARCAAUABQDASIAAhEBAxEB/8QAFwABAQEBAAAAAAAAAAAAAAAAAAIBBP/EABYBAQEBAAAAAAAAAAAAAAAAAAABAv/aAAwDAQACEAMQAAAB61Td0BgYD//EABgQAAIDAAAAAAAAAAAAAAAAAAExECBB/9oACAEBAAEFAigo2n//xAAUEQEAAAAAAAAAAAAAAAAAAAAg/9oACAEDAQE/AR//xAAUEQEAAAAAAAAAAAAAAAAAAAAg/9oACAECAQE/AR//xAAYEAACAwAAAAAAAAAAAAAAAAAAAREwYf/aAAgBAQAGPwJwbR//xAAbEAACAgMBAAAAAAAAAAAAAAABEQAhEDFBUf/aAAgBAQABPyF/YqgoXxZwA+qWF2PcnUc//9oADAMBAAIAAwAAABDwAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAg/9oACAEDAQE/EB//xAAUEQEAAAAAAAAAAAAAAAAAAAAg/9oACAECAQE/EB//xAAdEAEAAgICAwAAAAAAAAAAAAABABEQITFBUWGB/9oACAEBAAE/EGWN3fUrJEgB5wroHsk7g2aGUiTzBz//2Q==",
                  aspectRatio: 1,
                  src:
                    "/static/cff4519e35f8af3098c841a4243e25b7/32ee9/img_1180.jpg",
                  srcSet:
                    "/static/cff4519e35f8af3098c841a4243e25b7/0aa4b/img_1180.jpg 125w,\n/static/cff4519e35f8af3098c841a4243e25b7/4d406/img_1180.jpg 250w,\n/static/cff4519e35f8af3098c841a4243e25b7/32ee9/img_1180.jpg 500w,\n/static/cff4519e35f8af3098c841a4243e25b7/9f583/img_1180.jpg 750w,\n/static/cff4519e35f8af3098c841a4243e25b7/2f7e7/img_1180.jpg 1000w,\n/static/cff4519e35f8af3098c841a4243e25b7/989b1/img_1180.jpg 1600w",
                  sizes: "(max-width: 500px) 100vw, 500px",
                },
              },
            },
          },
        },
      },
      {
        node: {
          id: "bfe10ca4-f884-5c4f-8306-100a63e1b6c6",
          frontmatter: {
            Apple: "https://music.apple.com/ca/album/bathtub-single/1469300849",
            Spotify: "https://open.spotify.com/track/4Vo2OERZLuEKhEN9pWo9ga",
            preview:
              "https://p.scdn.co/mp3-preview/9b408a128eb0150230f1b9afa567ea9c55ee9912?cid=36a6d368e4c347afa4e7d00da3c5527a",
            title: "Bathtub",
            cover: {
              childImageSharp: {
                fluid: {
                  base64:
                    "data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wgARCAAUABQDASIAAhEBAxEB/8QAFwABAQEBAAAAAAAAAAAAAAAAAAQCBf/EABcBAAMBAAAAAAAAAAAAAAAAAAACAwH/2gAMAwEAAhADEAAAAc1boSnNShu1sJTjT//EABsQAQEBAAIDAAAAAAAAAAAAAAECAAMRBBIi/9oACAEBAAEFApTFybkuF8fphI19tEG9Jy/X/8QAFhEAAwAAAAAAAAAAAAAAAAAAAQIg/9oACAEDAQE/AS0f/8QAFhEBAQEAAAAAAAAAAAAAAAAAEAER/9oACAECAQE/AcIf/8QAHRAAAgICAwEAAAAAAAAAAAAAAAECESEiEDJBYf/aAAgBAQAGPwL0zk1VGYK18OsTWNId8M//xAAdEAEAAgICAwAAAAAAAAAAAAABABEhQTFRYYGh/9oACAEBAAE/IYzWKK3CbQrqItDA3AjPslyrooYzkc9zcH2JT5n/2gAMAwEAAgADAAAAEIDPQf/EABkRAQACAwAAAAAAAAAAAAAAAAEAEBEhMf/aAAgBAwEBPxAHTAAxDlf/xAAYEQADAQEAAAAAAAAAAAAAAAAAAREhMf/aAAgBAgEBPxC7UacER//EABwQAQADAAIDAAAAAAAAAAAAAAEAESExYUFRkf/aAAgBAQABPxCoaWtpqDkSyqO+JQSCJQ2Gt2ZC977jFVeY5YLc2goe9ha0t1FfIAiRN5QhKAqFdE//2Q==",
                  aspectRatio: 1,
                  src:
                    "/static/4824f5e0eb82a77d6501572f953ea020/32ee9/img_1455.jpg",
                  srcSet:
                    "/static/4824f5e0eb82a77d6501572f953ea020/0aa4b/img_1455.jpg 125w,\n/static/4824f5e0eb82a77d6501572f953ea020/4d406/img_1455.jpg 250w,\n/static/4824f5e0eb82a77d6501572f953ea020/32ee9/img_1455.jpg 500w,\n/static/4824f5e0eb82a77d6501572f953ea020/9f583/img_1455.jpg 750w,\n/static/4824f5e0eb82a77d6501572f953ea020/2f7e7/img_1455.jpg 1000w,\n/static/4824f5e0eb82a77d6501572f953ea020/7146c/img_1455.jpg 3000w",
                  sizes: "(max-width: 500px) 100vw, 500px",
                },
              },
            },
          },
        },
      },
    ],
  },
}

const filterNodeNum = num => {
  const nodes = fakeData.allMarkdownRemark.edges.reduce((res, edge, index) => {
    if (index <= num) {
      res.push(edge)
    }
    return res
  }, [])

  return {
    allMarkdownRemark: {
      edges: nodes,
    },
  }
}

export default filterNodeNum
