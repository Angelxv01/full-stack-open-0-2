import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'
const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

const create = async (anecdote) => {
  const res = await axios.post(baseUrl, anecdote)
  return res.data
}

const like = async (id, newAnecdote) => {
  const res = await axios.put(`${baseUrl}/${id}`, newAnecdote)
  return res.data
}

export default { getAll, create, like }
