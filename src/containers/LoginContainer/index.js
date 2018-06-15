import React, { Component } from 'react';
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Button from '../../components/Button/'
import style from './Login.css'
import { logInRequest, updateUsername, updatePassword } from '../../redux/actions/login'

const ENTER_KEY_CODE = 13

class LoginContainer extends Component {
  static propTypes = {
    logInRequest: PropTypes.func,
    isLoading: PropTypes.bool,
    isLoginError: PropTypes.bool,
    username: PropTypes.string,
    password: PropTypes.string
  }

  constructor(props) {
    super(props)
    this.state = {
      isSubmitted: false // used for input validation
    }
  }

  // Typing into the input field triggers actions that update the 
  // username and password values in the redux store.
  handleInputChange = e => {
    const { name, value } = e.target
    if (name === 'username') {
      this.props.updateUsername(value)
    } else if (name === 'password') {
      this.props.updatePassword(value)
    }
  }

  // Pressing Enter/Return while on an input field sumbits login info
  handleKeyPress = e => {
    const { charCode } = e
    if (charCode && charCode === ENTER_KEY_CODE) {
      this.handleSubmit()
    }
  }

  // on submit, change isSubmitted to true for validation checks
  // and triggers the login request action with username and password from redux store
  handleSubmit = () => {
    const { username, password } = this.props
    this.setState({
      isSubmitted: true
    })
    if (username && password) {
      this.props.logInRequest(username, password)
    }
  }

  render() {
    const { logInRequest, isLoading, isLoginError, username, password } = this.props
    const { isSubmitted } = this.state
    return (
        <div className={ style.Login }>
          <h3>Login Page</h3>
          <div className={ classNames(style.InputField) }>
            <label htmlFor="username" className={ classNames(style.FloatingLabel, { [style.isActive]: username || '' }) }>Username</label>
            <input
              id= "username"
              type="text"
              name="username"
              value={ username }
              onChange={ this.handleInputChange }
              placeholder="Username"
              onKeyPress={ this.handleKeyPress }
            />
            { isSubmitted && !username ? <div className={ classNames(style.ErrorText) }>* Username is required.</div> : null }
          </div>
          <div className={ style.InputField }>
            <label htmlFor="password" className={ classNames(style.FloatingLabel, { [style.isActive]: password || '' }) }>Password</label>
            <input
              type="password"
              name="password"
              value={ password }
              onChange={ this.handleInputChange }
              placeholder="Password"
              onKeyPress={ this.handleKeyPress }
            />
            { isSubmitted && !password ? <div className={ classNames(style.ErrorText) }>* Password is required.</div> : null }
          </div>
          <div className={ style.SubmitSection }>
            <div className={ classNames(style.HintText) }>Hint - username: rick & password: morty</div>
            <Button
              onClickHandler={ this.handleSubmit }
              buttonText={ isLoading ? 'Authenticating ...' : 'Log In' }
            />
            { isSubmitted && isLoginError ? <div className={ classNames(style.ErrorText) }>Login Failed. Please check login details and retry.</div> : null }
          </div>
        </div>
      )
    }
  }

const mapStateToProps = state => ({
  isLoginError: state.login.get('isError'),
  isLoading: state.login.get('isLoading'),
  username: state.login.get('username'),
  password: state.login.get('password')
})

const mapDispatchToProps = {
  logInRequest: logInRequest,
  updateUsername: updateUsername,
  updatePassword: updatePassword
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer)
