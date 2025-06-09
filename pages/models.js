// pages/models.js
import { useState } from 'react';
import LayoutDashboard from '@/components/LayoutDashboard';
import OFConnectStatus from '@/components/OFConnectStatus';

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
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({ name: '', age: '', file: null });
  const [message, setMessage] = useState('');
  const [modelId, setModelId] = useState(Math.random().toString(36).substring(2, 10));

  return (
    <LayoutDashboard>
      <div className="text-white">
        {step === 0 && (
          <>
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
                onClick={() => setStep(1)}
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-6 py-3 rounded shadow"
              >
                ➕ Ajouter une modèle
              </button>
            </div>
          </>
        )}

        {step === 1 && (
          <div className="max-w-xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">🔐 Connexion OnlyFans</h2>
            <p className="text-sm text-gray-400 mb-4">
              Connecte-toi manuellement à OnlyFans dans la fenêtre intégrée pour capturer les cookies.
            </p>
            <div className="w-full h-96 bg-black mb-4 flex items-center justify-center border border-purple-600">
              <p className="text-purple-500 text-center">[🧪 IFRAME navigateur OF à intégrer ici]</p>
            </div>
            <OFConnectStatus
              modelId={modelId}
              onSuccess={() => setStep(2)}
            />
          </div>
        )}

        {step === 2 && (
          <div className="max-w-xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">📝 Informations sur la modèle</h2>
            <input
              type="text"
              placeholder="Nom de la modèle"
              className="w-full bg-[#0b0f1a] border border-purple-600 p-2 rounded mb-4"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <input
              type="number"
              placeholder="Âge"
              className="w-full bg-[#0b0f1a] border border-purple-600 p-2 rounded mb-4"
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: e.target.value })}
            />
            <input
              type="file"
              className="w-full text-sm mb-2"
              accept=".json,.csv"
              onChange={(e) => setFormData({ ...formData, file: e.target.files[0] })}
            />
            <button
              onClick={() =>
                setMessage('✅ Modèle enregistrée. ⚠️ L’IA ne sera pas activée tant que les infos minimales ne sont pas complètes.')
              }
              className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded"
            >
              💾 Enregistrer la modèle
            </button>
            {message && (
              <p className="mt-4 text-yellow-400 text-sm">{message}</p>
            )}
          </div>
        )}
      </div>
    </LayoutDashboard>
  );
}
