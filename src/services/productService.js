import { db } from '../components/FireBase/config';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';

// Obtener todos los productos de la colección especificada
export const getProducts = async (collectionName) => {
  try {
    const productsCollection = collection(db, collectionName);
    const productSnapshot = await getDocs(productsCollection);
    return productSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

// Obtener un producto por ID
export const getProductById = async (collectionName, id) => {
  try {
    const productDoc = doc(db, collectionName, id);
    const productSnapshot = await getDoc(productDoc);
    return productSnapshot.exists() ? { id: productSnapshot.id, ...productSnapshot.data() } : null;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
};


export const getCategories = async () => {
  try {
    const categoriesCollection = collection(db, 'categories');
    const categorySnapshot = await getDocs(categoriesCollection);
    return categorySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};