import React from "react"
import TransitionLink from "gatsby-plugin-transition-link"
import PropTypes from "prop-types"
import { TimelineLite, TweenMax } from "gsap"

const animateIn = (
  node,
  {
    length,
    state: {
      from: { x, y },
    },
  }
) => {
  const tl = new TimelineLite()

  console.log(node.firstChild.children[0], x, y)

  tl.fromTo(node.firstChild, length, { x, y }, { x: `-=${x}`, y: `-=${y}` })
}

const animateOut = (
  node,
  {
    length,
    state: {
      to: { x, y },
    },
  }
) => {
  const tl = new TimelineLite()

  tl.to(node.firstChild, length, {
    x,
    y,
  })
}

const Link = ({
  children,
  moveInFrom,
  moveOutTo,
  length,
  to,
  currentLinks,
  currentPage,
  direction,
  className,
}) => (
  <TransitionLink
    className={className}
    entry={{
      length,
      state: {
        from: {
          x: moveInFrom.x,
          y: moveInFrom.y,
        },
        prevLinks: currentLinks,
        prevPage: currentPage,
        direction,
      },
      trigger: ({ node, entry }) => {
        console.log("TRIG")
        animateIn(node, entry)
      },
    }}
    exit={{
      length,
      state: {
        to: { x: moveOutTo.x, y: moveOutTo.y },
      },
      trigger: ({ node, exit }) => {
        animateOut(node, exit)
      },
    }}
    to={to}
  >
    {children}
  </TransitionLink>
)

Link.propTypes = {
  moveInFrom: PropTypes.shape({
    x: PropTypes.string,
    y: PropTypes.string,
  }),
  moveOutTo: PropTypes.shape({
    x: PropTypes.string,
    y: PropTypes.string,
  }),
  length: PropTypes.number.isRequired,
  to: PropTypes.string.isRequired,
  direction: PropTypes.number,
  currentLinks: PropTypes.array.isRequired,
  currentPage: PropTypes.string,
  className: PropTypes.string,
}

export default Link
