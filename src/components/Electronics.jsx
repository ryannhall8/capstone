import React, { useEffect, useState } from 'react'
import { Link} from 'react-router-dom'
//import addToCart from './AddToCart';


function Electronics({auth, carts, setCarts}){
  const [ products, setProducts] = useState([]);
  const [key, Setkey] = useState(0);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchProducts = async ()=> {
    const response = await fetch('https://fakestoreapi.com/products/category/electronics');
    const json = await response.json();
    setProducts(json);
    }
    fetchProducts()
  }, []);

  async function addToCart(product) {
    setCart(prevCart => {
      const updatedCart = [...prevCart, product];
      console.log('Updated Cart:', updatedCart);
      return updatedCart;
    });
  }

  // async function addToCart(productId) {
  //   try {
  //     const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
  //     const product = await response.json();
  //     setCart(prevCart => [...prevCart, product]);
  //   } catch (error) {
  //     console.error('Error adding item to cart:', error);
  //   }
  // }

  // const addToCart = (productId) => {
  //   const updatedCarts = carts.map((cart) => {
  //     if (cart.userId === auth.id) {
  //       const existingProduct = cart.products.find((product) => product.productId === productId);
  //       if (existingProduct) {
  //         existingProduct.quantity += 1;
  //       } else {
  //         cart.products.push({ productId, quantity: 1 });
  //       }
  //     }
  //     return cart;
  //   });
  //     setCarts(updatedCarts);
  // };
   
  function sortProducts() {
    const sortedProducts = products.sort(compare) 
    setProducts(sortedProducts)
    Setkey(prevKey => prevKey + 1);
  }

    function sortProductsz() {
    const sortingProducts = products.sort(compareZ) 
    setProducts(sortingProducts)
    Setkey(prevKey => prevKey + 1);
  }

  function compare(a, b) {
    if (a?.title < b?.title) {
      return -1;
    } else if (a?.title > b?.title) {
      return 1;
    }
    return 0;
  }

  function compareZ(a, b) {
    if (a?.title < b?.title) {
      return 1;
    } else if (a?.title > b?.title) {
      return -1;
    }
    return 0;
  }

  function priceSort(a, b) {
    if (a?.price < b?.price) {
      return -1;
    } else if (a?.price > b?.price) {
      return 1;
    }
    return 0;
  }

  function priceSortB(a, b) {
    if (a?.price < b?.price) {
      return 1;
    } else if (a?.price > b?.price) {
      return -1;
    }
    return 0;
  }

  function applyPriceSort() {
    const filterProducts = products.sort(priceSort) 
    setProducts(filterProducts)
    Setkey(prevKey => prevKey + 1);

  }

  function applyPriceSortB() {
    const filterProducts = products.sort(priceSortB) 
    setProducts(filterProducts)
    Setkey(prevKey => prevKey + 1);

  }

  return(
      <div>
        <h3>Explore Electronics!</h3>
        <button onClick={sortProducts}>Sort by A-Z</button>
        <button onClick={sortProductsz}>Sort by Z-A</button>
        <span>Price:</span>
        <button onClick={() => applyPriceSort(products)}>Sort by low to high</button>
        <button onClick={() => applyPriceSortB(products)}>Sort by high to low</button>
        <ul>
          {
            products.map( product => {
              return (
                <li key={product.id}>
                  <img src= {product.image} />
                  <Link to={`/products/${product.id}`}>
                  <h4>{product.title}</h4>
                  </Link>
                  <h5>${product.price}</h5>
                  <button onClick={() => addToCart(product.id)}>Add to Cart</button>
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }

  export default Electronics;