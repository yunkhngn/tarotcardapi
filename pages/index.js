import { useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Tarot Card API - Home</title>
        <meta name="description" content="Free Tarot Card API with beautiful web interface" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container">
        <header className="header">
          <h1>🔮 Tarot Card API</h1>
          <p>Explore the mystical world of Tarot cards</p>
        </header>

        <nav className="nav">
          <Link href="/cards">View All Cards</Link>
          <Link href="/random">Random Card</Link>
          <Link href="/three-cards">Three Card Spread</Link>
        </nav>

        <div style={{ 
          background: 'rgba(255, 255, 255, 0.1)', 
          backdropFilter: 'blur(10px)',
          borderRadius: '12px',
          padding: '2rem',
          color: 'white',
          textAlign: 'center',
          marginTop: '2rem'
        }}>
          <h2 style={{ marginBottom: '1rem', fontSize: '2rem' }}>Welcome to Tarot Card API</h2>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '1.5rem' }}>
            Discover the wisdom of 78 Tarot cards. Each card holds unique meanings and insights 
            that can guide you on your journey. Explore all cards, get a random reading, or try 
            a three-card spread for past, present, and future.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/cards" className="btn">Explore All Cards</Link>
            <Link href="/random" className="btn">Get Random Card</Link>
            <Link href="/three-cards" className="btn">Three Card Spread</Link>
          </div>
        </div>

        <div style={{ 
          marginTop: '3rem',
          background: 'rgba(255, 255, 255, 0.1)', 
          backdropFilter: 'blur(10px)',
          borderRadius: '12px',
          padding: '2rem',
          color: 'white'
        }}>
          <h3 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>API Endpoints</h3>
          <ul style={{ listStyle: 'none', lineHeight: '2' }}>
            <li><code style={{ background: 'rgba(0,0,0,0.2)', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>GET /api/cards</code> - Get all 78 cards</li>
            <li><code style={{ background: 'rgba(0,0,0,0.2)', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>GET /api/cards/onecard</code> - Get one random card</li>
            <li><code style={{ background: 'rgba(0,0,0,0.2)', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>GET /api/cards/threecards</code> - Get three random cards</li>
          </ul>
        </div>
      </div>
    </>
  );
}

