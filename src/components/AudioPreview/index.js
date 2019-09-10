import React, { Component, createRef } from "react"
import PropTypes from "prop-types"
import styles from "./style.module.scss"

export default class AudioPreview extends Component {
  static defaultProps = {
    trackId: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    playing: PropTypes.string.isRequired,
    setPlaying: PropTypes.func.isRequired,
  }

  playerRef = createRef()
  progressBarRef = createRef()

  state = {
    progress: 0,
    playable: false,
  }

  componentDidMount() {
    const player = this.playerRef.current

    player.addEventListener("durationChange", this.handleDurationChange)
    player.addEventListener("canplay", this.handleCanPlay)
    player.addEventListener("timeupdate", this.updateTime)
    player.addEventListener("ended", this.handleEnd)
  }

  componentWillUnmount() {
    const player = this.playerRef.current

    player.removeEventListener("durationChange", this.handleDurationChange)
    player.removeEventListener("canplay", this.handleCanPlay)
    player.removeEventListener("timeupdate", this.updateTime)
    player.removeEventListener("ended", this.handleEnd)
  }

  updateTime = e => {
    const player = this.playerRef.current

    this.setState({
      progress: (player.currentTime / player.duration) * 100,
    })
  }

  componentDidUpdate(prevProps) {
    if (this.props.playing !== prevProps.playing) {
      if (this.props.playing === this.props.trackId) {
        this.playerRef.current.play()
      } else if (prevProps.playing === this.props.trackId) {
        this.playerRef.current.pause()
      }
    }
  }

  pause = () => {
    this.props.setPlaying()
  }

  play = () => {
    this.props.setPlaying(this.props.trackId)
  }

  handleCanPlay = () => {
    this.setState({
      playable: true,
    })
  }

  handleEnd = e => {
    this.props.setPlaying()
  }

  handleSeek = e => {
    var clickPosition = (e.pageX - e.target.offsetLeft) / e.target.offsetWidth
    var clickTime = clickPosition * this.playerRef.current.duration

    this.playerRef.current.currentTime = clickTime
  }

  render() {
    const playableClass = this.state.playing ? `${styles.playable}` : ""

    return (
      <div>
        <audio ref={this.playerRef} src={this.props.preview} />
        {this.props.playing === this.props.trackId ? (
          <button onClick={this.pause}>Pause</button>
        ) : (
          <button onClick={this.play}>Play</button>
        )}

        <progress
          ref={this.progressBarRef}
          onClick={this.handleSeek}
          value={`${this.state.progress}`}
          max="100"
        />
      </div>
    )
  }
}
