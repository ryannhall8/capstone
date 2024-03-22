import { useState, useEffect } from 'react'
import Login from './Login';
import Register from './Register'
import CheckoutForm from './checkoutForm';

function Home(){
  const [auth, setAuth] = useState({});
  const [carts, setCarts] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      const fetchData = async () => {
        try {
          const response = await fetch('https://fakestoreapi.com/users/1', {
            headers: {
              Authorization: `Bearer ${JSON.parse(storedToken)}`,
            },
          });
          if (response.ok) {
            const user = await response.json();
            setAuth(user);
            userCart(user.id);
          } else {
            localStorage.removeItem('token');
            setAuth(null);
          }
        } catch (error) {
          console.error('Failed to fetch user data:', error);
        }
      };
      fetchData();
    } else {
      setAuth(null);
    }
  }, []);

  
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
  
      localStorage.setItem('token', JSON.stringify(result.token));
  
      const userResponse = await fetch('https://fakestoreapi.com/users/1', {
        headers: {
          Authorization: `Bearer ${result.token}`,
        },
      });
      if (userResponse.ok) {
        const user = await userResponse.json();
        localStorage.setItem('auth', JSON.stringify(user))
        localStorage.setItem('banana', JSON.stringify(user.id))
        setAuth(user);
        userCart(user.id);
      }
    } catch (error) {
      throw error;
    }
  };
  
  const logout = () => {
    localStorage.removeItem('token');
    setAuth({});
  };  
  
  const userCart = async (authId) => {
    try {
      //old cart
      const response = await fetch(`https://fakestoreapi.com/carts/user/${authId}`);
      const cartsData = await response.json();
      if (!JSON.parse(localStorage.getItem(`cart_${authId}`))) {
        setCarts(cartsData);
      } else {
        // Updated cart in the else
        const updatedCartData = JSON.parse(localStorage.getItem(`cart_${authId}`));
        setCarts(updatedCartData); 
      }

      //if we have the updated cart show that otherwise show old cart data
              
      const productIds = cartsData.flatMap(cart => cart.products.map(product => product.productId));
      const productsData = await fetch('https://fakestoreapi.com/products')
      const data = await productsData.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching cart data:', error);
    }
  };
  
  useEffect(() => {
    if (auth && auth.id) {
    }
  }, [carts, auth]);
  
    const register = async({ username, password })=> {
      const response = await fetch('https://fakestoreapi.com/users');
      const users = await response.json();
      const user = users.find(user => user.username === username && user.password === password);
      if(!user){
        throw 'Registration successful!! Now use login form to login!';
      }
      setAuth(user);
      
    };
    
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
    
  async function checkout() {
    try {  
      setCarts([]);
      alert('Checkout successful');
    } catch (error) {
      console.error('Error checking out:', error);
      alert('Failed to checkout');
    }
  };

  const removeFromCart = (cartId, productId) => {
    const updatedCarts = carts.map((cart) => {
      if (cart.id === cartId) {
        const updatedProducts = cart.products.filter((product) => product.productId !== productId);
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
            {/* <Electronics auth={auth} carts={carts} setCarts={setCarts} /> */}
\          </>
        )
      }
          {auth && auth.id && (
            <ul>
              <h2>Shopping Cart</h2>
              {/* <h3>your have {products.length} products in your cart</h3> */}
                {carts.length > 0 && carts.map((cart) => (
                  <li key={cart.id}>
                  <ul>
                    {cart.products.map((product, productIndex) => (
                      <li key={productIndex}>
                        {products.length > 0 && products.find((originalProduct) => product.productId === originalProduct.id) && (
                          <>
                            <img
                              src={products.find((originalProduct) => product.productId === originalProduct.id).image}
                              alt={products.find((originalProduct) => product.productId === originalProduct.id).title}
                            />
                            <a>{products.find((originalProduct) => product.productId === originalProduct.id).title}</a>
                            <a>Quantity: {product.quantity}</a>
                            <button onClick={() => addQuantity(cart.id, product.productId)}>+</button>
                            <button onClick={() => minusQuantity(cart.id, product.productId)}>-</button>
                            <button onClick={() => removeFromCart(cart.id, product.productId)}>X</button>
                          </>
                        )}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
              <CheckoutForm onCheckout={checkout} />
            </ul>
          )}
      </>
    </div>
  );
}

export default Home;