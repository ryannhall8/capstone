import React, { useEffect, useState } from 'react'
import { Link} from 'react-router-dom'

function Jewelry(){
  const [ products, setProducts] = useState([]);
  const [key, Setkey] = useState(0);
  const [cart, setCart] = useState([]);


  useEffect(() => {
    const fetchProducts = async ()=> {
    const response = await fetch('https://fakestoreapi.com/products/category/jewelery');
    const json = await response.json();
    setProducts(json);
    }
    fetchProducts()
  }, [])

  const addToCart = async (productId) => {
    try {
      console.log('Adding product to cart. Product ID:', productId);
      const banana = localStorage.getItem('banana');
      if (!banana) {
        console.error('User not logged in');
        return;
      }
  
      // Fetch the current cart data
      const response = await fetch(`https://fakestoreapi.com/carts/${banana}`);
      const cartData = await response.json();
      console.log('Current cart data:', cartData);
  
      // Update the cart data with the new product
      const updatedProducts = Array.isArray(cartData.products) ? cartData.products : [];
      const updatedCartData = {
        ...cartData,
        products: [...updatedProducts, { productId, quantity: 1 }],
      };
  
      // Update the cart data on the server
      await fetch(`https://fakestoreapi.com/carts/${banana}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedCartData),
      });
  
      // Update the cart state and local storage
      setCart(updatedCartData.products);
      localStorage.setItem(`cart_${banana}`, JSON.stringify(updatedCartData));
  
      console.log('Product added to cart successfully.');
      alert('Product added to cart successfully.');
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };

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
        <h3>Browse Jewelry!</h3>
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

  export default Jewelry;