import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SECTIONS = ['morning', 'afternoon', 'evening', 'night'];
const COLORS = ['bg-yellow-200', 'bg-green-200', 'bg-pink-200', 'bg-blue-200'];

export default function TrendsNotesPostIts({ day }) {
  const [notes, setNotes] = useState({});
  useEffect(() => {
    const fetchNotes = async () => {
      const allNotes = {};
      for (const section of SECTIONS) {
        const res = await axios.get('/trends/notes', { params: { date: day.toISOString().slice(0, 10), section } });
        allNotes[section] = res.data.note || '';
      }
      setNotes(allNotes);
    };
    fetchNotes();
  }, [day]);
  return (
    <div className="flex gap-4">
      {SECTIONS.map((section, i) => (
        <div key={section} className={`w-32 h-32 p-2 ${COLORS[i]} rounded shadow flex flex-col`}>
          <div className="font-bold capitalize mb-1">{section}</div>
          <div className="flex-1 text-sm">{notes[section]}</div>
        </div>
      ))}
    </div>
  );
} 