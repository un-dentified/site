import React, { Component } from "react"
import Link from "../Link"
import TransitionLink from "gatsby-plugin-transition-link"
import styles from "./style.module.scss"
import { TimelineLite } from "gsap"

export default class Index extends Component {
  constructor(props) {
    super(props)

    const { defaultLinks } = this.props
    const { prevLinks, prevPage, direction } = this.props.entry.state

    console.log(direction)

    this.state = {
      links:
        prevLinks && direction != null
          ? this.updateLinkOrder(prevLinks, prevPage, direction, defaultLinks)
          : defaultLinks,
    }
  }

  updateLinkOrder = (prevLinks, prevPage, direction, defaultLinks) => {
    let a

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

  render() {
    const {
      defaultLinks,
      entry: { state },
      currentPage,
    } = this.props

    const { links } = this.state

    return (
      <div className={styles.container}>
        <Link
          to={`/${links[0]}`}
          className={`${styles.link} ${styles.leftTop}`}
          currentLinks={links}
          currentPage={currentPage}
          direction={0}
          moveInFrom={{ x: "-100vw", y: "-50vh" }}
          moveOutTo={{ x: "100vw", y: "50vh" }}
          length={0.7}
        >
          {" "}
          {links[0]}{" "}
        </Link>
        <Link
          to={`/${links[1]}`}
          className={`${styles.link} ${styles.leftBottom}`}
          currentLinks={links}
          currentPage={currentPage}
          direction={1}
          moveInFrom={{ x: "-100vw", y: "50vh" }}
          moveOutTo={{ x: "100vw", y: "-50vh" }}
          length={1}
        >
          {links[1]}
        </Link>
        <Link
          to={`/${links[2]}`}
          className={`${styles.link} ${styles.rightTop}`}
          currentLinks={links}
          currentPage={currentPage}
          direction={2}
          moveInFrom={{ x: "100vw", y: "-50vh" }}
          moveOutTo={{ x: "-100vw", y: "50vh" }}
          length={1}
        >
          {links[2]}
          <div
            style={{
              transform: "rotate(-90deg)",
              transformOrigin: "0,0",
              display: "inline-block",
              background: "yellow",
            }}
          >
            {" "}
            text
          </div>
        </Link>
        <Link
          to={`/${links[3]}`}
          className={`${styles.link} ${styles.rightBottom}`}
          currentLinks={links}
          currentPage={currentPage}
          direction={3}
          moveInFrom={{ x: "100vw", y: "50vh" }}
          moveOutTo={{ x: "-100vw", y: "-50vh" }}
          length={1}
        >
          {links[3]}
        </Link>
        <h1 className={styles.content}>
          <svg
            id="Layer_1"
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            width="300"
            height="300"
            viewBox="0 0 78.51 72.67"
          >
            <title>Untitled-1</title>
            <g>
              <path
                d="M15.92,15.46h2V29.51h6.74v1.71H15.92Z"
                transform="translate(-14.78 -15.21)"
                fill="none"
                stroke="#7D00FA"
                strokeMiterlimit="10"
                strokeWidth="0.5"
              />
              <path
                d="M36.8,25.47c0,4.18-2.89,6-5.63,6-3.06,0-5.43-2.25-5.43-5.83,0-3.78,2.48-6,5.62-6S36.8,22,36.8,25.47Zm-9,.11c0,2.48,1.43,4.35,3.44,4.35s3.44-1.84,3.44-4.39c0-1.92-1-4.35-3.39-4.35S27.82,23.43,27.82,25.58Z"
                transform="translate(-14.78 -15.21)"
                fill="none"
                stroke="#7D00FA"
                strokeMiterlimit="10"
                strokeWidth="0.5"
              />
              <path
                d="M39.41,23.43c0-1.33,0-2.48-.1-3.53h1.8l.08,2.22h.09a3.39,3.39,0,0,1,3.13-2.48,2.58,2.58,0,0,1,.59.07v1.95a2.84,2.84,0,0,0-3.46,2.57,5.45,5.45,0,0,0-.1,1v6h-2Z"
                transform="translate(-14.78 -15.21)"
                fill="none"
                stroke="#7D00FA"
                strokeMiterlimit="10"
                strokeWidth="0.5"
              />
              <path
                d="M48,25.94a3.62,3.62,0,0,0,3.88,3.92A7.48,7.48,0,0,0,55,29.28l.35,1.47a9.18,9.18,0,0,1-3.77.7c-3.48,0-5.56-2.29-5.56-5.7s2-6.11,5.3-6.11C55,19.64,56,22.9,56,25a8.75,8.75,0,0,1-.07,1Zm6-1.48c0-1.31-.53-3.34-2.85-3.34-2.08,0-3,1.92-3.16,3.34Z"
                transform="translate(-14.78 -15.21)"
                fill="none"
                stroke="#7D00FA"
                strokeMiterlimit="10"
                strokeWidth="0.5"
              />
              <path
                d="M58.55,23c0-1.16,0-2.12-.1-3.06h1.8l.1,1.83h.07A3.89,3.89,0,0,1,64,19.64a3.36,3.36,0,0,1,3.21,2.27h0a4.74,4.74,0,0,1,1.26-1.47,3.85,3.85,0,0,1,2.51-.8c1.49,0,3.72,1,3.72,4.92v6.66h-2V24.81c0-2.17-.79-3.48-2.45-3.48a2.65,2.65,0,0,0-2.43,1.87,3.17,3.17,0,0,0-.17,1v7h-2V24.44c0-1.8-.79-3.11-2.36-3.11a2.81,2.81,0,0,0-2.55,2.06,2.73,2.73,0,0,0-.16,1v6.83h-2Z"
                transform="translate(-14.78 -15.21)"
                fill="none"
                stroke="#7D00FA"
                strokeMiterlimit="10"
                strokeWidth="0.5"
              />
              <path
                d="M18.14,44.8a1.28,1.28,0,0,1-2.55,0,1.25,1.25,0,0,1,1.28-1.29A1.22,1.22,0,0,1,18.14,44.8ZM15.85,59.3V48h2V59.3Z"
                transform="translate(-14.78 -15.21)"
                fill="none"
                stroke="#7D00FA"
                strokeMiterlimit="10"
                strokeWidth="0.5"
              />
              <path
                d="M21.32,51.67c0-1.45-.05-2.61-.09-3.69h1.84l.1,1.94h0a4.44,4.44,0,0,1,4-2.2C30,47.72,32,50,32,53.47c0,4.07-2.48,6.08-5.14,6.08a4,4,0,0,1-3.49-1.77h0v6.15h-2Zm2,3a4.24,4.24,0,0,0,.09.84,3.17,3.17,0,0,0,3.09,2.41c2.17,0,3.43-1.78,3.43-4.37,0-2.27-1.19-4.21-3.36-4.21a3.57,3.57,0,0,0-3.25,3.39Z"
                transform="translate(-14.78 -15.21)"
                fill="none"
                stroke="#7D00FA"
                strokeMiterlimit="10"
                strokeWidth="0.5"
              />
              <path
                d="M34.35,57.19a5.4,5.4,0,0,0,2.72.82c1.49,0,2.19-.75,2.19-1.68s-.58-1.52-2.1-2.08c-2-.73-3-1.85-3-3.21,0-1.82,1.47-3.32,3.9-3.32a5.67,5.67,0,0,1,2.78.7l-.51,1.5A4.39,4.39,0,0,0,38,49.27c-1.22,0-1.9.7-1.9,1.54s.68,1.35,2.15,1.92c2,.74,3,1.73,3,3.41,0,2-1.54,3.39-4.23,3.39a6.41,6.41,0,0,1-3.18-.77Z"
                transform="translate(-14.78 -15.21)"
                fill="none"
                stroke="#7D00FA"
                strokeMiterlimit="10"
                strokeWidth="0.5"
              />
              <path
                d="M53.37,56.21c0,1.17,0,2.2.09,3.09H51.64l-.12-1.85h0a4.27,4.27,0,0,1-3.75,2.1c-1.77,0-3.9-1-3.9-4.95V48h2.06v6.27c0,2.15.65,3.6,2.52,3.6A3,3,0,0,0,51.13,56a3.23,3.23,0,0,0,.18-1.06V48h2.06Z"
                transform="translate(-14.78 -15.21)"
                fill="none"
                stroke="#7D00FA"
                strokeMiterlimit="10"
                strokeWidth="0.5"
              />
              <path
                d="M56.79,51c0-1.17,0-2.13-.09-3.06h1.8l.09,1.82h.07a3.92,3.92,0,0,1,3.56-2.08A3.35,3.35,0,0,1,65.42,50h0a4.61,4.61,0,0,1,1.26-1.47,3.84,3.84,0,0,1,2.5-.8c1.5,0,3.72,1,3.72,4.91V59.3h-2V52.89c0-2.17-.8-3.48-2.46-3.48a2.65,2.65,0,0,0-2.43,1.87,3.48,3.48,0,0,0-.16,1v7h-2V52.52c0-1.8-.8-3.11-2.36-3.11a3.08,3.08,0,0,0-2.72,3.06V59.3h-2Z"
                transform="translate(-14.78 -15.21)"
                fill="none"
                stroke="#7D00FA"
                strokeMiterlimit="10"
                strokeWidth="0.5"
              />
              <path
                d="M25.62,70.77V84.45c0,1,0,2.15.09,2.93H23.87l-.1-2h0a4.2,4.2,0,0,1-3.86,2.22c-2.74,0-4.84-2.31-4.84-5.75,0-3.77,2.31-6.08,5.07-6.08a3.81,3.81,0,0,1,3.42,1.73h0V70.77Zm-2.06,9.89a3.65,3.65,0,0,0-.09-.86,3,3,0,0,0-3-2.39c-2.13,0-3.39,1.87-3.39,4.38,0,2.29,1.12,4.18,3.34,4.18a3.1,3.1,0,0,0,3-2.45,3.58,3.58,0,0,0,.09-.89Z"
                transform="translate(-14.78 -15.21)"
                fill="none"
                stroke="#7D00FA"
                strokeMiterlimit="10"
                strokeWidth="0.5"
              />
              <path
                d="M39.28,81.62c0,4.19-2.89,6-5.63,6-3.06,0-5.43-2.24-5.43-5.82,0-3.79,2.48-6,5.62-6S39.28,78.16,39.28,81.62Zm-9,.12c0,2.48,1.43,4.35,3.44,4.35s3.44-1.85,3.44-4.4c0-1.92-1-4.35-3.39-4.35S30.3,79.59,30.3,81.74Z"
                transform="translate(-14.78 -15.21)"
                fill="none"
                stroke="#7D00FA"
                strokeMiterlimit="10"
                strokeWidth="0.5"
              />
              <path
                d="M41.89,70.77H44V87.38H41.89Z"
                transform="translate(-14.78 -15.21)"
                fill="none"
                stroke="#7D00FA"
                strokeMiterlimit="10"
                strokeWidth="0.5"
              />
              <path
                d="M57.65,81.62c0,4.19-2.9,6-5.63,6-3.07,0-5.43-2.24-5.43-5.82,0-3.79,2.48-6,5.61-6S57.65,78.16,57.65,81.62Zm-9,.12c0,2.48,1.43,4.35,3.44,4.35s3.44-1.85,3.44-4.4c0-1.92-1-4.35-3.39-4.35S48.67,79.59,48.67,81.74Z"
                transform="translate(-14.78 -15.21)"
                fill="none"
                stroke="#7D00FA"
                strokeMiterlimit="10"
                strokeWidth="0.5"
              />
              <path
                d="M60.26,79.59c0-1.33,0-2.48-.1-3.53H62L62,78.28h.1a3.39,3.39,0,0,1,3.13-2.48,2,2,0,0,1,.58.07v1.94a2.84,2.84,0,0,0-3.46,2.57,6.68,6.68,0,0,0-.09,1v6h-2Z"
                transform="translate(-14.78 -15.21)"
                fill="none"
                stroke="#7D00FA"
                strokeMiterlimit="10"
                strokeWidth="0.5"
              />
              <path
                d="M72.59,85.27a5.33,5.33,0,0,0,2.71.82c1.5,0,2.2-.75,2.2-1.68s-.59-1.52-2.11-2.09c-2-.72-3-1.84-3-3.2,0-1.82,1.47-3.32,3.9-3.32a5.74,5.74,0,0,1,2.79.7L78.57,78a4.38,4.38,0,0,0-2.31-.66c-1.22,0-1.9.7-1.9,1.55s.68,1.35,2.15,1.91c2,.75,3,1.73,3,3.42,0,2-1.54,3.39-4.23,3.39a6.55,6.55,0,0,1-3.18-.77Z"
                transform="translate(-14.78 -15.21)"
                fill="none"
                stroke="#7D00FA"
                strokeMiterlimit="10"
                strokeWidth="0.5"
              />
              <path
                d="M84.42,72.88a1.21,1.21,0,0,1-1.31,1.26,1.23,1.23,0,0,1-1.24-1.26,1.26,1.26,0,0,1,1.29-1.29A1.22,1.22,0,0,1,84.42,72.88Zm-2.29,14.5V76.06h2.06V87.38Z"
                transform="translate(-14.78 -15.21)"
                fill="none"
                stroke="#7D00FA"
                strokeMiterlimit="10"
                strokeWidth="0.5"
              />
              <path
                d="M90.09,72.81v3.25H93v1.56H90.09v6.11c0,1.4.39,2.2,1.54,2.2a4.57,4.57,0,0,0,1.19-.14l.09,1.54a5,5,0,0,1-1.82.28,2.85,2.85,0,0,1-2.22-.87,4.19,4.19,0,0,1-.8-2.94V77.62H86.32V76.06h1.75V73.34Z"
                transform="translate(-14.78 -15.21)"
                fill="none"
                stroke="#7D00FA"
                strokeMiterlimit="10"
                strokeWidth="0.5"
              />
            </g>
          </svg>
        </h1>
      </div>
    )
  }
}
