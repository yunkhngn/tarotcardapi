import { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';

export default function AllCards() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/cards')
      .then(res => res.json())
      .then(data => {
        setCards(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Head>
        <title>All Tarot Cards - Tarot Card API</title>
        <meta name="description" content="Browse all 78 Tarot cards" />
      </Head>

      <div className="container">
        <header className="header">
          <h1>All Tarot Cards</h1>
          <p>Explore all {cards.length || 78} cards in the deck</p>
        </header>

        <nav className="nav">
          <Link href="/">Home</Link>
          <Link href="/random">Random Card</Link>
          <Link href="/three-cards">Three Card Spread</Link>
        </nav>

        {loading && <div className="loading">Loading cards...</div>}
        {error && <div className="error">Error: {error}</div>}

        {!loading && !error && (
          <div className="card-grid">
            {cards.map((card, index) => (
              <div key={index} className="card">
                <img 
                  src={card.image} 
                  alt={card.name}
                  className="card-image"
                  loading="lazy"
                />
                <div className="card-content">
                  <h2 className="card-title">{card.name}</h2>
                  <p className="card-description">{card.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

