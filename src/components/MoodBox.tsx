import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MOOD_COLORS: Record<string, string> = {
  Happy: 'bg-yellow-300',
  Sad: 'bg-blue-400',
  Energetic: 'bg-pink-400',
  Calm: 'bg-green-300',
  Unknown: 'bg-gray-300'
};

const MOOD_IMAGES: Record<string, string> = {
  Happy: '/images/moods/happy.png',
  Sad: '/images/moods/sad.png',
  Energetic: '/images/moods/energetic.png',
  Calm: '/images/moods/calm.png',
  Unknown: '/images/moods/unknown.png'
};

function MoodBar({ moods }: { moods: string[] }) {
  const total = moods.length || 1;
  return (
    <div className="flex h-6 w-full rounded overflow-hidden border mt-2">
      {moods.map((mood, i) => (
        <div
          key={i}
          className={`${MOOD_COLORS[mood] || MOOD_COLORS.Unknown}`}
          style={{ width: `${100 / total}%` }}
          title={mood}
        />
      ))}
    </div>
  );
}

const MoodBox = () => {
  const [mood, setMood] = useState<string>('Unknown');
  const [moods, setMoods] = useState<string[]>([]);

  useEffect(() => {
    const fetchMood = async () => {
      const res = await axios.get('/user-mood');
      setMood(typeof res.data.user_mood === 'string' ? res.data.user_mood : 'Unknown');
    };
    const fetchDistribution = async () => {
      const res = await axios.get('/mood-distribution');
      setMoods(res.data.moods || []);
    };
    fetchMood();
    fetchDistribution();
    const interval = setInterval(() => {
      fetchMood();
      fetchDistribution();
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const moodKey = typeof mood === 'string'
    ? Object.keys(MOOD_IMAGES).find(k => mood.includes(k)) || 'Unknown'
    : 'Unknown';
  const imgUrl = MOOD_IMAGES[moodKey];

  return (
    <div className="rounded-lg p-4 bg-blue-100 text-blue-900 shadow flex flex-col items-center">
      <h2 className="text-lg font-bold mb-2">Your Current Mood</h2>
      <div className="text-2xl mb-2">{mood}</div>
      {imgUrl && <img src={imgUrl} alt={mood} className="w-16 h-16 mb-2" />}
      <MoodBar moods={moods} />
    </div>
  );
};

export default MoodBox;
