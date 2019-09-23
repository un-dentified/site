/* eslint-disable jsx-a11y/media-has-caption */ // dont have access to captions
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */ // progress bar needs to be interactive for a11y in this case
import React, { Component, createRef } from "react"
import Img from "gatsby-image"
import PropTypes from "prop-types"
import styles from "./style.module.scss"

export default class AudioPreview extends Component {
  static propTypes = {
    playing: PropTypes.string.isRequired,
    setPlaying: PropTypes.func.isRequired,
    Apple: PropTypes.string.isRequired,
    Spotify: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    preview: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    cover: PropTypes.shape({
      childImageSharp: PropTypes.shape({
        fluid: PropTypes.shape({
          aspectRatio: PropTypes.number.isRequired,
          src: PropTypes.string.isRequired,
          srcSet: PropTypes.string.isRequired,
          sizes: PropTypes.string.isRequired,
        }),
      }),
    }),
  }

  playerRef = createRef()
  progressBarRef = createRef()

  state = {
    progress: 0,
    playable: false,
  }

  componentDidMount() {
    const player = this.playerRef.current

    player.addEventListener("canplay", this.handleCanPlay)
    player.addEventListener("timeupdate", this.updateTime)
    player.addEventListener("ended", this.handleEnd)
  }

  componentWillUnmount() {
    const player = this.playerRef.current

    player.removeEventListener("canplay", this.handleCanPlay)
    player.removeEventListener("timeupdate", this.updateTime)
    player.removeEventListener("ended", this.handleEnd)
  }

  updateTime = () => {
    const player = this.playerRef.current

    this.setState({
      progress: (player.currentTime / player.duration) * 100,
    })
  }

  componentDidUpdate(prevProps) {
    if (this.props.playing !== prevProps.playing) {
      if (this.props.playing === this.props.id) {
        this.playerRef.current.play()
      } else if (prevProps.playing === this.props.id) {
        this.playerRef.current.pause()
      }
    }
  }

  pause = () => {
    this.props.setPlaying()
  }

  play = () => {
    this.props.setPlaying(this.props.id)
  }

  handleCanPlay = () => {
    this.setState({
      playable: true,
    })
  }

  handleEnd = () => {
    this.props.setPlaying()
  }

  handleKeyboardSeek = e => {
    const { currentTime } = this.playerRef.current

    switch (e.keyCode) {
      case 37:
        if (currentTime < 5) {
          this.playerRef.current.currentTime = 0
        } else {
          this.playerRef.current.currentTime -= 5
        }
        break

      case 39:
        if (currentTime > 25) {
          this.playerRef.current.currentTime = this.playerRef.current.duration
        } else {
          this.playerRef.current.currentTime += 5
        }

        break

      default:
        break
    }
  }

  handleSeek = e => {
    const clickPosition = (e.pageX - e.target.offsetLeft) / e.target.offsetWidth

    const clickTime = this.playerRef.current.duration
      ? clickPosition * this.playerRef.current.duration
      : 0

    this.playerRef.current.currentTime = clickTime
  }

  render() {
    const { fluid } = this.props.cover.childImageSharp
    const { title, Apple, Spotify, index } = this.props

    return (
      <>
        <audio
          ref={this.playerRef}
          src={this.props.preview}
          data-testid="audioPlayer"
          data-cy={`playerAudio${index}`}
        />
        <div className={styles.playerContainer}>
          <div className={styles.player}>
            <h3 className={styles.title}>{title}</h3>
            {this.props.playing === this.props.id ? (
              <button
                aria-label="pause track"
                className={styles.toggle}
                onClick={this.pause}
                data-testid="pauseBtn"
                data-cy={`pauseBtn${index}`}
                tabIndex={0}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 99 99">
                  <circle
                    cx="49.5"
                    cy="49.5"
                    r="49"
                    fill="none"
                    stroke="#231f20"
                    strokeMiterlimit="10"
                  />
                  <rect
                    x="25.41"
                    y="24.5"
                    width="15"
                    height="50"
                    fill="#fff"
                    stroke="#231f20"
                    className={styles.toggleElement}
                    strokeMiterlimit="10"
                    strokeWidth="0.98"
                  />
                  <rect
                    x="58.59"
                    y="24.5"
                    width="15"
                    height="50"
                    className={styles.toggleElement}
                    fill="#fff"
                    stroke="#231f20"
                    strokeMiterlimit="10"
                    strokeWidth="0.98"
                  />
                </svg>
              </button>
            ) : (
              <button
                className={styles.toggle}
                onClick={this.play}
                disabled={!this.state.playable}
                data-testid="playBtn"
                aria-label="play track"
                data-cy={`playBtn${index}`}
                tabIndex={0}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 99.57 99.57"
                  focusable={false}
                  role="presentation"
                >
                  <circle
                    cx="49.79"
                    cy="49.79"
                    r="49"
                    fill="none"
                    stroke="#231f20"
                    strokeMiterlimit="10"
                    strokeWidth="3.57"
                  />
                  <polygon
                    points="79.79 49.79 29.79 74.79 29.79 24.79 79.79 49.79"
                    fill="#fff"
                    className={styles.toggleElement}
                    stroke="#231f20"
                    strokeMiterlimit="10"
                    strokeWidth="1.35"
                  />
                </svg>
              </button>
            )}
            <progress
              tabIndex={0}
              className={styles.progress}
              ref={this.progressBarRef}
              onClick={this.handleSeek}
              onKeyDown={this.handleKeyboardSeek}
              value={`${this.state.progress}`}
              aria-valuenow={this.state.progress}
              aria-valuemin="0"
              aria-valuemax="100"
              max="100"
              data-testid="audioProgress"
              data-cy={`progress${index}`}
            />
            <div className={styles.links}>
              <a
                data-testid="spotifyLink"
                aria-label="Hear full song on Spotify"
                href={Spotify}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={styles.icon}
                  viewBox="0 0 98 98"
                  role="presentation"
                  foxusable="false"
                >
                  <path
                    className={styles.path}
                    d="M50,1A49,49,0,1,0,99,50,49.14,49.14,0,0,0,50,1ZM72.55,71.8a2.92,2.92,0,0,1-4.17,1c-11.53-7.1-26-8.58-43.13-4.65a3,3,0,0,1-1.47-5.88c18.62-4.17,34.8-2.45,47.53,5.4a2.92,2.92,0,0,1,1.24,4.15Zm5.87-13.47c-1.22,1.72-3.42,2.45-5.14,1.22C60.05,51.48,40,49,24.52,53.93a3.72,3.72,0,0,1-2.2-7.11c17.88-5.39,39.93-2.69,55.13,6.63a3.45,3.45,0,0,1,1,4.88ZM78.9,44.6C63.23,35.3,37,34.3,22.05,39a4.49,4.49,0,0,1-2.68-8.57c17.4-5.15,46.06-4.18,64.2,6.62a4.75,4.75,0,0,1,1.73,6.37,5.2,5.2,0,0,1-6.4,1.21Z"
                    transform="translate(-1 -1)"
                    fill="white"
                  />
                </svg>
              </a>
              <a
                data-testid="appleMusicLink"
                aria-label="Hear full song on Aplpe Music"
                href={Apple}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={styles.icon}
                  viewBox="0 0 98 98"
                  role="presentation"
                  focuable="false"
                >
                  <path
                    className={styles.path}
                    d="M82.85,53.07c-.15-12.41,12.43-18.36,13-18.66-7.07-8.42-18.08-9.57-22-9.71-9.38-.77-18.29,4.49-23.05,4.49s-12.08-4.38-19.86-4.26C20.72,25.05,11.3,29.77,6,37.22c-10.61,15-2.72,37.21,7.63,49.37,5,6,11.08,12.64,19,12.4,7.62-.24,10.51-4,19.72-4s11.8,4,19.87,3.89,13.39-6.07,18.42-12A50.12,50.12,0,0,0,99,72.9C98.82,72.83,83,67.9,82.85,53.07ZM67.7,16.65C71.9,12.5,74.73,6.74,74,1A29.48,29.48,0,0,0,56.23,8.42c-3.89,3.67-7.3,9.53-6.39,15.16C56.6,24,63.49,20.79,67.7,16.65Z"
                    transform="translate(-1 -1)"
                    fill="white"
                  />
                </svg>
              </a>
            </div>
          </div>
          <Img
            data-testid="previewImage"
            className={styles.playerImg}
            fluid={fluid}
          />
        </div>
      </>
    )
  }
}
