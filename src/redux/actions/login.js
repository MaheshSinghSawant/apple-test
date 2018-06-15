import { push } from 'react-router-redux'
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SUCCESS,
  UPDATE_USERNAME,
  UPDATE_PASSWORD
} from '../modules/login'

// thunk to fake authenticate login info
export const logInRequest = (username, password) => {
  return dispatch => {
    // dispatch login request to set loading to true and use setTimeout to mock authentication check
    dispatch({ type: LOGIN_REQUEST })
    setTimeout( () => {
      if (username === 'rick' && password === 'morty') {
        dispatch({ type: LOGIN_SUCCESS })
        // take user to greeting page on success
        dispatch(push('/greeting'))
      } else {
        dispatch({ type: LOGIN_FAILURE })
      }
    }, 750)
  }
}

// log user out and take them to login page
export const logUserOut = () => {
  return dispatch => {
    dispatch({ type: LOGOUT_SUCCESS })
    dispatch(push('/login'))
  }
}

// use the username provided from the inputfield to update the username in the store
export const updateUsername = username => {
  return dispatch => {
    dispatch({
      type: UPDATE_USERNAME,
      payload: { username }
    })
  }
}

// use the password provided from the inputfield to update the password in the store
export const updatePassword = password => {
  return dispatch => {
    dispatch({
      type: UPDATE_PASSWORD,
      payload: { password }
    })
  }
}