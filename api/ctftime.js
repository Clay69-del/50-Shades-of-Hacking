const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Max-Age': '86400',
};

const TEAM_ID = '389645';
const TEAM_PATH = `teams/${TEAM_ID}`;
const TEAM_COUNTRY = 'NP';
const API_HEADERS = {
  'User-Agent': 'Team Pri5m Dashboard/1.0 (+https://teampri5m.vercel.app)',
  Accept: 'application/json',
};

function requestedPath(pathParam) {
  if (Array.isArray(pathParam)) {
    return pathParam.find(Boolean);
  }

  return pathParam;
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
    const path = requestedPath(req.query.path);

    if (path && path.replace(/\/+$/, '') !== TEAM_PATH) {
      res.status(403).json({ error: 'Only Team Pri5m CTFtime stats are available' });
      return;
    }

    const teamUrl = new URL(`https://ctftime.org/api/v1/${TEAM_PATH}/`);
    const countryUrl = new URL(`https://ctftime.org/api/v1/top-by-country/${TEAM_COUNTRY.toLowerCase()}/`);

    const [teamResponse, countryResponse] = await Promise.all([
      fetch(teamUrl.toString(), { headers: API_HEADERS }),
      fetch(countryUrl.toString(), { headers: API_HEADERS }).catch(() => null),
    ]);

    const body = await teamResponse.text();
    const contentType = teamResponse.headers.get('content-type') || 'application/json';

    if (teamResponse.ok && contentType.includes('application/json')) {
      const data = JSON.parse(body);
      data.logo = '';

      if (countryResponse?.ok) {
        const countryTeams = await countryResponse.json().catch(() => []);
        const teamIndex = countryTeams.findIndex((team) => String(team.team_id) === TEAM_ID);
        const countryStanding = teamIndex >= 0 ? countryTeams[teamIndex] : null;
        const nextTarget = teamIndex > 0 ? countryTeams[teamIndex - 1] : null;

        data.country_standing = countryStanding
          ? {
              country: TEAM_COUNTRY,
              teams_listed: countryTeams.length,
              country_place: countryStanding.country_place,
              global_place: countryStanding.place,
              points: countryStanding.points,
              events: countryStanding.events,
              next_target: nextTarget
                ? {
                    team_name: nextTarget.team_name,
                    country_place: nextTarget.country_place,
                    points_delta: Math.max(0, nextTarget.points - countryStanding.points),
                  }
                : null,
            }
          : null;
      }

      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(data);
      return;
    }

    res.setHeader('Content-Type', contentType);
    res.status(teamResponse.status).send(body);
  } catch (error) {
    console.error('CTFtime proxy error:', error);
    res.status(500).json({
      error: 'Failed to fetch CTFtime data',
      message: error instanceof Error ? error.message : String(error),
    });
  }
}
