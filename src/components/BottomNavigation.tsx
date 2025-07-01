
import React from 'react';
import { Clock, CreditCard, Star, Users, Calendar } from 'lucide-react';

interface BottomNavigationProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

const BottomNavigation = ({ currentPage, setCurrentPage }: BottomNavigationProps) => {
  const navItems = [
    { id: 'dashboard', icon: Calendar, label: '홈', color: 'text-pink-500' },
    { id: 'alarm', icon: Clock, label: '알람', color: 'text-purple-500' },
    { id: 'credits', icon: CreditCard, label: '크레딧', color: 'text-yellow-500' },
    { id: 'character', icon: Star, label: '캐릭터', color: 'text-blue-500' },
    { id: 'community', icon: Users, label: '커뮤니티', color: 'text-green-500' },
  ];

  return (
    <nav className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-white border-t border-pink-100 px-2 py-2">
      <div className="flex justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              className={`flex flex-col items-center py-2 px-3 rounded-xl transition-all ${
                isActive 
                  ? `${item.color} bg-gradient-to-t from-pink-50 to-purple-50 scale-105` 
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <Icon size={20} className={isActive ? 'animate-bounce' : ''} />
              <span className="text-xs mt-1 font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavigation;
