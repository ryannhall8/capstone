function MensClothing({products}){
    return(
      <div>
        <h3>Shop Men's Clothing! </h3>
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

  export default MensClothing;