import React, { Component, createRef } from "react"
import Link from "../Link"
import styles from "./style.module.scss"
import { TweenMax } from "gsap"
import Arrow from "../Arrow"

export default class Index extends Component {
  currentTimeOut
  containerRef = createRef()

  constructor(props) {
    super(props)

    const { defaultLinks } = this.props
    const { prevLinks, prevPage, direction } = this.props.entry.state

    this.state = {
      menuOpen: true,
      links:
        prevLinks && direction != null
          ? this.updateLinkOrder(prevLinks, prevPage, direction, defaultLinks)
          : defaultLinks,
    }
  }

  componentDidMount() {
    TweenMax.to(`.${styles.link} > *`, 1.5, {
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

  toggleMenu = () => {
    this.setState(
      prevState => {
        return {
          menuOpen: !prevState.menuOpen,
        }
      },
      () => {
        if (!this.state.menuOpen) {
          TweenMax.staggerTo(
            `.${styles.link}`,
            0.5,
            {
              cycle: {
                scaleX: [0],
                transformOrigin: ["0 0", "0 0", "100%  100%", "100% 100%"],
              },
            },
            0.25
          )
        } else {
          TweenMax.staggerTo(
            `.${styles.link}`,
            0.5,
            {
              cycle: {
                scaleX: [1],
              },
            },
            0.25
          )
        }
      }
    )
  }

  render() {
    const { currentPage, children, invertLinkColor } = this.props
    const { links } = this.state

    const linkClassName = invertLinkColor ? `${styles["invert"]}` : ""

    return (
      <>
        <div ref={this.containerRef} className={`${styles.container} `}>
          <Link
            to={`/${links[0]}`}
            currentLinks={links}
            currentPage={currentPage}
            direction={0}
            className={`${styles.link} ${styles.leftTop} ${linkClassName}`}
            moveInFrom={{ x: "-100%", y: "-50%" }}
            moveOutTo={{ x: "100%", y: "50%" }}
            length={1.3}
          >
            <p>{links[0] || "home"}</p>
            <Arrow className={styles.arrow} />
          </Link>
          <Link
            to={`/${links[1]}`}
            currentLinks={links}
            className={`${styles.link} ${styles.leftBottom} ${linkClassName}`}
            currentPage={currentPage}
            direction={1}
            moveInFrom={{ x: "-100%", y: "50%" }}
            moveOutTo={{ x: "100%", y: "-50%" }}
            length={1.3}
          >
            <Arrow className={styles.arrow} />
            <p>{links[1] || "home"}</p>
          </Link>

          <Link
            to={`/${links[2]}`}
            currentLinks={links}
            currentPage={currentPage}
            className={`${styles.link} ${styles.rightTop} ${linkClassName}`}
            direction={2}
            moveInFrom={{ x: "100%", y: "-50%" }}
            moveOutTo={{ x: "-100%", y: "50%" }}
            length={1.3}
          >
            <p>{links[2] || "home"}</p>
            <Arrow className={styles.arrow} />
          </Link>

          <Link
            to={`/${links[3]}`}
            currentLinks={links}
            currentPage={currentPage}
            className={`${styles.link} ${styles.rightBottom} ${linkClassName}`}
            direction={3}
            moveInFrom={{ x: "100%", y: "50%" }}
            moveOutTo={{ x: "-100%", y: "-50%" }}
            length={1.3}
          >
            <Arrow className={styles.arrow} />
            <p>{links[3] || "home"}</p>
          </Link>
        </div>
      </>
    )
  }
}
