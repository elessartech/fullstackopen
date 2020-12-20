import React from 'react'

const AnecdoteList = ({anecdotes, onClick}) => {
  return (
    <React.Fragment>
        {anecdotes.sort((el_1, el_2) => el_1.votes - el_2.votes).reverse().map(anecdote =>
            <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => onClick(anecdote.id)}>vote</button>
                </div>
            </div>
        )}
    </React.Fragment>
  )
}

export default AnecdoteList