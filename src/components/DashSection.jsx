export default function DashSection({ title, children, className = "" }) {
  return (
    <div className={`px-6 pt-5 ${className}`}>
      <p className="text-[10px] tracking-[0.12em] uppercase text-white/30 font-semibold mb-[10px]">{title}</p>
      {children}
    </div>
  );
}