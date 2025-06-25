
import Navigation from "@/components/Navigation";
import MoodBox from "@/components/MoodBox";
import SuggestionsBox from "@/components/SuggestionsBox";
import MusicPlayer from "@/components/MusicPlayer";
import TopSongsBox from "@/components/TopSongsBox";
import WeeklyTrendsBox from "@/components/WeeklyTrendsBox";
import ReflectionsBox from "@/components/ReflectionsBox";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <Navigation />
      
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* First Row */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <MoodBox />
            <SuggestionsBox />
            <MusicPlayer />
          </div>

          {/* Second Row */}
          <div className="grid md:grid-cols-3 gap-6">
            <TopSongsBox />
            <WeeklyTrendsBox />
            <ReflectionsBox />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
