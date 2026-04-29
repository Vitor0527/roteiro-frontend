import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer animate-fade-in glass">
      <div className="container footer-container">
        <div className="footer-brand">
          <h2>Madeira<span>Tours</span></h2>
          <p>Experiencie a maravilha da Ilha da Madeira com itinerários premium meticulosamente planejados.</p>
        </div>
        
        <div className="footer-links">
          <h3>Navegação</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/cart">Carrinho</a></li>
            <li><a href="/feedback">Feedback</a></li>
          </ul>
        </div>
        
        <div className="footer-contact">
          <h3>Contatos</h3>
          <p>Email: info@madeiratours.pt</p>
          <p>Tlf: +351 912 345 678</p>
          <p>Funchal, Ilha da Madeira</p>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} MadeiraTours. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
