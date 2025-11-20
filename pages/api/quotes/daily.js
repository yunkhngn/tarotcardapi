import { quoteOfTheDay } from '../../../data/quoteOfTheDay';

export default function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get day of year (1-365/366) to use as seed for consistent daily quote
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now - start;
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);

    // Use day of year as seed to get consistent quote for each day
    const quoteIndex = dayOfYear % quoteOfTheDay.length;
    const quote = quoteOfTheDay[quoteIndex];

    return res.status(200).json({
      quote: quote.text,
      category: quote.category,
      id: quote.id,
      date: now.toISOString().split('T')[0], // YYYY-MM-DD format
    });
  } catch (error) {
    console.error('Error fetching quote of the day:', error);
    return res.status(500).json({ 
      error: 'Failed to fetch quote of the day',
      details: error.message 
    });
  }
}

