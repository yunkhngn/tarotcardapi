import { useState } from 'react';
import { 
  Card, 
  CardBody, 
  Input, 
  Button, 
  Textarea,
  Spinner
} from '@heroui/react';
import AppNavbar from '../components/Navbar';

export default function Reading() {
  const [question, setQuestion] = useState('');
  const [cards, setCards] = useState([]);
  const [analysis, setAnalysis] = useState('');
  const [loading, setLoading] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

  const handleReading = async () => {
    if (!question.trim()) {
      alert('Vui lòng nhập câu hỏi của bạn');
      return;
    }

    setLoading(true);
    setAnalysis('');
    setCards([]);

    try {
      // Get 3 random cards
      const cardsResponse = await fetch('/api/cards/threecards');
      const threeCards = await cardsResponse.json();
      setCards(threeCards);

      // Get analysis from Gemini
      const analysisResponse = await fetch('/api/gemini/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: question,
          cards: threeCards,
        }),
      });

      const data = await analysisResponse.json();
      if (data.error) {
        throw new Error(data.error);
      }
      setAnalysis(data.analysis);
    } catch (error) {
      console.error('Error:', error);
      alert('Có lỗi xảy ra: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <AppNavbar />
      
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Question Input Section */}
        <Card className="backdrop-blur-md bg-white/10 border border-white/20 shadow-2xl mb-8">
          <CardBody className="p-6">
            <h1 className="text-3xl font-bold text-white mb-4 text-center">
              🔮 Bói Tarot
            </h1>
            <p className="text-white/80 mb-6 text-center">
              Hãy đặt câu hỏi của bạn và để các lá bài Tarot hướng dẫn bạn
            </p>
            
            <Textarea
              label="Câu hỏi của bạn"
              placeholder="Ví dụ: Tình yêu của tôi trong năm nay sẽ như thế nào?"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="mb-4"
              minRows={3}
              classNames={{
                input: "text-white",
                label: "text-white/90",
                inputWrapper: "bg-white/10 backdrop-blur-sm border-white/20"
              }}
            />
            
            <Button
              color="secondary"
              size="lg"
              className="w-full font-semibold"
              onClick={handleReading}
              isLoading={loading}
              disabled={loading || !question.trim()}
            >
              {loading ? 'Đang bói...' : 'Bói Ngay'}
            </Button>
          </CardBody>
        </Card>

        {/* Cards Display */}
        {cards.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              Ba Lá Bài Của Bạn
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {cards.map((card, index) => {
                const positions = ['Quá Khứ', 'Hiện Tại', 'Tương Lai'];
                return (
                  <div key={index} className="relative">
                    <Card 
                      className="backdrop-blur-md bg-white/10 border border-white/20 shadow-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105"
                      onMouseEnter={() => setHoveredCard(index)}
                      onMouseLeave={() => setHoveredCard(null)}
                    >
                      <div className="relative">
                        <img
                          src={card.image}
                          alt={card.name}
                          className="w-full h-96 object-cover"
                        />
                        {hoveredCard === index && (
                          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center transition-all duration-300">
                            <div className="text-center p-4">
                              <h3 className="text-2xl font-bold text-white mb-2">{card.name}</h3>
                              <p className="text-white/90 text-sm">{positions[index]}</p>
                            </div>
                          </div>
                        )}
                      </div>
                      <CardBody className="p-4">
                        <p className="text-white/80 text-sm text-center font-semibold">
                          {positions[index]}
                        </p>
                      </CardBody>
                    </Card>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Analysis Section */}
        {loading && cards.length === 0 && (
          <Card className="backdrop-blur-md bg-white/10 border border-white/20 shadow-2xl">
            <CardBody className="p-8">
              <div className="flex flex-col items-center justify-center">
                <Spinner size="lg" color="secondary" />
                <p className="text-white/80 mt-4">Đang rút bài và phân tích...</p>
              </div>
            </CardBody>
          </Card>
        )}

        {analysis && (
          <Card className="backdrop-blur-md bg-white/10 border border-white/20 shadow-2xl">
            <CardBody className="p-6">
              <h2 className="text-2xl font-bold text-white mb-4">
                ✨ Phân Tích Tarot
              </h2>
              <div 
                className="text-white/90 leading-relaxed whitespace-pre-line prose prose-invert max-w-none"
                style={{ 
                  fontSize: '1.1rem',
                  lineHeight: '1.8'
                }}
              >
                {analysis}
              </div>
            </CardBody>
          </Card>
        )}
      </div>
    </div>
  );
}

