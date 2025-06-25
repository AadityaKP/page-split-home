
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Music } from "lucide-react";

const topSongs = [
  { rank: 1, title: "Sunshine Day", artist: "Happy Vibes" },
  { rank: 2, title: "Feel Good", artist: "Mood Boosters" },
  { rank: 3, title: "Dancing Free", artist: "Joy Collective" },
  { rank: 4, title: "Bright Side", artist: "Positive Energy" },
  { rank: 5, title: "Smile More", artist: "Happiness Band" }
];

const TopSongsBox = () => {
  return (
    <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-xl">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Your Top Happy Songs</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {topSongs.map((song) => (
            <div key={song.rank} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-purple-50 transition-colors">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                {song.rank}
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
