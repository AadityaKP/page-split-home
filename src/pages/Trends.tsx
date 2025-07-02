import TrendsDayBar from "@/components/TrendsDayBar";
import TrendsNotesPostIts from "@/components/TrendsNotesPostIts";
import WeeklyTrendsMiniBox from "@/components/WeeklyTrendsMiniBox";
import WeeklySplitBar from "@/components/WeeklySplitBar";
import MonthlyCalendar from "@/components/MonthlyCalendar";
import { useState } from "react";

export default function TrendsPage() {
  const [selectedDay, setSelectedDay] = useState(new Date());
  const [selectedSection, setSelectedSection] = useState("morning");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-purple-700 mb-6">Trends</h1>
        {/* Top Half */}
        <div className="flex flex-col md:flex-row gap-6 mb-6">
          <div className="flex-1 flex flex-col items-center">
            <TrendsDayBar
              selectedDay={selectedDay}
              selectedSection={selectedSection}
              onSectionHover={section => setSelectedSection(section)}
              onSectionClick={section => setSelectedSection(section)}
            />
            <div className="mt-4 w-full">
              <TrendsNotesPostIts day={selectedDay} />
            </div>
          </div>
          <div className="w-full md:w-1/3">
            <WeeklyTrendsMiniBox />
          </div>
        </div>
        {/* Bottom Half */}
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <WeeklySplitBar
              onDayClick={day => setSelectedDay(day)}
              selectedDay={selectedDay}
            />
          </div>
          <div className="w-full md:w-1/3">
            <MonthlyCalendar
              onDaySelect={day => setSelectedDay(day)}
              selectedDay={selectedDay}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
