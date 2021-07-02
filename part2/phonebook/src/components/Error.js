import React from 'react'

const Error = ({message}) => {
  if (message === null) return null
  return (
    <div className="error">
      <p>{message}</p>
    </div>
  )
}

export default Error
