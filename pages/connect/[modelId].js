// pages/connect/[modelId].js
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function ConnectModel() {
  const router = useRouter();
  const { modelId } = router.query;
  const [status, setStatus] = useState('🕐 En attente de connexion...');

  useEffect(() => {
    if (!modelId) return;

    const interval = setInterval(async () => {
      try {
        const res = await fetch(`/api/cookies/check?modelId=${modelId}`);
        const data = await res.json();

        if (data?.connected) {
          setStatus('✅ Connexion détectée ! Redirection...');
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

      <p className="mt-6 text-yellow-400 text-sm text-center">{status}</p>
    </div>
  );
}
