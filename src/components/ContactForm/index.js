import React, { Component, createRef } from "react"
import styles from "./style.module.scss"

export default class Contact extends Component {
  textRef = createRef()
  btnRef = createRef()
  wrapperRef = createRef()

  state = {
    name: "",
    email: "",
    subject: "",
    message: "",
    formOpen: false,
  }

  toggleForm = () => {
    this.setState(prevState => ({
      formOpen: !prevState.formOpen,
    }))
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    if (prevState.formOpen !== this.state.formOpen) {
      return [
        this.wrapperRef.current.getBoundingClientRect(),
        this.textRef.current.getBoundingClientRect(),
        this.btnRef.current.getBoundingClientRect(),
      ]
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (snapshot && prevState.formOpen !== this.state.formOpen) {
      let current = [
        this.wrapperRef.current,
        this.textRef.current,
        this.btnRef.current,
      ]

      current.map((el, index) => {
        const elRect = el.getBoundingClientRect()

        const scaleX = snapshot[index].width / elRect.width
        const scaleY = snapshot[index].height / elRect.height
        const translateX = snapshot[index].left - elRect.left
        const translateY = snapshot[index].top - elRect.top

        el.style.transition = ""
        el.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scaleX},${scaleY})`
      })

      requestAnimationFrame(() => {
        current.map(el => {
          el.style.transition = "all 2s"
          el.style.transform = ""
        })
      })
    }
  }

  render() {
    const { invert } = this.props
    const invertClass = invert ? styles["invert"] : ""
    const formOpenClass = this.state.formOpen ? `${styles.formOpen}` : ""

    return (
      <div className={styles.wrapper}>
        <button
          className={`${styles.button} ${invertClass}`}
          onClick={this.toggleForm}
          type="button"
          aria-label="click to open contact form"
        >
          <span
            ref={this.textRef}
            className={`${styles.btnText} ${invertClass} ${formOpenClass}`}
          >
            Contact
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`${styles.btnIcon} ${formOpenClass}`}
            role="presentation"
            ref={this.btnRef}
            aria-describedby="btndesc"
            viewBox="0 0 97.67 97.67"
          >
            <desc id="btndesc">Click to open the contact form</desc>
            <g>
              <circle
                cx="48.83"
                cy="48.83"
                r="48"
                fill="none"
                stroke="white"
                className={`${styles.circ} ${invertClass}`}
                stroke-miterlimit="10"
                stroke-width="4"
              />
              <line
                x1="48.83"
                y1="96.83"
                x2="48.83"
                y2="0.83"
                fill="none"
                stroke="white"
                stroke-miterlimit="10"
                stroke-width="4"
                className={`${styles.line} ${invertClass}`}
              />
              <line
                x1="0.85"
                y1="47.73"
                x2="96.7"
                y2="47.73"
                fill="none"
                stroke="white"
                stroke-miterlimit="10"
                stroke-width="4"
                className={`${styles.line} ${invertClass}`}
              />
            </g>
          </svg>
        </button>

        <div
          ref={this.wrapperRef}
          className={`${styles.formWrapper} ${styles.invertClass} ${formOpenClass}`}
        >
          <form className={styles.form}></form>
        </div>
      </div>
    )
  }
}
