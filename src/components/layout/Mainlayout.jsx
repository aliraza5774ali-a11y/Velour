import { Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux.js";
import { closeAllOverlays } from "../../store";

import TickerBanner from "../../components/TickerBanner";
import Navbar from "../../components/Navbar";
import SearchOverlay from "../../components/SearchOverlay";
import CartPanel from "../../components/CarPanel";
import DashboardPanel from "../../components/DashboardPanel";

const MainLayout = () => {
  const dispatch = useAppDispatch();

  const searchOpen = useAppSelector((state) => state.ui.searchOpen);

  return (
    <div className="bg-[#0a0a0a] text-white min-h-screen overflow-x-hidden font-['Inter']">
      <SearchOverlay
        isOpen={searchOpen}
        onClose={() => dispatch(closeAllOverlays())}
      />

      <CartPanel />
      <DashboardPanel />

      <div className="fixed top-0 left-0 right-0 z-[100]">
        <TickerBanner />
        <Navbar />
      </div>

      {/* Current Page */}
      <Outlet />
    </div>
  );
};

export default MainLayout;