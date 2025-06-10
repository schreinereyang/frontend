// components/Loader.js
import { useEffect, useState } from 'react';

export default function Loader({ base = "Connexion en cours" }) {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => (prev.length < 3 ? prev + "." : ""));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center text-yellow-400 mt-6">
      <div className="w-6 h-6 mb-2 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-sm">{base}{dots}</p>
    </div>
  );
}
