import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SECTIONS = [
  { key: 'morning', icon: '🌅' },
  { key: 'afternoon', icon: '🌞' },
  { key: 'evening', icon: '🌇' },
  { key: 'night', icon: '🌙' }
];
const MOOD_COLORS = {
  Happy: 'bg-yellow-300',
  Sad: 'bg-blue-400',
  Energetic: 'bg-pink-400',
  Calm: 'bg-green-300',
  Unknown: 'bg-gray-300'
};

export default function TrendsDayBar({ selectedDay, selectedSection, onSectionHover, onSectionClick }) {
  const [moods, setMoods] = useState({});
  useEffect(() => {
    const fetchDay = async () => {
      const res = await axios.get('/trends/day', { params: { date: selectedDay.toISOString().slice(0, 10) } });
      setMoods(res.data.data || {});
    };
    fetchDay();
  }, [selectedDay]);
  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col h-64 w-16 justify-between">
        {SECTIONS.map(({ key, icon }) => (
          <div
            key={key}
            className={`flex-1 flex flex-col items-center justify-center cursor-pointer ${MOOD_COLORS[moods[key]?.mood || 'Unknown']} rounded mb-2 ${selectedSection === key ? 'ring-2 ring-purple-400' : ''}`}
            onMouseEnter={() => onSectionHover(key)}
            onClick={() => onSectionClick(key)}
            title={key}
          >
            <span className="text-2xl">{icon}</span>
          </div>
        ))}
      </div>
    </div>
  );
} 