import React from "react"
import PropTypes from "prop-types"
import styles from "./style.module.scss"
import loadable from "react-loadable"

const FooterContent = loadable({
  loader: () => import("./DefferedContent"),
  loading() {
    return null
  },
})

const Footer = ({ toggleMenu, menuOpen, invert }) => {
  const invertedClass = invert ? styles.invert : ""

  return (
    <footer className={`${styles.footer} ${invertedClass}`}>
      <FooterContent
        invert={invert}
        toggleMenu={toggleMenu}
        menuOpen={menuOpen}
      />
    </footer>
  )
}

Footer.propTypes = {
  toggleMenu: PropTypes.func.isRequired,
  menuOpen: PropTypes.bool.isRequired,
  invert: PropTypes.bool.isRequired,
}

export default Footer
