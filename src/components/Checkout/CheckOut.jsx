import { useCart } from "../../context/CartContext";
import { db } from "../FireBase/config";
import { collection, addDoc } from "firebase/firestore";
import "./Checkout.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Loader from "../Loader/Loader";

function Checkout() {
  const { cart, clearCart } = useCart();
  const [orderId, setOrderId] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    paymentMethod: "creditCard", // Método de pago por defecto
  });
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleConfirmOrder = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const orderRef = await addDoc(collection(db, "orders"), {
        buyer: formData,
        items: cart,
        total: total,
        createdAt: new Date(),
      });
      setOrderId(orderRef.id);
      clearCart();

      Swal.fire({
        title: "Orden Confirmada",
        text: `Tu orden ha sido confirmada con el ID: ${orderRef.id}`,
        icon: "success",
        confirmButtonText: "Aceptar",
      }).then(() => {
        navigate("/");
      });
    } catch (error) {
      console.error("Error al confirmar la orden:", error);
      setError("Hubo un problema al procesar tu orden. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>
      {error && <p className="error-message">{error}</p>}
      {cart.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        <form onSubmit={handleConfirmOrder} className="checkout-form">
          <div className="form-group">
            <label htmlFor="name">Nombre:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Teléfono:</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Dirección:</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="city">Ciudad:</label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="state">Estado/Provincia:</label>
            <input
              type="text"
              id="state"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="zip">Código Postal:</label>
            <input
              type="text"
              id="zip"
              name="zip"
              value={formData.zip}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="country">País:</label>
            <input
              type="text"
              id="country"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="paymentMethod">Método de Pago:</label>
            <select
              id="paymentMethod"
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleInputChange}
              className="payment-select"
            >
              <option value="creditCard">Tarjeta de Crédito</option>
              <option value="paypal">PayPal</option>
              <option value="bankTransfer">Transferencia Bancaria</option>
            </select>
          </div>
          <h2>Total: ${total.toFixed(2)}</h2>
          <button className="confirm-order" type="submit">
            Confirmar Orden
          </button>
        </form>
      )}
    </div>
  );
}
export default Checkout;
