function Jewelry({products}){
    return(
      <div>
        <h3>Browse Jewelry!</h3>
        <ul>
          {
            products.map( product => {
              return (
                <li key={product.id}>
                  {product.category}
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }

  export default Jewelry;