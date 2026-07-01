export async function onRequest(context: any) {
  const { request, env, params } = context;
  const url = new URL(request.url);

  // Set CORS headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
  };

  // Handle OPTIONS preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      headers: corsHeaders,
    });
  }

  try {
    // Proxy to CTFtime API - default to team 389645
    const ctftimePath = params.path?.length 
      ? params.path.join('/') 
      : 'teams/389645';
    const ctftimeUrl = new URL(`https://ctftime.org/api/v1/${ctftimePath}`);
    ctftimeUrl.search = url.search;

    const response = await fetch(ctftimeUrl.toString(), {
      headers: {
        'User-Agent': 'Team Pri5m Dashboard/1.0 (+https://5manmanman.translatoryogendra.workers.dev)',
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`CTFtime API responded with ${response.status}`);
    }

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders,
      },
    });
  } catch (error) {
    console.error('Proxy error:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to fetch CTFtime data',
      message: error instanceof Error ? error.message : String(error) 
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders,
      },
    });
  }
}
