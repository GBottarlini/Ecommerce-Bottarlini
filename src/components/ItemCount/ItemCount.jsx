import React, { useState } from 'react';
import './ItemCount.css';

const ItemCount = ({ stock, initial, onAdd, image, model }) => {
  const [quantity, setQuantity] = useState(initial);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleIncrement = () => {
    if (quantity < stock) {
      setQuantity(prev => prev + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddToCart = () => {
    const result = onAdd(quantity);
    if (result && result.success) {
      setMessage(`${quantity} ${quantity > 1 ? 'productos' : 'producto'} agregado al carrito.`);
      setIsError(false);
    } else if (result && !result.success) {
      setMessage(result.message);
      setIsError(true);
    }
    setTimeout(() => {
      setMessage('');
      setIsError(false);
    }, 3000);
  };

  return (
    <div className="item-count">
      <img src={image} alt={model} className="item-image" />
      <h2 className="item-model">{model}</h2>
      {message && (
        <p className={`confirmation-message ${isError ? 'error' : ''}`}>
          {message}
        </p>
      )}
      <div className="controls">
        <button className="quantity-button" onClick={handleDecrement}>-</button>
        <span className="quantity-display">{quantity}</span>
        <button className="quantity-button" onClick={handleIncrement}>+</button>
      </div>
      <button className="add-to-cart" onClick={handleAddToCart}>
        Agregar al carrito
      </button>
    </div>
  );
};

export default ItemCount;