import React, { useState, useEffect } from 'react'

import userService from '../services/user'

const Users = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    userService.getAll().then((res) => setUsers(res))
  }, [])

  console.log(users)
  return (
    <div>
      <h1>Users</h1>
      <table>
        <tbody>
          <tr>
            <td></td>
            <td>blogs created</td>
          </tr>
          {users.map((user) => {
            return (
              <tr key={user.id}>
                <td>{user.username}</td>
                <td>{user.blogs.length}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Users
