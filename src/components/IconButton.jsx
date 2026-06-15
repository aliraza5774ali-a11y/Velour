export default function IconButton({ children, onClick, ariaLabel }) {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      className="w-9 h-9 flex items-center justify-center rounded-full border border-white/15 bg-transparent text-white/70 cursor-pointer transition-all duration-200 hover:bg-white/[0.08] hover:border-white/30 hover:text-white"
    >
      {children}
    </button>
  );
}