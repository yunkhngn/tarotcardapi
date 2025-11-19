import { tarotCards } from '../../../data/tarotCards';

export default function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json(tarotCards);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
}

