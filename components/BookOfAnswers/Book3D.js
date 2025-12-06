import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function Book3D({ state, answer, onBookClick }) {
  // state: 'IDLE', 'GUIDE', 'READY', 'ANALYZING', 'OPENING', 'REVEALED', 'RESETTING'
  
  const isOpen = state === 'REVEALED' || state === 'OPENING';
  const isAnalyzing = state === 'ANALYZING';

  return (
    <div className="relative perspective-[1500px] w-64 h-80 sm:w-80 sm:h-96 max-w-[85vw] cursor-pointer group" onClick={onBookClick}>
      <motion.div
        className="relative w-full h-full transform-style-3d transition-transform duration-1000"
        animate={{
          rotateY: isOpen ? -160 : 0,
          rotateX: isAnalyzing ? [0, 2, -2, 2, 0] : 0,
          y: isAnalyzing ? [0, -5, 5, -5, 0] : 0,
        }}
        transition={{
          rotateY: { duration: 1.5, ease: "easeInOut" },
          rotateX: { repeat: isAnalyzing ? Infinity : 0, duration: 0.2 },
          y: { repeat: isAnalyzing ? Infinity : 0, duration: 0.5 }
        }}
      >
        {/* Front Cover */}
        <div 
          className="absolute inset-0 bg-[#1a1a1a] border-4 border-[#c08b45] rounded-r-lg shadow-xl backface-hidden flex flex-col items-center justify-center p-6 text-center transform-style-3d origin-left z-20"
          style={{ 
            backgroundImage: 'linear-gradient(45deg, #1a1a1a 80%, #2a2a2a 100%)',
            boxShadow: 'inset 5px 0 15px rgba(0,0,0,0.5), -5px 0 15px rgba(0,0,0,0.5)'
          }}
        >
          <div className="border border-[#c08b45]/50 w-full h-full flex flex-col items-center justify-center p-4">
            <h1 className="text-[#c08b45] font-serif text-3xl sm:text-4xl mb-2 tracking-widest drop-shadow-md">
              THE BOOK
            </h1>
            <p className="text-[#888] text-xs tracking-[0.4em] uppercase">
              OF ANSWERS
            </p>
            <div className="w-12 h-12 mt-8 rounded-full border border-[#c08b45]/30 flex items-center justify-center">
              <div className="w-8 h-8 rounded-full border border-[#c08b45]/60" />
            </div>
            
            {state === 'READY' && (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute bottom-10 text-[#c08b45]/80 text-xs tracking-widest animate-pulse"
              >
                CHẠM ĐỂ HỎI
              </motion.p>
            )}
          </div>
          
          {/* Spine Highlight */}
          <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-black/60 to-transparent pointer-events-none" />
        </div>

        {/* Back Cover - Exterior */}
        <div 
          className="absolute inset-0 bg-[#1a1a1a] border-4 border-[#c08b45] rounded-l-lg shadow-xl backface-hidden transform-style-3d origin-right z-10"
          style={{ 
            transform: 'rotateY(180deg) translateZ(1px)', // Slight offset to prevent z-fighting
             backgroundImage: 'linear-gradient(-45deg, #1a1a1a 80%, #2a2a2a 100%)'
          }}
        >
             <div className="absolute right-0 top-0 bottom-0 w-4 bg-gradient-to-l from-black/60 to-transparent pointer-events-none" />
        </div>

        {/* Pages Block (Thickness) */}
        <div 
          className="absolute top-1 bottom-1 right-0 w-10 bg-[#e3d5b8] transform origin-right"
          style={{ 
            transform: 'rotateY(90deg) translateZ(-2px)',
            background: 'linear-gradient(to right, #ccc 1px, transparent 1px) repeat-x',
            backgroundSize: '2px 100%'
          }} 
        />

        {/* Inside Left (Back of Front Cover) */}
        <div 
          className="absolute inset-0 bg-[#1a1a1a] rounded-l-lg backface-hidden transform-style-3d z-10"
          style={{ transform: 'rotateY(180deg)' }}
        >
             {/* Paper texture overlay */}
             <div className="absolute inset-2 bg-[#f5f0e5] opacity-5 rounded-l-md" />
        </div>

        {/* Inside Right (Actual Page with Answer) */}
        <div 
          className="absolute inset-0 bg-[#f5f0e5] rounded-r-lg shadow-inner z-0 flex items-center justify-center p-8 text-center"
          style={{ 
            transform: 'translateZ(-1px)',
            backgroundImage: 'url("https://www.transparenttextures.com/patterns/cream-paper.png")', // Optional subtle texture
          }}
        >
          {state === 'REVEALED' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="relative z-10"
            >
              <h2 className="text-2xl sm:text-3xl font-serif text-[#1a1a1a] leading-relaxed font-bold">
                {answer}
              </h2>
              <div className="mt-8 w-16 h-[1px] bg-[#1a1a1a]/20 mx-auto" />
              <p className="mt-4 text-[#1a1a1a]/40 text-xs tracking-widest uppercase">
                Câu trả lời dành cho bạn
              </p>
            </motion.div>
          )}
          
          {/* Page shadow/gradient for depth */}
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black/20 to-transparent pointer-events-none" />
        </div>

      </motion.div>
      
      {/* Shadow underneath */}
      <div className="absolute -bottom-12 left-0 right-0 h-4 bg-black/40 blur-xl rounded-full transform scale-x-90" />
    </div>
  );
}
