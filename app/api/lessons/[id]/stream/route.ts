import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

  if (!token || !(token as any).accessToken) {
    return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
  }

  const accessToken = (token as any).accessToken as string;
  const { id } = await params;
  const backendUrl = process.env.API_BACKEND_URL;

  const upstreamHeaders: Record<string, string> = {
    Authorization: `Bearer ${accessToken}`,
    Accept: 'video/mp4',
  };

  const rangeHeader = request.headers.get('range');
  if (rangeHeader) upstreamHeaders['Range'] = rangeHeader;

  const upstream = await fetch(`${backendUrl}/api/lessons/${id}/stream`, {
    headers: upstreamHeaders,
  });

  if (!upstream.ok) {
    return NextResponse.json({ error: 'Erreur stream' }, { status: upstream.status });
  }

  const responseHeaders = new Headers();
  for (const key of ['content-type', 'content-length', 'content-range', 'accept-ranges']) {
    const val = upstream.headers.get(key);
    if (val) responseHeaders.set(key, val);
  }

  return new NextResponse(upstream.body, {
    status: upstream.status,
    headers: responseHeaders,
  });
}
