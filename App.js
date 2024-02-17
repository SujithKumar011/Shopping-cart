// App.js
import React, { useState } from 'react';
import './App.css';

function App() {
  const [products, setProducts] = useState([
    { id: 1, name: 'Product 1', price: 10, image: 'product1.jpg', category: 'Category 1', rating: 4 },
    { id: 2, name: 'Product 2', price: 20, image: 'product2.jpg', category: 'Category 2', rating: 3 },
    { id: 3, name: 'Product 3', price: 15, image: 'product3.jpg', category: 'Category 1', rating: 5 },
  ]);

  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item => item.id === product.id ? {...item, quantity: item.quantity + 1} : item));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const incrementQuantity = (productId) => {
    setCart(cart.map(item => item.id === productId ? { ...item, quantity: item.quantity + 1 } : item));
  };

  const decrementQuantity = (productId) => {
    setCart(cart.map(item => item.id === productId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item));
  };

  return (
    <div className="App">
      <header>
        <nav>
          <div className="search-bar">
            <input type="text" placeholder="Search..." />
          </div>
        </nav>
      </header>
      <div className="categories">
        <button>All</button>
        <button>Category 1</button>
        <button>Category 2</button>
      </div>
      <div className="products">
        {products.map(product => (
          <div className="product-card" key={product.id}>
            <img src={product.image} alt={product.name} />
            <div className="product-info">
              <h3>{product.name}</h3>
              <p>Price: ${product.price}</p>
              <p>Rating: {product.rating}</p>
              <button onClick={() => addToCart(product)}>Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
      <div className="cart">
        <h2>Shopping Cart</h2>
        {cart.map(item => (
          <div className="cart-item" key={item.id}>
            <img src={item.image} alt={item.name} />
            <div className="cart-item-info">
              <h3>{item.name}</h3>
              <p>Price: ${item.price}</p>
              <p>Quantity: {item.quantity}</p>
              <button onClick={() => incrementQuantity(item.id)}>+</button>
              <button onClick={() => decrementQuantity(item.id)}>-</button>
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;