
import React from 'react';

interface MainDashboardProps {
  user: any;
  setUser: (user: any) => void;
}

const MainDashboard = ({ user, setUser }: MainDashboardProps) => {
  const today = new Date();
  const isAlarmSet = true; // 임시로 설정됨
  const nextAlarmTime = "06:30";

  // 임시 데이터 - 오늘 미라클 모닝 참여자 수와 실패자 정보
  const todayParticipants = 1250;
  const todayFailures = 312;
  const totalFailureAmount = todayFailures * 1000; // 실패자 * 1000원
  const todaySuccessUsers = todayParticipants - todayFailures;
  const expectedReward = todaySuccessUsers > 0 ? Math.floor(totalFailureAmount / todaySuccessUsers) : 0;

  // 캐릭터 렌더링 함수
  const renderCharacter = (character: any) => (
    <svg width="80" height="80" viewBox="0 0 100 100" className="animate-bounce">
      <g>
        {/* 고양이 얼굴 */}
        <ellipse cx="50" cy="55" rx="25" ry="20" fill="#FFB6C1" stroke="#FF69B4" strokeWidth="2"/>
        
        {/* 귀 */}
        <path d="M30 40 L35 25 L45 35 Z" fill="#FFB6C1" stroke="#FF69B4" strokeWidth="2"/>
        <path d="M70 40 L65 25 L55 35 Z" fill="#FFB6C1" stroke="#FF69B4" strokeWidth="2"/>
        <path d="M32 35 L37 28 L42 33 Z" fill="#FF1493"/>
        <path d="M68 35 L63 28 L58 33 Z" fill="#FF1493"/>
        
        {/* 눈 */}
        <ellipse cx="42" cy="50" rx="3" ry="4" fill="#000"/>
        <ellipse cx="58" cy="50" rx="3" ry="4" fill="#000"/>
        <ellipse cx="43" cy="49" rx="1" ry="1" fill="#FFF"/>
        <ellipse cx="59" cy="49" rx="1" ry="1" fill="#FFF"/>
        
        {/* 코 */}
        <path d="M48 58 L52 58 L50 62 Z" fill="#FF1493"/>
        
        {/* 입 */}
        <path d="M50 62 Q45 66 40 64" stroke="#FF1493" strokeWidth="2" fill="none"/>
        <path d="M50 62 Q55 66 60 64" stroke="#FF1493" strokeWidth="2" fill="none"/>
        
        {/* 수염 */}
        <line x1="25" y1="55" x2="35" y2="56" stroke="#FF1493" strokeWidth="1"/>
        <line x1="25" y1="60" x2="35" y2="59" stroke="#FF1493" strokeWidth="1"/>
        <line x1="75" y1="55" x2="65" y2="56" stroke="#FF1493" strokeWidth="1"/>
        <line x1="75" y1="60" x2="65" y2="59" stroke="#FF1493" strokeWidth="1"/>
        
        {/* 장착된 아이템들 */}
        {character.accessories.includes('hat') && (
          <>
            <ellipse cx="50" cy="30" rx="20" ry="8" fill="#4169E1"/>
            <ellipse cx="50" cy="25" rx="18" ry="6" fill="#6495ED"/>
            <circle cx="50" cy="20" r="4" fill="#FFD700"/>
          </>
        )}
        
        {character.accessories.includes('glasses') && (
          <>
            <circle cx="42" cy="50" r="8" fill="none" stroke="#000" strokeWidth="2"/>
            <circle cx="58" cy="50" r="8" fill="none" stroke="#000" strokeWidth="2"/>
            <line x1="50" y1="48" x2="50" y2="52" stroke="#000" strokeWidth="2"/>
          </>
        )}
      </g>
    </svg>
  );

  return (
    <div className="px-4 py-6 space-y-6">
      {/* 메인 캐릭터 카드 */}
      <div className="bg-gradient-to-br from-pink-100 to-purple-100 rounded-3xl p-6 text-center">
        <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full flex items-center justify-center">
          {renderCharacter(user.character)}
        </div>
        
        <h2 className="text-xl font-bold text-gray-800 mb-2">
          안녕, {user.name}! 🎉
        </h2>
        <p className="text-gray-600 text-sm">
          {user.consecutiveDays}일 연속 성공 중
        </p>
      </div>

      {/* 오늘의 알람 상태 */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-pink-100">
        <h3 className="font-bold text-gray-800 mb-3 flex items-center">
          <span className="text-purple-500 mr-2">⏰</span>
          오늘의 미라클 알람
        </h3>
        
        {isAlarmSet ? (
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-green-100 rounded-xl">
              <div>
                <p className="font-bold text-green-800">내일 {nextAlarmTime} 알람 설정됨</p>
                <p className="text-sm text-green-600">실패 시 1,000원 차감</p>
              </div>
              <div className="text-2xl">✅</div>
            </div>
            
            <div className="bg-blue-50 rounded-xl p-4">
              <div className="text-center mb-3">
                <p className="text-lg font-bold text-blue-800">예상 성공 보상</p>
                <p className="text-2xl font-bold text-blue-600">+{expectedReward.toLocaleString()}원</p>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs text-blue-700">
                <div className="text-center">
                  <p>오늘 참여자: {todayParticipants.toLocaleString()}명</p>
                </div>
                <div className="text-center">  
                  <p>실패자: {todayFailures.toLocaleString()}명</p>
                </div>
              </div>
              <div className="text-center mt-2 text-xs text-blue-600">
                💡 실패자의 차감 크레딧이 성공자들에게 균등 분배돼요!
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-6">
            <div className="text-4xl mb-2">😴</div>
            <p className="text-gray-600 mb-4">아직 알람이 설정되지 않았어요</p>
            <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full font-bold hover:shadow-lg transition-all">
              알람 설정하기
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainDashboard;
