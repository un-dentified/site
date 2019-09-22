import React from "react"
import PropTypes from "prop-types"
import styles from "./style.module.scss"
import ContactForm from "../../ContactForm"

const AppleLogo = ({ invert }) => (
  <a
    href="https://music.apple.com/ca/artist/un-dentified/1449711558 "
    className={`${styles.icon} ${invert}`}
    aria-label="Open Apple Music"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="0"
      height="0"
      viewBox="0 0 98 98"
      role="presentation"
      focusable="false"
    >
      <path
        className={styles.path}
        d="M82.85,53.07c-.15-12.41,12.43-18.36,13-18.66-7.07-8.42-18.08-9.57-22-9.71-9.38-.77-18.29,4.49-23.05,4.49s-12.08-4.38-19.86-4.26C20.72,25.05,11.3,29.77,6,37.22c-10.61,15-2.72,37.21,7.63,49.37,5,6,11.08,12.64,19,12.4,7.62-.24,10.51-4,19.72-4s11.8,4,19.87,3.89,13.39-6.07,18.42-12A50.12,50.12,0,0,0,99,72.9C98.82,72.83,83,67.9,82.85,53.07ZM67.7,16.65C71.9,12.5,74.73,6.74,74,1A29.48,29.48,0,0,0,56.23,8.42c-3.89,3.67-7.3,9.53-6.39,15.16C56.6,24,63.49,20.79,67.7,16.65Z"
        transform="translate(-1 -1)"
        fill="white"
      />
    </svg>
  </a>
)

const YoutubeLogo = ({ invert }) => (
  <a
    href="https://www.youtube.com/channel/UCxzo423rFh3laj9L0FRZQAw"
    className={`${styles.icon} ${invert}`}
    aria-label="Open Youtube"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="0"
      height="0"
      viewBox="0 0 98 98"
      focusable="false"
      role="presentation"
    >
      <path
        className={styles.path}
        d="M98,22.15h0s-1-9.6-3.9-13.82c-3.73-5.55-7.9-5.58-9.82-5.9C70.58,1,50,1,50,1h0S29.39,1,15.68,2.42c-1.91.32-6.08.35-9.82,5.9C2.91,12.54,2,22.14,2,22.14S1,33.41,1,44.71V55.26C1,66.53,2,77.82,2,77.82s1,9.61,3.88,13.83c3.74,5.55,8.64,5.36,10.82,6C24.53,98.67,50,99,50,99s20.6,0,34.3-1.44c1.91-.33,6.09-.35,9.82-5.91C97.06,87.43,98,77.83,98,77.83s1-11.27,1-22.56V44.71C99,33.44,98,22.15,98,22.15ZM39.86,68.08V28.92L66.33,48.57Z"
        transform="translate(-1 -1)"
        fill="#f1f2f2"
      />
    </svg>
  </a>
)

const InstaLogo = ({ invert }) => (
  <a
    href="https://instagram.com/officialunidentified?igshid=pt7e3xjxnogd"
    className={`${styles.icon} ${invert}`}
    aria-label="Open Instagram"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="0"
      height="0"
      viewBox="0 0 98 98"
      role="presentation"
      focusable="false"
    >
      <g>
        <path
          className={styles.path}
          d="M50,9.83c13.1,0,14.65.06,19.8.29a26.94,26.94,0,0,1,9.1,1.68,15.12,15.12,0,0,1,5.63,3.66,15.35,15.35,0,0,1,3.67,5.63,26.85,26.85,0,0,1,1.69,9.09c.23,5.17.29,6.72.29,19.8s-.06,14.64-.29,19.79a26.87,26.87,0,0,1-1.69,9.1,15,15,0,0,1-3.66,5.62,15.25,15.25,0,0,1-5.63,3.68,27,27,0,0,1-9.09,1.68c-5.18.23-6.73.29-19.81.29s-14.65-.06-19.8-.29a26.94,26.94,0,0,1-9.1-1.68,15.12,15.12,0,0,1-5.63-3.66,15.29,15.29,0,0,1-3.68-5.62,27.06,27.06,0,0,1-1.68-9.1c-.23-5.17-.29-6.72-.29-19.79s.06-14.65.29-19.8a26.81,26.81,0,0,1,1.68-9.09,15.16,15.16,0,0,1,3.66-5.63,15.33,15.33,0,0,1,5.63-3.68,27.06,27.06,0,0,1,9.1-1.68c5.15-.23,6.7-.29,19.8-.29ZM50,1c-13.31,0-15,.06-20.21.29A35.7,35.7,0,0,0,17.93,3.57,23.74,23.74,0,0,0,9.24,9.24a23.92,23.92,0,0,0-5.67,8.67A35.81,35.81,0,0,0,1.29,29.8C1.06,35,1,36.71,1,50s.06,15,.29,20.2A35.7,35.7,0,0,0,3.57,82.1a23.91,23.91,0,0,0,5.67,8.69,23.88,23.88,0,0,0,8.67,5.64A35.81,35.81,0,0,0,29.8,98.71C35,98.94,36.7,99,50,99s15-.06,20.2-.29a35.77,35.77,0,0,0,11.9-2.28A25,25,0,0,0,96.43,82.11a35.8,35.8,0,0,0,2.28-11.88C98.94,65,99,63.33,99,50s-.06-15-.29-20.2a35.7,35.7,0,0,0-2.28-11.89,23,23,0,0,0-5.61-8.71,24,24,0,0,0-8.67-5.64,35.93,35.93,0,0,0-11.9-2.28C65,1.06,63.34,1,50,1Z"
          transform="translate(-1 -1)"
          fill="white"
        />
        <path
          className={styles.path}
          d="M50,24.84A25.18,25.18,0,1,0,75.21,50,25.19,25.19,0,0,0,50,24.84Zm0,41.5A16.33,16.33,0,1,1,66.36,50,16.34,16.34,0,0,1,50,66.34Z"
          transform="translate(-1 -1)"
          fill="white"
        />
        <path
          className={styles.path}
          d="M82.09,23.84A5.89,5.89,0,1,1,76.21,18,5.88,5.88,0,0,1,82.09,23.84Z"
          transform="translate(-1 -1)"
          fill="#2a094e"
        />
      </g>
    </svg>
  </a>
)

const SpotifyLogo = ({ invert }) => (
  <a
    href="https://open.spotify.com/artist/4vPqYPVLwUrooOL3Pylp8Q?si=sEYZtx8dQxCJlltzRQh5lw"
    className={`${styles.icon} ${invert}`}
    aria-label="Open Spotify"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="0"
      height="0"
      viewBox="0 0 98 98"
      role="presentation"
      focusable="false"
    >
      <path
        className={styles.path}
        d="M50,1A49,49,0,1,0,99,50,49.14,49.14,0,0,0,50,1ZM72.55,71.8a2.92,2.92,0,0,1-4.17,1c-11.53-7.1-26-8.58-43.13-4.65a3,3,0,0,1-1.47-5.88c18.62-4.17,34.8-2.45,47.53,5.4a2.92,2.92,0,0,1,1.24,4.15Zm5.87-13.47c-1.22,1.72-3.42,2.45-5.14,1.22C60.05,51.48,40,49,24.52,53.93a3.72,3.72,0,0,1-2.2-7.11c17.88-5.39,39.93-2.69,55.13,6.63a3.45,3.45,0,0,1,1,4.88ZM78.9,44.6C63.23,35.3,37,34.3,22.05,39a4.49,4.49,0,0,1-2.68-8.57c17.4-5.15,46.06-4.18,64.2,6.62a4.75,4.75,0,0,1,1.73,6.37,5.2,5.2,0,0,1-6.4,1.21Z"
        transform="translate(-1 -1)"
        fill="white"
      />
    </svg>
  </a>
)

const MenuButton = ({ menuOpen, invert }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 98.98 98.98"
    width="0"
    height="0"
    role="presentation"
    focuable="false"
    className={`${styles.menuToggleBtn} ${menuOpen ? styles.menuOpen : ""} ${
      invert ? styles.invert : ""
    }`}
  >
    <circle
      cx="49.49"
      cy="49.49"
      r="49"
      fill="#fff"
      stroke="#231f20"
      strokeMiterlimit="10"
      strokeWidth=".98"
    />
    <line
      x1="11.99"
      y1="49.49"
      x2="86.99"
      y2="49.49"
      fill="none"
      stroke="black"
      strokeMiterlimit="10"
      strokeWidth="3.07"
    />
    <line
      x1="49.49"
      y1="86.99"
      x2="49.49"
      y2="11.99"
      fill="none"
      stroke="black"
      strokeMiterlimit="10"
      strokeWidth="3.07"
    />
  </svg>
)

const DefferedFooterContent = ({ menuOpen, invert, toggleMenu }) => {
  const invertedClass = invert ? styles.invert : ""

  return (
    <>
      <div className={styles.linksContainer}>
        <YoutubeLogo invert={invertedClass} />
        <InstaLogo invert={invertedClass} />
        <AppleLogo invert={invertedClass} />
        <SpotifyLogo invert={invertedClass} />
      </div>

      <button
        onClick={toggleMenu}
        className={`${styles.menuToggleWrapper} ${invertedClass} `}
        aria-label="Toggle Menu"
        aria-haspopup="true"
        aria-expanded={menuOpen}
      >
        <MenuButton invert={invert} menuOpen={menuOpen} />
      </button>

      <div className={`${styles.contactForm} ${invertedClass}`}>
        <ContactForm invert={invert} />
      </div>
    </>
  )
}

DefferedFooterContent.propTypes = {
  menuOpen: PropTypes.bool.isRequired,
  invert: PropTypes.bool.isRequired,
  toggleMenu: PropTypes.func.isRequired,
}

export default DefferedFooterContent
