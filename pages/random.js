import { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';

export default function RandomCard() {
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRandomCard = () => {
    setLoading(true);
    setError(null);
    fetch('/api/cards/onecard')
      .then(res => res.json())
      .then(data => {
        setCard(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchRandomCard();
  }, []);

  return (
    <>
      <Head>
        <title>Random Tarot Card - Tarot Card API</title>
        <meta name="description" content="Get a random Tarot card reading" />
      </Head>

      <div className="container">
        <header className="header">
          <h1>Random Tarot Card</h1>
          <p>Discover what the cards have to say</p>
        </header>

        <nav className="nav">
          <Link href="/">Home</Link>
          <Link href="/cards">All Cards</Link>
          <Link href="/three-cards">Three Card Spread</Link>
        </nav>

        <button onClick={fetchRandomCard} className="btn btn-center">
          {loading ? 'Drawing Card...' : 'Draw Another Card'}
        </button>

        {loading && <div className="loading">Drawing your card...</div>}
        {error && <div className="error">Error: {error}</div>}

        {!loading && !error && card && (
          <div className="single-card">
            <img 
              src={card.image} 
              alt={card.name}
              className="single-card-image"
            />
            <div className="single-card-content">
              <h2 className="single-card-title">{card.name}</h2>
              <p className="single-card-description">{card.description}</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

