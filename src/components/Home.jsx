import { useState, useEffect } from 'react'
import Login from './Login';
import Register from './Register'
import CheckoutForm from './checkoutForm';
// import Electronics from './Electronics';
//import addToCart from './AddToCart';

function Home(){
  const [auth, setAuth] = useState(null);
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
        localStorage.setItem('auth', user)
        localStorage.setItem('banana', user.id)
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
      const response = await fetch(`https://fakestoreapi.com/carts/user/${authId}`);
      const cartsData = await response.json();
  
      setCarts(cartsData);
      
      const productIds = cartsData.flatMap(cart => cart.products.map(product => product.productId));
      const productsData = await Promise.all(productIds.map(productId => fetchProduct(productId)));
      setProducts(productsData);
    } catch (error) {
      console.error('Error fetching cart data:', error);
    }
  };
  
  useEffect(() => {
    if (auth && auth.id) {
      localStorage.setItem(`cart_${auth.id}`, JSON.stringify(carts));
    }
  }, [carts, auth]);
  
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
      // await new Promise(resolve => setTimeout(resolve, 2000));
  
      setCarts([]);
      alert('Checkout successful');
    } catch (error) {
      console.error('Error checking out:', error);
      alert('Failed to checkout');
    }
  };

  const removeFromCart = async (cartId, productId) => {
    try {
      const response = await fetch(`https://fakestoreapi.com/carts/${auth.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: productId,
        }),
      });
  
      if (response.ok) {
        console.log('Product removed from cart successfully.');
      } else {
        console.error('Failed to remove product from cart.');
      }
    } catch (error) {
      console.error('Error removing product from cart:', error);
    }
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
                {carts.length > 0 && carts.map((cart, index) => (
                <li key={cart.id}>
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
                            <button onClick={() => removeFromCart(product.cartId, product.productId)}>X</button>
                          </>
                        )}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          )}
          <CheckoutForm onCheckout={checkout} />
      </>
    </div>
  );
}

export default Home;