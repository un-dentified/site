import React, { Component, createRef } from "react"
import { TimelineMax } from "gsap"
import FormLogic from "./formLogic"
import styles from "./style.module.scss"

export default class Form extends Component {
  firstInputRef = createRef()
  lastInputRef = createRef()

  componentDidMount() {
    if (typeof window !== undefined) {
      window.addEventListener("keydown", this.focusTrap)
    }
  }

  componentWillUnmount() {
    if (typeof window !== undefined) {
      window.removeEventListener("keydown", this.focusTrap)
    }
  }

  focusTrap = event => {
    if (event.keyCode === 9) {
      if (
        document.activeElement === this.lastInputRef.current &&
        !event.shiftKey
      ) {
        event.preventDefault()
        this.firstInputRef.current.focus()
      }
      if (
        document.activeElement === this.firstInputRef.current &&
        event.shiftKey
      ) {
        event.preventDefault()
        this.lastInputRef.current.focus()
      }
    }
    if (event.keyCode === 27) {
      this.props.toggleForm()
    }
  }

  nameValidator = values => {
    if (values.name.length <= 0) {
      return "Name can't be empty"
    }
    return null
  }

  emailValidator = values => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const valid = re.test(String(values.email).toLowerCase())

    if (!valid) {
      return "Enter a valid email"
    }
    return null
  }

  subjectValidator = values => {
    if (values.subject.length <= 0) {
      return "Subject can't be empty"
    }
    return null
  }

  messageValidator = values => {
    if (values.message.length <= 0) {
      return "Message can't be empty"
    }
    return null
  }

  submitFn = (values, setError) => {
    const url = "/.netlify/functions/sendMail"
    let shoudlstop = false

    const tl = new TimelineMax()

    const yoyo = new TimelineMax()

    yoyo
      .staggerTo(
        `.${styles.movingCircle}`,
        0.5,
        {
          cycle: {
            x: [30, -30],
          },
        },
        0
      )
      .to(`.${styles.movingCircle}`, 0.5, {
        x: 0,
        repeat: -1,
        yoyo: true,
        onRepeat: () => {
          if (shoudlstop) {
            tl.remove(yoyo)
          }
        },
      })

    tl.to(`.${styles.sendBtn}`, 0.5, {
      scale: 0,
      transformOrigin: "50% 50%",
    }).add(yoyo)

    return fetch(url, {
      method: "POST",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrer: "no-referrer",
      body: JSON.stringify(values),
    })
      .then(response => {
        if (response.status === 200) {
          return response.json()
        } else if (response.status === 422) {
          setError("form", "Invalid form data check fields and try agin")
        } else {
          setError("form", "Mail service error try again later")
        }
        return null
      })
      .then(res => {
        shoudlstop = true

        if (res) {
          const last = new TimelineMax()

          last
            .to(`.${styles.check}`, 1, {
              opacity: 1,
            })
            .to(
              `.${styles.field}`,
              1,
              {
                opacity: 1,
              },
              "-=1"
            )
            .addCallback(() => {
              this.props.toggleForm()
            })
        } else {
          tl.reverse()
        }
      })
      .catch(_ => {
        shoudlstop = true
        setError("form", "Mail server unreachable try again later")
        tl.reverse()
      })
  }

  render() {
    const { invert } = this.props

    const invertClass = invert ? `${styles.invert}` : ""

    return (
      <FormLogic
        initialValues={{
          name: "",
          email: "",
          subject: "",
          message: "",
        }}
        validators={{
          name: this.nameValidator,
          email: this.emailValidator,
          subject: this.subjectValidator,
          message: this.messageValidator,
        }}
        submitFn={this.submitFn}
      >
        {({
          setVisited,
          setDirty,
          handleChange,
          handleSubmit,
          values,
          errors,
          touched,
          visited,
        }) => (
          <form
            onSubmit={handleSubmit}
            autoComplete="off"
            className={styles.formContainer}
          >
            {[
              { name: "name", type: "text" },
              { name: "email", type: "email" },
              { name: "subject", type: "text" },
              { name: "message", type: "textarea" },
            ].map((entry, index) => (
              <div
                key={entry.name}
                className={`${styles.field} ${invertClass} ${
                  visited[entry.name] ? styles.visited : ""
                } ${
                  errors[entry.name] && touched[entry.name] ? styles.error : ""
                }`}
              >
                <label autoComplete={false} className={styles.label}>
                  {entry.name}
                </label>
                {entry.type === "textarea" ? (
                  <textarea
                    autoComplete={false}
                    onFocus={setVisited}
                    onBlur={setDirty}
                    value={values[entry.name]}
                    type={entry.type}
                    onChange={handleChange}
                    ref={this.lastInputRef}
                    name={entry.name}
                    className={styles.textarea}
                  />
                ) : (
                  <input
                    onFocus={setVisited}
                    onBlur={setDirty}
                    value={values[entry.name]}
                    type={entry.type}
                    onChange={handleChange}
                    ref={index === 0 ? this.firstInputRef : null}
                    name={entry.name}
                    className={styles.input}
                  />
                )}
                <div className={`${styles.error} ${styles.errorMsg}`}>
                  {touched[entry.name] && <p>{errors[entry.name]}</p>}
                </div>
              </div>
            ))}
            <div className={`${styles.errorMsg} ${styles.formErr}`}>
              <p>{errors.form}</p>
            </div>
            <button
              aria-label="submit form"
              type="submit"
              className={styles.send}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="98"
                height="48"
                viewBox="0 0 98 48"
                role="presentation"
                focusable="false"
              >
                <circle
                  className={`${styles.movingCircle} ${styles.circle} `}
                  cx="49"
                  cy="24"
                  r="15"
                  fill="#2a094e"
                />
                <circle
                  className={`${styles.movingCircle} ${styles.circle} `}
                  cx="49"
                  cy="24"
                  r="15"
                  fill="#2a094e"
                />
                <g className={styles.stationaryCircle}>
                  <circle
                    className={styles.circle}
                    cx="49"
                    cy="24"
                    r="15"
                    fill="#2a094e"
                  />
                  <path
                    className={styles.check}
                    d="M40.17,25.58c.62-.5,1.13-1.1,1.7-1.65.37-.36.75-.72,1.09-1.1.2-.22.32-.19.52,0,1.25,1.21,2.53,2.4,3.79,3.61.22.22.33.2.54,0,2.89-3,5.79-5.94,8.68-8.91.23-.25.35-.26.59,0,.9.93,1.83,1.83,2.75,2.74v.08c-.16,0-.24.18-.34.28q-5.82,5.92-11.63,11.86c-.25.26-.37.28-.64,0q-3.37-3.32-6.78-6.59a3.08,3.08,0,0,0-.27-.24Z"
                    transform="translate(-1 -1)"
                    fill="#fff"
                  />
                </g>
                <g className={styles.sendBtn}>
                  <rect width="98" height="48" rx="12" fill="#2a094e" />
                  <path
                    d="M35.64,21.82V20.24L35.3,20H33.15l-.33.29v3.12l.33.3h4l1.38,1.22v6.4L37.1,32.5H31.38L30,31.28v-3.1h2.82v1.6l.33.29H35.3l.34-.29v-3.4l-.34-.29H31.38L30,24.86V18.72l1.38-1.22H37.1l1.38,1.22v3.1Z"
                    transform="translate(-1 -1)"
                    fill="#f1f2f2"
                  />
                  <path
                    d="M40.28,32.5v-15h8.08v2.43H43.1v3.73H47v2.43H43.1v4h5.26V32.5Z"
                    transform="translate(-1 -1)"
                    fill="#f1f2f2"
                  />
                  <path
                    d="M50,32.5v-15h3l3.66,9.2V17.5h2.82v15h-3l-3.66-9.2v9.2Z"
                    transform="translate(-1 -1)"
                    fill="#f1f2f2"
                  />
                  <path
                    d="M68.62,17.5,70,18.72V31.28L68.62,32.5H61.48v-15ZM66.83,30.05l.31-.29V20.18l-.31-.29H64.32V30.05Z"
                    transform="translate(-1 -1)"
                    fill="#f1f2f2"
                  />
                </g>
              </svg>
            </button>
            <div className={`${styles.confirm} ${invertClass}`} />
          </form>
        )}
      </FormLogic>
    )
  }
}
