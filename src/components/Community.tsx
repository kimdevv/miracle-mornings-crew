import React, { useState } from 'react';
import { Users, Trophy, Heart, MessageCircle, Bell } from 'lucide-react';

interface CommunityProps {
  user: any;
}

const Community = ({ user }: CommunityProps) => {
  const [activeTab, setActiveTab] = useState('ranking');

  // 임시 랭킹 데이터
  const rankingData = [
    { id: 1, name: '기상왕김철수', level: 15, streak: 28, character: '🐱', badges: ['👑', '🔥'] },
    { id: 2, name: '새벽러버', level: 12, streak: 21, character: '🐶', badges: ['🌟'] },
    { id: 3, name: '미라클걸', level: 10, streak: 19, character: '🐰', badges: ['💎'] },
    { id: 4, name: user.name, level: user.character.level, streak: user.consecutiveDays, character: '🐱', badges: ['⭐'] },
  ];

  // 임시 친구 데이터 (일주일 = 7일)
  const friendsData = [
    { id: 1, name: '아침햇살', level: 8, online: true, lastSeen: '방금 전', lastSeenDays: 0 },
    { id: 2, name: '얼리버드', level: 6, online: false, lastSeen: '2시간 전', lastSeenDays: 0 },
    { id: 3, name: '선라이즈', level: 11, online: true, lastSeen: '5분 전', lastSeenDays: 0 },
    { id: 4, name: '슬립킹', level: 4, online: false, lastSeen: '8일 전', lastSeenDays: 8 },
    { id: 5, name: '나태러', level: 2, online: false, lastSeen: '15일 전', lastSeenDays: 15 },
  ];

  const handleWakeUpFriend = (friendName: string) => {
    alert(`${friendName}님에게 깨우기 알림을 보냈습니다! 🔔\n"일어나세요! 미라클 모닝 시간이에요!" 메시지와 함께 푸시 알림이 전송되었습니다.`);
  };

  const renderCharacterEmoji = (character: string, level: number) => (
    <div className="relative">
      <div className="w-12 h-12 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full flex items-center justify-center">
        <span className="text-2xl">{character}</span>
      </div>
      <div className="absolute -bottom-1 -right-1 bg-yellow-400 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
        {level}
      </div>
    </div>
  );

  return (
    <div className="px-4 py-6 space-y-6">
      {/* 헤더 */}
      <div className="text-center">
        <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-blue-400 rounded-full flex items-center justify-center mx-auto mb-4">
          <Users size={32} className="text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">미라클 커뮤니티</h2>
        <p className="text-gray-600">함께 일어나는 사람들과 소통해요!</p>
      </div>

      {/* 내 프로필 카드 */}
      <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl p-5">
        <div className="flex items-center space-x-4">
          {renderCharacterEmoji('🐱', user.character.level)}
          
          <div className="flex-1">
            <h3 className="font-bold text-gray-800 text-lg">{user.name}</h3>
            <p className="text-gray-600 text-sm">레벨 {user.character.level} • {user.consecutiveDays}일 연속</p>
            
            <div className="flex space-x-2 mt-2">
              <span className="bg-yellow-400 text-white text-xs px-2 py-1 rounded-full">⭐ 신입</span>
              <span className="bg-green-400 text-white text-xs px-2 py-1 rounded-full">🔥 열정</span>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600">#{rankingData.findIndex(r => r.name === user.name) + 1}</p>
            <p className="text-xs text-gray-600">전체 순위</p>
          </div>
        </div>
      </div>

      {/* 탭 메뉴 */}
      <div className="flex bg-gray-100 rounded-2xl p-1">
        <button
          onClick={() => setActiveTab('ranking')}
          className={`flex-1 py-3 px-4 rounded-xl font-bold transition-all ${
            activeTab === 'ranking'
              ? 'bg-white text-purple-600 shadow-sm'
              : 'text-gray-600'
          }`}
        >
          🏆 랭킹
        </button>
        <button
          onClick={() => setActiveTab('friends')}
          className={`flex-1 py-3 px-4 rounded-xl font-bold transition-all ${
            activeTab === 'friends'
              ? 'bg-white text-purple-600 shadow-sm'
              : 'text-gray-600'
          }`}
        >
          👥 친구
        </button>
      </div>

      {activeTab === 'ranking' && (
        <div className="space-y-4">
          {/* 이번 주 TOP 3 */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-pink-100">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center">
              <Trophy className="text-yellow-500 mr-2" size={20} />
              이번 주 TOP 3
            </h3>
            
            <div className="flex justify-center items-end space-x-4 mb-6">
              {/* 2등 */}
              <div className="text-center">
                <div className="bg-gray-200 rounded-full p-3 mb-2">
                  <span className="text-2xl">🐶</span>
                </div>
                <div className="bg-gray-400 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-1 text-sm font-bold">2</div>
                <p className="text-xs text-gray-600">새벽러버</p>
                <p className="text-xs font-bold">21일</p>
              </div>
              
              {/* 1등 */}
              <div className="text-center transform scale-110">
                <div className="bg-yellow-200 rounded-full p-4 mb-2 animate-pulse">
                  <span className="text-3xl">🐱</span>
                </div>
                <div className="bg-yellow-400 text-white rounded-full w-10 h-10 flex items-center justify-center mx-auto mb-1 font-bold">1</div>
                <p className="text-xs text-gray-600">기상왕김철수</p>
                <p className="text-xs font-bold text-yellow-600">28일</p>
              </div>
              
              {/* 3등 */}
              <div className="text-center">
                <div className="bg-orange-200 rounded-full p-3 mb-2">
                  <span className="text-2xl">🐰</span>
                </div>
                <div className="bg-orange-400 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-1 text-sm font-bold">3</div>
                <p className="text-xs text-gray-600">미라클걸</p>
                <p className="text-xs font-bold">19일</p>
              </div>
            </div>
          </div>

          {/* 전체 랭킹 */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-pink-100">
            <h3 className="font-bold text-gray-800 mb-4">전체 랭킹</h3>
            
            <div className="space-y-3">
              {rankingData.map((player, index) => (
                <div key={player.id} className={`flex items-center justify-between p-3 rounded-xl ${
                  player.name === user.name 
                    ? 'bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200' 
                    : 'bg-gray-50'
                }`}>
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                      index === 0 ? 'bg-yellow-400 text-white' :
                      index === 1 ? 'bg-gray-400 text-white' :
                      index === 2 ? 'bg-orange-400 text-white' :
                      'bg-gray-200 text-gray-600'
                    }`}>
                      {index + 1}
                    </div>
                    
                    {renderCharacterEmoji(player.character, player.level)}
                    
                    <div>
                      <div className="flex items-center space-x-2">
                        <p className="font-bold text-gray-800">{player.name}</p>
                        {player.name === user.name && <span className="text-purple-500 text-sm">👋</span>}
                      </div>
                      <div className="flex items-center space-x-1 mt-1">
                        {player.badges.map((badge, i) => (
                          <span key={i} className="text-sm">{badge}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="font-bold text-green-600">{player.streak}일</p>
                    <p className="text-xs text-gray-500">연속 성공</p>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="w-full mt-4 py-3 bg-gray-100 text-gray-600 rounded-xl font-bold hover:bg-gray-200 transition-all">
              더 많은 순위 보기
            </button>
          </div>
        </div>
      )}

      {activeTab === 'friends' && (
        <div className="space-y-4">
          {/* 친구 추가 */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-pink-100">
            <h3 className="font-bold text-gray-800 mb-4">친구 추가</h3>
            
            <div className="flex space-x-3">
              <input
                type="text"
                placeholder="친구 닉네임 입력"
                className="flex-1 px-4 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all">
                추가
              </button>
            </div>
            
            <div className="mt-4 p-3 bg-blue-50 rounded-xl text-center">
              <p className="text-sm text-blue-800">
                친구 추천 시 서로 <strong>2,000원 크레딧</strong>을 받아요! 🎁
              </p>
            </div>
          </div>

          {/* 친구 목록 */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-pink-100">
            <h3 className="font-bold text-gray-800 mb-4">내 친구들 ({friendsData.length})</h3>
            
            <div className="space-y-3">
              {friendsData.map((friend) => (
                <div key={friend.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      {renderCharacterEmoji('🐱', friend.level)}
                      <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full ${
                        friend.online ? 'bg-green-400' : 'bg-gray-400'
                      }`}></div>
                    </div>
                    
                    <div>
                      <div className="flex items-center space-x-2">
                        <p className="font-bold text-gray-800">{friend.name}</p>
                        {friend.lastSeenDays >= 7 && (
                          <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full">
                            😴 잠수중
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500">
                        {friend.online ? '🟢 접속중' : `🔘 ${friend.lastSeen}`}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    {friend.lastSeenDays >= 7 && (
                      <button 
                        onClick={() => handleWakeUpFriend(friend.name)}
                        className="p-2 bg-orange-100 rounded-full hover:bg-orange-200 transition-all"
                        title="친구 깨우기"
                      >
                        <Bell size={16} className="text-orange-500" />
                      </button>
                    )}
                    <button className="p-2 bg-pink-100 rounded-full hover:bg-pink-200 transition-all">
                      <Heart size={16} className="text-pink-500" />
                    </button>
                    <button className="p-2 bg-blue-100 rounded-full hover:bg-blue-200 transition-all">
                      <MessageCircle size={16} className="text-blue-500" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 친구 활동 */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-pink-100">
            <h3 className="font-bold text-gray-800 mb-4">친구 활동</h3>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-xl">
                <span className="text-2xl">🐶</span>
                <div className="flex-1">
                  <p className="text-sm"><strong>새벽러버</strong>님이 21일 연속 기상을 달성했어요!</p>
                  <p className="text-xs text-gray-500">30분 전</p>
                </div>
                <Heart size={16} className="text-pink-500" />
              </div>
              
              <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-xl">
                <span className="text-2xl">🐰</span>
                <div className="flex-1">
                  <p className="text-sm"><strong>미라클걸</strong>님이 새로운 뱃지를 획득했어요! 💎</p>
                  <p className="text-xs text-gray-500">1시간 전</p>
                </div>
                <Heart size={16} className="text-pink-500" />
              </div>
              
              <div className="flex items-center space-x-3 p-3 bg-orange-50 rounded-xl">
                <Bell size={16} className="text-orange-500" />
                <div className="flex-1">
                  <p className="text-sm"><strong>슬립킹</strong>님에게 깨우기 알림을 보냈어요! 🔔</p>
                  <p className="text-xs text-gray-500">1시간 전</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Community;
