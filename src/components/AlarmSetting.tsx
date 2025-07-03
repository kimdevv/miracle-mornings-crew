
import React, { useState } from 'react';
import { Clock } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface AlarmSettingProps {
  user: any;
  setUser: (user: any) => void;
}

const AlarmSetting = ({ user, setUser }: AlarmSettingProps) => {
  const [selectedHour, setSelectedHour] = useState('06');
  const [selectedMinute, setSelectedMinute] = useState('30');
  const [repeatInterval, setRepeatInterval] = useState(0); // 0은 반복 없음, 5는 5분 간격
  const [customSound, setCustomSound] = useState(false);
  const penaltyAmount = 1000; // 오늘 실패시 차감될 금액

  // 시간 옵션 생성 (5-8시)
  const hourOptions = ['05', '06', '07', '08'];
  
  // 분 옵션 생성 (00-59분)
  const minuteOptions = Array.from({ length: 60 }, (_, i) => 
    i.toString().padStart(2, '0')
  );

  const handleSetAlarm = () => {
    if (user.credits < 5000) {
      alert('크레딧이 부족합니다! 최소 5,000원이 필요해요.');
      return;
    }
    
    const repeatText = repeatInterval > 0 ? ` (${repeatInterval}분 간격 반복)` : '';
    alert(`알람이 설정되었습니다! 내일 ${selectedHour}:${selectedMinute}${repeatText}에 만나요! 💪`);
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

      {/* 시간 선택 */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-pink-100">
        <h3 className="font-bold text-gray-800 mb-4 flex items-center">
          <span className="text-purple-500 mr-2">⏰</span>
          알람 시간 선택
        </h3>
        
        <div className="space-y-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-purple-600 mb-2">
              {selectedHour}:{selectedMinute}
            </div>
            <p className="text-sm text-gray-600">선택된 알람 시간</p>
          </div>
          
          <div className="flex space-x-4 justify-center">
            <div className="flex-1">
              <label className="block text-sm font-bold text-gray-700 mb-2 text-center">시간</label>
              <Select value={selectedHour} onValueChange={setSelectedHour}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="시간 선택" />
                </SelectTrigger>
                <SelectContent>
                  {hourOptions.map((hour) => (
                    <SelectItem key={hour} value={hour}>
                      {hour}시
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex-1">
              <label className="block text-sm font-bold text-gray-700 mb-2 text-center">분</label>
              <Select value={selectedMinute} onValueChange={setSelectedMinute}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="분 선택" />
                </SelectTrigger>
                <SelectContent className="max-h-60">
                  {minuteOptions.map((minute) => (
                    <SelectItem key={minute} value={minute}>
                      {minute}분
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        <div className="mt-4 p-3 bg-blue-50 rounded-xl">
          <p className="text-sm text-blue-800">
            💡 <strong>선택된 시간:</strong> {selectedHour}:{selectedMinute}
          </p>
          <p className="text-xs text-blue-600 mt-1">
            알람 후 10분 뒤 푸시 알림으로 기상 인증이 시작돼요!
          </p>
        </div>
      </div>

      {/* 알람 반복 설정 */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-pink-100">
        <h3 className="font-bold text-gray-800 mb-4 flex items-center">
          <span className="text-orange-500 mr-2">🔄</span>
          알람 반복 설정
        </h3>
        
        <div className="space-y-3">
          <button 
            onClick={() => setRepeatInterval(0)}
            className={`w-full p-4 rounded-xl text-left transition-all ${
              repeatInterval === 0
                ? 'bg-gradient-to-r from-green-100 to-blue-100 border-2 border-green-300' 
                : 'bg-gray-50 hover:bg-gray-100'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-gray-800">한 번만 울리기</p>
                <p className="text-sm text-gray-600">설정한 시간에 한 번만 알람이 울려요</p>
              </div>
              {repeatInterval === 0 && <span className="text-green-500">✅</span>}
            </div>
          </button>
          
          <button 
            onClick={() => setRepeatInterval(5)}
            className={`w-full p-4 rounded-xl text-left transition-all ${
              repeatInterval === 5
                ? 'bg-gradient-to-r from-orange-100 to-pink-100 border-2 border-orange-300' 
                : 'bg-gray-50 hover:bg-gray-100'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-gray-800">5분 간격 반복</p>
                <p className="text-sm text-gray-600">기상 인증까지 5분마다 반복해서 울려요</p>
              </div>
              {repeatInterval === 5 && <span className="text-orange-500">✅</span>}
            </div>
          </button>
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
        
        <div className="flex items-center justify-center p-4 bg-white rounded-xl">
          <div className="text-center">
            <span className="text-3xl font-bold text-red-600">-{penaltyAmount.toLocaleString()}원</span>
            <p className="text-sm text-gray-700 mt-1">오늘 기상 실패시 차감 금액</p>
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
            <p><strong>알람 시간:</strong> 내일 {selectedHour}:{selectedMinute}</p>
            <p><strong>반복 설정:</strong> {repeatInterval === 0 ? '한 번만' : '5분 간격 반복'}</p>
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
