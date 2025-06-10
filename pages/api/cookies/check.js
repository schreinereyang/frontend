// backend/api/cookies/check.js
import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  const { modelId } = req.query;

  if (!modelId) {
    return res.status(400).json({ error: 'Missing modelId' });
  }

  const filePath = path.resolve(`/root/onlyfans-connect-bot/cookies-${modelId}.json`);

  try {
    if (fs.existsSync(filePath)) {
      return res.status(200).json({ connected: true });
    } else {
      return res.status(200).json({ connected: false });
    }
  } catch (err) {
    console.error('Erreur de vérification cookies:', err);
    return res.status(500).json({ error: 'Internal error' });
  }
}
