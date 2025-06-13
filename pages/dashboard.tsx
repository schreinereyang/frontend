import { useEffect, useState } from "react";
import LayoutDashboard from "../components/LayoutDashboard";
import CardSection from "../components/CardSection";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from "recharts";

type Stats = {
  revenueTotal: number;
  messagesEnvoyes: number;
  mediasVendus: number;
  abonnesActifs: number;
  modelesActifs: number;
};

type Model = {
  id: number;
  name: string;
  age: number;
  active: boolean;
  revenueTotal: number;
};

type MessagePair = {
  fan: string;
  user?: string;
  ia?: string;
};

export default function Dashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [models, setModels] = useState<Model[]>([]);
  const [messages, setMessages] = useState<MessagePair[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState<"jour" | "semaine" | "mois" | "90j">("semaine");

  const chartData = {
    jour: [{ label: "Aujourd’hui", sales: stats?.revenueTotal || 0 }],
    semaine: [
      { label: "Lun", sales: 120 },
      { label: "Mar", sales: 180 },
      { label: "Mer", sales: 90 },
      { label: "Jeu", sales: 200 },
      { label: "Ven", sales: 150 },
      { label: "Sam", sales: 70 },
      { label: "Dim", sales: 130 },
    ],
    mois: Array.from({ length: 30 }, (_, i) => ({
      label: `J${i + 1}`,
      sales: Math.floor(Math.random() * 200),
    })),
    "90j": Array.from({ length: 12 }, (_, i) => ({
      label: `S${i + 1}`,
      sales: Math.floor(Math.random() * 500),
    })),
  };

  useEffect(() => {
    fetch("/api/stats")
      .then((res) => res.json())
      .then((data) => setStats(data.stats));

    fetch("/api/models/active")
      .then((res) => res.json())
      .then((data) => setModels(data.models));

    fetch("/api/messages/latest")
      .then((res) => res.json())
      .then((data) => setMessages(data.messages));
  }, []);

  return (
    <LayoutDashboard>
      <div className="text-white space-y-6">
        <h1 className="text-4xl font-extrabold text-purple-400">ONLYMOLY</h1>

        {/* Résumé rapide */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">
          <CardSection className="text-center">
            <p className="text-xs text-gray-400">Chiffre d'affaires</p>
            <p className="text-2xl font-bold text-purple-400">€{stats?.revenueTotal || 0}</p>
          </CardSection>
          <CardSection className="text-center">
            <p className="text-xs text-gray-400">Messages envoyés</p>
            <p className="text-2xl font-bold text-purple-400">{stats?.messagesEnvoyes || 0}</p>
          </CardSection>
          <CardSection className="text-center">
            <p className="text-xs text-gray-400">Médias vendus</p>
            <p className="text-2xl font-bold text-purple-400">{stats?.mediasVendus || 0}</p>
          </CardSection>
          <CardSection className="text-center">
            <p className="text-xs text-gray-400">Abonnés actifs</p>
            <p className="text-2xl font-bold text-purple-400">{stats?.abonnesActifs || 0}</p>
          </CardSection>
          <CardSection className="text-center">
            <p className="text-xs text-gray-400">Modèles actives</p>
            <p className="text-2xl font-bold text-purple-400">{stats?.modelesActifs || 0}</p>
          </CardSection>
        </div>

        {/* Filtres */}
        <div className="flex gap-2">
          {["jour", "semaine", "mois", "90j"].map((p) => (
            <button
              key={p}
              onClick={() => setSelectedPeriod(p as any)}
              className={`px-4 py-2 rounded border text-sm ${
                selectedPeriod === p
                  ? "bg-purple-700 text-white"
                  : "bg-gray-800 text-gray-400 border-gray-600 hover:bg-gray-700"
              }`}
            >
              {p === "jour" ? "Aujourd’hui" :
               p === "semaine" ? "Cette semaine" :
               p === "mois" ? "Ce mois-ci" : "90 derniers jours"}
            </button>
          ))}
        </div>

        {/* Graphique */}
        <CardSection>
          <h2 className="text-lg font-semibold text-purple-300 mb-2">Ventes ({selectedPeriod})</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData[selectedPeriod]}>
                <XAxis dataKey="label" stroke="#ccc" />
                <YAxis stroke="#ccc" />
                <Tooltip />
                <Bar dataKey="sales" fill="#a855f7" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardSection>

        {/* Modèles actives */}
        <CardSection>
          <h2 className="text-lg font-semibold text-purple-300 mb-3">Modèles actives</h2>
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
            {models.map((m, i) => (
              <div key={i} className="bg-[#1a2235] p-4 rounded-xl border border-purple-800">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="text-lg font-bold text-purple-400">{m.name} ({m.age} ans)</h3>
                  <span className="text-xs text-green-400">En ligne</span>
                </div>
                <p className="text-sm text-gray-300">CA cette semaine : <span className="text-white font-bold">€{m.revenueTotal}</span></p>
              </div>
            ))}
          </div>
        </CardSection>

        {/* Messages récents */}
        <CardSection>
          <h2 className="text-lg font-semibold text-purple-300 mb-3">Messages récents</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {messages.map((m, i) => (
              <div key={i} className="bg-[#1f2a3d] p-3 rounded-xl border border-purple-700">
                <p className="text-xs text-gray-400 mb-1">💬 {m.fan}</p>
                <p className="text-sm"><span className="font-bold text-white">👤 Fan :</span> {m.user}</p>
                <p className="text-sm"><span className="font-bold text-purple-400">🤖 IA :</span> {m.ia}</p>
              </div>
            ))}
          </div>
        </CardSection>
      </div>
    </LayoutDashboard>
  );
}
