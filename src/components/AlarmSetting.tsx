
import React, { useState } from 'react';
import { Clock } from 'lucide-react';
import { Slider } from '@/components/ui/slider';

interface AlarmSettingProps {
  user: any;
  setUser: (user: any) => void;
}

const AlarmSetting = ({ user, setUser }: AlarmSettingProps) => {
  const [selectedTime, setSelectedTime] = useState('06:30');
  const [customSound, setCustomSound] = useState(false);
  const [penaltyAmount, setPenaltyAmount] = useState(1000);

  // 05:00부터 08:00까지 15분 단위로 시간 생성
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 5; hour <= 8; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        slots.push(timeString);
      }
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();
  const [timeIndex, setTimeIndex] = useState(timeSlots.indexOf(selectedTime));

  const handleTimeChange = (value: number[]) => {
    const newIndex = value[0];
    setTimeIndex(newIndex);
    setSelectedTime(timeSlots[newIndex]);
  };

  const handleSetAlarm = () => {
    if (user.credits < 5000) {
      alert('크레딧이 부족합니다! 최소 5,000원이 필요해요.');
      return;
    }
    
    // 알람 설정 로직
    alert('알람이 설정되었습니다! 내일 아침 화이팅! 💪');
  };

  return (
    <div className="px-4 py-6 space-y-6">
      {/* 헤더 */}
      <div className="text-center">
        <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-4">
          <Clock size={32} className="text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">미라클 알람 설정</h2>
        <p className="text-gray-600">내일 아침을 위한 완벽한 준비!</p>
      </div>

      {/* 크레딧 체크 */}
      <div className={`p-4 rounded-2xl border-2 ${
        user.credits >= 5000 
          ? 'bg-green-50 border-green-200' 
          : 'bg-red-50 border-red-200'
      }`}>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-bold text-gray-800">현재 크레딧</p>
            <p className="text-2xl font-bold text-yellow-600">{user.credits.toLocaleString()}원</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">필요 크레딧</p>
            <p className="font-bold text-gray-800">5,000원 이상</p>
            {user.credits >= 5000 ? (
              <span className="text-green-600 text-sm">✅ 설정 가능</span>
            ) : (
              <span className="text-red-600 text-sm">❌ 크레딧 부족</span>
            )}
          </div>
        </div>
      </div>

      {/* 시간 선택 스크롤 */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-pink-100">
        <h3 className="font-bold text-gray-800 mb-4 flex items-center">
          <span className="text-purple-500 mr-2">⏰</span>
          알람 시간 선택
        </h3>
        
        <div className="space-y-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-purple-600 mb-2">
              {selectedTime}
            </div>
            <p className="text-sm text-gray-600">선택된 알람 시간</p>
          </div>
          
          <div className="px-4">
            <Slider
              value={[timeIndex]}
              onValueChange={handleTimeChange}
              max={timeSlots.length - 1}
              min={0}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>05:00</span>
              <span>06:30</span>
              <span>08:00</span>
            </div>
          </div>
        </div>
        
        <div className="mt-4 p-3 bg-blue-50 rounded-xl">
          <p className="text-sm text-blue-800">
            💡 <strong>선택된 시간:</strong> {selectedTime}
          </p>
          <p className="text-xs text-blue-600 mt-1">
            알람 후 2분 뒤 푸시 알림으로 기상 인증이 시작돼요!
          </p>
        </div>
      </div>

      {/* 알람 소리 설정 */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-pink-100">
        <h3 className="font-bold text-gray-800 mb-4 flex items-center">
          <span className="text-green-500 mr-2">🎵</span>
          알람 소리 설정
        </h3>
        
        <div className="space-y-3">
          <button 
            onClick={() => setCustomSound(false)}
            className={`w-full p-4 rounded-xl text-left transition-all ${
              !customSound 
                ? 'bg-gradient-to-r from-green-100 to-blue-100 border-2 border-green-300' 
                : 'bg-gray-50 hover:bg-gray-100'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-gray-800">기본 알람 소리</p>
                <p className="text-sm text-gray-600">미라클 머닝 전용 기상송 🎶</p>
              </div>
              {!customSound && <span className="text-green-500">✅</span>}
            </div>
          </button>
          
          <button 
            onClick={() => setCustomSound(true)}
            className={`w-full p-4 rounded-xl text-left transition-all ${
              customSound 
                ? 'bg-gradient-to-r from-purple-100 to-pink-100 border-2 border-purple-300' 
                : 'bg-gray-50 hover:bg-gray-100'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-gray-800">나만의 음원 업로드</p>
                <p className="text-sm text-gray-600">좋아하는 노래로 기상하기 🎧</p>
              </div>
              {customSound && <span className="text-purple-500">✅</span>}
            </div>
          </button>
          
          {customSound && (
            <div className="mt-3 p-4 bg-purple-50 rounded-xl">
              <button className="w-full py-3 bg-purple-500 text-white rounded-xl font-bold hover:bg-purple-600 transition-all">
                📁 음원 파일 선택하기
              </button>
              <p className="text-xs text-purple-600 mt-2 text-center">
                MP3, WAV 파일만 업로드 가능 (최대 10MB)
              </p>
            </div>
          )}
        </div>
      </div>

      {/* 벌칙 안내 */}
      <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-5 border border-red-200">
        <h3 className="font-bold text-gray-800 mb-3 flex items-center">
          <span className="text-red-500 mr-2">⚠️</span>
          기상 실패 시 벌칙
        </h3>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-white rounded-xl">
            <span className="text-gray-700">첫 번째 실패</span>
            <span className="font-bold text-red-600">-1,000원</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-white rounded-xl">
            <span className="text-gray-700">연속 실패 시</span>
            <span className="font-bold text-red-600">전날의 2배 차감</span>
          </div>
        </div>
        
        <div className="mt-4 p-3 bg-yellow-100 rounded-xl">
          <p className="text-sm text-yellow-800">
            <strong>💡 성공하면:</strong> 실패자들의 크레딧이 성공자들에게 균등 분배됩니다!
          </p>
        </div>
      </div>

      {/* 최종 설정 버튼 */}
      <div className="space-y-4">
        <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-4">
          <h4 className="font-bold text-gray-800 mb-2">📋 설정 요약</h4>
          <div className="space-y-1 text-sm">
            <p><strong>알람 시간:</strong> 내일 {selectedTime}</p>
            <p><strong>알람 소리:</strong> {customSound ? '나만의 음원' : '기본 알람'}</p>
            <p><strong>실패 시 차감:</strong> {penaltyAmount.toLocaleString()}원</p>
          </div>
        </div>
        
        <button
          onClick={handleSetAlarm}
          disabled={user.credits < 5000}
          className={`w-full py-4 rounded-2xl font-bold text-lg transition-all ${
            user.credits >= 5000
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg hover:scale-105'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {user.credits >= 5000 ? '🚀 미라클 알람 설정하기!' : '💰 크레딧이 부족해요'}
        </button>
      </div>
    </div>
  );
};

export default AlarmSetting;
