import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import GlassCard from '../../components/UI/GlassCard';
import './AuthParams.css';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await register(name, email, password);
      addToast('Conta criada com sucesso! Bem-vindo.', 'success');
      navigate('/');
    } catch (error) {
      addToast(error.message || 'Erro ao criar conta.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page animate-fade-in">
      <GlassCard className="auth-card animate-slide-up">
        <div className="auth-header">
          <h2>Crie a sua Conta</h2>
          <p>Junte-se à nossa comunidade exclusiva</p>
        </div>
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="name">Nome Completo</label>
            <input 
              type="text" 
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="João Silva"
              required 
            />
          </div>

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
            <button type="submit" className="btn btn-primary full-width" disabled={isLoading}>
              {isLoading ? 'A Registar...' : 'Criar Conta'}
            </button>
          </div>
        </form>
        
        <div className="auth-footer">
          <p>Já tem uma conta? <Link to="/login">Entre aqui</Link></p>
        </div>
      </GlassCard>
    </div>
  );
};

export default Register;
