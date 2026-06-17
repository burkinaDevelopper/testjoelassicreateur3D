"use client";
import { useRouter, useSearchParams } from "next/navigation";

import Link from "next/link";
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { Suspense } from "react";

import { Button, Card, Checkbox, Input, InputErrorMsg } from "@/components/ui";
import { AuthFormValues, schema } from "@/app/pages/Auth/schema";
import { Page } from "@/components/shared/Page";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState, useRef } from "react";
import { useRole } from "../../hooks/useRole";
import Alert from "./Alert";
import axios from 'axios';



export default function LoginPage() {
  return (
    <Suspense>
      <SignIn />
    </Suspense>
  );
}

function SignIn() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [rateLimit, setRateLimit] = useState<any | null>(null);
  const [retryAfter, setRetryAfter] = useState<number>(0);
  const rateLimitRef = useRef<any>(null);
  const {emailVerifiedAt ,status} = useRole();
  const [isShowError, setIsShowError] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (status === "authenticated") {
      if (emailVerifiedAt === null) {
        router.replace("/verify-email");
        return;
      }
      const redirect = searchParams.get("redirect");
      router.replace(redirect && redirect !== "" ? redirect : "/dashboards/home");
    }
  }, [status, router, searchParams, emailVerifiedAt]);

  // Gérer le countdown du rate limit
 

  const onSubmit = async (data: AuthFormValues) => {
    setErrorMessage(null);
    setIsShowError(false);

    const result = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });
    console.log("Résultat de la tentative de connexion:", result);

    if (!result || result.error) {
      setIsShowError(true);
      
      const errorData = JSON.parse(result?.error || '{}');
      console.log("Données d'erreur parsées:", errorData);
      
      const rateLimitInfo = errorData?.error?.rate_limit_info;
      
      // Activer le rate limit SEULEMENT si remaining_attempts === 0
      if (rateLimitInfo && rateLimitInfo.remaining_attempts === 0) {
        console.log("Rate limit activé - plus de tentatives disponibles");
        setRateLimit(rateLimitInfo);
        setErrorMessage(errorData.error?.message || "Trop de tentatives. Veuillez patienter.");
      } else {
        console.log("Tentatives restantes:", rateLimitInfo?.remaining_attempts);
        setRateLimit(null);
        
        // Afficher le message avec les tentatives restantes
        let message = errorData.error?.message || "Identifiants invalides.";
        if (rateLimitInfo && rateLimitInfo.remaining_attempts > 0) {
          message += ` Il vous reste ${rateLimitInfo.remaining_attempts} tentative(s).`;
        }
        setErrorMessage(message);
      }
        
      return;
    }

    const redirect = searchParams.get("redirect");
    router.replace(redirect && redirect !== "" ? redirect : "/dashboards/home");
  };

  // Initialiser retryAfter quand rateLimit change
  useEffect(() => {
    if (rateLimit?.available_in_seconds) {
      rateLimitRef.current = rateLimit;
      setRetryAfter(rateLimit.available_in_seconds);
    }
  }, [rateLimit]);

  // Gérer le countdown du rate limit
  useEffect(() => {
    if (retryAfter > 0) {
      const timer = setInterval(() => {
        setRetryAfter((prev) => {
          if (prev <= 1) {
            // Après le countdown, si remaining_attempts == 0, mettre can_retry à true
            const currentRateLimit = rateLimitRef.current;
            if (currentRateLimit && currentRateLimit.remaining_attempts === 0) {
              console.log("Countdown terminé, can_retry devient true");
              setRateLimit({
                ...currentRateLimit,
                can_retry: true,
                available_in_seconds: 0
              });
            } else {
              console.log("Countdown terminé, réinitialisation du rate limit");
              setRateLimit(null);
            }
            rateLimitRef.current = null;
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [retryAfter]);

  const submitGoogle = async () => {
    const result = await signIn("google");
    
  }


  return (
    <Page title="Login">
      <main className="min-h-100vh grid w-full grow grid-cols-1 place-items-center">
        {rateLimit && rateLimit.message && (
          <Alert type="warning" message={rateLimit.message} />
        )}
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
              <h2 className="text-2xl font-semibold text-gray-600 dark:text-dark-100">
                Bienvenue de nouveau
              </h2>
              <p className="text-gray-400 dark:text-dark-300">
                Veuillez vous connecter pour continuer
              </p>
            </div>
          </div>
          <Card className="mt-5 rounded-lg p-5 lg:p-7">
             <div className="mt-2">
                <InputErrorMsg
                  when={(errorMessage && errorMessage !== "") as boolean}
                >
                  {errorMessage}
                </InputErrorMsg>
              </div>
            <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
              <div className="space-y-4">
                <Input
                  label="Email"
                  placeholder="Enter Email"
                  prefix={
                    <EnvelopeIcon
                      className="size-5 transition-colors duration-200"
                      strokeWidth="1"
                    />
                  }
                  {...register("email")}
                  error={errors?.email?.message}
                  autoComplete="email"
                />
                <Input
                  label="Mot de passe"
                  type="password"
                  placeholder="Entrez le mot de passe"
                  prefix={
                    <LockClosedIcon
                      className="size-5 transition-colors duration-200"
                      strokeWidth="1"
                    />
                  }
                  {...register("password")}
                  error={errors?.password?.message}
                />
              </div>

              <div className="mt-4 flex items-center justify-between space-x-2">
                <Checkbox label="Se souvenir de moi"/>
                <Link
                  href="/forgot-password"
                  className="text-xs text-gray-400 transition-colors hover:text-gray-800 focus:text-gray-800 dark:text-dark-300 dark:hover:text-dark-100 dark:focus:text-dark-100"
                >
                  Mot de passe oublié ?
                </Link>
              </div>

              <Button 
                disabled={retryAfter > 0 || (rateLimit?.can_retry === false)} 
                type="submit" 
                className="mt-5 w-full" 
                color="primary"
              >
                {retryAfter > 0 
                  ? `Veuillez patienter ${retryAfter}s` 
                  : "Se connecter"
                }
              </Button>
            </form>
            <div className="mt-4 text-center text-xs-plus">
              <p className="line-clamp-1">
                <span>Vous n'avez pas de compte ?</span>{" "}
                <Link
                  className="text-primary-600 transition-colors hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-600"
                  href="/register"
                >
                  Créer un compte
                </Link>
              </p>
            </div>
            <div className="my-7 flex items-center space-x-3 text-xs rtl:space-x-reverse">
              <div className="h-px flex-1 bg-gray-200 dark:bg-dark-500"></div>
              <p>OU</p>
              <div className="h-px flex-1 bg-gray-200 dark:bg-dark-500"></div>
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
          <div className="mt-8 flex justify-center text-xs text-gray-400 dark:text-dark-300">
            <a href="##">Avis de confidentialité</a>
            <div className="mx-2.5 my-0.5 w-px bg-gray-200 dark:bg-dark-500"></div>
            <a href="##">Conditions d'utilisation</a>
          </div>
        </div>
      </main>
    </Page>
  );
}
