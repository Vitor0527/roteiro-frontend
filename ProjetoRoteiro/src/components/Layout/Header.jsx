import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { Menu, X, ShoppingCart, User, LogOut } from 'lucide-react';
import './Header.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { cartCount } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container header-container">
        <Link to="/" className="brand" onClick={closeMenu}>
          <h1>Madeira<span>Tours</span></h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          <ul className="nav-links">
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/feedback">Feedback</NavLink></li>
          </ul>

          <div className="nav-actions">
            <Link to="/cart" className="cart-action">
              <ShoppingCart size={20} />
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </Link>

            {user ? (
              <div className="user-action group">
                <span className="user-greeting">Olá, {user.name}</span>
                <button onClick={logout} className="logout-btn" title="Logout">
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <Link to="/login" className="btn btn-primary login-btn">
                <User size={18} />
                <span>Entrar</span>
              </Link>
            )}
          </div>
        </nav>

        {/* Mobile menu toggle */}
        <button 
          className="mobile-toggle" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div className={`mobile-nav glass ${mobileMenuOpen ? 'open' : ''}`}>
        <ul className="mobile-nav-links">
          <li><NavLink to="/" onClick={closeMenu}>Home</NavLink></li>
          <li><NavLink to="/feedback" onClick={closeMenu}>Feedback</NavLink></li>
          <li className="mobile-cart-link">
            <NavLink to="/cart" onClick={closeMenu}>
              <ShoppingCart size={20} />
              <span>Carrinho ({cartCount})</span>
            </NavLink>
          </li>
          
          <li className="mobile-auth-divider"></li>
          
          {user ? (
            <>
              <li className="mobile-user-info">Olá, {user.name}</li>
              <li>
                <button onClick={() => { logout(); closeMenu(); }} className="mobile-logout">
                  <LogOut size={20} /> Sair
                </button>
              </li>
            </>
          ) : (
            <li>
              <NavLink to="/login" className="mobile-login" onClick={closeMenu}>
                <User size={20} /> Entrar
              </NavLink>
            </li>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Header;
