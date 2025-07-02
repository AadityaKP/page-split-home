import React, { useEffect, useState } from 'react';
import axios from 'axios';

const WeeklyTrendsBox = () => {
  const [trends, setTrends] = useState<string[]>([]);

  useEffect(() => {
    const fetchTrends = async () => {
      const res = await axios.get('/weekly-trends');
      setTrends(res.data.trends || []);
    };
    fetchTrends();
  }, []);

  return (
    <div className="rounded-lg p-4 bg-purple-100 text-purple-900 shadow">
      <h2 className="text-lg font-bold mb-2">Weekly Trends</h2>
      <ul className="list-disc pl-5">
        {trends.map((t, i) => <li key={i}>{t}</li>)}
      </ul>
    </div>
  );
};

export default WeeklyTrendsBox;
