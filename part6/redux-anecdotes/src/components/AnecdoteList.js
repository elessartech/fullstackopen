import React from 'react'
import { useDispatch } from 'react-redux'
import { createNotification } from '../reducers/notificationReducer'
import { voteFor } from "../reducers/anecdoteReducer"

const AnecdoteList = ({anecdotes, filter}) => {
    const dispatch = useDispatch()

    const vote = async (anecdote) => {
        dispatch(voteFor(anecdote.id))
        dispatch(createNotification("you voted for " + anecdote.content))
        setTimeout (() => dispatch(createNotification("")), 5000)
      }

    return (
    <React.Fragment>
        {anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase())).sort((el_1, el_2) => el_1.votes - el_2.votes).reverse().map(anecdote =>
            <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => vote(anecdote)}>vote</button>
                </div>
            </div>
        )}
    </React.Fragment>
  )
}

export default AnecdoteList