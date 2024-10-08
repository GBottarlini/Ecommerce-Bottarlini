import './ItemDetail.css';
import ItemCount from '../ItemCount/ItemCount';
import { useCart } from '../../context/CartContext';
import { useState, useEffect } from 'react';
import Loader from '../Loader/Loader';

function ItemDetail({ product }) {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAddToCart = (quantity) => {
    setLoading(true);
    const result = addToCart(product, quantity);
    if (result.success) {
      setIsAdded(true);
      setTimeout(() => {
        setIsAdded(false);
      }, 2000);
    }
    setLoading(false);
    return result;
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="item-detail">
      <img src={product.image} alt={product.model} />
      <div className="item-info">
        <h2>{product.model}</h2>
        <p className="description">{product.description}</p>
        <p className="price">Precio: ${product.price}</p>
        <ItemCount stock={product.stock} initial={1} onAdd={handleAddToCart} />
      </div>
    </div>
  );
}

export default ItemDetail;