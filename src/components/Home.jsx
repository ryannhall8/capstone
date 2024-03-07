import { useState, useEffect } from 'react'
import Login from './Login';
import Register from './Register'

function Home(){
  const [auth, setAuth] = useState({});
  const [carts, setCarts] = useState([]);

  const token = localStorage.getItem('token');

  const login = async({ username, password })=> {
    let response = await fetch('https://fakestoreapi.com/users');
    const users = await response.json();
    const user = users.find(user => user.username === username && user.password === password);
    if(!user){
      throw 'Incorrect username/password';
    }
    setAuth(user);
    response = await fetch(`https://fakestoreapi.com/carts/user/${user.id}`);
    console.log(response);
    const carts = await response.json();
    setCarts(carts);
  };

  const logout = ()=> {
    window.localStorage.removeItem('token');
    setAuth({});
  }

  const register = async({ username, password })=> {
    const response = await fetch('https://fakestoreapi.com/users');
    const users = await response.json();
    const user = users.find(user => user.username === username && user.password === password);
    if(!user){
      throw 'Registration successful!! Now use login form to login!';
    }
    setAuth(user);
  };

    return(
      <div>
        <h3>Login / Register</h3>
        <>
      {
        auth.id ? <button onClick={ logout }>Welcome { auth.username }!! (click to logout)</button> : <><Login  login={ login }/>
        <Register  register={ register }/></>
      }
      <ul>
        {
          carts.map( cart => {
            return (
              <li>
                {cart.id }
                <ul>
                  {
                    cart.products.map( product => {
                      return (
                        <li>
                          { product.productId }
                        </li>
                      )
                    })
                  }
                </ul>
              </li >
            )
          })
        }
      </ul>
      </>
      </div>
    )
  }

  export default Home;