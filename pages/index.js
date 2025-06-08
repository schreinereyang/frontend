// pages/index.js
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 p-8">
      <h1 className="text-4xl font-bold mb-6 text-center">📊 OnlyMoly Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <Link href="/import">
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow hover:shadow-md transition cursor-pointer">
            <h2 className="text-2xl font-semibold mb-2">📥 Importer un modèle IA</h2>
            <p className="text-gray-600">Ajoute un QCM + un script funnel depuis un fichier JSON.</p>
          </div>
        </Link>

        <Link href="/models">
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow hover:shadow-md transition cursor-pointer">
            <h2 className="text-2xl font-semibold mb-2">🤖 Modèles enregistrés</h2>
            <p className="text-gray-600">Consulte et gère les modèles IA enregistrés dans la base.</p>
          </div>
        </Link>

        <Link href="/medias">
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow hover:shadow-md transition cursor-pointer">
            <h2 className="text-2xl font-semibold mb-2">🎥 Médias & Contenus</h2>
            <p className="text-gray-600">Upload des vidéos, photos et ajoute les prix pour chaque phase.</p>
          </div>
        </Link>

        <Link href="/settings">
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow hover:shadow-md transition cursor-pointer">
            <h2 className="text-2xl font-semibold mb-2">⚙️ Configuration</h2>
            <p className="text-gray-600">Connecte OnlyFans, configure l’ID GPT, et gère les options IA.</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
