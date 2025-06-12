import { useEffect, useState } from "react";
import LayoutDashboard from "../components/LayoutDashboard";
import CardSection from "../components/CardSection";

type Media = {
  id: string;
  title: string;
  category: string;
  price: number;
};

export default function MediasPage() {
  const [medias, setMedias] = useState<Media[]>([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    // Remplace cette URL par ton vrai endpoint ou charge un fichier JSON local
    fetch("/api/medias")
      .then((res) => res.json())
      .then((data) => setMedias(data.medias || []))
      .catch((err) => console.error("Erreur chargement des médias:", err));
  }, []);

  const filteredMedias = medias.filter((m) =>
    filter ? m.category.toLowerCase().includes(filter.toLowerCase()) : true
  );

  return (
    <LayoutDashboard>
      <div className="text-white space-y-6">
        <h1 className="text-3xl font-bold text-purple-300">🎥 Tous les médias</h1>

        <input
          type="text"
          placeholder="Filtrer par catégorie..."
          className="bg-gray-800 p-2 rounded w-full"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />

        <CardSection>
          <ul className="divide-y divide-gray-700 text-sm">
            {filteredMedias.map((m) => (
              <li key={m.id} className="py-2">
                <div className="flex justify-between">
                  <span>📸 <strong>{m.title}</strong> <em className="text-gray-400">({m.category})</em></span>
                  <span className="text-purple-400 font-semibold">${m.price}</span>
                </div>
              </li>
            ))}
            {filteredMedias.length === 0 && (
              <li className="text-gray-400 text-center py-4">Aucun média trouvé.</li>
            )}
          </ul>
        </CardSection>
      </div>
    </LayoutDashboard>
  );
}
