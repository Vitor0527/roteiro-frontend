import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useToast } from '../contexts/ToastContext';
import { useAuth } from '../contexts/AuthContext';
import GlassCard from '../components/UI/GlassCard';
import { CreditCard, MapPin, Calendar, CheckCircle } from 'lucide-react';
import './CartCheckout.css';

const Checkout = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  // Se o carrinho estiver vazio e não foi finalizado com sucesso
  if (cartItems.length === 0 && !success) {
    navigate('/cart');
    return null;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulando processamento de pagamento
    setTimeout(() => {
      setIsProcessing(false);
      setSuccess(true);
      clearCart();
      addToast('Reserva confirmada com sucesso! Enviámos os detalhes para o seu e-mail.', 'success', 5000);
    }, 2000);
  };

  if (success) {
    return (
      <div className="checkout-success animate-fade-in container section">
        <GlassCard className="success-card">
          <CheckCircle size={64} color="var(--c-nature-green)" className="success-icon" />
          <h1>Pagamento Concluído!</h1>
          <p>A sua reserva na Madeira foi confirmada.</p>
          <button className="btn btn-primary" onClick={() => navigate('/')}>
            Voltar ao Início
          </button>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="checkout-page container section animate-fade-in">
      <div className="cart-header">
        <h1>Finalizar <span>Reserva</span></h1>
      </div>

      <div className="cart-layout">
        <div className="checkout-forms">
          <form id="checkout-form" onSubmit={handleSubmit}>
            <GlassCard className="checkout-section animate-slide-up stagger-1">
              <h2 className="section-title"><MapPin size={24} /> Informações do Viajante</h2>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="fullName">Nome Completo</label>
                  <input type="text" id="fullName" defaultValue={user?.name || ''} required />
                </div>
                <div className="form-group">
                  <label htmlFor="email">E-mail</label>
                  <input type="email" id="email" defaultValue={user?.email || ''} required />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Telemóvel</label>
                  <input type="tel" id="phone" required />
                </div>
              </div>
            </GlassCard>

            <GlassCard className="checkout-section animate-slide-up stagger-2" style={{ marginTop: '24px' }}>
              <h2 className="section-title"><CreditCard size={24} /> Método de Pagamento</h2>
              <div className="payment-methods">
                <label className="payment-method-radio">
                  <input type="radio" name="payment" value="credit_card" defaultChecked />
                  <span>Cartão de Crédito</span>
                </label>
              </div>
              <div className="form-grid" style={{ marginTop: '16px' }}>
                <div className="form-group full-row">
                  <label htmlFor="cardNumber">Número do Cartão</label>
                  <input type="text" id="cardNumber" placeholder="0000 0000 0000 0000" required />
                </div>
                <div className="form-group">
                  <label htmlFor="expiry">Validade</label>
                  <input type="text" id="expiry" placeholder="MM/AA" required />
                </div>
                <div className="form-group">
                  <label htmlFor="cvv">CVV</label>
                  <input type="text" id="cvv" placeholder="123" required />
                </div>
              </div>
            </GlassCard>
          </form>
        </div>

        <div className="cart-summary animate-slide-up stagger-3">
          <GlassCard>
            <h2>Resumo da Compra</h2>
            <div className="summary-items-mini">
              {cartItems.map(item => (
                <div key={item.id} className="summary-item-mini">
                  <span>{item.quantity}x {item.title}</span>
                  <span>€{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            
            <div className="summary-divider"></div>
            
            <div className="summary-row total">
              <span>Total Final</span>
              <span>€{(cartTotal + (cartItems.length * 2)).toFixed(2)}</span>
            </div>

            <button 
              type="submit"
              form="checkout-form"
              className="btn btn-primary full-width" 
              disabled={isProcessing}
              style={{ marginTop: '24px' }}
            >
              {isProcessing ? 'Processando...' : 'Pagar Agora'}
            </button>
            <p className="secure-tx"><small>Transação segura e encriptada</small></p>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
