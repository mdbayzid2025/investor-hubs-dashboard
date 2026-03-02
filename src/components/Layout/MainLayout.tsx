import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from '../Shared/Navbar';

import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

AOS.init({
  duration: 700,
  easing: "ease-out-cubic",
  once: true,
  mirror: false,
});

export default function DashboardLayout() {
  const location = useLocation();

  useEffect(() => {
    AOS.refresh();
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen bg-[#0A0A0A] text-white">
      <Sidebar />

      {/* Main content area — pushed by sidebar on large screens */}
      <div className="flex-1 flex flex-col w-[calc(100vw-305px)] transition-all duration-300">
        <Navbar />

        <main className="flex-1 p-6 md:p-8 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}