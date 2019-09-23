const updateLinkOrder = (prevLinks, prevPage, direction, defaultLinks) => {
  switch (direction) {
    case 0:
      return [...prevLinks.slice(-3), prevPage]
    case 1:
      return [prevLinks[2], prevLinks[3], prevPage, prevLinks[0]]
    case 2:
      return [prevLinks[3], prevPage, prevLinks[0], prevLinks[1]]
    case 3:
      return [prevPage, ...prevLinks.slice(0, 3)]
    default:
      return defaultLinks
  }
}

export default updateLinkOrder
