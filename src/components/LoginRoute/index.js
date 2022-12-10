import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onEnterUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  renderUsername = () => {
    const {username} = this.state

    return (
      <>
        <label className="LabelEl" htmlFor="userName">
          USERNAME
        </label>
        <input
          className="UserInput"
          type="text"
          id="userName"
          placeholder="Username"
          value={username}
          onChange={this.onEnterUsername}
        />
      </>
    )
  }

  renderPassword = () => {
    const {password} = this.state

    return (
      <>
        <label className="LabelEl" htmlFor="password">
          PASSWORD
        </label>
        <input
          className="UserInput"
          type="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={this.onChangePassword}
        />
      </>
    )
  }

  render() {
    const {showSubmitError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="LoginFormContainer">
        <img
          className="BannerImage"
          src="https://res.cloudinary.com/dba1mklgz/image/upload/v1649148381/InstaShare/login-page-image_ven9fs.png"
          alt="website login"
        />
        <div className="FormContainer">
          <img
            className="Logo"
            src="https://res.cloudinary.com/dba1mklgz/image/upload/v1649167181/InstaShare/login-page-logo-image_rymcms.png"
            alt="website logo"
          />
          <h1 className="LogoHeading">Insta Share</h1>
          <form className="Form" onSubmit={this.onSubmitForm}>
            <div className="InputContainer">{this.renderUsername()}</div>
            <div className="InputContainer">{this.renderPassword()}</div>
            {showSubmitError && (
              <span className="ErrorMessage">{errorMsg}</span>
            )}
            <button className="LoginButton" type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default LoginForm
