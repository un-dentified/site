import React from "react"
import styles from "./style.module.scss"
import Loadable from "react-loadable"

const FooterContent = Loadable({
  loader: () => import("./DefferedContent"),
  loading() {
    return null
  },
})

export default ({ toggleMenu, menuOpen, invert }) => {
  const invertedClass = invert ? styles["invert"] : ""

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
