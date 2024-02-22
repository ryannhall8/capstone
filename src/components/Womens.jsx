function WomensClothing({products}){
    return(
      <div>
        <h3>Shop Women's Clothing!</h3>
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

  export default WomensClothing;