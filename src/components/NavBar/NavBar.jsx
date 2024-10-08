import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useState, useEffect, useRef } from 'react';
import './NavBar.css';

function Navbar() {
  const { cart } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', closeMenu);
    return () => {
      document.removeEventListener('mousedown', closeMenu);
    };
  }, []);

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">Ipoint</Link>
      <div className="navbar-toggle" onClick={toggleMenu}>
        {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
      </div>
      <div className={`navbar-links ${isMenuOpen ? 'active' : ''}`} ref={menuRef}>
        <Link to="/category/iphones" onClick={toggleMenu}>iPhones</Link>
        <Link to="/category/macbooks" onClick={toggleMenu}>MacBooks</Link>
        <Link to="/category/ipads" onClick={toggleMenu}>iPads</Link>
        <Link to="/cart" className="cart-link" onClick={toggleMenu}>
          <ShoppingCartIcon />
          {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
