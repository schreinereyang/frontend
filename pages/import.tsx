import { useState } from "react";
import LayoutDashboard from "../components/LayoutDashboard";
import CardSection from "../components/CardSection";

type Media = {
  id: string;
  title: string;
  category: string;
  price: number;
  file: File;
};

export default function ImportPage() {
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(10);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [medias, setMedias] = useState<Media[]>([]);

  const handleUpload = () => {
    if (!file || !category || !title) return;
    const newMedia: Media = {
      id: Math.random().toString(36).substring(2, 10),
      title,
      category,
      price,
      file
    };
    setMedias([...medias, newMedia]);
    setCategory("");
    setPrice(10);
    setTitle("");
    setFile(null);
  };

  return (
    <LayoutDashboard>
      <div className="text-white space-y-6">
        <h1 className="text-3xl font-bold text-purple-300">📥 Import de médias</h1>

        <CardSection>
          <div className="space-y-4">
            <input
              type="file"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="bg-gray-800 p-2 rounded w-full"
            />

            <input
              type="text"
              placeholder="Nom de la vidéo/photo"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-gray-800 p-2 rounded w-full"
            />

            <input
              type="text"
              placeholder="Catégorie (ex: fesses, seins, POV)"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="bg-gray-800 p-2 rounded w-full"
            />

            <input
              type="number"
              placeholder="Prix en $"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="bg-gray-800 p-2 rounded w-full"
            />

            <button
              onClick={handleUpload}
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-6 py-2 rounded shadow"
            >
              ➕ Ajouter le média
            </button>
          </div>
        </CardSection>

        <CardSection>
          <h2 className="text-xl font-semibold text-purple-300 mb-4">📂 Médias enregistrés</h2>
          <ul className="space-y-3 text-sm text-gray-300">
            {medias.map((m) => (
              <li key={m.id} className="border-b border-gray-700 pb-2">
                <p>📸 <strong>{m.title}</strong> — <span className="text-purple-400">${m.price}</span></p>
                <p className="text-xs text-gray-400">Catégorie : {m.category}</p>
              </li>
            ))}
          </ul>
        </CardSection>
      </div>
    </LayoutDashboard>
  );
}
