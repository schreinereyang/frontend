// pages/dashboard.js
import Link from 'next/link';
import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Lun', earnings: 120 },
  { name: 'Mar', earnings: 240 },
  { name: 'Mer', earnings: 180 },
  { name: 'Jeu', earnings: 320 },
  { name: 'Ven', earnings: 300 },
  { name: 'Sam', earnings: 400 },
  { name: 'Dim', earnings: 350 },
];

export default function Dashboard() {
  const [period, setPeriod] = useState('Semaine');

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6 space-y-4">
        <h1 className="text-2xl font-extrabold text-indigo-600">OnlyMoly</h1>
        <nav className="space-y-2 text-gray-700">
          <Link href="/dashboard" className="block hover:text-indigo-600">🏠 Dashboard</Link>
          <Link href="/import" className="block hover:text-indigo-600">📥 Import</Link>
          <Link href="/models" className="block hover:text-indigo-600">🤖 Modèles</Link>
          <Link href="/medias" className="block hover:text-indigo-600">🎥 Médias</Link>
          <Link href="/scripts" className="block hover:text-indigo-600">✍️ Scripts</Link>
          <Link href="/ia" className="block hover:text-indigo-600">🧠 IA</Link>
          <Link href="/settings" className="block hover:text-indigo-600">⚙️ Paramètres</Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        <h2 className="text-3xl font-bold mb-6">📊 Dashboard</h2>

        {/* Résumé */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-10">
          <Card title="Revenus" value="€1 420" />
          <Card title="Messages IA" value="312" />
          <Card title="Médias vendus" value="48" />
          <Card title="Abonnés actifs" value="92" />
          <Card title="IA actives" value="6" />
        </div>

        {/* Graphique */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between mb-4">
            <h3 className="text-xl font-semibold">📈 Chatting Earnings ({period})</h3>
            <select value={period} onChange={e => setPeriod(e.target.value)} className="border rounded px-2 py-1">
              <option>Semaine</option>
              <option>Mois</option>
              <option>Hier</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="earnings" stroke="#6366f1" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </main>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow text-center">
      <h4 className="text-sm font-semibold text-gray-500">{title}</h4>
      <p className="text-2xl font-bold text-indigo-600 mt-1">{value}</p>
    </div>
  );
}
