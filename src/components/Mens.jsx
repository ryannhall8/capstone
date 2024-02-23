import React, { useEffect, useState } from 'react'
import { Link} from 'react-router-dom'


function MensClothing(){
  const [ products, setProducts] = useState([])
  useEffect(() => {
    const fetchProducts = async ()=> {
    const response = await fetch("https://fakestoreapi.com/products/category/men's%20clothing");
    const json = await response.json();
    setProducts(json);
    }
    fetchProducts()
  }, [])
    return(
      <div>
        <h3>Shop Men's Clothing! </h3>
        <ul>
          {
            products.map( product => {
              return (
                <li key={product.id}>
                  <img src= {product.image} />
                  <h2>{product.title}</h2>
                  <Link to={`/products/${product.id}`}>
                  <button>View Item</button>
                  </Link>
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }

  export default MensClothing;