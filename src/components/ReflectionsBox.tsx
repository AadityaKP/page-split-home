
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

  return (
    <Card className="bg-gradient-to-br from-white/25 to-white/10 backdrop-blur-xl border-0 shadow-2xl h-full border border-white/30 hover:shadow-3xl transition-all duration-300">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl text-white font-bold tracking-wide">Reflections 💭</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            placeholder="Write your thoughts..."
            className="min-h-[80px] resize-none bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:bg-white/30 focus:border-white/50 focus:ring-white/30 transition-all duration-300"
          />
          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            disabled={!reflection.trim()}
          >
            Submit ✨
          </Button>
        </form>
        {submitted && (
          <div className="text-green-300 text-sm text-center font-bold bg-green-500/20 p-2 rounded-lg animate-pulse">
            Reflection submitted successfully! 🎉
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ReflectionsBox;
