import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Music } from "lucide-react";

const TopSongsBox = () => {
  const [songs, setSongs] = useState<{ title: string, artist: string }[]>([]);
  const [mood, setMood] = useState('Happy');

  useEffect(() => {
    const fetchMoodAndSongs = async () => {
      const moodRes = await axios.get('/user-mood');
      const moodVal = moodRes.data.user_mood || 'Happy';
      setMood(moodVal);
      const songsRes = await axios.get(`/top-songs?mood=${encodeURIComponent(moodVal)}`);
      setSongs(songsRes.data.songs || []);
    };
    fetchMoodAndSongs();
  }, []);

  return (
    <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-xl">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Your Top {mood} Songs</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {songs.slice(0, 5).map((song, i) => (
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
