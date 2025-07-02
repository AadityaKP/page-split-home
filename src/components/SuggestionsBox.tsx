import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SuggestionsBox = () => {
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      const res = await axios.get('/suggestions');
      setSuggestions(res.data.suggestions || []);
    };
    fetchSuggestions();
  }, []);

  return (
    <div className="rounded-lg p-4 bg-green-100 text-green-900 shadow">
      <h2 className="text-lg font-bold mb-2">Suggestions</h2>
      <ul className="list-disc pl-5">
        {suggestions.map((s, i) => <li key={i}>{s}</li>)}
      </ul>
    </div>
  );
};

export default SuggestionsBox;
