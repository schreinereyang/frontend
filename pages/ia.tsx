import LayoutDashboard from "../components/LayoutDashboard";
import CardSection from "../components/CardSection";

export default function Ia() {
  return (
    <LayoutDashboard>
      <div className="mb-4 text-2xl font-bold text-purple-300">🧠 Intelligence Artificielle</div>

      <CardSection>
        <p className="text-gray-300 text-sm">
          Ici, tu pourras gérer ton assistant IA connecté à GPT-4 : fichiers attachés, modèle utilisé,
          stratégie d'entraînement, redémarrage, etc.
        </p>
      </CardSection>

      <CardSection className="mt-4">
        <ul className="text-sm text-white space-y-2">
          <li>✅ Assistant connecté : <span className="text-purple-400 font-mono">asst_r1l8vGPUUwmul0wGKDZiJj6m</span></li>
          <li>🧠 Modèle utilisé : <span className="text-green-400 font-semibold">gpt-4-turbo</span></li>
          <li>📎 Fichiers liés :
            <ul className="pl-4 list-disc text-gray-400 text-xs">
              <li><code>medias.json</code> — contenu vendable</li>
              <li><code>script_complete.json</code> — funnel de vente</li>
            </ul>
          </li>
        </ul>
      </CardSection>
    </LayoutDashboard>
  );
}
