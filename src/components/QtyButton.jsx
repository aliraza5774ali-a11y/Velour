export default function QtyButton({ children, onClick }) {
  return (
    <button onClick={onClick} className="w-6 h-6 rounded-full bg-white/[0.06] border border-white/10 text-white cursor-pointer text-[14px] flex items-center justify-center hover:bg-white/[0.12] transition-colors">
      {children}
    </button>
  );
}