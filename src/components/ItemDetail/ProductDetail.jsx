import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../../services/productService';
import { useCart } from '../../context/CartContext'; 
import './ProductDetail.css';

function ProductDetail() {
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { itemId } = useParams();
  const { addToCart } = useCart(); 

  useEffect(() => {
    const fetchProduct = async () => {
      let productData = null;
      const collections = ['iphones', 'ipads', 'macbooks'];
      for (const collectionName of collections) {
        productData = await getProductById(collectionName, itemId);
        if (productData) {
          break;
        }
      }
      setProduct(productData);
    };

    fetchProduct();
  }, [itemId]);

  const handleIncrement = () => {
    setQuantity(prev => prev + 1);
  };

  const handleDecrement = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };

  const handleAddToCart = () => {
    addToCart(product, quantity); // Agrega el producto al carrito
    console.log(`Agregado ${quantity} de ${product.model} al carrito`);
  };

  if (!product) return <p>Cargando...</p>;

  return (
    <div className="product-detail">
      <img src={product.image} alt={product.model} />
      <div className="item-info">
        <h2>{product.model}</h2>
        <p className="description">{product.description}</p>
        <p className="price">Precio: ${product.price}</p>
        <div className="quantity-controls">
          <button onClick={handleDecrement}>-</button>
          <span>{quantity}</span>
          <button onClick={handleIncrement}>+</button>
        </div>
        <button className="add-to-cart" onClick={handleAddToCart}>
          Agregar al carrito
        </button>
      </div>
    </div>
  );
}

export default ProductDetail;