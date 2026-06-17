import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { getToken } from 'next-auth/jwt';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id?: string; hash?: string }> }
) {
  try {
    const backendUrl = process.env.API_BACKEND_URL;

    if (!backendUrl) {
      return NextResponse.json(
        { error: 'API_BACKEND_URL manquant' },
        { status: 500 },
      );
    }

    const { id, hash } = await context.params;

    const response = await axios.get(
      `${backendUrl}/api/email/verify/${id}/${hash}`,
        {
        headers: {
          // 'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      }
    );

    console.log('Vérification de l\'email réussie:', response.data.data);
    return NextResponse.json(response.data, { status: 200 });
  } catch (error: any) {
    console.error('Erreur lors de la récupération des données:', error.message);
    return NextResponse.json(
      { 
        message: 'Erreur lors de la récupération des données',
        error: error.response?.data || error.message 
      },
      { status: error.response?.status || 500 }
    );
  }
}
