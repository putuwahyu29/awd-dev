if (typeof process !== 'undefined' && process.env.NODE_ENV === 'production') {
  process.env.KEYSTATIC_GITHUB_CLIENT_ID =
    process.env.KEYSTATIC_GITHUB_CLIENT_ID || 'Iv23li1tTeoBzeVmRNKB';
  process.env.KEYSTATIC_GITHUB_CLIENT_SECRET =
    process.env.KEYSTATIC_GITHUB_CLIENT_SECRET ||
    '68798dd176638b29abf4d6d0c3319cd6cd85e082';
  process.env.KEYSTATIC_SECRET =
    process.env.KEYSTATIC_SECRET || 'keystatic-secret-awd-dev-production-key-2026';
}

const routeHandler = makeRouteHandler({
  config,
});

async function handleRequest(
  request: Request,
  handler: (req: Request) => Promise<Response>
) {
  const url = new URL(request.url);
  const host =
    request.headers.get('x-forwarded-host') ||
    request.headers.get('host') ||
    url.host;
  const proto =
    request.headers.get('x-forwarded-proto') ||
    (url.protocol.startsWith('https') ? 'https' : 'http');

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const origin =
    siteUrl && siteUrl.startsWith('http') && !siteUrl.includes('localhost')
      ? siteUrl
      : `${proto}://${host}`;

  let currentReq = request;
  if (!host.includes('localhost') && !host.includes('127.0.0.1')) {
    const publicUrl = new URL(url.pathname + url.search, origin);
    currentReq = new Request(publicUrl.toString(), request);
  }

  const response = await handler(currentReq);
  const location = response.headers.get('Location');

  // 1. Tambahkan scope 'repo' agar OAuth App diizinkan membaca Private Repository
  if (location && location.includes('github.com/login/oauth/authorize')) {
    try {
      const authorizeUrl = new URL(location);
      authorizeUrl.searchParams.set('scope', 'repo');
      const newHeaders = new Headers(response.headers);
      newHeaders.set('Location', authorizeUrl.toString());
      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: newHeaders,
      });
    } catch {
      // Ignore
    }
  }

  // 2. Intercept response headers to ensure Location redirect never contains localhost on production
  if (
    !host.includes('localhost') &&
    !host.includes('127.0.0.1') &&
    location &&
    (location.includes('localhost') || location.includes('127.0.0.1'))
  ) {
    const newHeaders = new Headers(response.headers);
    try {
      const locUrl = new URL(location);
      const newLoc = `${origin}${locUrl.pathname}${locUrl.search}`;
      newHeaders.set('Location', newLoc);
    } catch {
      // Relative URL or invalid URL
    }
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: newHeaders,
    });
  }

  return response;
}

export async function GET(request: Request) {
  return handleRequest(request, routeHandler.GET);
}

export async function POST(request: Request) {
  return handleRequest(request, routeHandler.POST);
}
