import React, { useState } from 'react'
import { Link} from 'react-router-dom'

function AllProducts({ products, category }){
    const [selectedCategory, setSelectedCategory] = useState(null);
    const filteredProducts = category ? products.filter(product => product.category === category) : products;
    console.log(filteredProducts)
    const handleFilterByCategory = (category) => {
      setSelectedCategory(category);
    }
    
    return(
      <div>
        <h3>All Products</h3>
        <div>
          Filter by:
          <Link to='/electronics'><button>Electronics</button> </Link>
          <Link to='/jewelry'><button>Jewelry</button> </Link>
          <Link to='/mensClothing'><button>Men's Clothing</button> </Link>
          <Link to='/womensClothing'><button>Women's Clothing</button></Link>
        </div>
        <ul>
          {
            filteredProducts.map(( product )=> {
              return (
                <li key={ product.id }>
                  <img src= {product.image} />
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