import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function AllProducts({ products }) {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch('https://fakestoreapi.com/products/categories');
      const data = await response.json();
      setCategories(data);
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      const fetchProductsByCategory = async () => {
        const response = await fetch(`https://fakestoreapi.com/products/category/${selectedCategory}`);
        const data = await response.json();
        setFilteredProducts(data);
      };

      fetchProductsByCategory();
    } else {
      setFilteredProducts(products);
    }
  }, [selectedCategory, products]);

  const handleFilterByCategory = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div>
      <h2>All Products</h2>
      <div>
        Filter by category:
        {categories.map((category) => (
          <button key={category} onClick={() => handleFilterByCategory(category)}>
            {category}
          </button>
        ))}
        <button onClick={() => setSelectedCategory(null)}>Clear Filter</button>
      </div>
      <ul>
        {filteredProducts.map((product) => (
          <li key={product.id}>
            <img src={product.image} alt={product.title} />
            <h4>{product.title}</h4>
            <Link to={`/products/${product.id}`}>
              <button>View Details</button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AllProducts;
