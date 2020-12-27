import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNewAnecdote = async (content) => {
    const object = { content, votes: 0, id: getId() }
    const response = await axios.post(baseUrl, object)
    return response.data
}

const updateVotes = async (id) => {
    const anecdotes = await getAll()
    const object = anecdotes.filter(anecdote => anecdote.id === id)[0]
    object.votes += 1
    const response = await axios.put(baseUrl+ "/" + id, object)
    return response.data
}

export default { getAll, createNewAnecdote, updateVotes }