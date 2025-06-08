// pages/import.js
import { useState } from 'react';

export default function ImportPage() {
  const [persona, setPersona] = useState('');
  const [funnel, setFunnel] = useState('');
  const [preview, setPreview] = useState({ persona: null, funnel: null });
  const [status, setStatus] = useState('');

  const handleFile = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const parsed = JSON.parse(evt.target.result);
        if (type === 'persona') {
          setPersona(evt.target.result);
          setPreview((p) => ({ ...p, persona: parsed }));
        } else {
          setFunnel(evt.target.result);
          setPreview((p) => ({ ...p, funnel: parsed }));
        }
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
          name: preview.persona?.name || 'Nouveau modèle',
          age: preview.persona?.age || 20,
          assistant_id: '',
          persona: JSON.parse(persona),
          funnel: JSON.parse(funnel),
          cookies: {}
        })
      });

      if (res.ok) {
        setStatus('✅ Importation réussie');
      } else {
        const err = await res.json();
        setStatus('❌ Erreur : ' + err.error);
      }
    } catch (e) {
      setStatus('❌ Erreur lors de l\'envoi');
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-extrabold mb-6 border-b pb-2">📥 Importer QCM & Funnel</h1>

      <div className="mb-6">
        <label className="block text-lg font-medium mb-1">📄 Fichier QCM (persona.json)</label>
        <input
          type="file"
          accept=".json"
          onChange={(e) => handleFile(e, 'persona')}
          className="block w-full border border-gray-300 rounded px-3 py-2"
        />
        {preview.persona && (
          <pre className="bg-gray-100 p-3 mt-3 text-sm overflow-auto max-h-60 rounded border border-gray-200">
            {JSON.stringify(preview.persona, null, 2)}
          </pre>
        )}
      </div>

      <div className="mb-6">
        <label className="block text-lg font-medium mb-1">📜 Fichier Funnel (funnel.json)</label>
        <input
          type="file"
          accept=".json"
          onChange={(e) => handleFile(e, 'funnel')}
          className="block w-full border border-gray-300 rounded px-3 py-2"
        />
        {preview.funnel && (
          <pre className="bg-gray-100 p-3 mt-3 text-sm overflow-auto max-h-60 rounded border border-gray-200">
            {JSON.stringify(preview.funnel.slice(0, 2), null, 2)}...
          </pre>
        )}
      </div>

      <button
        onClick={handleSubmit}
        className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded shadow-md transition duration-200"
      >
        💾 Enregistrer le modèle
      </button>

      {status && (
        <p className="mt-4 text-base text-gray-700 bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded">
          {status}
        </p>
      )}
    </div>
  );
}
