
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDashboardData } from '../hooks/useDashboardData';

const SuggestionsBox = () => {
  const { suggestions, loading, error } = useDashboardData();

  if (loading) return (
    <Card className="bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-xl border-0 shadow-2xl h-full border border-white/30">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg text-white animate-pulse">Loading...</CardTitle>
      </CardHeader>
    </Card>
  );
  
  if (error) return (
    <Card className="bg-gradient-to-br from-red-500/20 to-red-600/10 backdrop-blur-xl border-0 shadow-2xl h-full border border-red-300/30">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg text-red-100">Error: {error}</CardTitle>
      </CardHeader>
    </Card>
  );

  const suggestionsList = suggestions.suggestions || [
    'Take a 10-minute walk outside',
    'Listen to upbeat music',
    'Call a friend or family member',
    'Practice deep breathing'
  ];

  return (
    <Card className="bg-gradient-to-br from-white/25 to-white/10 backdrop-blur-xl border-0 shadow-2xl h-full border border-white/30 hover:shadow-3xl transition-all duration-300">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl text-white font-bold tracking-wide">Suggestions ✨</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {suggestionsList.slice(0, 4).map((suggestion, i) => (
            <li key={i} className="flex items-start space-x-3 group hover:bg-white/10 p-2 rounded-lg transition-all duration-300">
              <span className="w-3 h-3 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mt-2 flex-shrink-0 group-hover:scale-125 transition-transform duration-300 shadow-lg"></span>
              <span className="text-sm text-white/90 leading-relaxed group-hover:text-white transition-colors duration-300 font-medium">{suggestion}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default SuggestionsBox;
