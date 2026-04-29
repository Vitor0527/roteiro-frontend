import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { useToast } from '../contexts/ToastContext';
import GlassCard from '../components/UI/GlassCard';
import { Search, Calendar, Star } from 'lucide-react';

// Mock data for Madeira itineraries
const itineraries = [
  {
    id: 1,
    title: 'Levada das 25 Fontes',
    category: 'Natureza',
    price: 45,
    rating: 4.8,
    image: '/images/santana.jpg',
    description: 'Um dos passeios mais populares da Madeira, culminando numa lagoa com 25 cascatas naturais e águas cristalinas.'
  },
  {
    id: 2,
    title: 'Jeep Safari no Pico do Arieiro',
    category: 'Aventura',
    price: 65,
    rating: 4.9,
    image: '/images/Pico-do-Areeiro-Isla-Madeira.jpg',
    description: 'Experimente a adrenalina e descubra vistas espetaculares das montanhas acima das nuvens num safari 4x4.'
  },
  {
    id: 3,
    title: 'Passeio de Catamarã & Observação de Golfinhos',
    category: 'Oceano',
    price: 50,
    rating: 4.7,
    image: '/images/golfinhos.jpeg',
    description: 'Navegue pelas costas quentes da Madeira com grandes probabilidades de ver golfinhos e tartarugas. Ideal para a família.'
  },
  {
    id: 4,
    title: 'Roteiro Gastronómico Funchal',
    category: 'Cultura',
    price: 85,
    rating: 4.9,
    image: '/images/lapas.jpg',
    description: 'Prove as autênticas espetadas e vinho da Madeira enquanto passeia pela zona velha do Funchal com um guia local.'
  }
];

const categories = ['Todos', 'Natureza', 'Aventura', 'Oceano', 'Cultura'];

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const { addToCart } = useCart();
  const { addToast } = useToast();

  const filteredItineraries = itineraries.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Todos' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleBook = (item) => {
    addToCart(item);
    addToast(`${item.title} adicionado ao carrinho!`, 'success');
  };

  return (
    <div className="home-page animate-fade-in">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content container">
          <h1 className="hero-title animate-slide-up">
            Descubra a Pérola do <span>Atlântico</span>
          </h1>
          <p className="hero-subtitle animate-slide-up stagger-1">
            Experiências luxuosas e roteiros imersivos criados para lhe mostrar a verdadeira essência da Ilha da Madeira.
          </p>

          <GlassCard className="hero-search-box animate-slide-up stagger-2">
            <div className="search-input-group">
              <Search className="search-icon" size={20} />
              <input
                type="text"
                placeholder="Para onde quer ir? (Ex: Funchal, Levadas...)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="divider"></div>
            <div className="search-input-group">
              <Calendar className="search-icon" size={20} />
              <input type="text" placeholder="Data da reserva" />
            </div>
            <button className="btn btn-primary search-btn">Explorar</button>
          </GlassCard>
        </div>
      </section>

      {/* Category Filters */}
      <section className="container section">
        <div className="categories-filter animate-slide-up stagger-3">
          {categories.map(cat => (
            <button
              key={cat}
              className={`category-btn ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Listings Grid */}
        <div className="listings-grid">
          {filteredItineraries.length > 0 ? (
            filteredItineraries.map((item, index) => (
              <GlassCard key={item.id} className={`listing-card animate-slide-up stagger-${(index % 4) + 1}`} hoverEffect>
                <div className="listing-image-wrapper">
                  <img src={item.image} alt={item.title} className="listing-image" loading="lazy" />
                  <span className="listing-category">{item.category}</span>
                </div>
                <div className="listing-content">
                  <div className="listing-header">
                    <h3>{item.title}</h3>
                    <div className="listing-rating">
                      <Star size={16} fill="var(--c-gold)" color="var(--c-gold)" />
                      <span>{item.rating}</span>
                    </div>
                  </div>
                  <p className="listing-description">{item.description}</p>
                  <div className="listing-footer">
                    <span className="listing-price">€{item.price}<small>/pessoa</small></span>
                    <button className="btn btn-primary" onClick={() => handleBook(item)}>
                      Reservar
                    </button>
                  </div>
                </div>
              </GlassCard>
            ))
          ) : (
            <div className="no-results glass animate-fade-in">
              <h3>Nenhum roteiro encontrado.</h3>
              <p>Tente ajustar a sua pesquisa ou os filtros selecionados.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
