// pages/models.js
import { useRouter } from 'next/router';
import LayoutDashboard from '@/components/LayoutDashboard';

const mockModels = [
  {
    name: 'Elii',
    age: 21,
    active: true,
    earnings: 2140,
    recentMessages: ['Heyyy babe 😘', 'Tu veux voir la suite ?', 'Clique sur la vidéo...'],
  },
  {
    name: 'Sofia',
    age: 23,
    active: false,
    earnings: 0,
    recentMessages: [],
  },
];

export default function ModelsPage() {
  const router = useRouter();

  const handleAddModel = () => {
    const id = Math.random().toString(36).substring(2, 10);
    console.log("✅ Redirection vers /connect/" + id);
    router.push(`/connect/${id}`);
  };

  return (
    <LayoutDashboard>
      <div className="text-white">
        <h1 className="text-3xl font-bold mb-6">🤖 Modèles IA</h1>
        <div className="grid md:grid-cols-2 gap-6">
          {mockModels.map((m, i) => (
            <div
              key={i}
              className="bg-[#131b2c] p-4 rounded-xl border border-purple-700"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-semibold text-purple-400">
                  {m.name}
                </h3>
                <span
                  className={`text-sm ${m.active ? 'text-green-400' : 'text-red-400'}`}
                >
                  {m.active ? 'Active' : 'Inactive'}
                </span>
              </div>
              <p className="text-sm text-gray-400">Âge : {m.age}</p>
              <p className="text-sm text-gray-400">Ventes : €{m.earnings}</p>
              {m.recentMessages.length > 0 && (
                <div className="mt-2 text-sm text-gray-300 space-y-1">
                  {m.recentMessages.map((msg, j) => (
                    <p key={j} className="truncate">
                      💬 {msg}
                    </p>
                  ))}
                </div>
              )}
            </div>
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
