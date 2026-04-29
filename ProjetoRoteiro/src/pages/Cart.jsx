import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import GlassCard from '../components/UI/GlassCard';
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import './CartCheckout.css';

const Cart = () => {
  const { cartItems, cartTotal, updateQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();

  return (
    <div className="cart-page container section animate-fade-in">
      <div className="cart-header">
        <h1>O Seu <span>Carrinho</span></h1>
      </div>

      <div className="cart-layout">
        <div className="cart-items">
          {cartItems.length > 0 ? (
            cartItems.map((item, index) => (
              <GlassCard key={item.id} className={`cart-item animate-slide-up stagger-${(index % 4) + 1}`}>
                <img src={item.image} alt={item.title} className="cart-item-image" />
                <div className="cart-item-details">
                  <h3>{item.title}</h3>
                  <p className="cart-item-category">{item.category}</p>
                  
                  <div className="cart-item-actions">
                    <div className="quantity-controls">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                        <Minus size={16} />
                      </button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                        <Plus size={16} />
                      </button>
                    </div>
                    
                    <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                      <Trash2 size={18} />
                      <span className="sr-only">Remover</span>
                    </button>
                  </div>
                </div>
                <div className="cart-item-price">
                  <span>€{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              </GlassCard>
            ))
          ) : (
            <div className="empty-cart glass animate-slide-up">
              <h2>O carrinho está vazio</h2>
              <p>Descubra as nossas experiências exclusivas.</p>
              <Link to="/" className="btn btn-primary" style={{ marginTop: '20px' }}>
                Explorar Roteiros
              </Link>
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="cart-summary animate-slide-up stagger-3">
            <GlassCard>
              <h2>Resumo</h2>
              
              <div className="summary-row">
                <span>Subtotal</span>
                <span>€{cartTotal.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Taxas Turísticas</span>
                <span>€{(cartItems.length * 2).toFixed(2)}</span>
              </div>
              <div className="summary-divider"></div>
              <div className="summary-row total">
                <span>Total</span>
                <span>€{(cartTotal + (cartItems.length * 2)).toFixed(2)}</span>
              </div>

              <button 
                className="btn btn-primary full-width" 
                onClick={() => navigate('/checkout')}
                style={{ marginTop: '24px' }}
              >
                Finalizar Reserva <ArrowRight size={18} />
              </button>
            </GlassCard>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
