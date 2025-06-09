import { useState } from 'react';

export default function OFConnectStatus({ modelId, onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  const handleConnect = async () => {
    if (!modelId) {
      setStatusMessage('⛔ Aucun ID de modèle fourni');
      return;
    }

    setLoading(true);
    setStatusMessage('Connexion au compte OnlyFans en cours...');

    try {
      const res = await fetch('http://163.172.134.56:3001/connect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ modelId }),
      });

      if (!res.ok) throw new Error();

      setStatusMessage('✅ Connexion au compte OnlyFans réussie');
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error(err);
      setStatusMessage('❌ Échec de la connexion au compte OnlyFans');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-center">
      <button
        onClick={handleConnect}
        className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded flex items-center justify-center gap-2"
      >
        {loading && (
          <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
        )}
        {loading ? 'Connexion en cours...' : '✅ Connexion terminée'}
      </button>
      {statusMessage && (
        <p className="mt-4 text-sm text-yellow-400">{statusMessage}</p>
      )}
    </div>
  );
}
