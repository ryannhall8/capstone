import React, { useEffect, useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import AllProducts from './components/AllProducts'
import Account from './components/Account'
import Electronics from './components/Electronics'
import Jewelry from './components/Jewelry'
import MensClothing from './components/Mens'
import WomensClothing from './components/Womens'
import Product from './components/product'
import Home from './components/Home'
import { FaUser } from 'react-icons/fa';


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
    <div className={location.pathname === '/' ? 'home-background' : 'hello world!'}>
    <div className="account-top-right">
        <Link to="/account">
        <FaUser size={24} />
        </Link>
    </div>
      <div className="header">
        <h1>Glamor and Gadgets</h1>
      </div>
      <nav>
        <Link to='/'>Home</Link>
        <Link to='/AllProducts'>All Products</Link>
        <Link to='/electronics'>Electronics </Link>
        <Link to='/jewelry'>Jewelry </Link>
        <Link to='/mensClothing'>Men's Clothing </Link>
        <Link to='/womensClothing'>Women's Clothing </Link>
      </nav>
      {/* <nav>
        <Link to='/Account'>Account</Link>
      </nav> */}
            
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
        <Route
        path='/Account'
        element = { <Account products= { products }/> }
        />
      </Routes>
    </div>
  )
}

export default App