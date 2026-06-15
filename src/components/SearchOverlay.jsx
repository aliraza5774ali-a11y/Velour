import { useEffect, useRef } from 'react';
import { SearchIcon } from '../assets/icons/index';

export default function SearchOverlay({ isOpen, onClose }) {
  const inputRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 100);
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (cardRef.current && !cardRef.current.contains(e.target)) {
        onClose();
      }
    };

    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  return (
    <div
      className={`fixed inset-0 z-[400] transition-all duration-300 ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="absolute inset-0 bg-black/60" />
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(201, 169, 110, 0.08) 0%, transparent 70%)',
        }}
      />

      <div className="relative w-full pt-8 sm:pt-10 md:pt-12 lg:pt-14 flex justify-center">
        <div
          ref={cardRef}
          className={`relative mx-4 sm:mx-6 md:mx-8 transition-all duration-300 ${
            isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-4'
          }`}
        >
          <div className="relative flex items-center gap-3 bg-white/10 backdrop-blur-xl rounded-[16px] px-4 py-3 border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.3)] w-full max-w-[280px] sm:max-w-[320px] md:max-w-[380px] lg:max-w-[450px]">
            <div className="flex items-center justify-center text-[#c9a96e]">
              <SearchIcon size={20} className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <input
              ref={inputRef}
              placeholder="Search..."
              autoComplete="off"
              className="bg-transparent text-white placeholder-white/40 text-[14px] sm:text-[16px] font-normal outline-none caret-[#c9a96e] w-full"
            />
          </div>

          <div
            className="absolute inset-0 rounded-[16px] blur-xl -z-10"
            style={{
              background: 'rgba(201, 169, 110, 0.15)',
            }}
          />
        </div>
      </div>
    </div>
  );
}