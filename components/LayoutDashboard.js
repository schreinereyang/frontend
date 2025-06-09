// components/LayoutDashboard.js
import { useState } from 'react';
import Link from 'next/link';

const menu = [
  { href: '/dashboard', icon: '📊', label: 'Dashboard' },
  { href: '/import', icon: '📥', label: 'Import' },
  { href: '/models', icon: '🤖', label: 'Modèles' },
  { href: '/medias', icon: '🎥', label: 'Médias' },
  { href: '/scripts', icon: '✍️', label: 'Scripts' },
  { href: '/ia', icon: '🧠', label: 'IA' },
  { href: '/settings', icon: '⚙️', label: 'Paramètres' },
];

export default function LayoutDashboard({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#0b0f1a] text-white">
      <aside
        onMouseEnter={() => setSidebarOpen(true)}
        onMouseLeave={() => setSidebarOpen(false)}
        className={`bg-[#0b0f1a] border-r border-purple-800 p-4 transition-all duration-300 ${sidebarOpen ? 'w-56' : 'w-16'} overflow-hidden fixed h-screen z-10`}
      >
        <h1 className={`text-xl font-bold text-purple-400 transition-opacity ${sidebarOpen ? 'opacity-100' : 'opacity-0'}`}>OnlyMoly</h1>
        <nav className="space-y-6 mt-8">
          {menu.map((m, i) => (
            <Link key={i} href={m.href} className="flex items-center space-x-3 hover:text-purple-400">
              <span className="text-xl">{m.icon}</span>
              <span className={`${sidebarOpen ? 'inline' : 'hidden'} transition-opacity duration-200`}>{m.label}</span>
            </Link>
          ))}
        </nav>
      </aside>

      <main
        className="transition-all duration-300 flex-1 p-6"
        style={{ marginLeft: sidebarOpen ? '14rem' : '4rem' }} // 224px ou 64px
      >
        {children}
      </main>
    </div>
  );
}
