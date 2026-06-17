'use client';
import { useEffect, useState } from "react";
import axios from 'axios';
// Import Dependencies
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Fragment, useRef } from "react";
import { Textarea, Button, Input, Select, Switch } from "@/components/ui";
import { useToast } from "../hooks/useToast";




function PasswordModal({ onConfirm, onCancel,isOpen,errorMessage }: { onConfirm: (pwd: string) => void; onCancel: () => void; isOpen: boolean; errorMessage: string | null }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const {showError} = useToast();

  useEffect(() => {
    if (errorMessage) {
      showError(errorMessage);
    }
    }, [errorMessage]);
   

  const saveRef = useRef(null);


  return (
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden px-4 py-6 sm:px-5"
          onClose={onCancel}
          initialFocus={saveRef}
        >
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="absolute inset-0 bg-gray-900/50 backdrop-blur transition-opacity dark:bg-black/30" />
          </TransitionChild>

          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <DialogPanel className="relative flex w-full max-w-lg origin-top flex-col overflow-hidden rounded-lg bg-white transition-all duration-300 dark:bg-dark-700">
              <div className="flex items-center justify-between rounded-t-lg bg-gray-200 px-4 py-3 dark:bg-dark-800 sm:px-5">
                <DialogTitle
                  as="h3"
                  className="text-base font-medium text-gray-800 dark:text-dark-100"
                >
                  Confirmer le mot de passe
                </DialogTitle>
                <Button
                  onClick={onCancel}
                  variant="flat"
                  isIcon
                  className="size-7 rounded-full ltr:-mr-1.5 rtl:-ml-1.5"
                >
                  <XMarkIcon className="size-4.5" />
                </Button>
              </div>

              <div className="flex flex-col overflow-y-auto px-4 py-4 sm:px-5">
                <p>
                  Veuillez entrer votre mot de passe pour confirmer votre action.
                </p>
                <div className="mt-4 space-y-5">
                  <Input
                    type="password"
                    placeholder="Entrez votre mot de passe"
                    label="Mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={error}
                  />
                </div>
               
                <div className="mt-4 space-x-3 text-end ">
                  <Button
                    onClick={onCancel}
                    variant="outlined"
                    className="min-w-[7rem] rounded-full"
                  >
                    Annuler
                  </Button>
                  <Button
                    onClick={() => onConfirm(password)}
                    color="primary"
                    ref={saveRef}
                    className="min-w-[7rem] rounded-full"
                  >
                    Confirmer
                  </Button>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </Dialog>
      </Transition>
  );
}

export default PasswordModal;










