export default async function handler(req, res) {
  const { modelId } = req.query;
  const clientKey = req.headers['x-api-key'];

  if (clientKey !== process.env.CHECK_API_KEY) {
    return res.status(403).json({ error: 'Unauthorized' });
  }

  try {
    const response = await fetch(`http://163.172.134.56:3001/status/${modelId}`);
    const data = await response.json();
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: 'VPS unreachable' });
  }
}
