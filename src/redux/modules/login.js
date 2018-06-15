import Immutable from 'immutable'

export const LOGIN_REQUEST = '@@login/LOGIN_REQUEST'
export const LOGIN_SUCCESS = '@@login/LOGIN_SUCCESS'
export const LOGIN_FAILURE = '@@login/LOGIN_FAILURE'
export const LOGOUT_SUCCESS = '@@login/LOGOUT_SUCCESS'
export const UPDATE_USERNAME = '@@login/UPDATE_USERNAME'
export const UPDATE_PASSWORD = '@@login/UPDATE_PASSWORD'

const initialState = Immutable.fromJS({
  isUserLoggedIn: false, // depicts if user is logged in or not
  isLoading: false, // used to mock the time required for authentication check
  isError: false, // error on login attempt with wrong username and password
  username: '', // input username
  password: '' // input password
})

// Reducer for the different changes to state on different actions
export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return state
        .set('isLoading', true)
        .set('isError', false)

    case LOGIN_SUCCESS:
      return state
        .set('isUserLoggedIn', true)
        .set('isLoading', false)
        .set('isError', false)
        .set('password', '')

    case LOGIN_FAILURE:
      return state
        .set('isUserLoggedIn', false)
        .set('isLoading', false)
        .set('isError', true)

    case UPDATE_USERNAME:
      return state.set('username', action.payload.username)

    case UPDATE_PASSWORD:
      return state.set('password', action.payload.password)

    case LOGOUT_SUCCESS:
      return state
        .set('isUserLoggedIn', false)
        .set('isLoading', false)
        .set('isError', false)
        .set('username', '')
        .set('password', '')

    default:
      return state;
  }
}
