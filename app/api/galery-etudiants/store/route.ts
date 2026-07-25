import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import axios from 'axios';


export async function POST(request: NextRequest) {
  try {
 
    // Récupérer le FormData depuis la requête
    const requestFormData = await request.formData();

    console.log("requestFormData", requestFormData);

    // URL de l'API backend Nest.js (variable serveur)
    const backendUrl = process.env.API_BACKEND_URL;

    // Envoyer la requête au backend Nest.js avec axios en JSON
    const response = await axios.post(
      `${backendUrl}/api/galery-etudiants`,
      requestFormData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
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
