
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainDashboard from '../components/MainDashboard';
import AlarmSetting from '../components/AlarmSetting';
import CreditSystem from '../components/CreditSystem';
import CharacterCustomization from '../components/CharacterCustomization';
import Community from '../components/Community';
import BottomNavigation from '../components/BottomNavigation';
import Header from '../components/Header';

const Index = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [user, setUser] = useState({
    id: 1,
    name: '미라클러',
    credits: 7500,
    consecutiveDays: 5,
    character: {
      type: 'cat',
      accessories: ['hat', 'glasses'],
      color: '#FFB6C1' // 기본 핑크 색상
    },
    userType: 'student' // 'worker', 'student', 'exam-taker'
  });

  const renderCurrentPage = () => {
    switch(currentPage) {
      case 'dashboard':
        return <MainDashboard user={user} setUser={setUser} />;
      case 'alarm':
        return <AlarmSetting user={user} setUser={setUser} />;
      case 'credits':
        return <CreditSystem user={user} setUser={setUser} />;
      case 'character':
        return <CharacterCustomization user={user} setUser={setUser} />;
      case 'community':
        return <Community user={user} />;
      default:
        return <MainDashboard user={user} setUser={setUser} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      <div className="max-w-md mx-auto bg-white min-h-screen shadow-xl">
        <Header user={user} />
        <main className="pb-20 pt-16">
          {renderCurrentPage()}
        </main>
        <BottomNavigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
      </div>
    </div>
  );
};

export default Index;
