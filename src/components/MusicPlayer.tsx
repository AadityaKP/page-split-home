import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SkipBack, SkipForward, Music, RefreshCw } from "lucide-react";

const SERVER_URL = 'http://127.0.0.1:8888';

export default function MusicPlayer() {
  const [accessToken, setAccessToken] = useState(null);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Listen for access token from popup
  useEffect(() => {
    const handler = (event) => {
      if (event.data && event.data.type === 'SPOTIFY_TOKEN') {
        setAccessToken(event.data.token);
      }
    };
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, []);

  // Fetch current track
  const getCurrentTrack = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${SERVER_URL}/current`);
      const data = await res.json();
      if (data.track) {
        setCurrentTrack(data.track);
      } else {
        setCurrentTrack(null);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Control playback
  const control = async (action) => {
    await fetch(`${SERVER_URL}/control`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action }),
    });
    setTimeout(getCurrentTrack, 1000);
  };

  // Poll for updates
  useEffect(() => {
    if (accessToken) {
      getCurrentTrack();
      const interval = setInterval(getCurrentTrack, 10000);
      return () => clearInterval(interval);
    }
  }, [accessToken]);

  // Login handler (popup)
  const login = () => {
    const width = 500, height = 600;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;
    window.open(
      `${SERVER_URL}/login`,
      'Spotify Login',
      `width=${width},height=${height},left=${left},top=${top}`
    );
  };

  return (
    <Card className="bg-gradient-to-br from-white/25 to-white/10 backdrop-blur-xl border-0 shadow-2xl h-full border border-white/30 hover:shadow-3xl transition-all duration-300">
      <CardHeader>
        <CardTitle className="text-xl font-bold flex items-center gap-2 text-white tracking-wide">
          <Music className="w-6 h-6 text-green-400 animate-pulse" />
          Spotify Player 🎧
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!accessToken ? (
          <div className="text-center space-y-4">
            <p className="text-sm text-white/80 font-medium">Connect your Spotify account to control playback</p>
            <Button onClick={login} className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              Login with Spotify ✨
            </Button>
            <p className="text-xs text-white/60">
              This will open Spotify login and return here.
            </p>
          </div>
        ) : (
          <>
            <div className="text-center">
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <RefreshCw className="w-4 h-4 animate-spin text-white" />
                  <span className="text-sm text-white">Loading...</span>
                </div>
              ) : currentTrack ? (
                <div className="space-y-3">
                  {currentTrack.image && (
                    <img
                      src={currentTrack.image}
                      alt="Album Art"
                      className="w-32 h-32 rounded-xl mx-auto shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110"
                    />
                  )}
                  <h3 className="font-bold text-lg text-white">{currentTrack.name}</h3>
                  <p className="text-md text-white/80">{currentTrack.artist}</p>
                </div>
              ) : (
                <>
                  <h3 className="font-medium text-sm text-white">No track playing</h3>
                  <p className="text-xs text-white/70">Start playing music on Spotify</p>
                </>
              )}
            </div>
            <div className="flex items-center justify-center space-x-6">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => control("previous")} 
                disabled={!currentTrack}
                className="hover:bg-white/20 text-white hover:text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
              >
                <SkipBack className="w-6 h-6" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => control("next")} 
                disabled={!currentTrack}
                className="hover:bg-white/20 text-white hover:text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
              >
                <SkipForward className="w-6 h-6" />
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
