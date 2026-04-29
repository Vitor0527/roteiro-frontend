import React from 'react';
import './GlassCard.css';

const GlassCard = ({ children, className = '', hoverEffect = false, ...props }) => {
  return (
    <div 
      className={`glass glass-card ${hoverEffect ? 'hover-effect' : ''} ${className}`} 
      {...props}
    >
      {children}
    </div>
  );
};

export default GlassCard;
