import { quoteOfTheDay } from '../../../data/quoteOfTheDay';

export default function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    return res.status(200).json({
      quotes: quoteOfTheDay,
      total: quoteOfTheDay.length,
    });
  } catch (error) {
    console.error('Error fetching quotes:', error);
    return res.status(500).json({ 
      error: 'Failed to fetch quotes',
      details: error.message 
    });
  }
}

