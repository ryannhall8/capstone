import React, { useEffect, useState } from 'react'
import { Link} from 'react-router-dom'


function Electronics(){
  const [ products, setProducts] = useState([])
  useEffect(() => {
    const fetchProducts = async ()=> {
    const response = await fetch('https://fakestoreapi.com/products/category/electronics');
    const json = await response.json();
    setProducts(json);
    }
    fetchProducts()
  }, [])
    return(
      <div>
        <h3>Explore Electronics!</h3>
        <ul>
          {
            products.map( product => {
              return (
                <li key={product.id}>
                  <img src= {product.image} />
                  <Link to={`/products/${product.id}`}>
                  <h4>{product.title}</h4>
                  </Link>
                  <button>Add to Cart</button>
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }

  export default Electronics;