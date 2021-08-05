import loginService from '../services/login'
import blogsService from '../services/blogs'

import { loadState, saveState, removeState } from '../services/localstorage'

const reducer = (state = null, action) => {
  switch (action.type) {
    case 'LOAD_USER':
      return action.data || null
    case 'LOGIN_USER':
      return action.data
    case 'LOGOUT_USER':
      return null
    default:
      return state
  }
}

export const loadUser = () => {
  return (dispatch) => {
    const user = loadState('loggedUser')
    dispatch({ type: 'LOAD_USER', data: user })
  }
}

export const loginUser = (credentials) => {
  return async (dispatch) => {
    const user = await loginService.login(credentials)
    blogsService.setToken(user.token)
    dispatch({ type: 'LOGIN_USER', data: user })
    saveState('loggedUser', user)
  }
}

export const logoutUser = () => {
  return (dispatch) => {
    removeState('loggedUser')
    blogsService.setToken(null)
    dispatch({ type: 'LOGOUT_USER' })
  }
}

export default reducer
