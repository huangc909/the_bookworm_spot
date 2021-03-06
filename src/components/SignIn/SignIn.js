import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'

import { signIn } from '../../api/auth'
import messages from '../AutoDismissAlert/messages'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class SignIn extends Component {
  constructor () {
    super()

    this.state = {
      email: '',
      password: ''
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onSignIn = event => {
    event.preventDefault()

    const { msgAlert, history, setUser } = this.props

    signIn(this.state)
      .then(res => setUser(res.data))
      .then(() => msgAlert({
        heading: 'Sign In Success',
        message: messages.signInSuccess,
        variant: 'success'
      }))
      .then(() => history.push('/books/'))
      .catch(error => {
        this.setState({ email: '', password: '' })
        msgAlert({
          heading: 'Sign In Failed with error: ' + error.message,
          message: messages.signInFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    const { email, password } = this.state

    return (
      <div className="list-style">
        <div className="row">
          <div className="col-sm-10 col-md-8 mx-auto mt-5">
            <h1>Sign In</h1>
            <Form onSubmit={this.onSignIn}>
              <Form.Group controlId="email">
                <Form.Control
                  required
                  type="email"
                  name="email"
                  value={email}
                  placeholder="Email"
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Control
                  required
                  name="password"
                  value={password}
                  type="password"
                  placeholder="Password"
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Button
                className="button"
                variant="primary"
                type="submit"
              >
                Submit
              </Button>
            </Form>
            <Link to='/sign-up/'>
              <p>{'I don\'t have an account yet'}</p>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(SignIn)
