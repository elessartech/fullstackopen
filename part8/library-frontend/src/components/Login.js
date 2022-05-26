import React, {useState, useEffect} from "react"
import { gql, useMutation } from '@apollo/client'

const Login = ({show, setToken}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const LOGIN = gql`
        mutation login($username: String!, $password: String!) {
            login(username: $username, password: $password)  {
            value
            }
        }
    `
    const [ login, result ] = useMutation(LOGIN)
    
      useEffect(() => {
        if ( result.data ) {
          const token = result.data.login.value
          setToken(token)
          localStorage.setItem('userToken', token)
        }
      }, [result.data]) // eslint-disable-line

    const submit = async (event) => {
        event.preventDefault()
        login({ variables: { username, password } })
    }
    
    if (!show) {
        return null
    }
    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={submit}>
                <div>
                username <input
                    value={username}
                    onChange={({ target }) => setUsername(target.value)}
                />
                </div>
                <div>
                password <input
                    type='password'
                    value={password}
                    onChange={({ target }) => setPassword(target.value)}
                />
                </div>
                <button type='submit'>login</button>
            </form>
        </div>
      )
}

export default Login