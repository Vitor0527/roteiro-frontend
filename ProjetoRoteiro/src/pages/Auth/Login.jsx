import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import GlassCard from '../../components/UI/GlassCard';
import './AuthParams.css'; // Shared CSS for auth pages

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await login(email, password);
      addToast('Login efetuado com sucesso!', 'success');
      navigate('/');
    } catch (error) {
      addToast(error.message || 'Erro ao efetuar login. Verifique as credenciais.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page animate-fade-in">
      <GlassCard className="auth-card animate-slide-up">
        <div className="auth-header">
          <h2>Bem-vindo de volta</h2>
          <p>Faça login para gerir as suas reservas</p>
        </div>
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">E-mail</label>
            <input 
              type="email" 
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="exemplo@gmail.com"
              required 
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Palavra-passe</label>
            <input 
              type="password" 
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required 
            />
          </div>
          
          <div className="form-actions">
            <a href="#" className="forgot-password">Esqueceu a palavra-passe?</a>
            <button type="submit" className="btn btn-primary full-width" disabled={isLoading}>
              {isLoading ? 'A entrar...' : 'Entrar na Conta'}
            </button>
          </div>
        </form>
        
        <div className="auth-footer">
          <p>Ainda não tem conta? <Link to="/register">Registe-se aqui</Link></p>
        </div>
      </GlassCard>
    </div>
  );
};

export default Login;
