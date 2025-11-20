import { useRouter } from 'next/router';
import Image from 'next/image';
import { Button } from '@heroui/react';
import AppNavbar from '../components/Navbar';
import Metadata from '../components/Metadata';
import Footer from '../components/Footer';

export default function About() {
  const router = useRouter();

  return (
    <>
      <Metadata 
        title="About - Tarot Reader"
        description="About the developer of Tarot Reader - Khoa Nguyễn (yunkhngn)"
        image="/tarot.jpeg"
      />
      <div className="min-h-screen bg-[#0b0a0a] flex flex-col">
        <AppNavbar />
        
        <div className="w-full border-b border-white/10 py-12 sm:py-16 lg:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <div className="text-center mb-12">
              <p className="tracking-[0.5em] text-xs sm:text-sm text-[#d5a052] uppercase mb-4">About</p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#D4AF37] mb-6">
                VỀ NHÀ PHÁT TRIỂN
              </h1>
            </div>

            <div className="bg-[#111010] border-2 border-white/20 rounded-lg p-8 sm:p-10 lg:p-12 mb-8">
              <div className="text-center mb-8">
                <div className="flex justify-center mb-6">
                  <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-4 border-[#D4AF37]">
                    <Image
                      src="/avatar.jpeg"
                      alt="Khoa Nguyễn"
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 128px, 160px"
                    />
                  </div>
                </div>
                <h2 className="text-2xl sm:text-3xl font-serif text-[#D4AF37] mb-4">
                  Khoa Nguyễn
                </h2>
                <p className="text-white/70 text-lg sm:text-xl mb-2">
                  <span className="text-[#d5a052]">@</span>yunkhngn
                </p>
              </div>
              <div className="mb-8 text-center">
              <Button
                as="a"
                href="https://yunkhngn.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-transparent border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 font-semibold text-base sm:text-lg py-6 rounded-none transition-all duration-200"
              >
                <svg 
                  className="w-5 h-5 mr-2" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
                Blog của tớ
              </Button>
            </div>
              <div className="space-y-6 text-white/80 text-base sm:text-lg leading-relaxed">
                <p>
                  Chào mừng bạn đến với <span className="text-[#D4AF37] font-semibold">Tarot Reader</span> - một dự án được phát triển nhanh làm Pet Project của Khoa Nguyễn.
                </p>
                
                <p>
                  Tớ là <span className="text-[#D4AF37]">Khoa Nguyễn</span>, một React/Nextjs Developer nho nhỏ. Dự án này được xây dựng bằng <span className="text-[#d5a052]">Next.js</span>, kết hợp với <span className="text-[#d5a052]">HeroUI</span> và <span className="text-[#d5a052]">Tailwind CSS</span> để mang đến một trải nghiệm bói bài Tarot trực tuyến hoàn toàn miễn phí.
                </p>

                <p>
                  <span className="text-[#D4AF37] font-semibold">Tarot Reader</span> không chỉ là một ứng dụng bói bài đơn giản, mà còn là nơi bạn có thể khám phá ý nghĩa sâu sắc của từng lá bài Tarot, nhận được những lời khuyên và định hướng cho cuộc sống thông qua công nghệ AI tiên tiến.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <Button
                as="a"
                href="https://github.com/yunkhngn/tarot-reader"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-transparent border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 font-semibold text-base sm:text-lg py-6 rounded-none transition-all duration-200"
              >
                <svg 
                  className="w-5 h-5 mr-2" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                Repository
              </Button>

              <Button
                as="a"
                href="https://github.com/yunkhngn"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-transparent border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 font-semibold text-base sm:text-lg py-6 rounded-none transition-all duration-200"
              >
                <svg 
                  className="w-5 h-5 mr-2" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub Profile
              </Button>

              <Button
                as="a"
                href="https://www.facebook.com/yun.khngn/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-transparent border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 font-semibold text-base sm:text-lg py-6 rounded-none transition-all duration-200"
              >
                <svg 
                  className="w-5 h-5 mr-2" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook
              </Button>

              <Button
                as="a"
                href="https://www.instagram.com/yun.khngn/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-transparent border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 font-semibold text-base sm:text-lg py-6 rounded-none transition-all duration-200"
              >
                <svg 
                  className="w-5 h-5 mr-2" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                Instagram
              </Button>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}

