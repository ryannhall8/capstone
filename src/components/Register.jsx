import { useState } from 'react'

function Register({ register }) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const submit =async (ev) => {
        ev.preventDefault();
        try{
        await register({
            firstName, lastName, username, password
        });   
        }
        catch(ex){
            setError(ex);
        }
        
    }
    return(
        <form onSubmit={ submit }>
            { error }
        <input 
        value={ firstName } onChange={ ev =>setFirstName(ev.target.value)}
        placeholder='First Name'
        />
        { firstName }
        <input 
        value={ lastName } onChange={ ev =>setLastName(ev.target.value)}
        placeholder='Last Name'
        />
        { lastName }
        <input 
        value={ username } onChange={ ev => setUsername(ev.target.value)}
        placeholder='Create Username'
        />
        { username }
        <input 
        value={ password } type='password' onChange={ ev => setPassword(ev.target.value)}
        placeholder='Create Password'
        />
        <button>Register</button>
      </form>
    )
}

export default Register 