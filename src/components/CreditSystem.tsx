
import React, { useState } from 'react';
import { CreditCard, TrendingUp, TrendingDown, DollarSign } from 'lucide-react';

interface CreditSystemProps {
  user: any;
  setUser: (user: any) => void;
}

const CreditSystem = ({ user, setUser }: CreditSystemProps) => {
  const [activeTab, setActiveTab] = useState('balance');
  
  // 임시 거래 내역 데이터
  const transactions = [
    { id: 1, type: 'success', amount: 1500, date: '2024-01-15', description: '기상 성공 보상' },
    { id: 2, type: 'fail', amount: -1000, date: '2024-01-14', description: '기상 실패 벌칙' },
    { id: 3, type: 'success', amount: 800, date: '2024-01-13', description: '기상 성공 보상' },
    { id: 4, type: 'purchase', amount: -500, date: '2024-01-12', description: '캐릭터 모자 구매' },
  ];

  const handleCashOut = () => {
    if (user.credits >= 10000) {
      alert('현금화 신청이 접수되었습니다! 영업일 기준 3-5일 후 입금됩니다.');
    } else {
      alert('현금화는 10,000원 이상부터 가능합니다.');
    }
  };

  return (
    <div className="px-4 py-6 space-y-6">
      {/* 헤더 */}
      <div className="text-center">
        <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center mx-auto mb-4">
          <CreditCard size={32} className="text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">크레딧 시스템</h2>
        <p className="text-gray-600">성실한 기상의 달콤한 보상!</p>
      </div>

      {/* 현재 크레딧 잔액 */}
      <div className="bg-gradient-to-br from-yellow-100 to-orange-100 rounded-3xl p-6 text-center border border-yellow-200">
        <p className="text-gray-700 mb-2">현재 보유 크레딧</p>
        <p className="text-4xl font-bold text-yellow-600 mb-4">
          {user.credits.toLocaleString()}원
        </p>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/50 rounded-xl p-3">
            <p className="text-sm text-gray-600">이번 달 적립</p>
            <p className="text-lg font-bold text-green-600">+12,500원</p>
          </div>
          <div className="bg-white/50 rounded-xl p-3">
            <p className="text-sm text-gray-600">이번 달 차감</p>
            <p className="text-lg font-bold text-red-600">-3,000원</p>
          </div>
        </div>
      </div>

      {/* 탭 메뉴 */}
      <div className="flex bg-gray-100 rounded-2xl p-1">
        <button
          onClick={() => setActiveTab('balance')}
          className={`flex-1 py-3 px-4 rounded-xl font-bold transition-all ${
            activeTab === 'balance'
              ? 'bg-white text-purple-600 shadow-sm'
              : 'text-gray-600'
          }`}
        >
          잔액 관리
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`flex-1 py-3 px-4 rounded-xl font-bold transition-all ${
            activeTab === 'history'
              ? 'bg-white text-purple-600 shadow-sm'
              : 'text-gray-600'
          }`}
        >
          거래 내역
        </button>
      </div>

      {activeTab === 'balance' && (
        <div className="space-y-6">
          {/* 현금화 */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-pink-100">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center">
              <DollarSign className="text-green-500 mr-2" size={20} />
              현금화 신청
            </h3>
            
            <div className="space-y-4">
              <div className={`p-4 rounded-xl border-2 ${
                user.credits >= 10000 
                  ? 'bg-green-50 border-green-200' 
                  : 'bg-gray-50 border-gray-200'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-gray-800">현금화 가능 금액</span>
                  <span className={`font-bold ${
                    user.credits >= 10000 ? 'text-green-600' : 'text-gray-500'
                  }`}>
                    {user.credits >= 10000 ? (user.credits - (user.credits % 1000)).toLocaleString() : '0'}원
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  {user.credits >= 10000 
                    ? '✅ 현금화 신청이 가능합니다!' 
                    : `❌ ${(10000 - user.credits).toLocaleString()}원 더 필요해요`
                  }
                </p>
              </div>
              
              <button
                onClick={handleCashOut}
                disabled={user.credits < 10000}
                className={`w-full py-4 rounded-xl font-bold transition-all ${
                  user.credits >= 10000
                    ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white hover:shadow-lg'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                💰 현금화 신청하기
              </button>
              
              <div className="text-xs text-gray-500 space-y-1">
                <p>• 최소 현금화 금액: 10,000원</p>
                <p>• 수수료: 무료</p>
                <p>• 처리 시간: 영업일 기준 3-5일</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'history' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-pink-100">
            <h3 className="font-bold text-gray-800 mb-4">최근 거래 내역</h3>
            
            <div className="space-y-3">
              {transactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                      transaction.type === 'success' ? 'bg-green-100' :
                      transaction.type === 'fail' ? 'bg-red-100' : 'bg-blue-100'
                    }`}>
                      {transaction.type === 'success' && <TrendingUp size={16} className="text-green-600" />}
                      {transaction.type === 'fail' && <TrendingDown size={16} className="text-red-600" />}
                      {transaction.type === 'purchase' && <CreditCard size={16} className="text-blue-600" />}
                    </div>
                    <div>
                      <p className="font-bold text-gray-800">{transaction.description}</p>
                      <p className="text-sm text-gray-500">{transaction.date}</p>
                    </div>
                  </div>
                  <span className={`font-bold ${
                    transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.amount > 0 ? '+' : ''}{transaction.amount.toLocaleString()}원
                  </span>
                </div>
              ))}
            </div>
            
            <button className="w-full mt-4 py-3 bg-gray-100 text-gray-600 rounded-xl font-bold hover:bg-gray-200 transition-all">
              더 많은 내역 보기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreditSystem;
