import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logUserOut } from '../../redux/actions/login'
import Button from '../../components/Button/'
import style from './Greeting.css'

// Show username from store and logout button to go to log user out
const GreetingContainer = ({ logUserOut, username }) => {
  return(
  <div className={ style.Greeting }>
    <h1>Greetings, { username }.</h1>
    <div className={ style.SubmitSection }>
      <div className={ style.LogoutHintText }>Logout to see login page.</div>
      <Button onClickHandler={ logUserOut } buttonText={ 'Logout' } />
      <div className={ style.LogoutHintText }>
        PS: If you try to go back using browser navigation, you will be redirected here as you are already logged in.
      </div>
    </div>
  </div>
)}

const mapStateToProps = state => ({
  username: state.login.get('username')
})

const mapDispatchToProps = {
  logUserOut: logUserOut
}

GreetingContainer.propTypes = {
  username: PropTypes.string,
  logUserOut: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(GreetingContainer)