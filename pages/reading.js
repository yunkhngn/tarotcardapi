import { useState, useRef } from 'react';
import { 
  Card, 
  CardBody, 
  Textarea, 
  Button, 
  Spinner
} from '@heroui/react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import AppNavbar from '../components/Navbar';
import Metadata from '../components/Metadata';

const suggestedQuestions = [
  "Mối quan hệ mới này có phải là True Love của tôi không?",
  "Người ấy có hối tiếc về việc chia tay không?",
  "Tôi sẽ gặp những cơ hội quan trọng nào trong tương lai gần?",
  "Tôi nên tiếp tục công việc hiện tại hay tìm kiếm một hướng đi mới?"
];

export default function Reading() {
  const [question, setQuestion] = useState('');
  const [cards, setCards] = useState([]);
  const [analysis, setAnalysis] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const analysisRef = useRef(null);

  const handleReading = async () => {
    if (!question.trim()) {
      alert('Vui lòng nhập câu hỏi của bạn');
      return;
    }

    setIsSubmitting(true);
    setAnalysis('');
    setCards([]);

    try {
      const cardsResponse = await fetch('/api/cards/threecards');
      if (!cardsResponse.ok) {
        throw new Error('Không thể lấy các lá bài');
      }
      const threeCards = await cardsResponse.json();

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

      if (!analysisResponse.ok) {
        const errorText = await analysisResponse.text();
        let errorMessage = 'Không thể phân tích bài';
        try {
          const errorData = JSON.parse(errorText);
          
          if (analysisResponse.status === 429) {
            errorMessage = errorData.message || `Vui lòng đợi ${errorData.remainingMinutes || 0} phút ${errorData.remainingSeconds || 0} giây trước khi bói lại.`;
          } else if (analysisResponse.status === 503 || (errorData.details && errorData.details.toLowerCase().includes('overloaded'))) {
            errorMessage = 'Máy chủ Gemini đang quá tải, vui lòng thử lại sau ít phút.';
          } else {
            errorMessage = errorData.details || errorData.error || errorMessage;
            if (errorData.type) {
              errorMessage += ` (${errorData.type})`;
            }
          }
        } catch (e) {
          errorMessage = `Lỗi ${analysisResponse.status}: ${errorText.substring(0, 100)}`;
        }
        throw new Error(errorMessage);
      }

      const contentType = analysisResponse.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await analysisResponse.text();
        throw new Error('Server trả về dữ liệu không hợp lệ');
      }

      const data = await analysisResponse.json();
      if (data.error) {
        throw new Error(data.error);
      }
      setAnalysis(data.analysis);
      setCards(threeCards);

      setTimeout(() => {
        if (analysisRef.current) {
          analysisRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 150);
    } catch (error) {
      console.error('Error:', error);
      alert('Có lỗi xảy ra: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSuggestedQuestion = (suggestedQ) => {
    setQuestion(suggestedQ);
  };

  return (
    <>
      <Metadata 
        title="Bói Tarot - Đặt Câu Hỏi Cho Trải Bài Tarot"
        description="Đặt câu hỏi và nhận phân tích chi tiết từ các lá bài Tarot. Khám phá quá khứ, hiện tại và tương lai của bạn."
        image="/tarot.jpeg"
      />
      <div className="min-h-screen bg-[#1a1a1a] flex flex-col">
        <AppNavbar />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 max-w-5xl flex-1">
        {/* Question Input Section */}
        <div className="mb-12">
          <div className="bg-[#111010] border border-[#2a1f17] rounded-[32px] px-5 sm:px-8 py-8 sm:py-10 shadow-[0_25px_80px_rgba(0,0,0,0.45)]">
            <p className="text-center text-xs md:text-sm tracking-[0.5em] text-[#c08b45] uppercase mb-4">
              ĐẶT CÂU HỎI
            </p>
            <h1 className="text-2xl sm:text-4xl font-serif text-[#f5f0e5] text-center mb-6 sm:mb-8 ">
              ĐẶT CÂU HỎI CHO <br/>
              TRẢI BÀI TAROT
            </h1>

            <div className="mb-8">
              <div className="relative w-full">
                <Textarea
                  placeholder="Khi nào tôi sẽ gặp được tình yêu mới?"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  minRows={1}
                  maxRows={4}
                  classNames={{
                    input: "text-white placeholder:text-[#5f5f60] text-base sm:text-lg pr-16",
                    innerWrapper: "px-5 sm:px-6 py-4",
                    inputWrapper: `
                      bg-[#262626]
                      rounded-[28px]
                      border border-[#3a3a3c]
                      hover:border-[#4a4a4c]
                      focus-within:border-[#4a4a4c]
                      shadow-[0_15px_45px_rgba(0,0,0,0.45)]
                      transition-all
                    `,
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey && question.trim() && !isSubmitting) {
                      e.preventDefault();
                      handleReading();
                    }
                  }}
                />
                <button
                  onClick={handleReading}
                  disabled={isSubmitting || !question.trim()}
                  className={`
                    absolute top-1/2 right-3 -translate-y-1/2
                    w-10 h-10 sm:w-12 sm:h-12
                    flex items-center justify-center
                    rounded-full
                    bg-[#353535]
                    shadow-[0_8px_20px_rgba(0,0,0,0.45)]
                    transition-all
                    ${isSubmitting || !question.trim()
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:scale-[1.07]"
                    }
                  `}
                >
                  <span className="text-white text-base sm:text-lg">↑</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6">
              {suggestedQuestions.map((suggestedQ, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestedQuestion(suggestedQ)}
                  disabled={isSubmitting}
                  className={`bg-[#1b1b1d] border border-[#2f2f32] text-white text-left px-5 sm:px-6 py-4 sm:py-5 rounded-[18px] sm:rounded-[20px] transition-all duration-200 text-sm sm:text-base md:text-lg shadow-[0_12px_30px_rgba(0,0,0,0.35)] ${
                    isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#262628] hover:border-[#c08b45]/50'
                  }`}
                >
                  {suggestedQ}
                </button>
              ))}
            </div>

            <p className="text-center text-[#c08b45] text-sm uppercase tracking-[0.3em]">
              Nhấn gửi câu hỏi để bắt đầu xào bài
            </p>
          </div>
        </div>

        {/* Cards Display */}
        {analysis && cards.length > 0 && (
          <div className="mb-12">
            <h2 className="text-3xl font-serif text-[#D4AF37] mb-8 text-center">
              Ba Lá Bài Của Bạn
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {cards.map((card, index) => {
                const positions = ['Quá Khứ', 'Hiện Tại', 'Tương Lai'];
                return (
                  <div key={index} className="relative">
                    <div 
                      className="relative overflow-hidden rounded-lg cursor-pointer transition-all duration-300 hover:scale-105 shadow-2xl"
                      onMouseEnter={() => setHoveredCard(index)}
                      onMouseLeave={() => setHoveredCard(null)}
                    >
                      <img
                        src={card.image}
                        alt={card.name}
                        className="w-full h-[500px] object-cover"
                      />
                      {hoveredCard === index && (
                        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center transition-all duration-300">
                          <div className="text-center p-6">
                            <h3 className="text-3xl font-bold text-[#D4AF37] mb-2">{card.name}</h3>
                            <p className="text-white/90 text-lg font-semibold">{positions[index]}</p>
                          </div>
                        </div>
                      )}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                        <p className="text-white text-center font-semibold text-lg">
                          {positions[index]}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Analysis Section */}
        {isSubmitting && (
          <div className="bg-[#2a2a2a] border border-gray-700 rounded-lg p-12">
            <div className="flex flex-col items-center justify-center">
              <Spinner size="lg" className="text-[#D4AF37]" />
              <p className="text-white/80 mt-6 text-lg">Đang rút bài và phân tích...</p>
            </div>
          </div>
        )}

        {analysis && (
          <div ref={analysisRef} className="bg-[#2a2a2a] border border-gray-700 rounded-lg p-6 sm:p-8 mb-8">
            <h2 className="text-3xl font-serif text-[#D4AF37] mb-6">
              Phân Tích Tarot
            </h2>
            <div 
              className="text-white/90 leading-relaxed markdown-content"
              style={{ 
                fontSize: '1.1rem',
                lineHeight: '2'
              }}
            >
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({node, ...props}) => <h1 className="text-2xl font-bold text-[#D4AF37] mt-6 mb-4" {...props} />,
                  h2: ({node, ...props}) => <h2 className="text-xl font-bold text-[#D4AF37] mt-5 mb-3" {...props} />,
                  h3: ({node, ...props}) => <h3 className="text-lg font-bold text-[#D4AF37] mt-4 mb-2" {...props} />,
                  p: ({node, ...props}) => <p className="mb-4" {...props} />,
                  strong: ({node, ...props}) => <strong className="font-bold text-white" {...props} />,
                  em: ({node, ...props}) => <em className="italic text-white/80" {...props} />,
                  ul: ({node, ...props}) => <ul className="list-disc list-inside my-4 space-y-2 ml-4" {...props} />,
                  ol: ({node, ...props}) => <ol className="list-decimal list-inside my-4 space-y-2 ml-4" {...props} />,
                  li: ({node, ...props}) => <li className="ml-2" {...props} />,
                  blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-[#D4AF37] pl-4 my-4 italic text-white/80" {...props} />,
                }}
              >
                {analysis}
              </ReactMarkdown>
            </div>
          </div>
        )}
      </div>
      </div>
    </>
  );
}
