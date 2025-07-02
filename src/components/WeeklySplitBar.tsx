import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SECTIONS = ['morning', 'afternoon', 'evening', 'night'];
const MOOD_COLORS = {
  Happy: 'bg-yellow-300',
  Sad: 'bg-blue-400',
  Energetic: 'bg-pink-400',
  Calm: 'bg-green-300',
  Unknown: 'bg-gray-300'
};

export default function WeeklySplitBar({ onDayClick, selectedDay }) {
  const [week, setWeek] = useState([]);
  useEffect(() => {
    const fetchWeek = async () => {
      const res = await axios.get('/trends/weekly');
      setWeek(res.data.week || []);
    };
    fetchWeek();
  }, []);
  return (
    <div>
      <div className="flex flex-col gap-2">
        {week.map(dayObj => (
          <div
            key={dayObj.day}
            className={`flex cursor-pointer rounded overflow-hidden border ${selectedDay.toISOString().slice(0, 10) === dayObj.day ? 'ring-2 ring-purple-400' : ''}`}
            onClick={() => onDayClick(new Date(dayObj.day))}
          >
            {SECTIONS.map(section => (
              <div
                key={section}
                className={`flex-1 h-8 ${MOOD_COLORS[dayObj.sections[section] || 'Unknown']}`}
                title={`${section}: ${dayObj.sections[section]}`}
              />
            ))}
            <span className="ml-2 text-xs flex items-center">{dayObj.day}</span>
          </div>
        ))}
      </div>
    </div>
  );
} 