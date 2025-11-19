export default function Home() {
  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>🔮 Tarot Card API</h1>
      <p>API endpoints are available at:</p>
      <ul>
        <li><code>GET /api/cards</code> - Get all cards</li>
        <li><code>GET /api/cards/onecard</code> - Get one random card</li>
        <li><code>GET /api/cards/threecards</code> - Get three random cards</li>
      </ul>
    </div>
  );
}

