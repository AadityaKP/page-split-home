import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Music } from "lucide-react";
import { useDashboardData } from '../hooks/useDashboardData';

const TopSongsBox = () => {
  const { topSongs, loading, error } = useDashboardData();

  if (loading) return <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-xl"><CardHeader><CardTitle>Loading...</CardTitle></CardHeader></Card>;
  if (error) return <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-xl"><CardHeader><CardTitle>Error: {error}</CardTitle></CardHeader></Card>;

  const mood = topSongs.mood || 'Happy';
  const songs = topSongs.songs || [];

  return (
    <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-xl">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Your Top {mood} Songs</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {(songs || []).slice(0, 5).map((song, i) => (
            <div key={i} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-purple-50 transition-colors">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                {i + 1}
              </div>
              <Music className="w-4 h-4 text-purple-600" />
              <div className="flex-1">
                <p className="font-medium text-sm">{song.title}</p>
                <p className="text-xs text-gray-600">{song.artist}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TopSongsBox;
