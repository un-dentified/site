import React, { Component } from "react"
import Link from "../Link"
import styles from "./style.module.scss"
import { TweenLite } from "gsap"
import Arrow from "../Arrow"

export default class Index extends Component {
  currentTimeOut

  constructor(props) {
    super(props)

    const { defaultLinks } = this.props
    const { prevLinks, prevPage, direction } = this.props.entry.state

    this.state = {
      showLinks: true,
      links:
        prevLinks && direction != null
          ? this.updateLinkOrder(prevLinks, prevPage, direction, defaultLinks)
          : defaultLinks,
    }
  }

  componentDidMount() {
    TweenLite.to(`.${styles.linkContent}`, 1.5, {
      opacity: 0,
      delay: 3.5,
    })
  }

  updateLinkOrder = (prevLinks, prevPage, direction, defaultLinks) => {
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

  handleHover = e => {
    TweenLite.killTweensOf(e.target)

    TweenLite.to(e.target, 0.4, {
      opacity: 1,
      background: "#2a094e",
    })
  }

  handleLeave = e => {
    TweenLite.to(e.target, 0.4, {
      opacity: 0,
      background: "black",
    })
  }

  render() {
    const { currentPage, children } = this.props
    const { links } = this.state

    return (
      <div className={styles.container}>
        <Link
          to={`/${links[0]}`}
          currentLinks={links}
          currentPage={currentPage}
          direction={0}
          className={`${styles.link} ${styles.leftTop}`}
          moveInFrom={{ x: "-100vw", y: "-50vh" }}
          moveOutTo={{ x: "100vw", y: "50vh" }}
          length={0.7}
        >
          <div
            onMouseEnter={this.handleHover}
            onMouseLeave={this.handleLeave}
            className={styles.linkContent}
          >
            <p>{links[0] || "home"}</p>
            <Arrow className={styles.arrow} />
          </div>
        </Link>
        <Link
          to={`/${links[1]}`}
          currentLinks={links}
          className={`${styles.link} ${styles.leftBottom}`}
          currentPage={currentPage}
          direction={1}
          moveInFrom={{ x: "-100vw", y: "50vh" }}
          moveOutTo={{ x: "100vw", y: "-50vh" }}
          length={1}
        >
          <div
            onMouseEnter={this.handleHover}
            onMouseLeave={this.handleLeave}
            className={styles.linkContent}
          >
            <Arrow className={styles.arrow} />
            <p>{links[1] || "home"}</p>
          </div>
        </Link>

        <Link
          to={`/${links[2]}`}
          currentLinks={links}
          currentPage={currentPage}
          className={`${styles.link} ${styles.rightTop}`}
          direction={2}
          moveInFrom={{ x: "100vw", y: "-50vh" }}
          moveOutTo={{ x: "-100vw", y: "50vh" }}
          length={1}
        >
          <div
            onMouseEnter={this.handleHover}
            onMouseLeave={this.handleLeave}
            className={styles.linkContent}
          >
            <p>{links[2] || "home"}</p>
            <Arrow className={styles.arrow} />
          </div>
        </Link>

        <Link
          to={`/${links[3]}`}
          currentLinks={links}
          currentPage={currentPage}
          className={`${styles.link} ${styles.rightBottom}`}
          direction={3}
          moveInFrom={{ x: "100vw", y: "50vh" }}
          moveOutTo={{ x: "-100vw", y: "-50vh" }}
          length={1}
        >
          <div
            onMouseEnter={this.handleHover}
            onMouseLeave={this.handleLeave}
            className={styles.linkContent}
          >
            <Arrow className={styles.arrow} />
            <p>{links[3] || "home"}</p>
          </div>
        </Link>

        <div className={styles.content}>{children}</div>
      </div>
    )
  }
}
