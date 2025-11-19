import { tarotCards } from '../../../data/tarotCards';

export default function handler(req, res) {
  if (req.method === 'GET') {
    // Create a copy of the array to avoid modifying the original
    const shuffled = [...tarotCards];
    
    // Fisher-Yates shuffle algorithm
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    
    // Return first 3 cards from shuffled array
    const threeCards = shuffled.slice(0, 3);
    res.status(200).json(threeCards);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
}

