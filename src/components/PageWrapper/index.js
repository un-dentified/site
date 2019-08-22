import React, { Component } from "react"
import Link from "../Link"
import TransitionLink from "gatsby-plugin-transition-link"
import styles from "./style.module.scss"
import { TimelineLite } from "gsap"

export default class Index extends Component {
  animateOut = node => {
    console.log(node)
    /*
    TweenLite.to(node, 5, {
      x: "-100vw",
      y: "50vh",
    })
    */
  }

  animateIn = (
    node,
    {
      length,
      state: {
        from: { x, y },
      },
    }
  ) => {
    const tl = new TimelineLite()

    tl.set(node, {
      x,
      y,
    }).to(node, length, {
      x: 0,
      y: 0,
    })
  }

  render() {
    const { links } = this.props

    return (
      <div className={styles.container}>
        <Link
          to={`/${links[0]}`}
          className={`${styles.link} ${styles.leftTop}`}
          moveInFrom={{ x: "-100vw", y: "-50vh" }}
          moveOutTo={{ x: "100vw", y: "50vh" }}
          length={1}
        >
          {links[0]}
        </Link>
        <Link
          to={`/${links[1]}`}
          className={`${styles.link} ${styles.leftBottom}`}
          moveInFrom={{ x: "-100vw", y: "50vh" }}
          moveOutTo={{ x: "100vw", y: "-50vh" }}
          length={1}
        >
          {links[1]}
        </Link>
        <Link
          to={`/${links[2]}`}
          className={`${styles.link} ${styles.rightTop}`}
          moveInFrom={{ x: "100vw", y: "-50vh" }}
          moveOutTo={{ x: "-100vw", y: "50vh" }}
          length={1}
        >
          {links[2]}
        </Link>
        <Link
          to={`/${links[3]}`}
          className={`${styles.link} ${styles.rightBottom}`}
          moveInFrom={{ x: "100vw", y: "50vh" }}
          moveOutTo={{ x: "-100vw", y: "-50vh" }}
          length={1}
        >
          {links[3]}
        </Link>
        <div className={styles.content}></div>
      </div>
    )
  }
}
