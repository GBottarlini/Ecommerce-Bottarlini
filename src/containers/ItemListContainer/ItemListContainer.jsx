import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ItemList from '../../components/ItemList/ItemList';
import { getProducts } from '../../services/productService';

function ItemListContainer() {
  const [products, setProducts] = useState([]);
  const { categoryId } = useParams();

  useEffect(() => {
    const fetchProducts = async () => {
      if (categoryId) {
        const filteredProducts = await getProducts(categoryId);
        setProducts(filteredProducts);
      } else {
        const iphoneProducts = await getProducts('iphones');
        const ipadProducts = await getProducts('ipads');
        const macbookProducts = await getProducts('macbooks');
        const allProducts = [...iphoneProducts, ...ipadProducts, ...macbookProducts];
        setProducts(allProducts);
      }
    };

    fetchProducts();
  }, [categoryId]);

  return <ItemList products={products} />;
}

export default ItemListContainer;