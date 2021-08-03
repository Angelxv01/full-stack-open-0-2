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

export const setNotification = (message) => ({
  type: 'SET_NOTIFICATION',
  data: message
})

export const resetNotification = () => ({ type: 'RESET_NOTIFICATION' })

export default reducer
