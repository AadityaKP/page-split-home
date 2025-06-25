
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, Music, Camera, BookOpen } from "lucide-react";

const suggestions = [
  { id: 1, text: "Listen to upbeat music", icon: Music },
  { id: 2, text: "Take a walk outside", icon: Star },
  { id: 3, text: "Practice photography", icon: Camera },
  { id: 4, text: "Read a good book", icon: BookOpen }
];

const SuggestionsBox = () => {
  return (
    <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-xl">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Suggestions</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {suggestions.map((suggestion) => {
            const Icon = suggestion.icon;
            return (
              <li key={suggestion.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-purple-50 transition-colors">
                <Icon className="w-5 h-5 text-purple-600" />
                <span className="text-sm">{suggestion.text}</span>
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
};

export default SuggestionsBox;
