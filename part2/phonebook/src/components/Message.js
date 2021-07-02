import React from 'react'
const Message = ({ message }) => {
  if (message === null) return null
  return (
    <div className="message">
      <p>{message}</p>
    </div>
  )
}

export default Message
