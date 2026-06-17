"use client";
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline";


import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { Button, Card, Checkbox, Input ,Badge} from "@/components/ui";
import Link from "next/link";
import { UserIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import { useState, useEffect, Suspense } from "react";
import axios from 'axios';
import { useToast } from "../../hooks/useToast";
import { signIn,signOut, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useRole } from "../../hooks/useRole";
// import Logo from "@/assets/appLogo.svg?react";

// ----------------------------------------------------------------------


const schema = yup.object({
  id: yup.string().required('L\'ID est requis'),
  hash: yup.string().required('Le hash est requis'),
});



type FormValues = {
    id: string;
    hash: string;   
};
export default function VerifyEmailPage() {
  return (
    <Suspense>
      <VerifyEmail />
    </Suspense>
  );
}

function VerifyEmail() {

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const {showSuccess,showError} = useToast();
  const {isAuthenticated, emailVerifiedAt, status} = useRole();
  const appName= process.env.NEXT_PUBLIC_NAME;
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const hash = searchParams.get("hash");
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Protéger la page - seuls les utilisateurs authentifiés peuvent y accéder
  useEffect(() => {
    if (status === "loading") return; // Attendre le chargement de la session
    
    // if (!isAuthenticated) {
    //   router.replace("/login");
    //   return;
    // }

    // Si l'email est déjà vérifié, rediriger vers le dashboard
    if (emailVerifiedAt !== null) {
      router.replace("/dashboards/home");
    }
  }, [isAuthenticated, emailVerifiedAt, status, router]);

  const onSubmit = async () => {
      setErrorMessage(null);

      await axios.get(`/api/auth/verify-email/${id}/${hash}`,
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
            router.replace("/dashboards/home");   
          }
        })
        .catch(function (error) {
          console.log(error.response.data.error);
          showError(error.response.data.error);
        })
    };

  // Afficher un loader pendant la vérification de l'authentification
  if (status === "loading") {
    return (
      <main className="min-h-100vh grid w-full grow grid-cols-1 place-items-center">
        <div className="text-center">
          <p className="text-gray-600 dark:text-dark-100">Chargement...</p>
        </div>
      </main>
    );
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
              Bienvenue sur {appName}
            </h2>
            <p className="dark:text-dark-300 text-gray-400 mt-2">
              Veuillez vérifier votre adresse email pour continuer
            </p>
            <p className="dark:text-dark-300 text-gray-400 mt-2 border border-gray-200 dark:border-dark-500 rounded-md p-3 text-sm text-green-500">
              conseil : vérifiez votre boîte de réception (et les spams) pour trouver l'email de vérification. Si vous ne l'avez pas reçu, essayez de vous reconnecter pour renvoyer l'email.
            </p>
          </div>
        </div>
        {hash && id && (

        <Card className="mt-5 rounded-lg p-5 lg:p-7">
        
            <Button onClick={onSubmit} type="submit" className="mt-5 w-full" color="primary">
              Vérifier mon email
            </Button>
         
          
          <div className="flex gap-4 mt-6">
            <Button className="h-10 flex-1 gap-3" 
            variant="outlined" 
             onClick={async () => {
              await signOut({ redirect: false });
              router.replace("/login");
            }}
            >
              <span>Deconnexion</span>
            </Button>
          </div>
        </Card>
        )}
       
        <div className="dark:text-dark-300 mt-8 flex justify-center text-xs text-gray-400">
          <a href="##">Avis de confidentialité</a>
          <div className="dark:bg-dark-500 mx-2.5 my-0.5 w-px bg-gray-200"></div>
          <a href="##">Conditions d'utilisation</a>
        </div>
      </div>
    </main>
  );
}
