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
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">🔐 Connexion manuelle à OnlyFans</h1>
      <p className="mb-6 text-sm text-gray-400">Connecte-toi manuellement dans la fenêtre ci-dessous</p>
      <div className="w-full max-w-5xl h-[600px] border border-purple-500">
        <iframe
          src="http://163.172.134.56:6080/?resize=remote"
          width="100%"
          height="100%"
          frameBorder="0"
        />
      </div>
      <p className="mt-4 text-yellow-400 text-sm">{status}</p>
    </div>
  );
}
