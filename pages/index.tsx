import Link from "next/link";

export default function Home() {
  return (
    <main className="p-10 text-white">
      <h1 className="text-3xl font-bold mb-4">Bienvenue sur OnlyMoly</h1>
      <Link href="/dashboard" className="text-purple-400 underline">Voir le dashboard</Link>
    </main>
  );
}
