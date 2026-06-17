"use client";
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline";


import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { Button, Card, Checkbox, Input } from "@/components/ui";
import Link from "next/link";
import { UserIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import { useState } from "react";
import axios from 'axios';
import { useToast } from "../../hooks/useToast";
import { signIn, useSession } from "next-auth/react";

import { useRouter } from "next/navigation";
// import Logo from "@/assets/appLogo.svg?react";

// ----------------------------------------------------------------------


const schema = yup.object({
  lastname: yup.string().required('Le nom est requis'),
  firstname: yup.string().required('Le prénom est requis'),
  email: yup.string().email('Email invalide').required('L\'email est requis'),
  provider: yup.string().optional(),
  password: yup.string().required('Le mot de passe est requis'),
  password_confirmation: yup.string().oneOf([yup.ref('password')], 'Les mots de passe doivent correspondre').required('La confirmation du mot de passe est requise'),
});

type FormValues = {
    lastname: string;
    firstname: string;
    email: string;
    password: string;
    password_confirmation: string;   
};
export default function SignUpV1() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const {showSuccess,showError} = useToast();
   const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormValues) => {
      setErrorMessage(null);
      setValue('provider', 'credentials');

      await axios.post(`/api/auth/register`,data,
          {
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/json"
            }
          }
        )
        .then(async function (response) {
          console.log(response);
          if (response.status==201) {
            const result = await signIn("credentials", {
              redirect: false,
              email: data.email,
              password: data.password,
            });
             router.replace("/verify-email");
            console.log(result);
            showSuccess("Inscription réussie !");
            reset();
          }
        })
        .catch(function (error) {
          console.log(error.response.data.error);
          showError(error.response.data.error);
        })
    };

  const submitGoogle = async () => {
    const result = await signIn("google"); 
  }
  
  return (
    <main className="min-h-100vh grid w-full grow grid-cols-1 place-items-center">
      <div className="w-full max-w-104 p-4 sm:px-5">
        <div className="text-center">
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={64}
            height={64}
            className="mx-auto size-16"
            priority
          />
          <div className="mt-4">
            <h2 className="dark:text-dark-100 text-2xl font-semibold text-gray-600">
              Bienvenue sur Joelassicreateur3D
            </h2>
            <p className="dark:text-dark-300 text-gray-400">
              Veuillez vous inscrire pour continuer
            </p>
          </div>
        </div>
        <Card className="mt-5 rounded-lg p-5 lg:p-7">
          <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            <div className="space-y-4">
              <Input
                placeholder="Nom"
                prefix={
                  <UserIcon
                    className="size-5 transition-colors duration-200"
                    strokeWidth="1"
                  />
                }
                 {...register("lastname")}
                  error={errors?.lastname?.message}
              />
              <Input
                placeholder="Prénom"
                prefix={
                  <UserIcon
                    className="size-5 transition-colors duration-200"
                    strokeWidth="1"
                  />
                }
                 {...register("firstname")}
                  error={errors?.firstname?.message}
              />
              <Input
                placeholder="Email"
                prefix={
                  <EnvelopeIcon
                    className="size-5 transition-colors duration-200"
                    strokeWidth="1"
                  />
                }
                 {...register("email")}
                  error={errors?.email?.message}  
              />
              <Input
                placeholder="Mot de passe"
                type="password"
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
                placeholder="Répéter le mot de passe"
                type="password"
                prefix={
                  <LockClosedIcon
                    className="size-5 transition-colors duration-200"
                    strokeWidth="1"
                  />
                }
                 {...register("password_confirmation")}
                  error={errors?.password_confirmation?.message}
              />

              <div className="flex gap-1">
                <Checkbox label="Je suis d'accord avec" />
                <a
                  href="##"
                  className="dark:text-dark-300 dark:hover:text-dark-100 dark:focus:text-dark-100 text-gray-400 transition-colors hover:text-gray-800 focus:text-gray-800"
                >
                  politique de confidentialité
                </a>
              </div>
            </div>

            <Button type="submit" className="mt-5 w-full" color="primary">
              S'inscrire
            </Button>
          </form>
          <div className="text-xs-plus mt-4 text-center">
            <p className="line-clamp-1">
              <span>Vous avez déjà un compte ? </span>{" "}
              <Link
                className="text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-600 transition-colors"
                href="/login"
              >
                Se connecter
              </Link>
            </p>
          </div>
          <div className="my-7 flex items-center space-x-3 text-xs">
            <div className="dark:bg-dark-500 h-px flex-1 bg-gray-200"></div>
            <p>OU S'INSCRIRE AVEC EMAIL</p>
            <div className="dark:bg-dark-500 h-px flex-1 bg-gray-200"></div>
          </div>
          <div className="flex gap-4">
            <Button onClick={submitGoogle} className="h-10 flex-1 gap-3" variant="outlined">
              <img
                className="size-5.5"
                src="/images/logos/google.svg"
                alt="logo"
              />
              <span>Google</span>
            </Button>
            <Button className="h-10 flex-1 gap-3" variant="outlined">
              <img
                className="size-5.5"
                src="/images/logos/github.svg"
                alt="logo"
              />
              <span>Github</span>
            </Button>
          </div>
        </Card>
        <div className="dark:text-dark-300 mt-8 flex justify-center text-xs text-gray-400">
          <a href="##">Avis de confidentialité</a>
          <div className="dark:bg-dark-500 mx-2.5 my-0.5 w-px bg-gray-200"></div>
          <a href="##">Conditions d'utilisation</a>
        </div>
      </div>
    </main>
  );
}
