import { useRouter } from 'next/router';
import Image from 'next/image';
import { Button } from '@heroui/react';
import AppNavbar from '../components/Navbar';
import Metadata from '../components/Metadata';
import Footer from '../components/Footer';

export default function Home() {
  const router = useRouter();

  return (
    <>
      <Metadata 
        title="Tarot Reader - Bói Bài Tarot Miễn Phí"
        description="Bói bài Tarot miễn phí trực tuyến. Khám phá những thông điệp bí ẩn từ vũ trụ, giải quyết những vấn đề trong tình yêu, công việc và cuộc sống."
        image="/tarot.jpeg"
      />
      <div className="min-h-screen bg-[#1a1a1a]">
      <AppNavbar />
      
      <div className="container mx-auto px-4 py-20 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-4xl font-serif text-[#D4AF37] mb-6">
              TAROT.YUNKHNGN.DEV
            </h1>
            <p className="text-white/80 text-lg leading-relaxed mb-8">
              Chào mừng bạn đến với Tarot Reader - nơi bạn có thể bói bài Tarot miễn phí trực tuyến. 
              Khám phá những thông điệp bí ẩn từ vũ trụ, giải quyết những vấn đề trong tình yêu, công việc và cuộc sống. 
              Tìm kiếm sự cân bằng và hướng dẫn cho hành trình của bạn.
            </p>
            
            <Button
              className="bg-white 
              text-black 
              hover:bg-gray-200 
              font-semibold 
              px-8 py-6 
              text-lg
              rounded-none
              "
              onClick={() => router.push('/reading')}
            >
              <span className="nav-star">✦</span>
              BÓI TAROT NGAY
            </Button>
          </div>
          
          <div className="hidden md:block">
            <div className="relative w-full h-96 rounded-lg border border-gray-700 overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
              <Image
                src="/image/homepage.jpg"
                alt="Tarot Reader"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-800">
          <h2 className="text-2xl font-serif text-[#D4AF37] mb-4">API Endpoints</h2>
          <div className="space-y-2 text-white/70">
            <p><code className="bg-[#2a2a2a] px-3 py-1 rounded border border-gray-700">GET /api/cards</code> - Get all cards</p>
            <p><code className="bg-[#2a2a2a] px-3 py-1 rounded border border-gray-700">GET /api/cards/onecard</code> - Get one random card</p>
            <p><code className="bg-[#2a2a2a] px-3 py-1 rounded border border-gray-700">GET /api/cards/threecards</code> - Get three random cards</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
    </>
  );
}

