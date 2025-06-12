import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import LayoutDashboard from '../../components/LayoutDashboard';
import CardSection from '../../components/CardSection';

type ModelDetail = {
  id: number;
  name: string;
  age: number;
  active: boolean;
  earnings: number;
  recentMessages: string[];
  created_at: string;
};

export default function ModelDetailsPage() {
  const router = useRouter();
  const { id } = router.query;
  const [model, setModel] = useState<ModelDetail | null>(null);

  useEffect(() => {
    if (id) {
      fetch(`/api/models/${id}`)
        .then((res) => res.json())
        .then((data) => setModel(data.model))
        .catch((err) => console.error('Erreur chargement modèle:', err));
    }
  }, [id]);

  if (!model) return null;

  return (
    <LayoutDashboard>
      <div className="text-white space-y-6">
        <h1 className="text-3xl font-bold text-purple-300">📄 Détail : {model.name}</h1>

        <CardSection>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-400">Âge : {model.age}</p>
              <p className="text-sm text-gray-400">Créée le : {new Date(model.created_at).toLocaleDateString()}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm ${model.active ? 'bg-green-600' : 'bg-red-500'}`}>
              {model.active ? 'Active' : 'Inactive'}
            </span>
          </div>
        </CardSection>

        <CardSection>
          <h2 className="text-xl font-semibold text-purple-300 mb-2">Statistiques</h2>
          <p className="text-sm text-gray-300">Total ventes : €{model.earnings}</p>
          <p className="text-sm text-gray-300">Messages récents : {model.recentMessages.length}</p>
        </CardSection>

        <CardSection>
          <h2 className="text-xl font-semibold text-purple-300 mb-2">💬 Derniers messages</h2>
          <ul className="space-y-1 text-sm text-gray-300">
            {model.recentMessages.slice(0, 10).map((msg, idx) => (
              <li key={idx}>• {msg}</li>
            ))}
          </ul>
        </CardSection>

        <div className="text-center">
          <button className="mt-6 bg-purple-600 hover:bg-purple-700 text-white font-bold px-6 py-3 rounded shadow">
            {model.active ? '⏸ Désactiver la modèle' : '▶️ Activer la modèle'}
          </button>
        </div>
      </div>
    </LayoutDashboard>
  );
}
