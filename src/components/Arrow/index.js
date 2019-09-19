import React from "react"
import Proptypes from "prop-types"

const Arrow = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28.39"
      height="29.49"
      viewBox="0 0 28.39 29.49"
      className={className}
      role="presentation"
    >
      <polygon
        points="27.29 18.61 16.61 18.61 16.91 28.93 11.48 28.93 11.19 18.61 1.1 18.61 14.18 0.93 27.29 18.61"
        fill="#fff"
        stroke="#none"
        strokeMiterlimit="10"
        strokeWidth="1.11"
      />
    </svg>
  )
}

Arrow.propTypes = {
  className: Proptypes.string.isRequired,
}

export default Arrow
