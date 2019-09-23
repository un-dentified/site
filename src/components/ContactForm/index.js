/* eslint-disable array-callback-return */
import React, { Component, createRef } from "react"
import Form from "./form"
import PropTypes from "prop-types"
import styles from "./style.module.scss"
import { TimelineLite, Power0 } from "gsap"

export default class Contact extends Component {
  static propTypes = {
    invert: PropTypes.bool,
  }

  static defaultProps = {
    invert: false,
  }

  textRef = createRef()
  wrapperRef = createRef()
  btnRef = createRef()
  formRef = createRef()

  state = {
    formOpen: false,
  }

  toggleForm = () => {
    this.setState(prevState => ({
      formOpen: !prevState.formOpen,
    }))
  }

  getSnapshotBeforeUpdate(_, prevState) {
    if (prevState.formOpen !== this.state.formOpen) {
      return [
        this.wrapperRef.current.getBoundingClientRect(),
        this.textRef.current.getBoundingClientRect(),
      ]
    }
    return null
  }

  componentDidUpdate(_, prevState, snapshot) {
    if (snapshot && prevState.formOpen !== this.state.formOpen) {
      const master = new TimelineLite()
      master.addLabel("start")
      const current = [this.wrapperRef.current, this.textRef.current]

      if (!this.state.formOpen) {
        this.btnRef.current.focus()
      }

      if (this.state.formOpen) {
        const tl = new TimelineLite()

        tl.to(
          this.formRef.current,
          0.5,
          {
            opacity: 1,
          },
          "start+=0.3"
        )
        master.add(tl)
      } else {
        const tl = new TimelineLite()

        tl.to(
          this.formRef.current,
          0.5,
          {
            opacity: 0,
          },
          "start"
        )
        master.add(tl)
      }

      current.map((el, index) => {
        const elRect = el.getBoundingClientRect()

        const scaleX = snapshot[index].width / elRect.width
        const scaleY = snapshot[index].height / elRect.height
        const translateX = snapshot[index].left - elRect.left
        const translateY = snapshot[index].top - elRect.top

        const tl = new TimelineLite()

        tl.fromTo(
          el,
          0.5,
          {
            scaleX,
            scaleY,
            x: translateX,
            y: translateY,
          },
          {
            x: 0,
            y: 0,
            scaleX: 1,
            scaleY: 1,
            ease: Power0.easeOut,
          }
        )

        master.add(tl, "start")
      })
    }
  }

  render() {
    const { invert } = this.props
    const invertClass = invert ? styles.invert : ""
    const formOpenClass = this.state.formOpen ? `${styles.formOpen}` : ""

    return (
      <>
        <button
          style={{ background: "transparent", border: "none" }}
          tabIndex={0}
          ref={this.btnRef}
          className={`${styles.button} ${formOpenClass} ${invertClass}`}
          onClick={this.toggleForm}
          type="button"
          aria-label="click to open contact form"
          data-testid="button"
          data-cy="formToggle"
        >
          <span
            ref={this.textRef}
            className={`${styles.btnText} ${invertClass} ${formOpenClass}`}
          >
            Contact
          </span>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`${styles.btnIcon} ${formOpenClass} 
            ${invertClass}`}
            role="presentation"
            aria-describedby="btndesc"
            width="0"
            height="0"
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
                className={`${styles.circ}`}
                strokeMiterlimit="10"
                strokeWidth="4"
              />
              <line
                x1="48.83"
                y1="96.83"
                x2="48.83"
                y2="0.83"
                fill="none"
                stroke="white"
                strokeMiterlimit="10"
                strokeWidth="4"
                className={`${styles.line}`}
              />
              <line
                x1="0.85"
                y1="47.73"
                x2="96.7"
                y2="47.73"
                fill="none"
                stroke="white"
                strokeMiterlimit="10"
                strokeWidth="4"
                className={`${styles.line} ${invertClass}`}
              />
            </g>
          </svg>
        </button>

        <div
          ref={this.wrapperRef}
          className={`${styles.formWrapper} ${invertClass} ${formOpenClass} `}
        />
        <div ref={this.formRef} className={`${styles.form} ${formOpenClass}`}>
          {this.state.formOpen && (
            <Form
              data-testid="form"
              invert={invert}
              toggleForm={this.toggleForm}
            />
          )}
        </div>
      </>
    )
  }
}
