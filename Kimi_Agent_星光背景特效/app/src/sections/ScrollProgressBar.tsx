import { useScrollProgress } from '../hooks/usePlayfulScrollAnimation';

export default function ScrollProgressBar() {
  const { progress } = useScrollProgress();

  return (
    <>
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-[100] h-1.5 bg-gradient-to-r from-[#F5A623]/20 via-[#1B2A47]/20 to-[#FF8B7B]/20">
        <div
          className="h-full bg-gradient-to-r from-[#F5A623] via-[#1B2A47] to-[#FF8B7B] transition-all duration-300 ease-out"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      {/* Floating scroll indicator */}
      <div 
        className="fixed top-6 right-4 z-[100] w-10 h-10 rounded-full glass flex items-center justify-center transition-all duration-300 pointer-events-none"
        style={{
          opacity: progress > 0.05 ? 1 : 0,
          transform: `translateY(${progress > 0.05 ? 0 : -20}px)`,
        }}
      >
        <span className="text-xs font-bold text-[#1B2A47]">{Math.round(progress * 100)}%</span>
      </div>
    </>
  );
}
