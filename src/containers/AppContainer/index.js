import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import { Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { logInRequest, logUserOut } from '../../redux/actions/login'
import LoginContainer from '../LoginContainer/'
import GreetingContainer from '../GreetingContainer/'

import style from './App.css'

// User cannot reach a protected route without being logged in. If they try to, redirect to login.
const ProtectedRoute = ({ component: Component, isUserLoggedIn, ...otherProps }) => {
  return(
    <Route { ...otherProps } render={ (props) => {
      return (
        isUserLoggedIn
        ? <Component { ...props } />
        : <Redirect to="/login" />
      )}
    } />
  )
}

const App = props => {
  return(
    <div className={ style.App }>
      <Switch>
        <Redirect exact from="/" to="/greeting" />
        <ProtectedRoute exact path="/greeting" component={ GreetingContainer } isUserLoggedIn={ props.isUserLoggedIn } />
        { /* If the user is already logged in and tries to go to /login, redirect them instead */ }
        <Route exact path="/login" render={() => (
          props.isUserLoggedIn
            ? <Redirect to="/greeting"/>
            : <LoginContainer />
        )} />
      </Switch>
    </div>
  )
}

const mapStateToProps = state => ({
  isUserLoggedIn: state.login.get('isUserLoggedIn'),
})

App.propTypes = {
  isUserLoggedIn: PropTypes.bool
}

export default withRouter(connect(mapStateToProps)(App))
