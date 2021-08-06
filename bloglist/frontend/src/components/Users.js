import React from 'react'
import { StyledLink } from '../styles'

const Users = ({ users }) => {
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
                <td>
                  <StyledLink to={`/users/${user.id}`}>
                    {user.username}
                  </StyledLink>
                </td>
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
