import { makeRouteHandler } from '@keystatic/next/route-handler';
import config from '../../../../keystatic.config';

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
  const origin = siteUrl && siteUrl.startsWith('http') ? siteUrl : `${proto}://${host}`;

  // Paksa URL publik jika tidak sedang diakses via localhost
  if (!host.includes('localhost') && !host.includes('127.0.0.1')) {
    const publicUrl = new URL(url.pathname + url.search, origin);
    const modifiedRequest = new Request(publicUrl.toString(), request);
    return handler(modifiedRequest);
  }

  return handler(request);
}

export async function GET(request: Request) {
  return handleRequest(request, routeHandler.GET);
}

export async function POST(request: Request) {
  return handleRequest(request, routeHandler.POST);
}
