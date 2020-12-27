import anecdoteService from "../services/anecdotes"

export const initializeAnecdotes = () => {
  return async dispatch => {
    const initAnecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: initAnecdotes,
    })
  } 
}

export const voteFor = (id) => { 
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.updateVotes(id)
    dispatch({
      type: 'VOTE',
      data: updatedAnecdote
    })
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNewAnecdote(content)
    dispatch({
      type: "ADD",
      data: newAnecdote
    })
  }
}

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      return state.map((anecdote, _) => {
        if(anecdote.id === action.data.id) {
          return {
            ...anecdote,
            votes: anecdote.votes + 1
          }
        }
        return anecdote
      });
    case 'INIT_ANECDOTES':
      return action.data
    case 'ADD':
      return [...state, action.data]
    default: return state
  }
}

export default anecdoteReducer