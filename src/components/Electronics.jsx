function Electronics({products}){
    return(
      <div>
        <h3>Explore Electronics!</h3>
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

  export default Electronics;