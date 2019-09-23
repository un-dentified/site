import React, { Component, createRef } from "react"
import PropTypes from "prop-types"
import styles from "./style.module.scss"
import { TimelineMax, TweenLite } from "gsap"
import Arrow from "../Arrow"
import Footer from "../Footer"
import { throttle } from "lodash"
import updateLinkOrder from "./utils/updateLinkOrder"
import loadable from "react-loadable"

const Link = loadable({
  loader: () => import("../Link"),
  loading() {
    return <span />
  },
})

export default class Index extends Component {
  static propTypes = {
    defaultLinks: PropTypes.arrayOf(PropTypes.string).isRequired,
    currentPage: PropTypes.string.isRequired,
    dataCy: PropTypes.string,
    invertLinkColor: PropTypes.bool,
    entry: PropTypes.shape({
      prevLinks: PropTypes.arrayOf(PropTypes.string),
      prevPage: PropTypes.string,
      direction: PropTypes.number,
    }),
  }

  static defaultProps = {
    dataCy: "",
    entry: {
      state: {
        prevLinks: null,
        prevPage: null,
        direction: null,
      },
    },
  }

  containerRef = createRef()

  constructor(props) {
    super(props)

    const { defaultLinks } = this.props

    const { prevLinks, prevPage, direction } = this.props.entry.state

    this.handleResize = throttle(this.handleResize, 200)

    this.state = {
      menuOpen: true,
      links:
        prevLinks && direction != null
          ? updateLinkOrder(prevLinks, prevPage, direction, defaultLinks)
          : defaultLinks,
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
        const tl = new TimelineMax()

        if (this.state.menuOpen) {
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
        } else {
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
        }
      }
    )
  }

  handleResize = () => {
    TweenLite.set(this.containerRef.current, {
      height: `${window.innerHeight}px`,
    })

    this.setState(prevState => {
      if (!prevState.menuOpen) {
        this.toggleMenu()
      }
      return null
    })
  }

  componentDidMount() {
    if (typeof window !== undefined) {
      TweenLite.set(this.containerRef.current, {
        height: `${window.innerHeight}px`,
      })
      window.addEventListener("resize", this.handleResize)
    }
  }

  componentWillUnmount() {
    if (typeof winodw !== undefined) {
      window.removeEventListener("resize", this.handleResize)
    }
  }

  render() {
    const { currentPage, children, invertLinkColor } = this.props
    const { links, menuOpen } = this.state

    const invert = invertLinkColor ? `${styles.invert}` : ""

    return (
      <div
        ref={this.containerRef}
        data-cy={this.props.dataCy}
        className={`${styles.container} `}
      >
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
