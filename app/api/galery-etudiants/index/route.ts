import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { getToken } from 'next-auth/jwt';

export async function GET(request: NextRequest) {
  try {
    const backendUrl = process.env.API_BACKEND_URL;
    // Récupérer le JWT NextAuth (plus fiable en Route Handler App Router)
  

    const response = await axios.get(
      `${backendUrl}/api/galery-etudiants`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      }
    );
    
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
