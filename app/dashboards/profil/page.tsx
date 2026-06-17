"use client";
import { PhoneIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { EnvelopeIcon, UserIcon } from "@heroicons/react/24/outline";
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
import PasswordUpdate from "./PasswordUpdate";

// ----------------------------------------------------------------------

const schema = yup.object({
  lastname: yup.string().required('Le nom est requis'),
  firstname: yup.string().required('Le prénom est requis'),
  email: yup.string().email('Email invalide').required('L\'email est requis'),
});



type FormValues = {
    lastname: string;
    firstname: string;
    email: string;   
};
export default function Profile() {
  const {currentUser ,status} = useRole();
  const { update } = useSession();
  const {showSuccess,showError} = useToast();
  const { confirmPassword, PasswordModal } = usePasswordConfirmation();
  const {needsConfirmation}= useRole();
  const router = useRouter();

  const {
  register,
  handleSubmit,
  reset,
  formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: currentUser?.email || "",
      lastname: currentUser?.lastname || "",
      firstname: currentUser?.firstname || ""
    },
  });


  const onSubmit = async (data: FormValues) => {
    // PasswordModal();
    if (needsConfirmation) {
      const isConfirmed = await confirmPassword();
      if (!isConfirmed) return;
      await update({ passwordConfirmedAt: Date.now() });
    }
    
    await axios.put(`/api/auth/profile-information`,data,
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
            await update({
              user: response?.data?.user
            });
            if(response?.data?.user?.email_verified_at === null){
              showError("Votre adresse email n'est pas vérifiée. Veuillez vérifier votre boîte de réception.");
              router.replace("/verify-email");
            } else {
             showSuccess(response.data.message);
            }
           
            reset();
          }
        })
        .catch(function (error) {
          console.log(error.response.data.error);
          showError(error.response.data.error);
        })
    };

  return (
    <div className="w-full max-w-3xl 2xl:max-w-5xl">
      <h5 className="dark:text-dark-50 text-lg font-medium text-gray-800">
        Profile 
      </h5>
      <p className="dark:text-dark-200 mt-0.5 text-sm text-balance text-gray-500">
        Modifier les informations de votre profil et gérer vos comptes liés.
      </p>
      <div className="dark:bg-dark-500 my-5 h-px bg-gray-200" />
     
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 [&_.prefix]:pointer-events-none">
            <Input
            placeholder="Nom"
            label="Nom"
            className="rounded-xl"
            prefix={<UserIcon className="size-4.5" />}
            {...register("lastname")}
            error={errors?.lastname?.message}
            />
            <Input
            placeholder="Prénom"
            label="Prénom"
            className="rounded-xl"
            prefix={<UserIcon className="size-4.5" />}
            {...register("firstname")}
            error={errors?.firstname?.message}
            />
            <Input
            placeholder="Email"
            label="Email"
            className="rounded-xl"
            prefix={<EnvelopeIcon className="size-4.5" />}
            {...register("email")}
            error={errors?.email?.message}
            />
            <Input
            placeholder="administrateur"
            label="Rôle"
            className="rounded-xl"
            disabled
            prefix={<UserIcon className="size-4.5" />}
            />
        </div>
     
        <div className="mt-8 flex justify-end space-x-3">
            <Button className="min-w-[7rem]">Annuler</Button>
            <Button type="submit" className="min-w-[7rem]" color="primary">
            Enregistrer
            </Button>
        </div>
      </form>
      <div className="dark:bg-dark-500 my-7 h-px bg-gray-200" />
      <PasswordUpdate />
      <PasswordModal />
    </div>
  );
}
