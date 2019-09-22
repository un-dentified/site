const setupDefaultProps = (overrides = {}) => ({
  playing: "",
  setPlaying: jest.fn(),
  Apple: "www.apple.com",
  Spotify: "www.spotify.com",
  title: "Generic Song Title",
  id: "super_secret_id",
  preview:
    "https://p.scdn.co/mp3-preview/9b408a128eb0150230f1b9afa567ea9c55ee9912?cid=36a6d368e4c347afa4e7d00da3c5527a",
  cover: {
    childImageSharp: {
      fluid: {
        base64: "",
        aspectRatio: "2",
        src: "fakepic.jpg",
        srcSet:
          "fake-pic-320w.jpg 320w,fake-pic-480w.jpg 480w,fake-pic-800w.jpg 800w",
      },
    },
  },
  ...overrides,
})

export default setupDefaultProps
