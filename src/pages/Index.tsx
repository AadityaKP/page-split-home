
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
    <div className="min-h-screen bg-gradient-to-br from-violet-600 via-purple-600 to-pink-600 p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-cyan-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-500"></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold text-white mb-3 drop-shadow-lg">
            Your Mood Dashboard ✨
          </h1>
          <div className="text-white/80 text-lg font-medium bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 inline-block border border-white/20">
            {userMood.date} • {userMood.day} • {userMood.time}
          </div>
        </div>
        
        {/* Top Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 h-72">
          <div className="transform hover:scale-105 transition-all duration-300 animate-fade-in">
            <MoodBox />
          </div>
          <div className="transform hover:scale-105 transition-all duration-300 animate-fade-in delay-150">
            <SuggestionsBox />
          </div>
          <div className="transform hover:scale-105 transition-all duration-300 animate-fade-in delay-300">
            <MusicPlayer />
          </div>
        </div>
        
        {/* Bottom Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-72">
          <div className="transform hover:scale-105 transition-all duration-300 animate-fade-in delay-450">
            <TopSongsBox />
          </div>
          <div className="transform hover:scale-105 transition-all duration-300 animate-fade-in delay-600">
            <WeeklyTrendsBox />
          </div>
          <div className="transform hover:scale-105 transition-all duration-300 animate-fade-in delay-750">
            <ReflectionsBox />
          </div>
        </div>
      </div>
    </div>
  );
}
