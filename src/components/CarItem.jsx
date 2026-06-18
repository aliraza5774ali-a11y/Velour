import { useAppDispatch } from '../hooks/useRedux';
import { updateQty, removeItem } from '../store';
import QtyButton from './QtyButton';

export default function CarItem({ item }) {
  const dispatch = useAppDispatch();

  return (
    <div className="flex gap-3 py-3 border-b border-white/[0.04]">
      <div className="w-[72px] h-[88px] rounded-[10px] overflow-hidden shrink-0 bg-[#1a1a1a]">
        <img src={item.img} alt={item.name} className="w-full h-full object-cover rounded-[10px]" />
      </div>
      <div className="flex-1">
        <p className="text-[13px] font-medium leading-[1.4]">{item.name}</p>
        <p className="text-[11px] text-white/40 mt-[3px]">{item.color} · Size {item.size}</p>
        <p className="text-[14px] font-semibold text-[#c9a96e] mt-[6px]">${item.price}</p>
        <div className="flex items-center gap-2 mt-[10px]">
          <QtyButton onClick={() => dispatch(updateQty({ id: item.id, delta: -1 }))}>−</QtyButton>
          <span className="text-[13px] min-w-[20px] text-center">{item.qty}</span>
          <QtyButton onClick={() => dispatch(updateQty({ id: item.id, delta: 1 }))}>+</QtyButton>
          <button onClick={() => dispatch(removeItem(item.id))} className="ml-auto bg-transparent border-none text-red-400/60 cursor-pointer text-[12px] hover:text-red-400 transition-colors">Remove</button>
        </div>
      </div>
    </div>
  );
}