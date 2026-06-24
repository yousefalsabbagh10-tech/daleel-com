import React from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Home, Sparkles as Star, Bell, UserRound as UserIcon, PlusCircle, Search, ChevronRight, Heart, Calculator, TrendingUp } from 'lucide-react';
import { cn } from '../lib/utils';
import { useAuth } from '../context/AuthContext';
import { useAds } from '../context/AdsContext';
import { ComparisonTray } from './ComparisonTray';

export function Layout() {
  const { user } = useAuth();
  const { favorites, unreadNotificationsCount } = useAds();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  
  const navItems = [
    { to: "/", icon: Home, label: "الرئيسية" },
    { to: "/featured", icon: Star, label: "المميزة" },
    { to: "/favorites", icon: Heart, label: "المفضلة", count: favorites.length },
    { to: "/notifications", icon: Bell, label: "الإشعارات", count: unreadNotificationsCount },
  ];

  const bottomNavItems = [
    { to: "/", icon: Home, label: "الرئيسية" },
    { to: "/featured", icon: Star, label: "المميزة" },
    { type: "add" as const }, // Special central item
    { to: "/notifications", icon: Bell, label: "الإشعارات" },
    { to: "/favorites", icon: Heart, label: "المفضلة" },
  ];

  return (
    <div className="flex flex-col min-h-screen pb-20 md:pb-0 relative bg-[var(--color-bg-secondary)]">
      {/* Conditionally Render Top Header */}
      {pathname === '/login' ? (
        <header className="bg-[#244b70] text-white sticky top-0 z-50 h-15 shadow-sm border-b border-[#1e3c5a] flex items-center px-4 md:px-6">
          <div className="w-full max-w-7xl mx-auto flex justify-between items-center" dir="ltr">
            {/* Custom Brand Logo on the left */}
            <div 
              className="bg-[#fcca03] text-black font-extrabold px-3 py-1.5 rounded-[4px] text-[18px] tracking-wide cursor-pointer flex items-center select-none shadow-sm hover:brightness-105 active:scale-95 transition-all text-center leading-none" 
              onClick={() => navigate('/')}
              style={{ fontFamily: 'Tajawal, sans-serif' }}
            >
              سيريازيل
            </div>
            
            {/* Back button (RTL back arrow) on the right */}
            <button 
              onClick={() => navigate('/')}
              className="text-white hover:bg-white/10 p-2 rounded-full transition-all flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95"
            >
              <ChevronRight size={24} className="stroke-[2.5]" />
            </button>
          </div>
        </header>
      ) : (
        <header className="bg-[var(--color-primary)] text-white sticky top-0 z-50 py-3 px-4 md:px-6 shadow-md">
          <div className="max-w-7xl mx-auto flex justify-between items-center h-12">
            
            {/* Right side (RTL): Logo & Navigation */}
            <div className="w-full md:w-auto flex justify-center md:justify-start items-center gap-6 lg:gap-10">
              {/* Logo */}
              <div 
                className="flex items-center cursor-pointer transition-opacity hover:opacity-90 bg-white px-3 py-1.5 rounded-lg shadow-sm"
                onClick={() => navigate('/')}
                dir="ltr"
              >
                {/* Logo SVG */}
                <div className="shrink-0 flex items-center w-8 h-8 mr-3">
                  <svg viewBox="0 0 60 70" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 5 C35 -2 50 1 50 15 C50 15 15 20 15 45 C15 65 30 70 30 70 C15 70 0 60 0 45 C0 20 20 5 20 5 Z" fill="#0d6efd" />
                    <rect x="23" y="18" width="10" height="52" fill="#0d6efd" />
                    <rect x="36" y="28" width="9" height="42" fill="#0d6efd" />
                    <path d="M48 40 C48 40 60 45 60 55 C60 65 48 70 48 70 Z" fill="#0d6efd" />
                  </svg>
                </div>
                
                <div className="flex flex-col border-l border-gray-200 pl-3">
                  <span className="text-[20px] font-bold tracking-tight text-[#0d6efd] leading-none mb-1 text-left" style={{ fontFamily: 'Arial, sans-serif' }}>Syriazeel</span>
                  <span className="text-[9px] text-gray-500 tracking-wider font-semibold leading-none text-left" style={{ fontFamily: 'Arial, sans-serif' }}>Properties & Cars in Syria</span>
                </div>
              </div>

              {/* Desktop Navigation Links */}
              <nav className="hidden md:flex items-center gap-6">
                {navItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) =>
                      cn(
                        "flex items-center gap-1.5 text-[15px] font-medium transition-colors hover:text-white/80",
                        isActive ? "text-white opacity-100" : "text-blue-100 opacity-90"
                      )
                    }
                  >
                    <item.icon size={18} className="fill-current" />
                    <span>{item.label}</span>
                    {item.count !== undefined && item.count > 0 && (
                      <span className="bg-rose-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold ml-1">
                        {item.count}
                      </span>
                    )}
                  </NavLink>
                ))}
              </nav>
            </div>

             {/* Left side (RTL): Actions */}
            <div className="hidden md:flex items-center gap-3 sm:gap-5">
              {/* User Profile */}
              <div 
                className="flex items-center gap-1.5 text-[15px] font-medium cursor-pointer hover:text-white/80 transition-colors hidden sm:flex"
                onClick={() => navigate('/login')}
              >
                <UserIcon size={20} className="fill-current opacity-90" />
                <span>{user ? user.phone : 'تسجيل الدخول'}</span>
              </div>

              {/* Add Ad Button */}
              <button 
                onClick={() => navigate('/create-ad')}
                className="hidden sm:flex items-center gap-1.5 bg-white text-[#30587b] px-4 py-2 rounded-md font-bold text-[14px] hover:bg-gray-50 transition-colors shadow-sm"
              >
                <PlusCircle size={18} />
                أضف إعلان
              </button>
            </div>
          </div>
        </header>
      )}

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
        <Outlet />
        <ComparisonTray />
      </main>



      {/* Bottom Navigation for Mobile */}
      <nav className="fixed bottom-0 w-full bg-white border-t border-gray-100 pb-safe z-50 md:hidden shadow-[0_-4px_10px_rgba(0,0,0,0.02)]">
        <div className="flex justify-around items-center h-16">
          {bottomNavItems.map((item, index) => {
            if ('type' in item && item.type === "add") {
              return (
                <button
                  key="add-btn"
                  onClick={() => navigate('/create-ad')}
                  className="flex flex-col items-center justify-center w-full h-full relative -top-3 cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-full bg-[#244b70] border-4 border-white flex items-center justify-center text-white shadow-md hover:scale-105 transition-transform">
                    <PlusCircle size={22} className="stroke-[2.5]" />
                  </div>
                </button>
              );
            }

            const navItem = item as { to: string; icon: any; label: string };
            return (
              <NavLink
                key={navItem.to}
                to={navItem.to}
                className={({ isActive }) =>
                  cn(
                    "flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors relative",
                    isActive ? "text-[#244b70] font-bold" : "text-gray-500 hover:text-gray-950"
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <navItem.icon size={20} className={cn("transition-transform duration-200", isActive && "scale-110 text-[#244b70] stroke-[2.5]")} />
                    <span className="text-[9px] font-bold tracking-tight">{navItem.label}</span>
                    {navItem.label === "المفضلة" && favorites.length > 0 && (
                      <span className="absolute top-1 right-1/2 translate-x-4 bg-rose-500 text-white font-bold text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
                        {favorites.length}
                      </span>
                    )}
                    {navItem.label === "الإشعارات" && unreadNotificationsCount > 0 && (
                      <span className="absolute top-1 right-1/2 translate-x-4 bg-rose-500 text-white font-bold text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
                        {unreadNotificationsCount}
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
