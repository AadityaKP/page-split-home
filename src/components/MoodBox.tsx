
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDashboardData } from '../hooks/useDashboardData';

const MOOD_COLOR_MAP: Record<string, string> = {
  'sad+energetic': '#8B5CF6',
  'sad+calm': '#EC4899',
  'happy+calm': '#F59E0B',
  'happy+energetic': '#EF4444',
  'Unknown': '#6B7280'
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
    <div className="flex h-6 w-full rounded-full overflow-hidden bg-white/20 mt-4 shadow-inner">
      {moods.map((mood, i) => {
        const key = getMoodKey(mood);
        return (
          <div
            key={i}
            style={{ backgroundColor: MOOD_COLOR_MAP[key] || MOOD_COLOR_MAP.Unknown, width: `${100 / total}%` }}
            title={mood}
            className="animate-pulse hover:brightness-110 transition-all duration-300"
          />
        );
      })}
    </div>
  );
}

const MoodBox = () => {
  const { userMood, moodDistribution, loading, error } = useDashboardData();

  if (loading) return (
    <Card className="bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-xl border-0 shadow-2xl h-full border border-white/30">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg text-center text-white animate-pulse">Loading...</CardTitle>
      </CardHeader>
    </Card>
  );
  
  if (error) return (
    <Card className="bg-gradient-to-br from-red-500/20 to-red-600/10 backdrop-blur-xl border-0 shadow-2xl h-full border border-red-300/30">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg text-center text-red-100">Error: {error}</CardTitle>
      </CardHeader>
    </Card>
  );

  const mood = userMood.user_mood || 'Happy';
  const moods = moodDistribution.moods || ['happy'];

  return (
    <Card className="bg-gradient-to-br from-white/25 to-white/10 backdrop-blur-xl border-0 shadow-2xl h-full border border-white/30 hover:shadow-3xl transition-all duration-300">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl text-center text-white font-bold tracking-wide">Current Mood</CardTitle>
      </CardHeader>
      <CardContent className="text-center space-y-4">
        <div className="text-4xl font-bold text-white capitalize drop-shadow-lg animate-bounce">{mood}</div>
        <div className="w-20 h-20 mx-auto bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110">
          <span className="text-3xl animate-pulse">😊</span>
        </div>
        <MoodBar moods={moods} />
      </CardContent>
    </Card>
  );
};

export default MoodBox;
