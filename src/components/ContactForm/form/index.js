import React, { Component, createRef } from "react"
import FormLogic from "./formLogic"
import styles from "./style.module.scss"

export default class Form extends Component {
  firstInputRef = createRef()
  lastInputRef = createRef()

  componentDidMount() {
    window.addEventListener("keydown", this.focusTrap)
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.focusTrap)
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
    if (values["name"].length <= 0) {
      return "Name can't be empty"
    }
    return null
  }

  emailValidator = values => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
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

  submitFn = values => {
    const url = "/.netlify/functions/sendmail"

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
      .then(response => response.json())
      .then(re => {
        console.log(re)
      })
      .catch(e => {
        console.log(e)
      })
  }

  render() {
    const { invert } = this.props

    const invertClass = invert ? `${styles["invert"]}` : ""

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
        }) => {
          return (
            <form onSubmit={handleSubmit} className={styles.formContainer}>
              <div
                className={`${styles.field} ${invertClass} ${
                  visited["name"] ? styles.visited : ""
                } ${errors["name"] && touched["name"] ? styles.error : ""}`}
              >
                <label className={styles.label}>Name:</label>
                <input
                  onFocus={setVisited}
                  onBlur={setDirty}
                  value={values["name"]}
                  type="text"
                  onChange={handleChange}
                  ref={this.firstInputRef}
                  name="name"
                  className={styles.input}
                  placeholder="Name"
                />
                {touched["name"] && (
                  <p className={`${styles.error} ${styles.errorMsg}`}>
                    {errors["name"]}
                  </p>
                )}
              </div>

              <div
                className={`${styles.field} ${invertClass}  ${
                  visited["email"] ? styles.visited : ""
                }  ${errors["email"] && touched["email"] ? styles.error : ""}`}
              >
                <label className={styles.label}>Email</label>
                <input
                  onFocus={setVisited}
                  onBlur={setDirty}
                  type="email"
                  value={values["email"]}
                  onChange={handleChange}
                  name="email"
                  className={styles.input}
                  placeholder="Email"
                />
                {touched["email"] && (
                  <p className={`${styles.error} ${styles.errorMsg}`}>
                    {errors["email"]}
                  </p>
                )}
              </div>

              <div
                className={`${styles.field} ${invertClass} ${
                  visited["subject"] ? styles.visited : ""
                }  ${
                  errors["subject"] && touched["subject"] ? styles.error : ""
                }`}
              >
                <label className={styles.label}>Name:</label>
                <input
                  onFocus={setVisited}
                  onBlur={setDirty}
                  onChange={handleChange}
                  type="text"
                  value={values["subject"]}
                  name="subject"
                  className={styles.input}
                  placeholder="Subject"
                />
                {touched["subject"] && (
                  <p className={`${styles.error} ${styles.errorMsg}`}>
                    {errors["subject"]}
                  </p>
                )}
              </div>
              <div
                className={`${styles.field} ${invertClass} ${
                  visited["message"] ? styles.visited : ""
                }  ${
                  errors["message"] && touched["message"] ? styles.error : ""
                }`}
              >
                <label className={styles.label}>Message</label>
                <textarea
                  onFocus={setVisited}
                  onBlur={setDirty}
                  onChange={handleChange}
                  className={styles.textArea}
                  value={values["message"]}
                  ref={this.lastInputRef}
                  name="message"
                  placholder="message"
                />
                {touched["message"] && (
                  <p className={`${styles.error} ${styles.errorMsg}`}>
                    {errors["message"]}
                  </p>
                )}
              </div>
              <button className={styles.submit} type="submit">
                Click to submiut
              </button>
            </form>
          )
        }}
      </FormLogic>
    )
  }
}
