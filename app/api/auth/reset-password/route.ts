import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';


export async function POST(request: NextRequest) {
  try {
   
    const requestJson = await request.json();

    // URL de l'API backend Nest.js (variable serveur)
    const backendUrl = process.env.API_BACKEND_URL;

    // Envoyer la requête au backend Nest.js avec axios en JSON
    // await axios.get(`${backendUrl}/sanctum/csrf-cookie`);
    const response = await axios.post(
      `${backendUrl}/api/reset-password`,
      requestJson,
      {
        headers: {
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
        { error: error.response.data?.error || error.response.data?.message || 'Erreur lors de la réinitialisation du mot de passe' },
        { status: error.response.status }
      );
    }
    
    return NextResponse.json(
      { error: error.message || 'Erreur serveur' },
      { status: 500 }
    );
  }
}
