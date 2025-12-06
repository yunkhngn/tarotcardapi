import { answers } from '../../data/bookOfAnswers';

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const randomIndex = Math.floor(Math.random() * answers.length);
    const answer = answers[randomIndex];
    
    res.status(200).json({ answer });
  } catch (error) {
    console.error('Book of Answers API error:', error);
    res.status(500).json({ error: 'Failed to retrieve answer' });
  }
}
