import { NextApiRequest, NextApiResponse } from "next";

const ASSISTANT_ID = "asst_r1l8vGPUUwmul0wGKDZiJj6m";
const FILE_IDS = [
  "file-Uqq5vvhMyYL7ACY9d2Jz1J",
  "file-BYErHKKt9LBBYEbtKk6Wfs"
];

let trainingThreadId: string | null = null;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: "Message manquant" });

  try {
    const headers = {
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
      "OpenAI-Beta": "assistants=v1"
    };

    if (!trainingThreadId) {
      const threadRes = await fetch("https://api.openai.com/v1/threads", {
        method: "POST",
        headers,
      });
      const threadData = await threadRes.json();
      trainingThreadId = threadData.id;
    }

    await fetch(`https://api.openai.com/v1/threads/${trainingThreadId}/messages`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        role: "user",
        content: message,
      })
    });

    const runRes = await fetch(`https://api.openai.com/v1/threads/${trainingThreadId}/runs`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        assistant_id: ASSISTANT_ID,
        file_ids: FILE_IDS,
        instructions: "Tu parles ici à un modérateur OnlyMoly. Il t'entraîne pour devenir plus sexy, plus intelligente, et plus stratégique dans tes réponses aux fans. Il peut te corriger, te tester, ou t'améliorer. Sois attentive, apprenante, et obéissante."
      })
    });
    const runData = await runRes.json();

    let status = "queued";
    while (status !== "completed") {
      await new Promise(r => setTimeout(r, 1000));
      const check = await fetch(`https://api.openai.com/v1/threads/${trainingThreadId}/runs/${runData.id}`, {
        method: "GET",
        headers
      });
      const data = await check.json();
      status = data.status;
    }

    const msgRes = await fetch(`https://api.openai.com/v1/threads/${trainingThreadId}/messages`, {
      method: "GET",
      headers
    });
    const msgData = await msgRes.json();
    const last = msgData.data?.[0]?.content?.[0]?.text?.value || "Réponse vide 😅";

    return res.status(200).json({ reply: last });
  } catch (err) {
    console.error("Erreur OpenAI Assistant:", err);
    return res.status(500).json({ error: "Erreur serveur GPT (fetch)" });
  }
}
