import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { getToken } from 'next-auth/jwt';

export async function PUT(request: NextRequest, context: { params: Promise<{ id?: string }> }) {
  try {
    const backendUrl = process.env.API_BACKEND_URL;
    const { id  } = await context.params;
    // Récupérer le JWT NextAuth (plus fiable en Route Handler App Router)
  
    const requestFormData = await request.formData();

    requestFormData.append('_method', 'PUT')
    const response = await axios.post(
      `${backendUrl}/api/galery-etudiants/${id}`,
      requestFormData,
        {
        headers: {
        'Content-Type': 'multipart/form-data',
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
