import axios from 'axios'

const baseUrl = '/api/blogs'

let token = null

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const create = async (newObj) => {
  const config = {
    headers: { Authorization: token }
  }

  const res = await axios.post(baseUrl, newObj, config)
  return res.data
}

const update = async (id, newObj) => {
  const res = await axios.put(`${baseUrl}/${id}`, newObj)
  return res.data
}

const remove = async (id) => {
  const config = { headers: { Authorization: token } }
  const res = await axios.delete(`${baseUrl}/${id}`, config)
  return res.data
}

export default { getAll, setToken, create, update, remove }
