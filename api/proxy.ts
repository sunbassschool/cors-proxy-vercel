import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const targetUrl = req.query.url as string;
  if (!targetUrl) {
    return res.status(400).json({ error: 'Missing URL' });
  }

  // Décoder l'URL avant de l'utiliser
  const decodedUrl = decodeURIComponent(targetUrl);
  
  // Autoriser le CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');

  if (req.method === 'OPTIONS') return res.status(200).end(); // CORS preflight OK

  try {
    const response = await fetch(decodedUrl, {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
      body: req.method !== 'GET' && req.method !== 'HEAD' ? JSON.stringify(req.body) : undefined,
    });

    // Assurer que la réponse est bien en JSON
    const responseData = await response.json();
    res.status(response.status).json(responseData);
  } catch (err: any) {
    res.status(500).json({ error: 'Proxy error', details: err.message });
  }
}
