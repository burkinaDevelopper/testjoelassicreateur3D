import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import axios from 'axios';


export async function POST(request: NextRequest) {
  try {
    // Récupérer le JWT NextAuth (plus fiable en Route Handler App Router)
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

    if (!token || !(token as any).accessToken) {
      return NextResponse.json(
        { error: 'Non authentifié' },
        { status: 401 }
      );
    }

    const accessToken = (token as any).accessToken as string;

    // Récupérer le JSON depuis la requête
    const requestJson = await request.json();


    // URL de l'API backend Nest.js (variable serveur)
    const backendUrl = process.env.API_BACKEND_URL;
    

    // Envoyer la requête au backend Nest.js avec axios en JSON
    const response = await axios.post(
      `${backendUrl}/api/modules`,
      requestJson,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      }
    );

    return NextResponse.json(response.data, { status: response.status });
  } catch (error: any) {
    
    // Gérer les erreurs axios
    if (error.response) {
      return NextResponse.json(
        { error: error.response.data?.error || error.response.data?.message || 'Erreur lors de la création' },
        { status: error.response.status }
      );
    }
    
    return NextResponse.json(
      { error: error.message || 'Erreur serveur' },
      { status: 500 }
    );
  }
}
