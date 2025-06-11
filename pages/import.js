// pages/import.js
import { useState } from 'react';
import LayoutDashboard from '../components/LayoutDashboard';

export default function ImportPage() {
  const [persona, setPersona] = useState(null);
  const [funnel, setFunnel] = useState(null);
  const [status, setStatus] = useState('');

  const handleFile = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result);
        type === 'persona' ? setPersona(parsed) : setFunnel(parsed);
      } catch (err) {
        setStatus('❌ Fichier invalide');
      }
    };
    reader.readAsText(file);
  };

  const handleSubmit = async () => {
    setStatus('⏳ Envoi en cours...');
    try {
      const res = await fetch('https://backend-onlymoly.vercel.app/api/models', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: persona?.name || 'Nouveau modèle',
          age: persona?.age || 20,
          assistant_id: '',
          persona,
          funnel,
          cookies: {}
        })
      });
      res.ok ? setStatus('✅ Importation réussie') : setStatus('❌ Erreur lors de l’envoi');
    } catch {
      setStatus('❌ Erreur serveur');
    }
  };

  return (
    <LayoutDashboard>
      <div className="max-w-3xl mx-auto text-white">
        <h1 className="text-3xl font-bold mb-6">📥 Import QCM & Funnel</h1>

        <div className="mb-6">
          <label className="block text-lg font-medium mb-1">📄 Persona (QCM)</label>
          <input type="file" accept=".json" onChange={(e) => handleFile(e, 'persona')} className="w-full bg-[#0b0f1a] text-sm p-2 rounded border border-purple-600" />
          {persona && (
            <pre className="bg-[#131b2c] p-3 mt-3 text-sm overflow-auto rounded border border-purple-800">
              {JSON.stringify(persona, null, 2)}
            </pre>
          )}
        </div>

        <div className="mb-6">
          <label className="block text-lg font-medium mb-1">📜 Funnel (Scripts)</label>
          <input type="file" accept=".json" onChange={(e) => handleFile(e, 'funnel')} className="w-full bg-[#0b0f1a] text-sm p-2 rounded border border-purple-600" />
          {funnel && (
            <pre className="bg-[#131b2c] p-3 mt-3 text-sm overflow-auto rounded border border-purple-800">
              {JSON.stringify(funnel.slice(0, 2), null, 2)}...
            </pre>
          )}
        </div>

        <button onClick={handleSubmit} className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded shadow">
          💾 Enregistrer le modèle
        </button>

        {status && <p className="mt-4 text-yellow-400 text-sm">{status}</p>}
      </div>
    </LayoutDashboard>
  );
}
