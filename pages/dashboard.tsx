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
  jour: [
    { label: "Aujourd’hui", sales: 120 },
  ],
  semaine: [
    { label: "Lun", sales: 120 },
    { label: "Mar", sales: 180 },
    { label: "Mer", sales: 90 },
    { label: "Jeu", sales: 200 },
    { label: "Ven", sales: 150 },
    { label: "Sam", sales: 70 },
    { label: "Dim", sales: 130 },
  ],
  mois: Array.from({ length: 30 }, (_, i) => ({ label: `J${i + 1}`, sales: Math.floor(Math.random() * 200) })),
  "90j": Array.from({ length: 12 }, (_, i) => ({ label: `S${i + 1}`, sales: Math.floor(Math.random() * 500) }))
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
      </div>
    </LayoutDashboard>
  );
}
