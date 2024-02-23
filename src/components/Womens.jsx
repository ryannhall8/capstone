import React, { useEffect, useState } from 'react'


function WomensClothing(){
  const [ products, setProducts] = useState([])
  useEffect(() => {
    const fetchProducts = async ()=> {
    const response = await fetch("https://fakestoreapi.com/products/category/women's%20clothing");
    const json = await response.json();
    setProducts(json);
    }
    fetchProducts()
  }, []);

    return(
      <div>
        <h3>Shop Women's Clothing!</h3>
        <ul>
          {
            products.map( product => {
              return (
                <li key={product.id}>
                  <img src= {product.image} />
                  <h2>{product.title}</h2>
                  <button>View Item</button>
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }

  export default WomensClothing;