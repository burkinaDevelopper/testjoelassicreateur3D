import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import axios from 'axios';


export async function POST(request: NextRequest) {
  try {
   
    // URL de l'API backend Nest.js (variable serveur)
    const backendUrl = process.env.API_BACKEND_URL;
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

    const response = await axios.post(
      `${backendUrl}/api/logout`,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token?.accessToken}`
        },
      }
    );

    return NextResponse.json(response.data, { status: response.status });
  } catch (error: any) {

    
    // Gérer les erreurs axios
    if (error.response) {
      return NextResponse.json(
        { error: error.response.data?.error || error.response.data?.message || 'Erreur lors de la mise à jour du profil' },
        { status: error.response.status }
      );
    }
    
    return NextResponse.json(
      { error: error.message || 'Erreur serveur' },
      { status: 500 }
    );
  }
}
