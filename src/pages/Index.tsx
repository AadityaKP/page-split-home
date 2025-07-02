import MoodBox from "@/components/MoodBox";
import SuggestionsBox from "@/components/SuggestionsBox";
import MusicPlayer from "@/components/MusicPlayer";
import TopSongsBox from "@/components/TopSongsBox";
import WeeklyTrendsBox from "@/components/WeeklyTrendsBox";
import ReflectionsBox from "@/components/ReflectionsBox";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-extrabold text-center text-purple-700 mb-8 drop-shadow-lg">
          Your Mood Dashboard
        </h1>
        {/* Top Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <MoodBox />
          <SuggestionsBox />
          <MusicPlayer />
        </div>
        {/* Bottom Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <TopSongsBox />
          <WeeklyTrendsBox />
          <ReflectionsBox />
        </div>
      </div>
    </div>
  );
}
