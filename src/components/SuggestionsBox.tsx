
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDashboardData } from '../hooks/useDashboardData';

const SuggestionsBox = () => {
  const { suggestions, loading, error } = useDashboardData();

  if (loading) return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Loading...</CardTitle>
      </CardHeader>
    </Card>
  );
  
  if (error) return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg text-red-600">Error: {error}</CardTitle>
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
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg text-gray-800">Suggestions</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {suggestionsList.slice(0, 4).map((suggestion, i) => (
            <li key={i} className="flex items-start space-x-2">
              <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></span>
              <span className="text-sm text-gray-700 leading-relaxed">{suggestion}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default SuggestionsBox;
