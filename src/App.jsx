import React, { useEffect, useState } from 'react'
import { Link, Route, Routes, useParams } from 'react-router-dom'
import AllProducts from './components/AllProducts'
import Home from './components/Home'
import Electronics from './components/Electronics'
import Jewelry from './components/Jewelry'
import MensClothing from './components/Mens'
import WomensClothing from './components/Womens'
import Product from './components/product'
//import Login from './components/Login'

function App() {
  const [ products, setProducts] = useState([]);

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
        <Link to='/AllProducts'>All Products</Link>
        <Link to='/electronics'>Electronics </Link>
        <Link to='/jewelry'>Jewelry </Link>
        <Link to='/mensClothing'>Men's Clothing </Link>
        <Link to='/womensClothing'>Women's Clothing </Link>
      </nav>
            
      <input id='search' placeholder='🔎 Search Products '/>

      <Routes>
        <Route
        path='/'
        element = { <Home products= { products }/> }
        />
        <Route
        path='/AllProducts'
        element = { <AllProducts products= { products }/> }
        />
         <Route
        path='/Products/:id'
        element = { <Product products= { products }/> }
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