import React, { useState } from 'react'
import { Link} from 'react-router-dom'


function AllProducts({ products, category }){
    const [selectedCategory, setSelectedCategory] = useState(null);
    const filteredProducts = category ? products.filter(product => product.category === category) : products;
    const handleFilterByCategory = (category) => {
      setSelectedCategory(category);
    }
    return(
      <div>
        <h3>All Products</h3>
        <div>
          Filter by:
          <button onClick= {() => handleFilterByCategory('electronics')}>Electronics</button>
          <button onClick= {() => handleFilterByCategory('jewelery')}>Jewelry</button>
          <button onClick= {() => handleFilterByCategory("men's clothing")}>Men's Clothing</button>
          <button onClick= {() => handleFilterByCategory("women's clothing")}>Women's Clothing</button>

        </div>
        {/* <button onClick={filteredProducts}>Filter by category</button> */}
        <ul>
          {
            filteredProducts.map(( product )=> {
              return (
                <li key={ product.id }>
                  <h4>{ product.title }</h4>
                  <Link to={`/products/${product.id}`}>
                  <button>View Details</button>
                  </Link>
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }

  export default AllProducts;