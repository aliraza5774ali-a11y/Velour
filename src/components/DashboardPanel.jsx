import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { setDashOpen, signOut } from '../store';
import DashSection from './DashSection';
import DashMenuItem from './DashMenuItem';
import { CloseIcon, UserIcon, OrderIcon, HeartIcon, CardIcon, PinIcon, HelpIcon, SignOutIcon } from '../assets/icons';

const ORDERS = [
  { id: "#VL-2024-0891", status: "Delivered", statusClass: "text-emerald-400 bg-emerald-400/10", items: "Arctic Puffer Jacket, Wool Scarf", price: "$289.00" },
  { id: "#VL-2024-0876", status: "Shipped", statusClass: "text-[#c9a96e] bg-[#c9a96e]/10", items: "Casual Knitwear Set, Gloves", price: "$142.00" },
];

export default function DashboardPanel() {
  const isOpen = useAppSelector((state) => state.ui.dashOpen);
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();

  if (!isLoggedIn) {
    return (
      <>
        <div className={`fixed inset-0 bg-black/60 z-[200] transition-opacity duration-300 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`} />
        <div className={`fixed top-0 right-0 bottom-0 w-[420px] bg-[#0d0d0d] border-l border-white/[0.07] z-[300] flex flex-col items-center justify-center gap-6 transition-transform duration-350 ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
          <button onClick={() => dispatch(setDashOpen(false))} className="absolute top-4 right-4 w-8 h-8 bg-black/40 border border-white/10 rounded-full flex items-center justify-center cursor-pointer text-white/70 hover:text-white transition-colors"><CloseIcon size={14} /></button>
          <p className="text-white/40 text-sm">Sign in to access your account</p>
          <button onClick={() => dispatch(setDashOpen(false))} className="h-11 px-8 bg-white text-black text-[12px] font-semibold tracking-[0.08em] uppercase rounded-full cursor-pointer hover:bg-[#f8f8f6] transition-colors">Sign In</button>
        </div>
      </>
    );
  }

  return (
    <>
      <div className={`fixed inset-0 bg-black/60 z-[200] transition-opacity duration-300 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`} />
      <div className={`fixed top-0 right-0 bottom-0 w-[420px] bg-[#0d0d0d] border-l border-white/[0.07] z-[300] flex flex-col overflow-y-auto transition-transform duration-350 ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="h-[100px] bg-gradient-to-br from-[#1a1205] to-[#3a2810] relative overflow-hidden shrink-0">
          <div className="absolute inset-0 opacity-15" style={{ backgroundImage: "repeating-linear-gradient(45deg,#c9a96e 0,#c9a96e 1px,transparent 0,transparent 50%)", backgroundSize: "12px 12px" }} />
          <button onClick={() => dispatch(setDashOpen(false))} className="absolute top-4 right-4 w-8 h-8 bg-black/40 border border-white/10 rounded-full flex items-center justify-center cursor-pointer text-white/70 hover:bg-black/70 hover:text-white transition-all"><CloseIcon size={14} /></button>
        </div>

        <div className="px-6 -mt-7 flex items-end gap-[14px] mb-4">
          <div className="w-14 h-14 rounded-full border-[3px] border-[#0d0d0d] bg-gradient-to-br from-[#c9a96e] to-[#a8863f] flex items-center justify-center text-[20px] font-bold text-black shrink-0">{user?.avatar}</div>
          <div>
            <p className="text-[18px] font-bold pt-[10px]">{user?.name}</p>
            <p className="text-[12px] text-white/40 mt-0.5">{user?.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 px-6 pb-5 border-b border-white/[0.06]">
          {[["12", "Orders"], ["4", "Wishlist"], ["Gold", "Status"]].map(([val, label]) => (
            <div key={label} className="bg-[#161616] rounded-xl p-[14px] text-center">
              <p className={`text-[22px] font-bold ${label === "Status" ? "text-[#c9a96e]" : "text-white"}`}>{val}</p>
              <p className="text-[10px] tracking-[0.08em] uppercase text-white/35 mt-[3px]">{label}</p>
            </div>
          ))}
        </div>

        <DashSection title="Account">
          <DashMenuItem icon={<UserIcon />} label="Profile Settings" />
          <DashMenuItem icon={<OrderIcon />} label="My Orders" badge={2} />
          <DashMenuItem icon={<HeartIcon />} label="Saved Items" badge={4} />
          <DashMenuItem icon={<CardIcon />} label="Payment Methods" />
          <DashMenuItem icon={<PinIcon />} label="Delivery Addresses" />
        </DashSection>

        <DashSection title="Recent Orders">
          {ORDERS.map((order) => (
            <div key={order.id} className="bg-[#161616] rounded-xl p-[14px] mb-2">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[12px] font-semibold text-white/80">{order.id}</span>
                <span className={`text-[10px] px-[9px] py-[3px] rounded-full font-semibold tracking-[0.06em] ${order.statusClass}`}>{order.status}</span>
              </div>
              <p className="text-[11px] text-white/40 mb-[6px]">{order.items}</p>
              <p className="text-[14px] font-bold">{order.price}</p>
            </div>
          ))}
        </DashSection>

        <DashSection title="Support" className="pb-7">
          <DashMenuItem icon={<HelpIcon />} label="Help Center" />
          <DashMenuItem icon={<SignOutIcon />} label="Sign Out" className="text-red-400/70 hover:text-red-400" onClick={() => dispatch(signOut())} />
        </DashSection>
      </div>
    </>
  );
}