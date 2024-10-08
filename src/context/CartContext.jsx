import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, quantity) => {
    const existingProduct = cart.find(item => item.id === product.id);
    if (existingProduct) {
      const newQuantity = existingProduct.quantity + quantity;
      if (newQuantity <= product.stock) {
        setCart(cart.map(item => 
          item.id === product.id ? { ...existingProduct, quantity: newQuantity } : item
        ));
        return { success: true };
      } else {
        return { success: false, message: `Sin Stock disponible.` };
      }
    } else {
      if (quantity <= product.stock) {
        setCart([...cart, { ...product, quantity }]);
        return { success: true };
      } else {
        return { success: false, message: `No puedes agregar más de ${product.stock} productos.` };
      }
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};


export const useCart = () => {
  return useContext(CartContext);
};