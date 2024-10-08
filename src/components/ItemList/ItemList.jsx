import { useState, useEffect } from 'react';
import Loader from '../Loader/Loader';
import { Link } from 'react-router-dom';
import './ItemList.css'; 

function ItemList({ products }) {
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); 
    }, 1000);

    return () => clearTimeout(timer); 
  }, []);

  if (loading) {
    return (
      <div className="loader-container"> 
        <Loader />
      </div>
    ); 
  }

  return (
    <div className="item-list">
      {products.length > 0 ? (
        products.map((product) => (
          <div key={product.id} className="product-card">
            <div className="card-content">
              <Link to={`/item/${product.id}`} className="no-underline"> 
                <img
                  src={product.image}
                  alt={product.model}
                  className="product-image"
                />
              </Link>
              <Link to={`/item/${product.id}`} className="no-underline"> 
                <h5 className="product-title">{product.model}</h5>
              </Link>
              <div className="rating">
                <span className="star">★</span>
                <span className="star">★</span>
                <span className="star">★</span>
                <span className="star">★</span>
                <span className="star">★</span>
                <span className="rating-value">5.0</span>
              </div>
              <div className="price-container">
                <span className="price">${product.price}</span>
                <Link to={`/item/${product.id}`} className="no-underline"> 
                  <button className="add-to-cart">Ver más</button>
                </Link>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No hay productos disponibles.</p>
      )}
    </div>
  );
}

export default ItemList;