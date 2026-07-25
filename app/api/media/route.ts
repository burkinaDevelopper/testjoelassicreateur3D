import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const path = searchParams.get('path');

  if (!path || !path.startsWith('/storage/')) {
    return NextResponse.json({ error: 'Chemin invalide' }, { status: 400 });
  }

  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

  if (!token || !(token as any).accessToken) {
    return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
  }

  const accessToken = (token as any).accessToken as string;
  const backendUrl = process.env.API_BACKEND_URL;
  const upstreamUrl = `${backendUrl}${path}`;

  const upstream = await fetch(upstreamUrl, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: 'application/json',
    },
    redirect: 'manual',
  });

  if (upstream.status >= 300 && upstream.status < 400) {
    console.error(
      `[/api/media] redirection inattendue depuis ${upstreamUrl} -> ${upstream.headers.get('location')} (probable échec d'authentification Sanctum sur cette route)`,
    );
    return NextResponse.json(
      { error: "Le backend a redirigé la requête au lieu de renvoyer le fichier (probable échec d'authentification)" },
      { status: 502 },
    );
  }

  if (!upstream.ok || !upstream.body) {
    const bodyText = await upstream.text().catch(() => '');
    console.error(
      `[/api/media] échec ${upstream.status} depuis ${upstreamUrl} content-type=${upstream.headers.get('content-type')} body=${bodyText.slice(0, 300)}`,
    );
    return NextResponse.json(
      { error: 'Erreur lors de la récupération du fichier' },
      { status: upstream.status || 500 },
    );
  }

  const responseHeaders = new Headers();
  for (const key of ['content-type', 'content-length', 'content-disposition']) {
    const val = upstream.headers.get(key);
    if (val) responseHeaders.set(key, val);
  }

  return new NextResponse(upstream.body, {
    status: 200,
    headers: responseHeaders,
  });
}
