import { coupleQuestions } from '../../data/coupleQuestions';

export default function handler(req, res) {
  const { type } = req.query;

  if (type === 'random') {
    const randomIndex = Math.floor(Math.random() * coupleQuestions.length);
    res.status(200).json({ question: coupleQuestions[randomIndex] });
  } else {
    res.status(200).json({ questions: coupleQuestions, total: coupleQuestions.length });
  }
}
