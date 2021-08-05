import React from 'react'
import { Link } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'
import { resetNotification } from '../reducers/notificationReducer'
import { logoutUser } from '../reducers/userReducer'

const Navigation = () => {
  const dispatch = useDispatch()

  const logout = () => {
    dispatch(resetNotification())
    dispatch(logoutUser())
  }

  const user = useSelector((state) => state.user)
  return (
    <div>
      <Link to="/" style={{ paddingRight: '0.5em' }}>
        home
      </Link>

      <Link to="/users" style={{ paddingRight: '0.5em' }}>
        users
      </Link>
      <span style={{ paddingRight: '0.5em' }}>{user.name} logged in</span>
      <button onClick={logout} style={{ paddingRight: '0.5em' }}>
        log out
      </button>
    </div>
  )
}

export default Navigation
