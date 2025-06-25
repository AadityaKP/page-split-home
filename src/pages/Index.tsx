
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Smile, Star, Users, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <Navigation />
      
      {/* Hero Section */}
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mb-8 shadow-lg">
              <Smile className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6">
              HAPPY
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Welcome to your personal dashboard where happiness meets productivity. 
              Track your progress, visualize your data, and stay motivated.
            </p>
            <Link to="/trends">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                View Trends & Analytics
              </Button>
            </Link>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <CardHeader className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-full mb-4 mx-auto">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl font-semibold">Recognition & Goals</CardTitle>
                <CardDescription>Track your achievements and set new milestones</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
                    <span className="text-sm font-medium">Weekly Goals</span>
                    <span className="text-sm text-green-600 font-semibold">8/10</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                    <span className="text-sm font-medium">Achievements</span>
                    <span className="text-sm text-purple-600 font-semibold">24</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <CardHeader className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full mb-4 mx-auto">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl font-semibold">Team & Social</CardTitle>
                <CardDescription>Connect with others and share your progress</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
                    <span className="text-sm font-medium">Team Members</span>
                    <span className="text-sm text-blue-600 font-semibold">12</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg">
                    <span className="text-sm font-medium">Collaborations</span>
                    <span className="text-sm text-orange-600 font-semibold">6</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <CardHeader className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full mb-4 mx-auto">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl font-semibold">Analytics</CardTitle>
                <CardDescription>Detailed insights into your performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg">
                    <span className="text-sm font-medium">This Week</span>
                    <span className="text-sm text-cyan-600 font-semibold">+15%</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gradient-to-r from-emerald-50 to-green-50 rounded-lg">
                    <span className="text-sm font-medium">Overall Trend</span>
                    <span className="text-sm text-emerald-600 font-semibold">↗ Growing</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <Card className="bg-gradient-to-r from-purple-600 to-blue-600 border-0 shadow-2xl">
              <CardContent className="p-12">
                <h2 className="text-3xl font-bold text-white mb-4">
                  Ready to dive deeper into your data?
                </h2>
                <p className="text-purple-100 text-lg mb-8">
                  Explore detailed analytics, trends, and insights to make better decisions.
                </p>
                <Link to="/trends">
                  <Button size="lg" variant="secondary" className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-3 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                    Explore Analytics Dashboard
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
