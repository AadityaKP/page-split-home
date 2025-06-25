
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, ScatterChart, Scatter } from 'recharts';
import { TrendingUp, Calendar as CalendarIcon, BarChart3, ArrowLeft, Sunrise, Sun, Sunset, Moon } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

// Sample data for different days
const dayData = {
  today: [
    { time: 'Morning', mood: 'happy', value: 85, color: '#10B981', icon: Sunrise },
    { time: 'Afternoon', mood: 'excited', value: 92, color: '#F59E0B', icon: Sun },
    { time: 'Evening', mood: 'calm', value: 78, color: '#3B82F6', icon: Sunset },
    { time: 'Night', mood: 'peaceful', value: 70, color: '#8B5CF6', icon: Moon }
  ],
  yesterday: [
    { time: 'Morning', mood: 'tired', value: 45, color: '#6B7280', icon: Sunrise },
    { time: 'Afternoon', mood: 'happy', value: 88, color: '#10B981', icon: Sun },
    { time: 'Evening', mood: 'stressed', value: 35, color: '#EF4444', icon: Sunset },
    { time: 'Night', mood: 'calm', value: 72, color: '#3B82F6', icon: Moon }
  ]
};

const weeklyData = [
  { name: 'Mon', value: 65, date: 'yesterday' },
  { name: 'Tue', value: 78, date: 'today' },
  { name: 'Wed', value: 82, date: 'today' },
  { name: 'Thu', value: 91, date: 'today' },
  { name: 'Fri', value: 87, date: 'today' },
  { name: 'Sat', value: 74, date: 'today' },
  { name: 'Sun', value: 69, date: 'today' },
];

const trends = [
  { metric: "Mood Score", change: "+15%", trend: "up" },
  { metric: "Activity Level", change: "+8%", trend: "up" },
  { metric: "Sleep Quality", change: "-3%", trend: "down" },
  { metric: "Social Time", change: "0%", trend: "stable" }
];

const notes = {
  Morning: "Had a great workout session and healthy breakfast",
  Afternoon: "Productive work meeting and lunch with colleagues", 
  Evening: "Relaxed with a good book and some music",
  Night: "Peaceful meditation before sleep"
};

const scatterData = [
  { x: 1, y: 85, mood: 'happy' },
  { x: 2, y: 90, mood: 'excited' },
  { x: 3, y: 75, mood: 'calm' },
  { x: 4, y: 88, mood: 'content' },
  { x: 5, y: 82, mood: 'relaxed' }
];

const Trends = () => {
  const [selectedDay, setSelectedDay] = useState('today');
  const [hoveredSection, setHoveredSection] = useState(null);
  const [showGraph, setShowGraph] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const currentData = dayData[selectedDay] || dayData.today;

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-4 h-4 text-green-600" />;
      case "down":
        return <TrendingUp className="w-4 h-4 text-red-600 rotate-180" />;
      default:
        return <TrendingUp className="w-4 h-4 text-gray-600 rotate-90" />;
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <Navigation />
      
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center space-x-4 mb-4">
                <Link to="/">
                  <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                    <ArrowLeft size={16} />
                    <span>Back to Home</span>
                  </Button>
                </Link>
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                Daily Trends & Analytics
              </h1>
              <p className="text-lg text-gray-600">
                Track your mood patterns throughout the day
              </p>
            </div>
          </div>

          {/* Top Half */}
          <div className="grid lg:grid-cols-4 gap-6 mb-8 h-96">
            {/* Main Bar Chart - spans 3 columns */}
            <Card className="lg:col-span-3 bg-white/70 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <BarChart3 className="w-4 h-4 text-white" />
                    </div>
                    <CardTitle className="text-xl">Today's Mood Journey</CardTitle>
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      variant={showGraph ? "default" : "outline"} 
                      size="sm"
                      onClick={() => setShowGraph(true)}
                    >
                      Graph
                    </Button>
                    <Button 
                      variant={!showGraph ? "default" : "outline"} 
                      size="sm"
                      onClick={() => setShowGraph(false)}
                    >
                      Notes
                    </Button>
                  </div>
                </div>
                <CardDescription>Hover over sections to see detailed insights</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-4 h-48">
                  {currentData.map((section, index) => {
                    const Icon = section.icon;
                    return (
                      <div key={index} className="relative">
                        <div 
                          className="h-full bg-gray-100 rounded-lg overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-lg"
                          onMouseEnter={() => setHoveredSection(index)}
                          onMouseLeave={() => setHoveredSection(null)}
                        >
                          <div className="p-3 text-center">
                            <Icon className="w-6 h-6 mx-auto mb-2 text-gray-600" />
                            <div className="text-sm font-medium text-gray-700">{section.time}</div>
                          </div>
                          <div 
                            className="h-full transition-all duration-300 flex items-end"
                            style={{ backgroundColor: section.color }}
                          >
                            <div 
                              className="w-full bg-white/20 transition-all duration-300"
                              style={{ height: `${section.value}%` }}
                            />
                          </div>
                        </div>
                        
                        {/* Hover overlay */}
                        {hoveredSection === index && (
                          <div className="absolute inset-0 bg-white/95 rounded-lg p-4 animate-fade-in z-10">
                            {showGraph ? (
                              <div className="h-full">
                                <div className="text-sm font-medium mb-2">{section.time} Details</div>
                                <ResponsiveContainer width="100%" height="80%">
                                  <ScatterChart data={scatterData}>
                                    <XAxis type="number" dataKey="x" domain={[0, 6]} hide />
                                    <YAxis type="number" dataKey="y" domain={[0, 100]} hide />
                                    <Scatter dataKey="y" fill={section.color} />
                                  </ScatterChart>
                                </ResponsiveContainer>
                              </div>
                            ) : (
                              <div className="h-full flex items-center justify-center">
                                <div className="bg-yellow-100 border-l-4 border-yellow-400 p-3 rounded shadow-sm">
                                  <div className="text-xs font-medium text-yellow-800 mb-1">{section.time}</div>
                                  <div className="text-xs text-yellow-700">{notes[section.time]}</div>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Weekly Trends - spans 1 column */}
            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Weekly Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {trends.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-purple-50 transition-colors">
                      <span className="text-xs font-medium">{item.metric}</span>
                      <div className="flex items-center space-x-1">
                        {getTrendIcon(item.trend)}
                        <span className={`text-xs font-semibold ${getTrendColor(item.trend)}`}>
                          {item.change}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Bottom Half */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Weekly View */}
            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-xl">This Week</CardTitle>
                <CardDescription>Click on any day to view detailed breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={weeklyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                      <XAxis dataKey="name" stroke="#6B7280" />
                      <YAxis stroke="#6B7280" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'white', 
                          border: 'none', 
                          borderRadius: '8px',
                          boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                        }} 
                      />
                      <Bar 
                        dataKey="value" 
                        fill="#8B5CF6" 
                        radius={[4, 4, 0, 0]}
                        onClick={(data) => setSelectedDay(data.date)}
                        className="cursor-pointer hover:opacity-80"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Monthly Calendar View */}
            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
                    <CalendarIcon className="w-4 h-4 text-white" />
                  </div>
                  <CardTitle className="text-xl">Monthly View</CardTitle>
                </div>
                <CardDescription>Select a date to view that day's mood journey</CardDescription>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => {
                    if (date) {
                      setSelectedDate(date);
                      // You could add logic here to load data for the selected date
                      console.log('Selected date:', date);
                    }
                  }}
                  className="rounded-md border pointer-events-auto"
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trends;
