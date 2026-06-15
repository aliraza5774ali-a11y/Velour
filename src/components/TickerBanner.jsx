import React from 'react';

const TICKER_MESSAGES = [
  "Black Friday Sale — 50% Off",
  "Free Shipping on Orders Over $150",
  "New Winter Collection Just Dropped",
  "Exclusive Members Get Early Access",
];

export default function TickerBanner() {
  const repeated = [...TICKER_MESSAGES, ...TICKER_MESSAGES, ...TICKER_MESSAGES, ...TICKER_MESSAGES];
  
  return (
    <div className="h-9 overflow-hidden flex items-center border-b border-white/[0.08] bg-[#0a0a0a]">
      <div className="flex whitespace-nowrap animate-[ticker_22s_linear_infinite]">
        {repeated.map((msg, i) => (
          <span key={i} className="px-[60px] text-[11px] tracking-[0.15em] uppercase text-white/55 font-medium flex items-center gap-3">
            <span className="w-[3px] h-[3px] rounded-full bg-[#c9a96e] inline-block" />
            {msg}
          </span>
        ))}
      </div>
    </div>
  );
}