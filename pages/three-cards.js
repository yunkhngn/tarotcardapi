import { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';

export default function ThreeCards() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchThreeCards = () => {
    setLoading(true);
    setError(null);
    fetch('/api/cards/threecards')
      .then(res => res.json())
      .then(data => {
        setCards(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchThreeCards();
  }, []);

  const labels = ['Past', 'Present', 'Future'];

  return (
    <>
      <Head>
        <title>Three Card Spread - Tarot Card API</title>
        <meta name="description" content="Get a three card Tarot reading for past, present, and future" />
      </Head>

      <div className="container">
        <header className="header">
          <h1>Three Card Spread</h1>
          <p>Past • Present • Future</p>
        </header>

        <nav className="nav">
          <Link href="/">Home</Link>
          <Link href="/cards">All Cards</Link>
          <Link href="/random">Random Card</Link>
        </nav>

        <button onClick={fetchThreeCards} className="btn btn-center">
          {loading ? 'Drawing Cards...' : 'Draw New Spread'}
        </button>

        {loading && <div className="loading">Drawing your cards...</div>}
        {error && <div className="error">Error: {error}</div>}

        {!loading && !error && cards.length > 0 && (
          <div className="three-cards">
            {cards.map((card, index) => (
              <div key={index}>
                <div className="card-label">{labels[index]}</div>
                <div className="card">
                  <img 
                    src={card.image} 
                    alt={card.name}
                    className="card-image"
                  />
                  <div className="card-content">
                    <h2 className="card-title">{card.name}</h2>
                    <p className="card-description">{card.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

