import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { getToken } from 'next-auth/jwt';

export async function GET(request: NextRequest, context: { params: Promise<{ slug?: string }> }) {
  try {
    const backendUrl = process.env.API_BACKEND_URL;
    const { slug } = await context.params;
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
    
    if (!token || !(token as any).accessToken) {
      return NextResponse.json(
        { error: 'Non authentifié' },
        { status: 401 }
      );
    }
    const accessToken = (token as any).accessToken as string;

    const response = await axios.get(
      `${backendUrl}/api/chapters/${slug}`,
        {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
           'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      }
    );
     
    return NextResponse.json(response.data, { status: 201 });
  } catch (error: any) {
    console.error('Erreur lors de la récupération des données:', error.message);
    const rawError = error?.response?.data ?? error?.message;
    let safeError = rawError;

    try {
      safeError = JSON.parse(JSON.stringify(rawError));
    } catch {
      safeError = String(rawError);
    }

    return NextResponse.json(
      {
        message: 'Erreur lors de la récupération des données',
        error: safeError,
      },
      { status: error?.response?.status || 500 }
    );
  }
}
