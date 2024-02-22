import { Link, useParams, useLocation } from 'react-router-dom'


function Home({products}){
    return(
      <div>
        <h3>All Products</h3>
        <ul>
          {
            products.map( (product)=> {
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

  export default Home;