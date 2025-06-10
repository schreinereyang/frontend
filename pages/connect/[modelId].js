// pages/connect/[modelId].js
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Loader from '../../components/Loader';

export default function ConnectModel() {
  const router = useRouter();
  const { modelId } = router.query;
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (!modelId) return;

    const interval = setInterval(async () => {
      try {
        const res = await fetch(`/api/cookies/check?modelId=${modelId}`);
        const data = await res.json();

        if (data?.connected) {
          setConnected(true);
          clearInterval(interval);
          setTimeout(() => router.push('/models'), 2000);
        } else {
          console.log('⏳ En attente de cookies pour', modelId);
        }
      } catch (err) {
        console.error('Erreur de polling cookies:', err);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [modelId]);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4 py-10">
      <h1 className="text-3xl font-semibold mb-2 text-center">
        🔐 Connexion manuelle à OnlyFans
      </h1>
      <p className="mb-6 text-sm text-gray-400 text-center">
        Connecte-toi manuellement dans la fenêtre ci-dessous
      </p>

      <div className="w-full max-w-6xl h-[600px] rounded-lg overflow-hidden border border-purple-500 shadow-lg">
        <iframe
          src="https://vnc.onlymoly.com/vnc.html?host=vnc.onlymoly.com&port=443"
          width="100%"
          height="100%"
          frameBorder="0"
          allow="fullscreen"
        />
      </div>

      {connected ? (
        <p className="mt-6 text-green-400 text-sm text-center">
          ✅ Connexion détectée ! Redirection...
        </p>
      ) : (
        <>
          <Loader base="🕐 En attente de connexion" />
          <div className="mt-8">
            <button
              onClick={() => router.push('/models')}
              className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded transition"
            >
              ❌ Annuler la connexion
            </button>
          </div>
        </>
      )}
    </div>
  );
}
