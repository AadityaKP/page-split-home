
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Calendar, BarChart3, PieChart as PieChartIcon, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const weeklyData = [
  { name: 'Mon', value: 65 },
  { name: 'Tue', value: 78 },
  { name: 'Wed', value: 82 },
  { name: 'Thu', value: 91 },
  { name: 'Fri', value: 87 },
  { name: 'Sat', value: 74 },
  { name: 'Sun', value: 69 },
];

const monthlyTrends = [
  { name: 'Jan', productivity: 65, happiness: 70 },
  { name: 'Feb', productivity: 78, happiness: 75 },
  { name: 'Mar', productivity: 82, happiness: 80 },
  { name: 'Apr', productivity: 91, happiness: 85 },
  { name: 'May', productivity: 87, happiness: 88 },
  { name: 'Jun', productivity: 94, happiness: 92 },
];

const categoryData = [
  { name: 'Work', value: 45, color: '#8B5CF6' },
  { name: 'Personal', value: 25, color: '#06B6D4' },
  { name: 'Health', value: 20, color: '#10B981' },
  { name: 'Learning', value: 10, color: '#F59E0B' },
];

const Trends = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <Navigation />
      
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-12">
            <div>
              <div className="flex items-center space-x-4 mb-4">
                <Link to="/">
                  <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                    <ArrowLeft size={16} />
                    <span>Back to Home</span>
                  </Button>
                </Link>
              </div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
                Weekly Trends & Analytics
              </h1>
              <p className="text-xl text-gray-600">
                Comprehensive insights into your performance and growth patterns
              </p>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-gray-600">
                <Calendar size={20} />
                <span>June 2024</span>
              </div>
            </div>
          </div>

          {/* Main Chart Section */}
          <div className="grid lg:grid-cols-3 gap-8 mb-8">
            <Card className="lg:col-span-2 bg-white/70 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <BarChart3 className="w-4 h-4 text-white" />
                  </div>
                  <CardTitle className="text-xl">Weekly Performance Overview</CardTitle>
                </div>
                <CardDescription>Your daily performance metrics for this week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
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
                      <Bar dataKey="value" fill="url(#colorGradient)" radius={[4, 4, 0, 0]} />
                      <defs>
                        <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#8B5CF6" />
                          <stop offset="100%" stopColor="#06B6D4" />
                        </linearGradient>
                      </defs>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                    <PieChartIcon className="w-4 h-4 text-white" />
                  </div>
                  <CardTitle className="text-xl">Activity Distribution</CardTitle>
                </div>
                <CardDescription>How you spend your time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 space-y-2">
                  {categoryData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                        <span className="text-sm font-medium">{item.name}</span>
                      </div>
                      <span className="text-sm text-gray-600">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Trends Line Chart */}
          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-xl mb-8">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-white" />
                </div>
                <CardTitle className="text-xl">6-Month Trend Analysis</CardTitle>
              </div>
              <CardDescription>Productivity and happiness trends over the past 6 months</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyTrends}>
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
                    <Line 
                      type="monotone" 
                      dataKey="productivity" 
                      stroke="#8B5CF6" 
                      strokeWidth={3}
                      dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 6 }}
                      name="Productivity"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="happiness" 
                      stroke="#06B6D4" 
                      strokeWidth={3}
                      dot={{ fill: '#06B6D4', strokeWidth: 2, r: 6 }}
                      name="Happiness"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-4 gap-6">
            <Card className="bg-gradient-to-br from-purple-500 to-purple-600 border-0 shadow-xl text-white">
              <CardContent className="p-6">
                <div className="text-3xl font-bold mb-2">94%</div>
                <div className="text-purple-100">Weekly Average</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-blue-500 to-blue-600 border-0 shadow-xl text-white">
              <CardContent className="p-6">
                <div className="text-3xl font-bold mb-2">+12%</div>
                <div className="text-blue-100">Monthly Growth</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-green-500 to-green-600 border-0 shadow-xl text-white">
              <CardContent className="p-6">
                <div className="text-3xl font-bold mb-2">87</div>
                <div className="text-green-100">Tasks Completed</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-orange-500 to-orange-600 border-0 shadow-xl text-white">
              <CardContent className="p-6">
                <div className="text-3xl font-bold mb-2">7</div>
                <div className="text-orange-100">Active Streaks</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trends;
