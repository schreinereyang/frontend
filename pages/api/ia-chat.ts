import { NextApiRequest, NextApiResponse } from "next";
const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const ASSISTANT_ID = "asst_r1l8vGPUUwmul0wGKDZiJj6m";
const FILE_IDS = [
  "file-Uqq5vvhMyYL7ACY9d2Jz1J", // medias.json
  "file-BYErHKKt9LBBYEbtKk6Wfs" // script_complete.json
];

let trainingThreadId: string | null = null;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  const { message } = req.body;
  if (!message) return res.status(400).json({ error: "Message manquant" });

  try {
    if (!trainingThreadId) {
      const thread = await openai.beta.threads.create();
      trainingThreadId = thread.id;
    }

    await openai.beta.threads.messages.create(trainingThreadId, {
      role: "user",
      content: message
    });

    const run = await openai.beta.threads.runs.create(trainingThreadId, {
      assistant_id: ASSISTANT_ID,
      file_ids: FILE_IDS,
      instructions:
        "Tu parles ici à un modérateur OnlyMoly. Il t'entraîne pour devenir plus sexy, plus intelligente, et plus stratégique dans tes réponses aux fans. Il peut te corriger, te tester, ou t'améliorer. Sois attentive, apprenante, et obéissante."
    });

    let runStatus = await openai.beta.threads.runs.retrieve(trainingThreadId, run.id);
    while (runStatus.status !== "completed") {
      await new Promise((r) => setTimeout(r, 1000));
      runStatus = await openai.beta.threads.runs.retrieve(trainingThreadId, run.id);
    }

    const messages = await openai.beta.threads.messages.list(trainingThreadId);
    const last = messages.data[0];
    const reply = last?.content?.[0]?.text?.value || "Réponse vide 😅";

    return res.status(200).json({ reply });
  } catch (err) {
    console.error("💥 Erreur ia-chat:", err);
    return res.status(500).json({ error: "Erreur serveur GPT" });
  }
}
