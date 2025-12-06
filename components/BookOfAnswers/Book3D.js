import { motion } from 'framer-motion';

export default function Book3D({ state, answer, onBookClick }) {
  // state: 'IDLE', 'GUIDE', 'READY', 'ANALYZING', 'OPENING', 'REVEALED', 'RESETTING'
  
  const isOpen = state === 'REVEALED' || state === 'OPENING';
  const isAnalyzing = state === 'ANALYZING';

  return (
    <div className="relative perspective-[1500px] w-64 h-80 sm:w-80 sm:h-96 max-w-[85vw] cursor-pointer group" onClick={onBookClick}>
      {/* 
        Container Rotation:
        This container holds the entire book. 
        We only vibrate/move it during 'ANALYZING'.
        We DO NOT rotate it to open the book; we rotate the cover instead.
      */}
      <motion.div
        className="relative w-full h-full transform-style-3d bg-transparent"
        animate={{
          rotateX: isAnalyzing ? [0, 2, -2, 2, 0] : 0,
          y: isAnalyzing ? [0, -5, 5, -5, 0] : 0,
        }}
        transition={{
          rotateX: { repeat: isAnalyzing ? Infinity : 0, duration: 0.2 },
          y: { repeat: isAnalyzing ? Infinity : 0, duration: 0.5 }
        }}
      >
        {/* ================= BACK LEAF (Static Base) ================= */}
        {/* This represents the back cover + the page with the answer. It stays stationary (relative to spine) */}
        
        {/* Back Cover Exterior (The back of the book) */}
        <div 
          className="absolute inset-0 bg-[#1a1a1a] border-4 border-[#c08b45] rounded-l-lg shadow-xl"
          style={{ 
            // Pushed back slightly so the front cover sits on top when closed
            transform: 'translateZ(0px)',
            backgroundImage: 'linear-gradient(-45deg, #1a1a1a 80%, #2a2a2a 100%)'
          }}
        />

        {/* Inside Right (The Page with Answer) - Sits ON TOP of the Back Cover */}
        <div 
          className="absolute inset-0 bg-[#f5f0e5] rounded-r-lg shadow-inner flex items-center justify-center p-8 text-center"
          style={{ 
            transform: 'translateZ(1px)', // Slightly above back cover
            backgroundImage: 'url("https://www.transparenttextures.com/patterns/cream-paper.png")',
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
          
          {/* Inner shadow for depth near spine */}
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black/20 to-transparent pointer-events-none" />
        </div>


        {/* ================= FRONT LEAF (Animated Cover) ================= */}
        {/* This group rotates -160deg to open the book */}
        <motion.div
          className="absolute inset-0 transform-style-3d origin-left"
          animate={{
            rotateY: isOpen ? -160 : 0
          }}
          transition={{
            rotateY: { duration: 1.5, ease: "easeInOut" }
          }}
          style={{ zIndex: 20 }}
        >
          {/* Front Cover (Exterior) */}
          <div 
            className="absolute inset-0 bg-[#1a1a1a] border-4 border-[#c08b45] rounded-r-lg shadow-xl backface-hidden flex flex-col items-center justify-center p-6 text-center"
            style={{ 
              backgroundImage: 'linear-gradient(45deg, #1a1a1a 80%, #2a2a2a 100%)',
              boxShadow: 'inset 5px 0 15px rgba(0,0,0,0.5), -5px 0 15px rgba(0,0,0,0.5)',
              transform: 'rotateY(0deg) translateZ(2px)' // Sit mainly on top
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
            
            {/* Spine Highlight on Cover */}
            <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-black/60 to-transparent pointer-events-none" />
          </div>

          {/* Inside Left (Back of Front Cover) */}
          <div 
            className="absolute inset-0 bg-[#1a1a1a] rounded-l-lg backface-hidden"
             style={{ 
              transform: 'rotateY(180deg) translateZ(1px)',
              background: '#f5f0e5' // Paper color
            }}
          >
             {/* Paper texture/look for inside left */}
             <div className="absolute inset-0 bg-[#f5f0e5] opacity-100 rounded-l-md border-r border-[#ddd]"
                  style={{
                    backgroundImage: 'url("https://www.transparenttextures.com/patterns/cream-paper.png")',
                  }}
             >
                {/* Empty page or maybe some mystical pattern */}
                <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-black/10 to-transparent pointer-events-none" />
             </div>
          </div>
        </motion.div>

        {/* Use a separate div for pages thickness effect if needed, but simple is better for now */}
        
      </motion.div>
      
      {/* Shadow underneath */}
      <div className="absolute -bottom-12 left-0 right-0 h-4 bg-black/40 blur-xl rounded-full transform scale-x-90" />
    </div>
  );
}
