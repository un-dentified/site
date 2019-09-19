import React from "react"
import Link from "gatsby-plugin-transition-link"
import fade from "../utils/fade"
import styles from "./styles/404.module.scss"

const FourOhFour = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Page not found</h2>
      <Link
        exit={{
          length: 0.5,
          trigger: ({ exit, node }) => fade({ exit, node, direction: "out" }),
        }}
        entry={{
          length: 0,
          trigger: ({ exit, node }) => fade({ exit, node, direction: "in" }),
        }}
        className={styles.link}
        to="/"
      >
        Return Home
      </Link>
    </div>
  )
}

export default FourOhFour
