import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import LayoutDashboard from '../components/LayoutDashboard';
import CardSection from '../components/CardSection';

type Model = {
  id: number;
  name: string;
  age: number;
  active: boolean;
  earnings: number;
  recentMessages: string[];
  created_at: string;
};

export default function ModelsPage() {
  const router = useRouter();
  const [models, setModels] = useState<Model[]>([]);

  useEffect(() => {
    fetch('/api/models')
      .then((res) => res.json())
      .then((data) => setModels(data.models || []))
      .catch((err) => console.error('Erreur chargement modèles:', err));
  }, []);

  const handleAddModel = () => {
    const id = Math.random().toString(36).substring(2, 10);
    router.push(`/connect/${id}`);
  };

  return (
    <LayoutDashboard>
      <div className="text-white">
        <h1 className="text-3xl font-bold mb-6">🤖 Modèles IA</h1>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {models.map((m) => (
            <CardSection
              key={m.id}
              className="cursor-pointer hover:border-purple-400 transition"
              onClick={() => router.push(`/models/${m.id}`)}
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-semibold text-purple-400">{m.name}</h3>
                <span className={`text-sm ${m.active ? 'text-green-400' : 'text-red-400'}`}>
                  {m.active ? 'Active' : 'Inactive'}
                </span>
              </div>
              <p className="text-sm text-gray-400">Âge : {m.age}</p>
              <p className="text-sm text-gray-400">Ventes : €{m.earnings}</p>
              <p className="text-sm text-gray-500">Ajoutée le : {new Date(m.created_at).toLocaleDateString()}</p>

              {m.recentMessages?.length > 0 && (
                <div className="mt-2 text-sm text-gray-300 space-y-1">
                  {m.recentMessages.slice(0, 3).map((msg, j) => (
                    <p key={j} className="truncate">💬 {msg}</p>
                  ))}
                </div>
              )}
            </CardSection>
          ))}
        </div>

        <div className="mt-10 text-center">
          <button
            onClick={handleAddModel}
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-6 py-3 rounded shadow"
          >
            ➕ Ajouter une modèle
          </button>
        </div>
      </div>
    </LayoutDashboard>
  );
}
