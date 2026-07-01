export default {
  async fetch(request, env, ctx) {
    // Set CORS headers for all responses
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400',
    };

    // Handle CORS preflight requests
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: corsHeaders,
      });
    }

    // Proxy to CTFtime API
    const ctftimeUrl = 'https://ctftime.org/api/v1/teams/389645/';
    
    try {
      const response = await fetch(ctftimeUrl, {
        headers: {
          'User-Agent': 'Team Pri5m Dashboard/1.0 (+https://5manmanman.translatoryogendra.workers.dev)',
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`CTFtime API responded with ${response.status}`);
      }

      const data = await response.json();

      // Return with CORS headers
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
        message: error.message 
      }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      });
    }
  },
};
