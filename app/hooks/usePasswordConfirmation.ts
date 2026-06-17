// hooks/usePasswordConfirmation.ts
import { createElement, useState } from "react";
import axios from 'axios';
import PasswordModalComponent from "../components/PasswordModal";
import { useDisclosure } from "@/hooks/useDisclosure";

export function usePasswordConfirmation() {
  const [isOpen, { open, close }] = useDisclosure(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [resolveConfirm, setResolveConfirm] = useState<((value: boolean) => void) | null>(null);

  const confirmPassword = (): Promise<boolean> => {
    setErrorMessage(null);
    open();
    return new Promise((resolve) => {
      setResolveConfirm(() => resolve);
    });
  };

  const onConfirm = async (password: string) => {
    setErrorMessage(null);

    try {
      const response = await axios.post(`/api/auth/confirm-password`, { password }, {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        }
      });

      const isConfirmed = response.status === 200;

      if (isConfirmed) {
        close();
      }

      resolveConfirm?.(isConfirmed);
      setResolveConfirm(null);
    } catch (error: any) {
      setErrorMessage(error.response?.data?.error || 'Erreur lors de la confirmation du mot de passe');
    }
  };


  const onCancel = () => {
    close();
    resolveConfirm?.(false);
    setResolveConfirm(null);
  };

  return { 
    confirmPassword, 
    PasswordModal: () =>
      isOpen ? createElement(PasswordModalComponent, { onConfirm, onCancel, isOpen,errorMessage }) : null,
   };
}

// Composant modal simple
