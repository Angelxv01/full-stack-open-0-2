const reducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data
    case 'RESET_NOTIFICATION':
      return null
    default:
      return state
  }
}

export const setNotification = (text, seconds, time) => {
  return (dispatch) => {
    clearTimeout(time)
    dispatch({
      type: 'SET_NOTIFICATION',
      data: text
    })

    return setTimeout(
      () => dispatch({ type: 'RESET_NOTIFICATION' }),
      seconds * 1000
    )
  }
}

export const resetNotification = () => {
  return (dispatch) => dispatch({ type: 'RESET_NOTIFICATION' })
}

export default reducer
