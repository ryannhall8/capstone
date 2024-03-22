import { useState } from 'react'

function Login({ login }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    
    const submit =async (ev) => {
        ev.preventDefault();
        try{
        await login({
            username, password
        });   
        }
        catch(ex){
            setError(ex);
        }
        
    }
    return(
        <form onSubmit={ submit }>
            {error}
        <input
        value={ username } onChange={ ev => setUsername(ev.target.value)}
        placeholder='Username'
        />
        { username }
        <input
        value={ password } type='password' onChange={ ev => setPassword(ev.target.value)}
        placeholder='Password'
        />
        <button type="submit">Login</button>
      </form>
    )
}
export default Login 