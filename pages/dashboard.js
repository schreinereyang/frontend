// pages/dashboard.js
import { useState } from 'react';
import Link from 'next/link';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const earnings = [
  { name: 'Lun', value: 140 },
  { name: 'Mar', value: 240 },
  { name: 'Mer', value: 190 },
  { name: 'Jeu', value: 300 },
  { name: 'Ven', value: 280 },
  { name: 'Sam', value: 350 },
  { name: 'Dim', value: 290 },
];

const models = [
  {
    name: 'Sophia AI',
    sales: 430,
    chats: ['Got it. I’ll take care of it.', 'I miss you too! Wanna...'],
    avatars: ['/a1.png', '/a2.png', '/a3.png'],
  },
  {
    name: 'ClaraBot',
    sales: 250,
    chats: ['Hi! Don’t hesitate if yo..', 'I remember. How can I assist you?'],
    avatars: ['/a4.png', '/a5.png'],
  },
  {
    name: 'EVA',
    sales: 150,
    chats: ['Did you see my latest p..', 'Right. Tell me everything'],
    avatars: ['/a6.png'],
  },
];

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#0b0f1a] text-white">
      {/* Sidebar */}
      <aside
        onMouseEnter={() => setSidebarOpen(true)}
        onMouseLeave={() => setSidebarOpen(false)}
        className={`bg-[#0b0f1a] border-r border-purple-800 p-4 transition-all duration-300 ${sidebarOpen ? 'w-56' : 'w-16'} overflow-hidden fixed h-screen z-10`}
      >
        <h1 className={`text-xl font-bold text-purple-400 transition-opacity ${sidebarOpen ? 'opacity-100' : 'opacity-0'}`}>OnlyMoly</h1>
        <nav className="space-y-6 mt-8">
          <SidebarLink open={sidebarOpen} href="/dashboard" icon="📊" label="Dashboard" />
          <SidebarLink open={sidebarOpen} href="/import" icon="📥" label="Import" />
          <SidebarLink open={sidebarOpen} href="/models" icon="🤖" label="Modèles" />
          <SidebarLink open={sidebarOpen} href="/medias" icon="🎥" label="Médias" />
          <SidebarLink open={sidebarOpen} href="/scripts" icon="✍️" label="Scripts" />
          <SidebarLink open={sidebarOpen} href="/ia" icon="🧠" label="IA" />
          <SidebarLink open={sidebarOpen} href="/settings" icon="⚙️" label="Paramètres" />
        </nav>
      </aside>

      {/* Main content */}
      <main className={`ml-${sidebarOpen ? '56' : '16'} flex-1 p-8 transition-all duration-300`}>
        {/* KPI Top Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10">
          <StatCard title="Revenus" value="€1420" />
          <StatCard title="Messages IA" value="312" />
          <StatCard title="Médias vendus" value="48" />
          <StatCard title="Abonnés actifs" value="92" />
          <StatCard title="IA actives" value="6" />
        </div>

        {/* Earnings Chart */}
        <div className="bg-[#131b2c] rounded-lg shadow-lg p-6 mb-10">
          <div className="flex justify-between mb-4">
            <h2 className="text-lg font-semibold">📈 Earnings IA</h2>
            <select className="bg-[#0b0f1a] text-white border border-purple-500 px-2 py-1 rounded">
              <option>Yesterday</option>
              <option selected>Semaine</option>
              <option>This Month</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={earnings}>
              <XAxis dataKey="name" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip contentStyle={{ backgroundColor: '#1f2937', borderColor: '#6b21a8' }} />
              <Line type="monotone" dataKey="value" stroke="#8b5cf6" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Models Preview */}
        <div className="grid md:grid-cols-3 gap-6">
          {models.map((m, i) => (
            <div key={i} className="bg-[#131b2c] p-4 rounded-xl shadow-lg">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-bold text-purple-400">{m.name}</h3>
                <span className="text-sm text-purple-300">Sales €{m.sales}</span>
              </div>
              <div className="flex space-x-1 mb-2">
                {m.avatars.map((a, j) => (
                  <img key={j} src={a} alt="avatar" className="w-6 h-6 rounded-full border border-white" />
                ))}
              </div>
              <div className="text-sm space-y-1">
                {m.chats.map((c, j) => (
                  <p key={j} className="truncate text-gray-300">{c}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

function SidebarLink({ href, icon, label, open }) {
  return (
    <Link href={href} className="flex items-center space-x-3 hover:text-purple-400">
      <span className="text-xl">{icon}</span>
      <span className={`${open ? 'inline' : 'hidden'} transition-opacity duration-200`}>{label}</span>
    </Link>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="bg-[#131b2c] p-4 rounded-xl text-center shadow border border-purple-500">
      <h4 className="text-sm text-gray-400">{title}</h4>
      <p className="text-2xl font-bold text-purple-400">{value}</p>
    </div>
  );
}
