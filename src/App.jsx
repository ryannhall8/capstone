import React, { useEffect, useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom'

function Home({products}){
  return(
    <div>
      <h3>All Products</h3>
      <ul>
        {
          products.map( product => {
            return (
              <li key={product.id}>
                {product.title}
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

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

function Jewelry(){
  return(
    <div>
      <h3>jewelry</h3>
    </div>
  )
}

function MensClothing(){
  return(
    <div>
      <h3>men </h3>
    </div>
  )
}

function WomensClothing(){
  return(
    <div>
      <h3>women</h3>
    </div>
  )
}

function App() {
  const [ products, setProducts] = useState([])
  useEffect(() => {
    const fetchProducts = async ()=> {
    const response = await fetch('https://fakestoreapi.com/products')
    const json = await response.json();
    setProducts(json);
    }
    fetchProducts()
  }, [])

  return (
    <div>
      <h1>Welcome! ! !</h1>
      <nav>
        <Link to='/'>Home</Link>
        <Link to='/electronics'>Electronics </Link>
        <Link to='/jewelry'>Jewelry </Link>
        <Link to='/mensClothing'>Men's Clothing </Link>
        <Link to='/womensClothing'>Women's Clothing </Link>

      </nav>
      <Routes>
        <Route
        path='/'
        element = { <Home products= { products }/> }
        />
        <Route
        path='/electronics'
        element = { <Electronics products= { products }/> }
        />
        <Route
        path='/jewelry'
        element = { <Jewelry products= { products }/> }
        />
        <Route
        path='/mensClothing'
        element = { <MensClothing products= { products }/> }
        />
        <Route
        path='/womensClothing'
        element = { <WomensClothing products= { products }/> }
        />
      </Routes>
    </div>
  )
}

export default App