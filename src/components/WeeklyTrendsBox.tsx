
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

const trends = [
  { metric: "Mood Score", change: "+15%", trend: "up" },
  { metric: "Activity Level", change: "+8%", trend: "up" },
  { metric: "Sleep Quality", change: "-3%", trend: "down" },
  { metric: "Social Time", change: "0%", trend: "stable" },
  { metric: "Exercise", change: "+22%", trend: "up" }
];

const WeeklyTrendsBox = () => {
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-4 h-4 text-green-600" />;
      case "down":
        return <TrendingDown className="w-4 h-4 text-red-600" />;
      default:
        return <Minus className="w-4 h-4 text-gray-600" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "up":
        return "text-green-600";
      case "down":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-xl">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Weekly Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {trends.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-purple-50 transition-colors">
              <span className="text-sm font-medium">{item.metric}</span>
              <div className="flex items-center space-x-2">
                {getTrendIcon(item.trend)}
                <span className={`text-sm font-semibold ${getTrendColor(item.trend)}`}>
                  {item.change}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default WeeklyTrendsBox;
