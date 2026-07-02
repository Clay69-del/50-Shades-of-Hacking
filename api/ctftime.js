const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Max-Age': '86400',
};

function resolvePath(pathParam) {
  const path = Array.isArray(pathParam)
    ? pathParam.find(Boolean)
    : pathParam || 'teams/389645';

  return path.endsWith('/') ? path : `${path}/`;
}

export default async function handler(req, res) {
  Object.entries(corsHeaders).forEach(([key, value]) => {
    res.setHeader(key, value);
  });

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET, OPTIONS');
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const ctftimePath = resolvePath(req.query.path);
    const ctftimeUrl = new URL(`https://ctftime.org/api/v1/${ctftimePath}`);

    Object.entries(req.query).forEach(([key, value]) => {
      if (key === 'path') return;

      if (Array.isArray(value)) {
        value.forEach((item) => ctftimeUrl.searchParams.append(key, item));
        return;
      }

      if (value !== undefined) {
        ctftimeUrl.searchParams.set(key, value);
      }
    });

    const response = await fetch(ctftimeUrl.toString(), {
      headers: {
        'User-Agent': 'Team Pri5m Dashboard/1.0 (+https://teampri5m.vercel.app)',
        Accept: 'application/json',
      },
    });

    const body = await response.text();
    const contentType = response.headers.get('content-type') || 'application/json';

    res.setHeader('Content-Type', contentType);
    res.status(response.status).send(body);
  } catch (error) {
    console.error('CTFtime proxy error:', error);
    res.status(500).json({
      error: 'Failed to fetch CTFtime data',
      message: error instanceof Error ? error.message : String(error),
    });
  }
}
