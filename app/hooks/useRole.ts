'use client';
// Hook d'accès aux rôles (basé sur NextAuth).
// Centralise la logique de permission côté UI : helpers `isAdmin`, `hasRole`, etc.
import { useSession } from 'next-auth/react';
import { useMemo } from 'react';

// Définition des rôles
export enum UserRole {
  ADMIN = 'ADMIN',
  APPRENANT = 'APPRENANT',
}

// Hiérarchie des rôles (du plus élevé au plus bas)
const roleHierarchy = {
  [UserRole.ADMIN]: 4,

  [UserRole.APPRENANT]: 1,
};

export const useRole = () => {
  const { data: session, status } = useSession();

  const needsConfirmation = !session?.passwordConfirmedAt || Date.now() - session.passwordConfirmedAt > 15 * 60 * 1000;
  
  // On memoïse le rôle pour éviter de recalculer à chaque rendu.
  // NB: le rôle vient de `session.user` (typé en `any` ici car il dépend du backend).
  const userRole = useMemo(() => {
    return (session?.user as any)?.is_admin ? UserRole.ADMIN : UserRole.APPRENANT;
  }, [session]);

  const emailVerifiedAt = useMemo(() => {
    return (session?.user as any)?.email_verified_at ?? null;
  }, [session]);

  // Vérifier si l'utilisateur a un rôle spécifique
  const hasRole = (role: UserRole): boolean => {
    return userRole === role;
  };





  // Vérifier des rôles spécifiques
  const isAdmin = hasRole(UserRole.ADMIN);
  const isApprenant = hasRole(UserRole.APPRENANT);


  // Vérifier si l'utilisateur est authentifié
  const isAuthenticated = !!session?.user;
  const currentUser = session?.user;

  return {
    // Rôle actuel
    role: userRole,
    currentUser,
    status,
    // Fonctions de vérification
    hasRole,
    emailVerifiedAt,
    needsConfirmation,
    // Helpers de rôles spécifiques
    isApprenant,
    isAdmin,
    isAuthenticated,
    
  };
};

// Après vérification réussie avec Laravel
// await update({ passwordConfirmedAt: Date.now() });