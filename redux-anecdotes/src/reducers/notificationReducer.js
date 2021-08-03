const reducer = (state = null, action) => {
  console.log('state now: ', state)
  console.log('action: ', action)

  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data
    case 'RESET_NOTIFICATION':
      return null
    default:
      return state
  }
}

export const setNotification = (message, seconds) => {
  return async (dispatch) => {
    dispatch({ type: 'SET_NOTIFICATION', data: message })
    setTimeout(() => {
      dispatch({ type: 'RESET_NOTIFICATION' })
    }, seconds * 1000)
  }
}

export default reducer
