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
        base64:
          "data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wgARCAANABQDASIAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAAAAMEAv/EABQBAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhADEAAAAZxCi8wH/8QAGxAAAQQDAAAAAAAAAAAAAAAAAgABESEDEiP/2gAIAQEAAQUCc+kymtZqLZ5Ch//EABQRAQAAAAAAAAAAAAAAAAAAABD/2gAIAQMBAT8BP//EABQRAQAAAAAAAAAAAAAAAAAAABD/2gAIAQIBAT8BP//EABoQAAICAwAAAAAAAAAAAAAAAAABEBESMYH/2gAIAQEABj8CxK1CZwR//8QAGRAAAwEBAQAAAAAAAAAAAAAAAAERIVFh/9oACAEBAAE/IZJ0bxWGmobpLSzpRWmYXh//2gAMAwEAAgADAAAAEPDP/8QAFBEBAAAAAAAAAAAAAAAAAAAAEP/aAAgBAwEBPxA//8QAFBEBAAAAAAAAAAAAAAAAAAAAEP/aAAgBAgEBPxA//8QAHBABAAMAAwEBAAAAAAAAAAAAAQARITFBUXGB/9oACAEBAAE/EE4Ol37kHiJu0sTyYtnWxQw4jVfkV5aMG8deSh22Xfk//9k=",
        aspectRatio: 1.5,
        src: "/static/95d1d5484a285a338b0587b2b5ed69c7/f5395/img_1519.jpg",
        srcSet:
          "/static/95d1d5484a285a338b0587b2b5ed69c7/ab823/img_1519.jpg 225w,\n/static/95d1d5484a285a338b0587b2b5ed69c7/fe64b/img_1519.jpg 450w,\n/static/95d1d5484a285a338b0587b2b5ed69c7/f5395/img_1519.jpg 900w,\n/static/95d1d5484a285a338b0587b2b5ed69c7/5d6cb/img_1519.jpg 1350w,\n/static/95d1d5484a285a338b0587b2b5ed69c7/1a713/img_1519.jpg 1800w,\n/static/95d1d5484a285a338b0587b2b5ed69c7/fe333/img_1519.jpg 2436w",
        sizes: "(max-width: 900px) 100vw, 900px",
      },
    },
  },
  ...overrides,
})

export default setupDefaultProps
