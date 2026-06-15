export default function DashMenuItem({ icon, label, badge, className = "", onClick }) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-3 px-3 py-[11px] rounded-[10px] text-[13px] text-white/65 cursor-pointer transition-all duration-150 mb-0.5 hover:bg-white/[0.05] hover:text-white ${className}`}
    >
      <span className="opacity-60">{icon}</span>
      {label}
      {badge && (
        <span className="ml-auto bg-[#c9a96e] text-black text-[10px] font-bold px-[7px] py-[2px] rounded-full">{badge}</span>
      )}
    </div>
  );
}