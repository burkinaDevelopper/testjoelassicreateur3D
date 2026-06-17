"use client";
import { PhoneIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { EnvelopeIcon, LockClosedIcon, UserIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { HiPencil } from "react-icons/hi";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import axios from 'axios';
import { Avatar, Button, Input, Upload } from "@/components/ui";
import { useRole } from "../../hooks/useRole";
import { useSession } from "next-auth/react";
import { useToast } from "../../hooks/useToast";
import { usePasswordConfirmation } from "../../hooks/usePasswordConfirmation";
import { useRouter } from "next/navigation";


const schema = yup.object({
  password: yup.string().required('Le mot de passe est requis'),
  password_confirmation: yup.string().oneOf([yup.ref('password')], 'Les mots de passe doivent correspondre').required('La confirmation du mot de passe est requise'),
});

type FormValues = {
    password: string;
    password_confirmation: string;   
};
export default function PasswordUpdate() {
  const {currentUser ,status} = useRole();
  const {showSuccess,showError} = useToast();
  const { confirmPassword, PasswordModal } = usePasswordConfirmation();
  const {needsConfirmation}= useRole();
  const router = useRouter();
  const { update } = useSession();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    } = useForm({
      resolver: yupResolver(schema),
      defaultValues: {
        password: "",
        password_confirmation: ""    
      },
    });

    const onSubmit = async (data: FormValues) => {
    // PasswordModal();
    if (needsConfirmation) {
      const isConfirmed = await confirmPassword();
      if (!isConfirmed) return;
      await update({ passwordConfirmedAt: Date.now() });
    }
    
    await axios.put(`/api/auth/password-update`,data,
        {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        }
        )
        .then(async function (response) {
          console.log(response);
          if (response.status==200) {
            showSuccess(response.data.message);
           
            reset();
          }
        })
        .catch(function (error) {
          console.log(error.response.data.error);
          showError(error.response.data.error);
        })
    };

  return (
    <div>
        <h5 className="dark:text-dark-50 text-lg font-medium text-gray-800">
        Modifier votre mot de passe 
      </h5>
      <p className="dark:text-dark-200 mt-0.5 text-sm text-balance text-gray-500">
        Modifier les informations de votre profil et gérer vos comptes liés.
      </p>
      <div className="dark:bg-dark-500 my-5 h-px bg-gray-200" />
        <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 [&_.prefix]:pointer-events-none">
           <Input
            label="Mot de passe"
            placeholder="Entrez le mot de passe"
            type="password"
            defaultValue={''}
            prefix={
            <LockClosedIcon
                className="size-5 transition-colors duration-200"
                strokeWidth="1"
            />
            }
            {...register("password")}
            error={errors?.password?.message}
            />
            <Input
            placeholder="Confirmer le mot de passe"
            label="Confirmer le mot de passe"
            type="password"
            className="rounded-xl"
            prefix={<LockClosedIcon className="size-5 transition-colors duration-200" strokeWidth="1" />}
            {...register("password_confirmation")}
            error={errors?.password_confirmation?.message}
            />
        </div>
     
        <div className="mt-8 flex justify-end space-x-3">
            <Button className="min-w-[7rem]">Annuler</Button>
            <Button type="submit" className="min-w-[7rem]" color="primary">
            Enregistrer
            </Button>
        </div>
      </form>
      <PasswordModal />
    </div>
  )
}
