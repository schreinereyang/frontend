import LayoutDashboard from "../components/LayoutDashboard";
import CardSection from "../components/CardSection";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const fakeData = [
  { day: "Lun", sales: 120 },
  { day: "Mar", sales: 190 },
  { day: "Mer", sales: 75 },
  { day: "Jeu", sales: 210 },
  { day: "Ven", sales: 130 },
  { day: "Sam", sales: 80 },
  { day: "Dim", sales: 150 },
];

const total = fakeData.reduce((acc, d) => acc + d.sales, 0);

export default function DashboardPage() {
  return (
    <LayoutDashboard>
      <div className="text-white space-y-8">
        <h1 className="text-3xl font-bold">📊 Dashboard général</h1>

        <CardSection>
          <h2 className="text-xl font-semibold mb-2 text-purple-300">Ventes cette semaine (€)</h2>
          <p className="text-sm text-gray-400 mb-4">Total : {total} €</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={fakeData}>
                <XAxis dataKey="day" stroke="#ccc" />
                <YAxis stroke="#ccc" />
                <Tooltip />
                <Bar dataKey="sales" fill="#a855f7" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardSection>

        <CardSection>
          <h2 className="text-xl font-semibold mb-2 text-purple-300">Modèles actifs</h2>
          <ul className="text-sm text-gray-300 space-y-2">
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-400"></span> Elii (21 ans)
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-gray-500"></span> Sofia (23 ans)
            </li>
          </ul>
        </CardSection>
      </div>
    </LayoutDashboard>
  );
}
