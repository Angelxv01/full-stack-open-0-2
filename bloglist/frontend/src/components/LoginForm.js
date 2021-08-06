import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { StyledButton, Grid, StyledInput } from '../styles'

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const login = (e) => {
    e.preventDefault()
    handleLogin({ username, password })
    setUsername('')
    setPassword('')
  }
  return (
    <div>
      <Grid></Grid>
      <Grid>
        <StyledInput>
          username
          <input
            id="username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </StyledInput>
        <StyledInput>
          password
          <input
            id="password"
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </StyledInput>
      </Grid>
      <StyledButton onClick={login}>login</StyledButton>
    </div>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired
}

export default LoginForm
