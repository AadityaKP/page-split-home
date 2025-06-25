
import { Button } from "@/components/ui/button";
import { Home, TrendingUp } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Dashboard
            </Link>
            <div className="hidden md:flex space-x-4">
              <Link to="/">
                <Button 
                  variant={location.pathname === "/" ? "default" : "ghost"} 
                  className="flex items-center space-x-2"
                >
                  <Home size={18} />
                  <span>Home</span>
                </Button>
              </Link>
              <Link to="/trends">
                <Button 
                  variant={location.pathname === "/trends" ? "default" : "ghost"} 
                  className="flex items-center space-x-2"
                >
                  <TrendingUp size={18} />
                  <span>Trends</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
