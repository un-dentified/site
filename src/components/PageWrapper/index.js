import React, { Component, createRef } from "react"
//import Link from "../Link"
import styles from "./style.module.scss"
import { TimelineMax } from "gsap"
import Arrow from "../Arrow"
import Footer from "../Footer"
import { throttle } from "lodash"
import Loadable from "react-loadable"

const Link = Loadable({
  loader: () => import("../Link"),
  loading() {
    return <span />
  },
})

export default class Index extends Component {
  currentTimeOut
  containerRef = createRef()

  constructor(props) {
    super(props)

    const { defaultLinks } = this.props
    const { prevLinks, prevPage, direction } = this.props.entry.state

    this.handleResize = throttle(this.handleResize, 200)

    this.state = {
      interactive: false,
      menuOpen: true,
      links:
        prevLinks && direction != null
          ? this.updateLinkOrder(prevLinks, prevPage, direction, defaultLinks)
          : defaultLinks,
    }
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

  toggleMenu = cbScene => {
    this.setState(
      prevState => {
        return {
          menuOpen: !prevState.menuOpen,
        }
      },
      () => {
        const tl = new TimelineMax()

        if (!this.state.menuOpen) {
          tl.to("#spin", 0.5, {
            rotation: "45",
          }).staggerTo(
            `.${styles.link}`,
            0.15,
            {
              cycle: {
                scaleX: [0],
                transformOrigin: ["0 0", "0 0", "100%  100%", "100% 100%"],
              },
            },
            0,
            "-=0.2"
          )
        } else {
          tl.to("#spin", 0.5, {
            rotation: "0",
          }).staggerTo(
            `.${styles.link}`,
            0.15,
            {
              cycle: {
                scaleX: [1],
              },
            },
            0,
            "-=0.2"
          )
        }
      }
    )
  }

  handleResize = () => {
    this.setState(prevState => {
      if (!prevState.menuOpen) {
        this.toggleMenu()
      }
      return null
    })
  }

  componentDidMount() {
    window.addEventListener("resize", this.handleResize)
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize)
  }

  render() {
    const { currentPage, children, invertLinkColor } = this.props
    const { links, menuOpen } = this.state

    const invert = invertLinkColor ? `${styles["invert"]}` : ""

    return (
      <div ref={this.containerRef} className={`${styles.container} `}>
        <div className={styles.content}>{children}</div>

        <Footer
          invert={!!invert}
          menuOpen={menuOpen}
          toggleMenu={this.toggleMenu}
        />

        <Link
          to={`/${links[0]}`}
          currentLinks={links}
          currentPage={currentPage}
          direction={0}
          className={`${styles.link} ${styles.leftTop} ${invert}  `}
          moveInFrom={{ x: "-100%", y: "-50%" }}
          moveOutTo={{ x: "100%", y: "50%" }}
          length={1.2}
        >
          <p>{links[0] || "home"}</p>
          <Arrow className={styles.arrow} />
        </Link>
        <Link
          to={`/${links[1]}`}
          currentLinks={links}
          className={`${styles.link} ${styles.leftBottom} ${invert}  `}
          currentPage={currentPage}
          direction={1}
          moveInFrom={{ x: "-100%", y: "50%" }}
          moveOutTo={{ x: "100%", y: "-50%" }}
          length={1.2}
        >
          <Arrow className={styles.arrow} />
          <p>{links[1] || "home"}</p>
        </Link>

        <Link
          to={`/${links[2]}`}
          currentLinks={links}
          currentPage={currentPage}
          className={`${styles.link} ${styles.rightTop} ${invert}  `}
          direction={2}
          moveInFrom={{ x: "100%", y: "-50%" }}
          moveOutTo={{ x: "-100%", y: "50%" }}
          length={1.2}
        >
          <p>{links[2] || "home"}</p>
          <Arrow className={styles.arrow} />
        </Link>

        <Link
          to={`/${links[3]}`}
          currentLinks={links}
          currentPage={currentPage}
          className={`${styles.link} ${styles.rightBottom} ${invert}  `}
          direction={3}
          moveInFrom={{ x: "100%", y: "50%" }}
          moveOutTo={{ x: "-100%", y: "-50%" }}
          length={1.2}
        >
          <Arrow className={styles.arrow} />
          <p>{links[3] || "home"}</p>
        </Link>
      </div>
    )
  }
}
