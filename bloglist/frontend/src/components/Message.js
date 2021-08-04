import React from 'react'
import PropTypes from 'prop-types'
const Message = ({ message }) => {
  if (message === null) {
    return null
  }

  return <div className={message.type}>{message.message}</div>
}

Message.propTypes = {
  message: PropTypes.object
}

export default Message
