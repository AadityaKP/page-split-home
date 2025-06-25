
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

const ReflectionsBox = () => {
  const [reflection, setReflection] = useState("");

  const handleSubmit = () => {
    if (reflection.trim()) {
      console.log("Reflection submitted:", reflection);
      setReflection("");
      // Here you would typically save to a database
    }
  };

  return (
    <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-xl">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Reflections</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          placeholder="How are you feeling today? What's on your mind?"
          value={reflection}
          onChange={(e) => setReflection(e.target.value)}
          className="min-h-[100px] border-purple-200 focus:border-purple-400"
        />
        <Button 
          onClick={handleSubmit}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          disabled={!reflection.trim()}
        >
          Submit Reflection
        </Button>
      </CardContent>
    </Card>
  );
};

export default ReflectionsBox;
