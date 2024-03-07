import React, { useEffect, useState } from 'react'
import { Link} from 'react-router-dom'


function Jewelry(){
  const [ products, setProducts] = useState([]);
  const [key, Setkey] = useState(0);

  useEffect(() => {
    const fetchProducts = async ()=> {
    const response = await fetch('https://fakestoreapi.com/products/category/jewelery');
    const json = await response.json();
    setProducts(json);
    }
    fetchProducts()
  }, [])

  function sortProducts() {
    const sortedProducts = products.sort(compare) 
    console.log(products,sortedProducts)
    setProducts(sortedProducts)
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
    return(
      <div>
        <h3>Browse Jewelry!</h3>
        <button onClick={sortProducts}>Sort by A-Z</button>
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

  export default Jewelry;