import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import Loader from '../Loader/Loader';
import './CartPage.css';

function CartPage() {
  const { cart, removeFromCart } = useCart();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleRemove = (id) => {
    removeFromCart(id);
    setMessage('Producto eliminado del carrito.');
    setTimeout(() => setMessage(''), 3000);
  };

  const handleCheckout = () => {
    if (cart.length > 0) {
      setLoading(true);
      navigate('/checkout');
      setLoading(false);
    } else {
      setMessage('Tu carrito está vacío.');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="cart-page">
      <h1>Resumen del Carrito</h1>
      {message && <p className="confirmation-message">{message}</p>}
      {cart.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        <div>
          <ul>
            {cart.map(item => (
              <li key={item.id}>
                <img src={item.image} alt={item.model} />
                <div>
                  <h2>{item.model}</h2>
                  <p>Cantidad: {item.quantity}</p>
                  <p>Precio: ${item.price}</p>
                  <button className='btn-delete' onClick={() => handleRemove(item.id)}>Eliminar</button>
                </div>
              </li>
            ))}
          </ul>
          <h2>Total: ${total.toFixed(2)}</h2>
          <button className="btn-checkout" onClick={handleCheckout}>Finalizar Compra</button>
        </div>
      )}
    </div>
  );
}

export default CartPage;