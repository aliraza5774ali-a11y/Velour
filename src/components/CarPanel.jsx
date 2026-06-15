import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { updateQty, removeItem, setCartOpen } from '../store';
import CartItem from './CarItem';

import { CloseIcon } from '../assets/icons/index';

export default function CartPanel() {
  const isOpen = useAppSelector((state) => state.ui.cartOpen);
  const cartItems = useAppSelector((state) => state.cart.items);
  const dispatch = useAppDispatch();

  const total = cartItems.reduce((s, i) => s + i.price * i.qty, 0);
  const count = cartItems.reduce((s, i) => s + i.qty, 0);

  return (
    <>
      <div onClick={() => dispatch(setCartOpen(false))} className={`fixed inset-0 bg-black/60 z-[200] transition-opacity duration-300 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`} />
      <div className={`fixed top-0 right-0 bottom-0 w-[380px] bg-[#111] border-l border-white/[0.08] z-[300] flex flex-col transition-transform duration-350 ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="px-6 py-6 border-b border-white/[0.06] flex items-center justify-between">
          <span className="text-base font-semibold tracking-[0.04em]">
            Your Bag <span className="text-[12px] text-white/35 font-normal">({count} item{count !== 1 ? "s" : ""})</span>
          </span>
          <button onClick={() => dispatch(setCartOpen(false))} className="w-8 h-8 flex items-center justify-center rounded-full bg-white/[0.06] border-none text-white/60 cursor-pointer hover:bg-white/[0.12] hover:text-white transition-all"><CloseIcon /></button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {cartItems.length === 0 ? (
            <p className="text-center py-16 text-white/25 text-[14px]">Your bag is empty</p>
          ) : (
            cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))
          )}
        </div>

        <div className="px-6 py-5 border-t border-white/[0.06]">
          <div className="flex justify-between items-center mb-4">
            <span className="text-[13px] text-white/50">Subtotal</span>
            <span className="text-[18px] font-bold">${total.toFixed(2)}</span>
          </div>
          <button className="w-full h-12 bg-[#c9a96e] text-black text-[13px] font-bold tracking-[0.08em] uppercase border-none rounded-full cursor-pointer transition-all duration-200 hover:bg-[#a8863f] hover:-translate-y-px">
            Checkout →
          </button>
          <p className="text-center text-[11px] text-white/25 mt-[10px]">Free shipping on orders over $150</p>
        </div>
      </div>
    </>
  );
}
