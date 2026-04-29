import React, { useState } from 'react';
import { useToast } from '../contexts/ToastContext';
import GlassCard from '../components/UI/GlassCard';
import { Star } from 'lucide-react';
import './Feedback.css';

const Feedback = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addToast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0) {
      addToast('Por favor, selecione uma classificação (estrelas).', 'error');
      return;
    }

    setIsSubmitting(true);

    // Simulate API submission
    setTimeout(() => {
      setIsSubmitting(false);
      setRating(0);
      setComment('');
      addToast('Obrigado pelo seu feedback! Ele ajuda-nos a melhorar.', 'success');
    }, 1500);
  };

  return (
    <div className="feedback-page container section animate-fade-in">
      <div className="feedback-header">
        <h1>Deixe o seu <span>Feedback</span></h1>
        <p>A sua opinião é fundamental para melhorarmos as nossas experiências na Madeira.</p>
      </div>

      <div className="feedback-content">
        <GlassCard className="feedback-card animate-slide-up">
          <form onSubmit={handleSubmit} className="feedback-form">
            <div className="rating-section">
              <h3>Como avalia a sua experiência?</h3>
              <div className="stars-container">
                {[...Array(5)].map((star, index) => {
                  index += 1;
                  return (
                    <button
                      type="button"
                      key={index}
                      className={index <= (hover || rating) ? "star on" : "star off"}
                      onClick={() => setRating(index)}
                      onMouseEnter={() => setHover(index)}
                      onMouseLeave={() => setHover(rating)}
                    >
                      <Star size={40} fill={index <= (hover || rating) ? "var(--c-gold)" : "transparent"} stroke="var(--c-gold)" />
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="comment">O que mais gostou (ou o que podemos melhorar)?</label>
              <textarea 
                id="comment" 
                rows="5" 
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Partilhe os detalhes da sua viagem..."
                required
              ></textarea>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary" 
              disabled={isSubmitting}
            >
              {isSubmitting ? 'A enviar...' : 'Enviar Feedback'}
            </button>
          </form>
        </GlassCard>
      </div>
    </div>
  );
};

export default Feedback;
