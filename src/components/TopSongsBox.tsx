
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDashboardData } from '../hooks/useDashboardData';

const TopSongsBox = () => {
  const { userMood } = useDashboardData();
  const [topSongs, setTopSongs] = useState<{ title: string; artist: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTopSongs() {
      setLoading(true);
      setError(null);
      try {
        const mood = encodeURIComponent(userMood.user_mood || '');
        const res = await fetch(`/top-songs?mood=${mood}`);
        if (!res.ok) throw new Error('Failed to fetch top songs');
        const data = await res.json();
        setTopSongs(data.songs || []);
      } catch (e: any) {
        setError(e.message || 'Failed to load top songs');
      }
      setLoading(false);
    }
    if (userMood.user_mood) {
      fetchTopSongs();
    }
  }, [userMood.user_mood]);

  if (loading) return (
    <Card className="bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-xl border-0 shadow-2xl h-full border border-white/30">
      <CardHeader><CardTitle className="text-white animate-pulse">Loading...</CardTitle></CardHeader>
    </Card>
  );
  
  if (error) return (
    <Card className="bg-gradient-to-br from-red-500/20 to-red-600/10 backdrop-blur-xl border-0 shadow-2xl h-full border border-red-300/30">
      <CardHeader><CardTitle className="text-red-100">Error: {error}</CardTitle></CardHeader>
    </Card>
  );

  return (
    <Card className="bg-gradient-to-br from-white/25 to-white/10 backdrop-blur-xl border-0 shadow-2xl h-full border border-white/30 hover:shadow-3xl transition-all duration-300">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-white tracking-wide">Your Top {userMood.user_mood} Songs 🎵</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {topSongs.length === 0 ? (
            <div className="text-white/70 text-center py-4">No songs found for this mood.</div>
          ) : (
            topSongs.map((song, i) => (
              <div key={i} className="flex items-center space-x-4 p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-300 group hover:scale-105">
                <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500 rounded-full shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <span className="text-lg font-bold text-white">{i + 1}</span>
                </div>
                <div className="flex-1">
                  <p className="font-bold text-white group-hover:text-yellow-300 transition-colors duration-300">{song.title}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TopSongsBox;
