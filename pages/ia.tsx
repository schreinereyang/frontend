import { useState } from "react";
import LayoutDashboard from "../components/LayoutDashboard";
import CardSection from "../components/CardSection";

export default function IaPage() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<{ sender: string; text: string }[]>([]);
  const [correctionMode, setCorrectionMode] = useState(false);
  const [correction, setCorrection] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const newHistory = [...history, { sender: "🧠 Modérateur", text: input }];
    setHistory(newHistory);
    setInput("");

    setTimeout(() => {
      const aiResponse = `🤖 GPT : Merci pour ton message, je prends note !`;
      setHistory((prev) => [...prev, { sender: "🤖 IA", text: aiResponse }]);
    }, 800);
  };

  const applyCorrection = () => {
    if (!correction.trim()) return;
    setHistory((prev) => [
      ...prev,
      { sender: "✏️ Correction", text: correction }
    ]);
    setCorrection("");
    setCorrectionMode(false);
  };

  return (
    <LayoutDashboard>
      <div className="space-y-4 text-white">
        <h1 className="text-3xl font-bold text-purple-300">🧠 Entraînement IA</h1>
        <p className="text-sm text-gray-400">
          Tu es en lien direct avec le cœur du GPT OnlyMoly. Ici, chaque message que tu échanges aide à rendre l’IA plus intelligente, pour toi et pour tous les modèles de la plateforme.
        </p>

        <CardSection>
          <div className="h-96 overflow-y-auto space-y-3 p-2">
            {history.map((h, i) => (
              <div key={i} className="text-sm">
                <span className="font-semibold">{h.sender}:</span> {h.text}
              </div>
            ))}
          </div>
        </CardSection>

        <CardSection>
          {correctionMode ? (
            <div className="space-y-2">
              <textarea
                value={correction}
                onChange={(e) => setCorrection(e.target.value)}
                placeholder="Corrige la réponse de l'IA ici..."
                className="w-full p-2 bg-gray-800 rounded"
              />
              <button
                onClick={applyCorrection}
                className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white"
              >
                ✅ Appliquer la correction
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Écris comme si tu étais un fan..."
                className="w-full p-2 bg-gray-800 rounded"
              />
              <div className="flex space-x-2">
                <button
                  onClick={handleSend}
                  className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded text-white"
                >
                  📨 Envoyer
                </button>
                <button
                  onClick={() => setCorrectionMode(true)}
                  className="bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded text-white"
                >
                  ✏️ Corriger l'IA
                </button>
              </div>
            </div>
          )}
        </CardSection>
      </div>
    </LayoutDashboard>
  );
}
