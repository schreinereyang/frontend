import { useState } from "react";
import LayoutDashboard from "../components/LayoutDashboard";
import CardSection from "../components/CardSection";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from "recharts";

const fakeStats = {
  revenue: 1480,
  messages: 265,
  mediaSold: 37,
  subscribers: 122,
  models: 4
};

const periods = ["jour", "semaine", "mois", "90j"];
const fakeChart = {
  jour: [{ label: "Aujourd’hui", sales: 120 }],
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

export default function Dashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState<"jour" | "semaine" | "mois" | "90j">("semaine");

  return (
    <LayoutDashboard>
      <div className="text-white space-y-6">
        <h1 className="text-4xl font-extrabold text-purple-400">ONLYMOLY</h1>

        {/* Résumé rapide */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">
          <CardSection className="text-center">
            <p className="text-xs text-gray-400">Chiffre d'affaires</p>
            <p className="text-2xl font-bold text-purple-400">€{fakeStats.revenue}</p>
          </CardSection>
          <CardSection className="text-center">
            <p className="text-xs text-gray-400">Messages envoyés</p>
            <p className="text-2xl font-bold text-purple-400">{fakeStats.messages}</p>
          </CardSection>
          <CardSection className="text-center">
            <p className="text-xs text-gray-400">Médias vendus</p>
            <p className="text-2xl font-bold text-purple-400">{fakeStats.mediaSold}</p>
          </CardSection>
          <CardSection className="text-center">
            <p className="text-xs text-gray-400">Abonnés actifs</p>
            <p className="text-2xl font-bold text-purple-400">{fakeStats.subscribers}</p>
          </CardSection>
          <CardSection className="text-center">
            <p className="text-xs text-gray-400">Modèles actives</p>
            <p className="text-2xl font-bold text-purple-400">{fakeStats.models}</p>
          </CardSection>
        </div>

        {/* Filtres */}
        <div className="flex gap-2">
          {periods.map((p) => (
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
              <BarChart data={fakeChart[selectedPeriod]}>
                <XAxis dataKey="label" stroke="#ccc" />
                <YAxis stroke="#ccc" />
                <Tooltip />
                <Bar dataKey="sales" fill="#a855f7" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardSection>

        {/* 🔴 Modèles actives */}
        <CardSection>
          <h2 className="text-lg font-semibold text-purple-300 mb-3">Modèles actives</h2>
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
            {[
              { name: "Elii", age: 21, online: true, sales: 184 },
              { name: "Sofia", age: 23, online: true, sales: 72 },
              { name: "Mila", age: 22, online: false, sales: 210 }
            ].map((m, i) => (
              <div key={i} className="bg-[#1a2235] p-4 rounded-xl border border-purple-800">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="text-lg font-bold text-purple-400">{m.name} ({m.age} ans)</h3>
                  <span className={`text-xs ${m.online ? 'text-green-400' : 'text-red-400'}`}>
                    {m.online ? 'En ligne' : 'Hors ligne'}
                  </span>
                </div>
                <p className="text-sm text-gray-300">CA cette semaine : <span className="text-white font-bold">€{m.sales}</span></p>
              </div>
            ))}
          </div>
        </CardSection>

        {/* 🧠 Messages récents */}
        <CardSection>
          <h2 className="text-lg font-semibold text-purple-300 mb-3">Messages récents</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                fan: "john_dream69",
                user: "Tu me montres encore une vidéo ? 😏",
                ia: "Seulement si tu m’en supplies bien 😈"
              },
              {
                fan: "wildpapi92",
                user: "T’as des plans très chauds pour moi ?",
                ia: "Je peux te faire rougir si tu veux… 😇"
              }
            ].map((m, i) => (
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
