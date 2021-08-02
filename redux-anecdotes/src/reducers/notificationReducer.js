const reducer = (state = null, action) => {
  console.log('state now: ', state)
  console.log('action: ', action)

  switch (action.type) {
    case 'SET':
      return action.body.message
    case 'RESET':
      return null
    default:
      return state
  }
}

export const setNotification = (message) => ({
  type: 'SET',
  body: { message }
})

export const resetNotification = () => ({ type: 'RESET' })

export default reducer
