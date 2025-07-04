
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDashboardData } from '../hooks/useDashboardData';

const MOOD_COLOR_MAP: Record<string, string> = {
  'sad+energetic': '#390099',
  'sad+calm': '#9e0059',
  'happy+calm': '#ff0054',
  'happy+energetic': '#ff5400',
  'Unknown': '#e5e7eb'
};

function getMoodKey(mood: string): string {
  if (!mood) return 'Unknown';
  const m = mood.toLowerCase().replace(/\s|and/g, '');
  if (m.includes('sad') && m.includes('energetic')) return 'sad+energetic';
  if (m.includes('sad') && m.includes('calm')) return 'sad+calm';
  if (m.includes('happy') && m.includes('calm')) return 'happy+calm';
  if (m.includes('happy') && m.includes('energetic')) return 'happy+energetic';
  return 'Unknown';
}

function MoodBar({ moods }: { moods: string[] }) {
  const total = moods.length || 1;
  return (
    <div className="flex h-4 w-full rounded-full overflow-hidden bg-gray-200 mt-3">
      {moods.map((mood, i) => {
        const key = getMoodKey(mood);
        return (
          <div
            key={i}
            style={{ backgroundColor: MOOD_COLOR_MAP[key] || MOOD_COLOR_MAP.Unknown, width: `${100 / total}%` }}
            title={mood}
          />
        );
      })}
    </div>
  );
}

const MoodBox = () => {
  const { userMood, moodDistribution, loading, error } = useDashboardData();

  if (loading) return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg text-center">Loading...</CardTitle>
      </CardHeader>
    </Card>
  );
  
  if (error) return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg text-center text-red-600">Error: {error}</CardTitle>
      </CardHeader>
    </Card>
  );

  const mood = userMood.user_mood || 'Happy';
  const moods = moodDistribution.moods || ['happy'];

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg text-center text-gray-800">Current Mood</CardTitle>
      </CardHeader>
      <CardContent className="text-center space-y-3">
        <div className="text-3xl font-bold text-purple-700 capitalize">{mood}</div>
        <div className="w-16 h-16 mx-auto bg-yellow-400 rounded-full flex items-center justify-center">
          <span className="text-2xl">😊</span>
        </div>
        <MoodBar moods={moods} />
      </CardContent>
    </Card>
  );
};

export default MoodBox;
