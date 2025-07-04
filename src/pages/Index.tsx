
import MoodBox from "@/components/MoodBox";
import SuggestionsBox from "@/components/SuggestionsBox";
import MusicPlayer from "@/components/MusicPlayer";
import TopSongsBox from "@/components/TopSongsBox";
import WeeklyTrendsBox from "@/components/WeeklyTrendsBox";
import ReflectionsBox from "@/components/ReflectionsBox";
import { useDashboardData } from "../hooks/useDashboardData";

export default function Home() {
  const { userMood } = useDashboardData();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Your Mood Dashboard
          </h1>
          <div className="text-gray-600 text-sm">
            {userMood.date} • {userMood.day} • {userMood.time}
          </div>
        </div>
        
        {/* Top Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 h-64">
          <MoodBox />
          <SuggestionsBox />
          <MusicPlayer />
        </div>
        
        {/* Bottom Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-64">
          <TopSongsBox />
          <WeeklyTrendsBox />
          <ReflectionsBox />
        </div>
      </div>
    </div>
  );
}
