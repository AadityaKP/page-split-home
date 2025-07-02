import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function MonthlyCalendar({ onDaySelect, selectedDay }) {
  const [month, setMonth] = useState([]);
  useEffect(() => {
    const fetchMonth = async () => {
      const res = await axios.get('/trends/monthly');
      setMonth(res.data.month || []);
    };
    fetchMonth();
  }, []);
  return (
    <div className="rounded-lg p-4 bg-gray-100 text-gray-900 shadow">
      <h2 className="text-lg font-bold mb-2">June</h2>
      <div className="grid grid-cols-7 gap-1">
        {month.map(dayObj => (
          <div
            key={dayObj.day}
            className={`h-10 w-10 flex items-center justify-center rounded cursor-pointer ${selectedDay.toISOString().slice(0, 10) === dayObj.day ? 'bg-purple-300' : 'bg-white'}`}
            onClick={() => onDaySelect(new Date(dayObj.day))}
            title={dayObj.day}
          >
            {parseInt(dayObj.day.split('-')[2], 10)}
          </div>
        ))}
      </div>
    </div>
  );
} 