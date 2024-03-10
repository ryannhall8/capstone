import { useState, useEffect } from 'react'
import Login from './Login';
import Register from './Register'
import addToCart from './AddToCart';

function Home(){
  const [auth, setAuth] = useState({});
  const [carts, setCarts] = useState([]);
  const [products, setProducts] = useState([]);

  const token = localStorage.getItem('token');

  const login = async ({ username, password }) => {
    try {
      const response = await fetch('https://fakestoreapi.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Incorrect username/password');
      }
  
      const result = await response.json();
      console.log('Login result:', result);
  
      localStorage.setItem('token', result.token);
  
      setAuth(result.user);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  // const login = async({ username, password })=> {
  //   let response = await fetch('https://fakestoreapi.com/users');
  //   const users = await response.json();
  //   const user = users.find(user => user.username === username && user.password === password);
  //   if(!user){
  //     throw 'Incorrect username/password';
  //   }
  //   setAuth(user);
  //   response = await fetch(`https://fakestoreapi.com/carts/user/${user.id}`);
  //   const carts = await response.json();
  //   setCarts(carts);
  // };

  const logout = ()=> {
    window.localStorage.removeItem('token');
    setAuth({});
  }

    async function fetchProduct(productId){
    const response = await fetch(`https://fakestoreapi.com/products/${productId}`)
    const json = await response.json();
    return json;
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

  useEffect(() => {
    const fetchData = async () => {
      const productsData = await Promise.all(
        carts.flatMap(cart => cart.products.map(product => fetchProduct(product.productId)))
      );
      setProducts(productsData);
    };

    fetchData();
  }, [carts]);

  const addQuantity = (cartId, productId) => {
    const updatedCarts = carts.map((cart) => {
      if (cart.id === cartId) {
        const updatedProducts = cart.products.map((product) => {
          if (product.productId === productId) {
            return { ...product, quantity: product.quantity + 1 };
          }
          return product;
        });
        return { ...cart, products: updatedProducts };
      }
      return cart;
    });
    setCarts(updatedCarts);
  };
  
  const minusQuantity = (cartId, productId) => {
    const updatedCarts = carts.map((cart) => {
      if (cart.id === cartId) {
        const updatedProducts = cart.products.map((product) => {
          if (product.productId === productId && product.quantity > 0) {
            return { ...product, quantity: product.quantity - 1 };
          }
          return product;
        });
        return { ...cart, products: updatedProducts };
      }
      return cart;
    });
    setCarts(updatedCarts);
  };
  


    return(
      <div>
        <h3>Login / Register</h3>
        <>
      {
         auth && auth.id ? (
          <button onClick={logout}>Welcome {auth.username}!! (click to logout)</button>
        ) : (
          <>
            <Login login={login} />
            <Register register={register} />
          </>
        )
      }
              <ul>
                <h2>Your Cart</h2>
          {carts.map((cart, index) => (
            <li key={cart.id}>
              {/* Cart Number {cart.id} */}
              <ul>
                 {cart.products.map((product, productIndex) => (
                   <li key={productIndex}>
                    {products.length > 0 && products[index * cart.products.length + productIndex] && (
                      <>
                  
                   <img
                     src={products[index * cart.products.length + productIndex].image}
                    alt={products[index * cart.products.length + productIndex].title}
                 />
                  <a>{products[index * cart.products.length + productIndex].title}</a>
                  <a>Quantity: {product.quantity}</a>
                  <button onClick={() => addQuantity(cart.id, product.productId)}>+</button>
                  <button onClick={() => minusQuantity(cart.id, product.productId)}>-</button>
                  <button onClick={() => addToCart(product.productId, auth, token, carts, setCarts)}>Add to Cart</button>
                  </>
                    )}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </>
    </div>
  );
}

export default Home;