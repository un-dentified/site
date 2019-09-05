import React, { Component } from "react"
import { error } from "util"

export default class FormLogic extends Component {
  state = Object.keys(this.props.initialValues).reduce(
    (acc, current) => {
      acc.visited[current] = false
      acc.touched[current] = false
      acc.errors[current] = null
      acc.values[current] = this.props.initialValues[current]
      return acc
    },
    {
      visited: {},
      touched: {},
      values: {},
      errors: {},
      submitting: false,
    }
  )

  setVisited = event => {
    event.persist()
    this.setState(prevState => {
      return {
        ...prevState,
        visited: {
          ...prevState.visited,
          [event.target.name]: true,
        },
      }
    })
  }
  setDirty = event => {
    event.persist()
    this.setState(
      prevState => {
        return {
          ...prevState,
          touched: {
            ...prevState.touched,
            [event.target.name]: true,
          },
        }
      },
      () => {
        const { name } = event.target

        if (this.props.validators[`${name}`]) {
          new Promise(res =>
            res(
              this.props.validators[`${name}`](this.state.values, this.setError)
            )
          )
            .then(error => {
              this.setError(name, error)
            })
            .catch(e => {
              console.warn(e.message)
            })
        }
      }
    )
  }

  handleChange = event => {
    event.persist()
    this.setState(
      prevState => {
        if (prevState[event.target.name]) {
          return null
        }

        return {
          ...prevState,
          values: {
            ...prevState.values,
            [event.target.name]: event.target.value,
          },
        }
      },
      () => {
        const { name } = event.target

        if (this.props.validators[`${name}`]) {
          return new Promise(res =>
            res(
              this.props.validators[`${name}`](this.state.values, this.setError)
            )
          )
            .then(error => {
              this.setError(name, error)
            })
            .catch(e => {
              console.warn(e.message)
            })
        }
      }
    )
  }

  setError = (field, error) => {
    this.setState(prevState => {
      return {
        ...prevState,
        errors: {
          ...prevState.errors,
          [field]: error,
        },
      }
    })
  }

  handleSubmit = event => {
    event.preventDefault()

    const errorKeys = Object.keys(this.props.validators)

    this.setState({
      submitting: true,
    })
    Promise.all(
      errorKeys.map(validator => {
        return new Promise(res => {
          res(
            this.props.validators[validator](this.state.values, this.setError)
          )
        })
      })
    ).then(errorArray => {
      const errors = errorKeys.reduce((acc, current, index) => {
        if (!!errorArray[index]) {
          acc[current] = errorArray[index]
        }
        return acc
      }, {})

      this.setState(
        {
          errors,
          touched: errorKeys.reduce((acc, key) => {
            acc[key] = true
            return acc
          }, {}),
        },
        () => {
          console.log(this.state.errors)
          if (Object.keys(this.state.errors).length === 0) {
            this.props.submitFn(this.state.values)
          } else {
            console.warn("clear errors before submitting")
          }
        }
      )
    })
  }

  render() {
    return this.props.children({
      setVisited: this.setVisited,
      setDirty: this.setDirty,
      handleChange: this.handleChange,
      customHandleChange: this.customHandleChange,
      handleSubmit: this.handleSubmit,
      values: this.state.values,
      errors: this.state.errors,
      touched: this.state.touched,
      visited: this.state.visited,
    })
  }
}
