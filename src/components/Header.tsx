
import React from 'react';
import { Bell, Settings } from 'lucide-react';

interface HeaderProps {
  user: {
    name: string;
    credits: number;
    consecutiveDays: number;
  };
}

const Header = ({ user }: HeaderProps) => {
  return (
    <header className="fixed top-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-white/95 backdrop-blur-sm border-b border-pink-100 z-50">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-bold">🌅</span>
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-800">미라클 머닝</h1>
            <p className="text-xs text-gray-500">{user.consecutiveDays}일 연속 성공!</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-400 px-3 py-1 rounded-full">
            <span className="text-white text-sm font-bold">💰 {user.credits.toLocaleString()}원</span>
          </div>
          <button className="p-2 text-gray-600 hover:text-purple-600 transition-colors">
            <Bell size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
