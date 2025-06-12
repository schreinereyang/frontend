import { useState, ReactNode } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const menu = [
  { href: '/dashboard', icon: '📊', label: 'Dashboard' },
  { href: '/import', icon: '📥', label: 'Import' },
  { href: '/models', icon: '🤖', label: 'Modèles' },
  { href: '/medias', icon: '🎥', label: 'Médias' },
  { href: '/scripts', icon: '✍️', label: 'Scripts' },
  { href: '/ia', icon: '🧠', label: 'IA' },
  { href: '/settings', icon: '⚙️', label: 'Paramètres' },
];

interface LayoutDashboardProps {
  children: ReactNode;
}

export default function LayoutDashboard({ children }: LayoutDashboardProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  return (
    <div className="flex min-h-screen bg-[#0b0f1a] text-white">
      <aside
        onMouseEnter={() => setSidebarOpen(true)}
        onMouseLeave={() => setSidebarOpen(false)}
        className={`bg-[#0b0f1a] border-r border-purple-800 p-4 transition-all duration-300 ${sidebarOpen ? 'w-56' : 'w-16'} overflow-hidden fixed h-screen z-10`}
      >
        <h1 className={`text-xl font-bold text-purple-400 transition-opacity ${sidebarOpen ? 'opacity-100' : 'opacity-0'}`}>
          OnlyMoly
        </h1>
        <nav className="space-y-6 mt-8">
          {menu.map((m, i) => (
            <Link
              key={i}
              href={m.href}
              className={`flex items-center space-x-3 transition-colors hover:text-purple-400 ${router.pathname === m.href ? 'text-purple-400 font-semibold' : ''}`}
            >
              <span className="text-lg">{m.icon}</span>
              <span className={`${sidebarOpen ? 'inline' : 'hidden'} transition-opacity duration-200`}>{m.label}</span>
            </Link>
          ))}
        </nav>
      </aside>

      <main className={`transition-all duration-300 flex-1 p-6 ${sidebarOpen ? 'ml-56' : 'ml-16'}`}>
        {children}
      </main>
    </div>
  );
}
