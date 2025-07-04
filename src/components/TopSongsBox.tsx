import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDashboardData } from '../hooks/useDashboardData';
import axios from 'axios';

interface SongWithImage {
  title: string;
  image: string | null;
}

const fetchSpotifyImage = async (songName: string) => {
  try {
    // Use Spotify Search API to get the track image
    const res = await axios.get(`https://api.spotify.com/v1/search`, {
      params: { q: songName, type: 'track', limit: 1 },
      headers: {
        Authorization: `Bearer ${localStorage.getItem('spotify_access_token')}` // You must have a valid token
      }
    });
    const track = res.data.tracks.items[0];
    return track?.album?.images?.[2]?.url || track?.album?.images?.[0]?.url || null;
  } catch {
    return null;
  }
};

const TopSongsBox = () => {
  const { userMood } = useDashboardData();
  const [topSongs, setTopSongs] = useState<SongWithImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTopSongs() {
      setLoading(true);
      setError(null);
      try {
        // Fetch and parse the CSV
        const res = await fetch('/CSVS/song+mood+frequency.csv');
        const text = await res.text();
        const lines = text.trim().split('\n');
        const header = lines[0].split(',');
        const moodIdx = header.findIndex(h => h.toLowerCase().includes('mood'));
        const songIdx = header.findIndex(h => h.toLowerCase().includes('song'));
        const freqIdx = header.findIndex(h => h.toLowerCase().includes('frequency'));
        // Normalize mood for matching
        const currentMood = (userMood.user_mood || '').toLowerCase().replace(/\s|and/g, '');
        // Filter and sort
        let filtered = lines.slice(1)
          .map(line => line.split(','))
          .filter(cols => {
            const mood = (cols[moodIdx] || '').toLowerCase().replace(/\s|and/g, '');
            return mood === currentMood;
          })
          .sort((a, b) => parseInt(b[freqIdx]) - parseInt(a[freqIdx]))
          .slice(0, 5);
        // Fetch images for each song
        const songsWithImages: SongWithImage[] = await Promise.all(filtered.map(async (cols) => {
          const title = cols[songIdx];
          const image = await fetchSpotifyImage(title);
          return { title, image };
        }));
        setTopSongs(songsWithImages);
      } catch (e: any) {
        setError(e.message || 'Failed to load top songs');
      }
      setLoading(false);
    }
    fetchTopSongs();
  }, [userMood.user_mood]);

  if (loading) return <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-xl"><CardHeader><CardTitle>Loading...</CardTitle></CardHeader></Card>;
  if (error) return <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-xl"><CardHeader><CardTitle>Error: {error}</CardTitle></CardHeader></Card>;

  return (
    <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-xl">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Your Top {userMood.user_mood} Songs</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {topSongs.map((song, i) => (
            <div key={i} className="flex items-center space-x-3 p-2 rounded-lg">
              <div className="w-8 h-8 flex items-center justify-center">
                <span className="text-lg font-bold text-purple-700">{i + 1}</span>
              </div>
              {song.image && <img src={song.image} alt="cover" className="w-8 h-8 rounded shadow" />}
              <div className="flex-1">
                <p className="font-medium text-sm">{song.title}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TopSongsBox;
