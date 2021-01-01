import React from 'react'
import { connect } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { voteFor } from "../reducers/anecdoteReducer"

const AnecdoteList = ({filter, anecdotes, voteFor, setNotification}) => {

    const vote = async (anecdote) => {
        voteFor(anecdote.id)
        setNotification("you voted for " + anecdote.content, 5)
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

const mapStateToProps = (state) => {
    return {
        anecdotes: state.anecdotes,
        filter: state.filter
    }
  }

const mapDispatchToProps = {
    voteFor,
    setNotification
}
  
const ConnectedAnecdoteList = connect(
    mapStateToProps,
    mapDispatchToProps
)(AnecdoteList)

export default ConnectedAnecdoteList