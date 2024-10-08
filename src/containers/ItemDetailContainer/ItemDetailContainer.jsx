import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ItemDetail from '../../components/ItemDetail/ItemDetail';
import { getProductById } from '../../services/productService';

function ItemDetailContainer() {
  const [product, setProduct] = useState(null);
  const { itemId } = useParams(); // Obtener el ID del producto de la URL

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

  return product ? <ItemDetail product={product} /> : <p>Cargando...</p>;
}

export default ItemDetailContainer;