import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import axios from "axios";
import GoogleProvider from "next-auth/providers/google";


export const authOptions:NextAuthOptions = {
    // Configure one or more authentication providers
    providers: [
      GoogleProvider({
        name: 'google',
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
      }),
      CredentialsProvider({
        name: 'credentials',
        credentials: {
          email: { label: "Email", type: "email" },
          password: { label: "Password", type: "password" }
        },
        async authorize(credentials:Record<"email"|"password",string> | undefined, req) {
          console.log('🔐 Tentative de connexion avec:', credentials);
          
          if(!credentials){
            console.log('❌ Pas de credentials fournis',credentials);
            return null;
          }

          const baseUrl= process.env.NEXT_PUBLIC_API_URL;
          return axios.post(`${baseUrl}/api/login`,
          {
            email: credentials.email,
            password: credentials.password
          },
          {
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/json"
            },
            withCredentials: true
          })
          .then(function (response) {
            console.log(response);
            const apiResponse = response.data;
         
            const userData = apiResponse.user;
              return {
              id: userData.id.toString(),
              email: userData.email,
              firstname: userData.firstname,
              lastname: userData.lastname,
              is_admin: userData.is_admin,
              provider: userData.provider,
              accessToken: apiResponse.access_token,
              email_verified_at: userData.email_verified_at
            };
          })
          .catch(function (error) {
            const errorMessage = error.response?.data?.message ?? error.message ?? 'Une erreur est survenue';
            const errorDetails = error.response?.data ?? { message: errorMessage };
            
            // Retourner une structure d'erreur cohérente
            throw new Error(JSON.stringify({ 
              error: errorDetails
            }));
          })
                
        }
      })
    ],
    callbacks: {
      async jwt({ token, user, trigger, session ,profile,account}) {
        // Lors de la première connexion, ajouter les données utilisateur renvoyées par l'API
        if (user) {
          const apiUser = user as any;
          token.id = String(apiUser.id);
          token.email = apiUser.email ?? null;
          token.firstname = apiUser.firstname ?? null;
          token.lastname = apiUser.lastname ?? null;
          token.is_admin = apiUser.is_admin ?? null;
          token.provider = apiUser.provider ?? null;
          token.accessToken = apiUser.accessToken ?? null;
          token.email_verified_at = apiUser.email_verified_at ?? null;
        }

        if (account && profile) {
          console.log("🔵 account Google:", account);
          try {
            const data = {
            provider: account.provider,
            lastname: profile?.name?.split(" ")[0],
            firstname: profile?.name?.split(" ")[1],
            email: profile.email,
          };
          const baseUrl = process.env.NEXT_PUBLIC_API_URL;
          await axios.post(`${baseUrl}/api/register`,data,
          {
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/json"
            }
          }
          )
          const response = await axios.post(`${baseUrl}/api/login`,
          {
            email: profile.email,
            password: '123456444'
          },
          {
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/json"
            },
            withCredentials: true
          })

          const apiResponse = response.data;
          const userData = apiResponse.user;
          console.log("userData",  apiResponse);

          token.id = String(userData.id);
          token.email = userData.email ?? null;
          token.firstname = userData.firstname ?? null;
          token.lastname = userData.lastname ?? null;
          token.is_admin = userData.is_admin ?? null;
          token.provider = userData.provider ?? null;
          token.accessToken = apiResponse.access_token;
          token.email_verified_at = userData.email_verified_at ?? null;
          }
           catch (error: any) {
            console.error("❌ Erreur login Google via Sanctum:", error.response?.data ?? error.message);
          }       
        }

        // session.update() côté client -> on merge ce qui vient de session.user
        if (trigger === "update" && session?.passwordConfirmedAt) {
          token.passwordConfirmedAt = session.passwordConfirmedAt;
          return {
            ...token
          };
        }
        if (trigger === "update" && session.user) {
          const apiUser = session.user as any;
          token.id = String(apiUser.id);
          token.email = apiUser.email ?? null;
          token.firstname = apiUser.firstname ?? null;
          token.lastname = apiUser.lastname ?? null;
          token.is_admin = apiUser.is_admin ?? null;
          token.provider = apiUser.provider ?? null;
          token.email_verified_at = apiUser.email_verified_at ?? null;
          return {
            ...token,
          };
        }

        return token;
      },
      async session({ session, token }) {
        // Ajouter les données du token à la session
        if (token && session.user) {
          session.user.id = token.id ?? session.user.id;
          session.user.email = token.email ?? session.user.email;
          session.user.firstname = token.firstname ?? session.user.firstname;
          session.user.lastname = token.lastname ?? session.user.lastname;
          session.user.is_admin = token.is_admin ?? session.user.is_admin;
          session.user.provider = token.provider ?? session.user.provider;
          (session.user as any).accessToken = (token as any).accessToken;
          session.user.email_verified_at = token.email_verified_at ?? session.user.email_verified_at;
          session.passwordConfirmedAt = token?.passwordConfirmedAt || null;
        }
        return session;
      }
    },
    pages: {
      signIn: "/login", // Page de connexion personnalisée
    },
    session: {
      strategy: "jwt",
      maxAge: 24*7 * 60 * 60, // 168 hours
    },
    secret: process.env.NEXTAUTH_SECRET,
  }