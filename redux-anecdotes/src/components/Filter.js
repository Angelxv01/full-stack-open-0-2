import React from 'react'
import { connect } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const Filter = (props) => {
  const handleChange = (e) => {
    const value = e.target.value
    props.setFilter(value)
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} name="filter" />
    </div>
  )
}

export default connect(null, { setFilter })(Filter)
