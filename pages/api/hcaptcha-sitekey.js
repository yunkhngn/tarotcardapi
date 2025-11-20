export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const siteKey = process.env.HCAPTCHA_SITE_KEY;
  
  if (!siteKey) {
    return res.status(500).json({ error: 'hCaptcha site key not configured' });
  }

  return res.status(200).json({ siteKey });
}

