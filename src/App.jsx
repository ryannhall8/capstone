import React, { useEffect, useState } from 'react'

function App() {
  const [ products, setProducts] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
    const response = await fetch('https://fakestoreapi.com/products')
    const json = await response.json();
    setProducts(json.products)
    console.log(json.products)
    }
    fetchProducts()
  }, [])

  return (
    <div>
      <p>Welcome! ! !</p>
    </div>
  )
}

export default App