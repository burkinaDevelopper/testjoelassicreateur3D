'use client';

import axios from 'axios';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';


let isInterceptorSetup = false;

export function setupAxiosInterceptors() {
  if (isInterceptorSetup) return;

  // Configuration de base axios
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  axios.defaults.withCredentials = true;
  axios.defaults.withXSRFToken = true;

  // Intercepteur de requête pour ajouter le token
  axios.interceptors.request.use(
    async (config) => {
      // Récupérer le token depuis la session NextAuth
      const session = await getSession();
      
      const token = (session as any)?.accessToken;
      
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Intercepteur de réponse pour gérer les erreurs d'authentification
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      const skipAuthRedirect = error.config?.headers?.['X-Skip-Auth-Redirect'] === 'true'
        || error.config?.headers?.['x-skip-auth-redirect'] === 'true';

      if (error.response?.status === 401 && !skipAuthRedirect) {
        // Token invalide ou expiré
        const route=useRouter();
        route.push('/login');
        // window.location.href = '/login';
        console.warn('Unauthorized - redirecting to login');
      }
      return Promise.reject(error);
    }
  );

  isInterceptorSetup = true;
}
