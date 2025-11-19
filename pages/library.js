import { useState, useEffect } from 'react';
import { Card, CardBody, Input, Spinner } from '@heroui/react';
import AppNavbar from '../components/Navbar';

export default function Library() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    fetch('/api/cards')
      .then(res => res.json())
      .then(data => {
        setCards(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching cards:', err);
        setLoading(false);
      });
  }, []);

  const filteredCards = cards.filter(card =>
    card.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <AppNavbar />
      
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Card className="backdrop-blur-md bg-white/10 border border-white/20 shadow-2xl mb-8">
          <CardBody className="p-6">
            <h1 className="text-3xl font-bold text-white mb-4 text-center">
              📚 Library Bài Tarot
            </h1>
            <p className="text-white/80 mb-6 text-center">
              Khám phá tất cả 78 lá bài Tarot và ý nghĩa của chúng
            </p>
            
            <Input
              placeholder="Tìm kiếm bài..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-md mx-auto"
              classNames={{
                input: "text-white",
                inputWrapper: "bg-white/10 backdrop-blur-sm border-white/20"
              }}
            />
          </CardBody>
        </Card>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Spinner size="lg" color="secondary" />
          </div>
        ) : (
          <>
            <p className="text-white/80 mb-6 text-center">
              Tìm thấy {filteredCards.length} lá bài
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredCards.map((card, index) => (
                <Card
                  key={index}
                  className="backdrop-blur-md bg-white/10 border border-white/20 shadow-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-3xl"
                  onClick={() => setSelectedCard(card)}
                >
                  <div className="relative">
                    <img
                      src={card.image}
                      alt={card.name}
                      className="w-full h-80 object-cover"
                    />
                  </div>
                  <CardBody className="p-4">
                    <h3 className="text-lg font-bold text-white mb-2">{card.name}</h3>
                    <p className="text-white/70 text-sm line-clamp-3">
                      {card.description.substring(0, 100)}...
                    </p>
                  </CardBody>
                </Card>
              ))}
            </div>
          </>
        )}

        {/* Modal for selected card */}
        {selectedCard && (
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedCard(null)}
          >
            <Card 
              className="backdrop-blur-md bg-white/10 border border-white/20 shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <CardBody className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-3xl font-bold text-white">{selectedCard.name}</h2>
                  <button
                    onClick={() => setSelectedCard(null)}
                    className="text-white/80 hover:text-white text-2xl"
                  >
                    ×
                  </button>
                </div>
                <img
                  src={selectedCard.image}
                  alt={selectedCard.name}
                  className="w-full h-96 object-cover rounded-lg mb-4"
                />
                <div className="text-white/90 leading-relaxed whitespace-pre-line">
                  {selectedCard.description}
                </div>
              </CardBody>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}

