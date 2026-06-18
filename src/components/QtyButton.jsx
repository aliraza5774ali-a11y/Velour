export default function QtyButton({ onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-6 h-6 flex items-center justify-center rounded-full bg-white/[0.06] border border-white/10 text-white/70 text-[13px] cursor-pointer hover:bg-white/[0.12] hover:text-white transition-all"
    >
      {children}
    </button>
  );
}