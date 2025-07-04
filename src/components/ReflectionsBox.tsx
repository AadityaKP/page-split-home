
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import axios from 'axios';
import { useDashboardData } from '../hooks/useDashboardData';

const ReflectionsBox = () => {
  const { userMood, loading, error } = useDashboardData();
  const [reflection, setReflection] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reflection.trim()) return;
    
    try {
      await axios.post('/reflections', {
        reflection,
        date: userMood.date,
        day: userMood.day,
        time: userMood.time
      });
      setReflection('');
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 2000);
    } catch (err) {
      console.error('Failed to submit reflection:', err);
    }
  };

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

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg text-gray-800">Reflections</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <form onSubmit={handleSubmit} className="space-y-3">
          <Textarea
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            placeholder="Write your thoughts..."
            className="min-h-[80px] resize-none border-gray-200 focus:border-purple-400 focus:ring-purple-400"
          />
          <Button 
            type="submit" 
            className="w-full bg-purple-600 hover:bg-purple-700 text-white"
            disabled={!reflection.trim()}
          >
            Submit
          </Button>
        </form>
        {submitted && (
          <div className="text-green-600 text-sm text-center font-medium">
            Reflection submitted successfully!
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ReflectionsBox;
