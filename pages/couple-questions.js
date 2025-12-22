import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { Button } from '@heroui/react';
import AppNavbar from '../components/Navbar';
import Metadata from '../components/Metadata';
import Footer from '../components/Footer';
import { coupleQuestions } from '../data/coupleQuestions';
import { useRouter } from 'next/router';

// Shuffle function
const shuffle = (array) => {
  const cloned = [...array];
  for (let i = cloned.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [cloned[i], cloned[j]] = [cloned[j], cloned[i]];
  }
  return cloned;
};

const CardStack = ({ question, index, onSwipe }) => {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-10, 10]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);

  const handleDragEnd = (event, info) => {
    if (Math.abs(info.offset.x) > 100) {
      onSwipe();
    }
  };

  const variants = {
    front: {
      zIndex: 10,
      scale: 1,
      opacity: 1,
      y: 0,
      rotateZ: 0,
      filter: 'blur(0px)',
      boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
      transition: { 
        type: 'spring', 
        stiffness: 300, 
        damping: 20 
      }
    },
    middle: {
      zIndex: 5,
      scale: 0.92,
      opacity: 0.6,
      y: 25,
      rotateZ: -2,
      filter: 'blur(1px)',
      boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
      transition: { duration: 0.4 }
    },
    back: {
      zIndex: 1,
      scale: 0.85,
      opacity: 0.3,
      y: 50,
      rotateZ: 2,
      filter: 'blur(2px)',
      boxShadow: '0 5px 20px rgba(0,0,0,0.2)',
      transition: { duration: 0.4 }
    },
    hidden: {
        zIndex: 0,
        scale: 0.8,
        opacity: 0,
        y: 80,
        filter: 'blur(4px)',
    },
    exit: (custom) => ({
      zIndex: 15,
      x: custom === 'left' ? -1000 : 1000,
      opacity: 0,
      rotateZ: custom === 'left' ? -20 : 20,
      transition: { duration: 0.4, ease: "easeInOut" },
    })
  };

  // Determine variant based on position
  let animateVariant = 'hidden';
  if (index === 0) animateVariant = 'front';
  else if (index === 1) animateVariant = 'middle';
  else if (index === 2) animateVariant = 'back';

  return (
    <motion.div
      style={{
        width: '300px',
        height: '450px',
        position: 'absolute',
        x: index === 0 ? x : 0,
        rotate: index === 0 ? rotate : 0,
        opacity: index === 0 ? opacity : undefined,
        cursor: index === 0 ? 'grab' : 'default',
        perspective: 1000,
      }}
      variants={variants}
      initial={{ scale: 0.8, opacity: 0, y: 50 }}
      animate={index === 0 ? [animateVariant, { y: [0, -8, 0], transition: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 } }] : animateVariant}
      exit="exit"
      custom={x.get() < 0 ? 'left' : 'right'}
      drag={index === 0 ? 'x' : false}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      whileTap={index === 0 ? { cursor: 'grabbing', scale: 1.02 } : {}}
      className="bg-[#111010] border border-[#d4a052] rounded-[24px] flex items-center justify-center p-8 text-center"
    >
      <div className="absolute top-4 left-4 text-[#d4a052] text-xl opacity-80">✦</div>
      <div className="absolute top-4 right-4 text-[#d4a052] text-xl opacity-80">✦</div>
      <div className="absolute bottom-4 left-4 text-[#d4a052] text-xl opacity-80">✦</div>
      <div className="absolute bottom-4 right-4 text-[#d4a052] text-xl opacity-80">✦</div>
      
      {/* Texture overlay */}
      <div 
        className="absolute inset-0 rounded-[24px] pointer-events-none opacity-15"
        style={{
          backgroundImage: 'url("https://www.transparenttextures.com/patterns/aged-paper.png")',
          backgroundRepeat: 'repeat',
        }}
      />
      
      {/* Decorative border inset */}
      <div className="absolute inset-3 border border-[#d4a052] border-opacity-30 rounded-[18px] pointer-events-none"></div>

      <div className="relative z-10 flex flex-col items-center justify-between h-full py-8">
        <div className="mb-4 opacity-50">
             <span className="text-[#d4a052] text-2xl">☾</span>
        </div>
        
        <p className="font-playfair text-[#f5f0e5] text-xl md:text-2xl font-bold leading-relaxed px-2 drop-shadow-lg">
          {question}
        </p>
        
        <div className="mt-6 flex flex-col items-center gap-2">
            <div className="w-12 h-[1px] bg-[#c08b45] opacity-50"></div>
            <p className="text-[#c08b45] text-[10px] uppercase tracking-[0.3em] font-mulish font-semibold">
                Deep Talk
            </p>
        </div>
      </div>
    </motion.div>
  );
};

export default function CoupleQuestions() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setQuestions(shuffle(coupleQuestions));
  }, []);

  const handleSwipe = () => {
    setCurrentIndex((prev) => (prev + 1) % questions.length);
  };
  
  // Need at least a few cards to show the stack effect properly
  // We'll render the current card and the next 2 cards
  const visibleQuestions = [];
  if (questions.length > 0) {
      for (let i = 0; i < 3; i++) {
          visibleQuestions.push({
              question: questions[(currentIndex + i) % questions.length],
              id: (currentIndex + i) % questions.length
          });
      }
  }

  return (
    <>
      <Metadata
        title="Couple Questions - Deep Talk"
        description="Những câu hỏi sâu sắc giúp các cặp đôi hiểu nhau hơn."
        image="/tarot.jpeg"
      />
      <div className="min-h-screen bg-[#0b0a0a] flex flex-col font-sans overflow-hidden">
        <AppNavbar />

        <div className="flex-1 flex flex-col items-center justify-center relative py-12 px-4 mt-8 md:mt-0">
          <div className="text-center z-10 mb-8">
             <h1 className="font-playfair text-[#f5f0e5] text-3xl sm:text-4xl tracking-wider mb-3 drop-shadow-md">
                COUPLE QUESTIONS
             </h1>
             <p className="font-mulish text-[#c08b45] text-xs sm:text-sm tracking-[0.4em] uppercase opacity-90">
                Hiểu nhau sâu sắc hơn
             </p>
          </div>

          <div className="relative w-[300px] h-[450px] flex items-center justify-center">
            <AnimatePresence>
             {visibleQuestions.slice().reverse().map((item, index) => {
                 // index 0 in map result will be the bottom-most card (back-most)
                 // because we reversed. 
                 // So if array len is 3:
                 // map index 0 -> original index 2 (back)
                 // map index 1 -> original index 1 (middle)
                 // map index 2 -> original index 0 (front - visibleQuestions[0])
                 
                 // We want to pass the "stack position" index to the component.
                 // The front card should have stackIndex 0.
                 const stackIndex = visibleQuestions.length - 1 - index;
                 
                  return (
                    <CardStack
                      key={item.id} 
                      question={item.question}
                      index={stackIndex} // 0 is front
                      onSwipe={handleSwipe}
                    />
                  );
              })}
            </AnimatePresence>
          </div>

          <div className="mt-12 flex gap-8 z-10">
             <Button
                variant="bordered"
                className="border-[#d4a052] text-[#d4a052] hover:bg-[#d4a052] hover:text-[#0b0a0a] rounded-full w-14 h-14 flex items-center justify-center transition-colors"
                onClick={handleSwipe}
                aria-label="Previous"
             >
                <span className="text-xl">✕</span>
             </Button>
             
             <Button
                variant="bordered"
                className="bg-[#d4a052] text-[#0b0a0a] hover:bg-[#c08b45] border-none rounded-full w-14 h-14 flex items-center justify-center shadow-[0_0_20px_rgba(212,160,82,0.3)] transition-colors"
                onClick={handleSwipe}
                aria-label="Next"
             >
                <span className="text-xl">➜</span>
             </Button>
          </div>
          
           <p className="mt-8 text-white/30 text-xs tracking-widest font-mulish uppercase">
              Swipe or click to next
           </p>
        </div>

        <Footer />
      </div>
    </>
  );
}
