
import React, { useState } from 'react';
import { Star } from 'lucide-react';

interface CharacterCustomizationProps {
  user: any;
  setUser: (user: any) => void;
}

const CharacterCustomization = ({ user, setUser }: CharacterCustomizationProps) => {
  const [selectedCategory, setSelectedCategory] = useState('hats');
  const [previewCharacter, setPreviewCharacter] = useState(user.character);

  // 상점 아이템들
  const shopItems = {
    hats: [
      { id: 'cap', name: '야구모자', price: 500, owned: true, equipped: true },
      { id: 'beanie', name: '비니', price: 800, owned: false, equipped: false },
      { id: 'crown', name: '왕관', price: 2000, owned: false, equipped: false },
      { id: 'santa', name: '산타모자', price: 1200, owned: false, equipped: false },
    ],
    accessories: [
      { id: 'glasses', name: '안경', price: 600, owned: true, equipped: true },
      { id: 'sunglasses', name: '선글라스', price: 1000, owned: false, equipped: false },
      { id: 'bow', name: '리본', price: 400, owned: false, equipped: false },
      { id: 'necklace', name: '목걸이', price: 1500, owned: false, equipped: false },
    ],
    backgrounds: [
      { id: 'garden', name: '정원', price: 1000, owned: false, equipped: false },
      { id: 'beach', name: '해변', price: 1500, owned: false, equipped: false },
      { id: 'space', name: '우주', price: 2500, owned: false, equipped: false },
      { id: 'castle', name: '성', price: 3000, owned: false, equipped: false },
    ]
  };

  const categories = [
    { id: 'hats', name: '모자', icon: '🎩' },
    { id: 'accessories', name: '액세서리', icon: '👓' },
    { id: 'backgrounds', name: '배경', icon: '🏞️' },
  ];

  const handlePurchase = (item: any) => {
    if (user.credits >= item.price) {
      setUser({
        ...user,
        credits: user.credits - item.price
      });
      alert(`${item.name}을(를) 구매했습니다! 🎉`);
    } else {
      alert('크레딧이 부족합니다! 💰');
    }
  };

  // 캐릭터 렌더링 함수
  const renderCharacter = (character: any) => (
    <svg width="120" height="120" viewBox="0 0 100 100" className="animate-bounce">
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
      {/* 헤더 */}
      <div className="text-center">
        <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center mx-auto mb-4">
          <Star size={32} className="text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">캐릭터 꾸미기</h2>
        <p className="text-gray-600">나만의 특별한 캐릭터를 만들어보세요!</p>
      </div>

      {/* 캐릭터 미리보기 */}
      <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl p-6 text-center">
        <div className="bg-white rounded-2xl p-6 mb-4">
          {renderCharacter(previewCharacter)}
        </div>
        
        <div className="flex items-center justify-center space-x-8">
          <div className="text-center">
            <p className="text-lg font-bold text-gray-800">{user.name}</p>
            <p className="text-sm text-gray-600">내 캐릭터</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-yellow-600">{user.credits.toLocaleString()}원</p>
            <p className="text-sm text-gray-600">보유 크레딧</p>
          </div>
        </div>
      </div>

      {/* 카테고리 탭 */}
      <div className="flex bg-gray-100 rounded-2xl p-1 overflow-x-auto">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`flex-1 min-w-0 py-3 px-4 rounded-xl font-bold transition-all whitespace-nowrap ${
              selectedCategory === category.id
                ? 'bg-white text-purple-600 shadow-sm'
                : 'text-gray-600'
            }`}
          >
            <span className="mr-1">{category.icon}</span>
            {category.name}
          </button>
        ))}
      </div>

      {/* 상점 아이템들 */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-pink-100">
        <h3 className="font-bold text-gray-800 mb-4">
          {categories.find(c => c.id === selectedCategory)?.name} 상점
        </h3>
        
        <div className="grid grid-cols-2 gap-4">
          {shopItems[selectedCategory as keyof typeof shopItems].map((item) => (
            <div key={item.id} className="bg-gray-50 rounded-2xl p-4 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">
                  {selectedCategory === 'hats' && '🎩'}
                  {selectedCategory === 'accessories' && '👓'}
                  {selectedCategory === 'backgrounds' && '🏞️'}
                </span>
              </div>
              
              <h4 className="font-bold text-gray-800 mb-1">{item.name}</h4>
              <p className="text-sm text-gray-600 mb-3">{item.price.toLocaleString()}원</p>
              
              {item.owned ? (
                <button 
                  className={`w-full py-2 rounded-xl font-bold transition-all ${
                    item.equipped 
                      ? 'bg-green-500 text-white' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {item.equipped ? '✅ 착용중' : '착용하기'}
                </button>
              ) : (
                <button
                  onClick={() => handlePurchase(item)}
                  disabled={user.credits < item.price}
                  className={`w-full py-2 rounded-xl font-bold transition-all ${
                    user.credits >= item.price
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  💰 구매하기
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 내 컬렉션 */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-pink-100">
        <h3 className="font-bold text-gray-800 mb-4 flex items-center">
          <span className="text-yellow-500 mr-2">🏆</span>
          내 컬렉션
        </h3>
        
        <div className="grid grid-cols-4 gap-3">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
            <div key={index} className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center">
              {index <= 3 ? (
                <span className="text-2xl">
                  {index === 1 && '🎩'}
                  {index === 2 && '👓'}
                  {index === 3 && '🎀'}
                </span>
              ) : (
                <span className="text-gray-400 text-xs">잠김</span>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-4 p-3 bg-blue-50 rounded-xl text-center">
          <p className="text-sm text-blue-800">
            <strong>컬렉션 3/8 달성!</strong> 더 많은 아이템을 모아보세요 ✨
          </p>
        </div>
      </div>
    </div>
  );
};

export default CharacterCustomization;
