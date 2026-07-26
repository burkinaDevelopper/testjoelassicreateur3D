import { JWT } from "next-auth/jwt";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import axios from "axios";
import GoogleProvider from "next-auth/providers/google";
import crypto from "crypto";

// Mot de passe de pont OAuth -> Sanctum : dérivé de l'email + NEXTAUTH_SECRET
// (jamais exposé au client), stable pour un même utilisateur, imprévisible sans le secret serveur.
function getGoogleBridgePassword(email: string) {
  const secret = process.env.NEXTAUTH_SECRET as string;
  return crypto.createHmac("sha256", secret).update(email.toLowerCase()).digest("hex");
}

function applyUserToToken(token: JWT, userData: any) {
  token.id = String(userData.id);
  token.email = userData.email ?? null;
  token.firstname = userData.firstname ?? null;
  token.lastname = userData.lastname ?? null;
  token.is_admin = userData.is_admin ?? null;
  token.provider = userData.provider ?? null;
  token.email_verified_at = userData.email_verified_at ?? null;
}


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
          if(!credentials){
            console.log('❌ Pas de credentials fournis');
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
              email_verified_at: userData.email_verified_at?? null
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
          applyUserToToken(token, apiUser);
          token.accessToken = apiUser.accessToken ?? null;
        }

        if (account && profile) {
          const baseUrl = process.env.NEXT_PUBLIC_API_URL;
          const headers = {
            "Accept": "application/json",
            "Content-Type": "application/json"
          };
          const bridgePassword = getGoogleBridgePassword(profile.email as string);

          try {
            // L'utilisateur existe peut-être déjà côté API : on ignore l'échec
            // et on tente quand même la connexion juste après.
            await axios.post(`${baseUrl}/api/register`, {
              provider: account.provider,
              lastname: profile?.name?.split(" ")[0],
              firstname: profile?.name?.split(" ")[1],
              email: profile.email,
              password: bridgePassword,
              password_confirmation: bridgePassword,
            }, { headers });
          } catch (registerError: any) {
            console.warn("ℹ️ Register Google ignoré (compte probablement déjà existant):", registerError.response?.data?.message ?? registerError.message);
          }

          try {
            const response = await axios.post(`${baseUrl}/api/login`,
            {
              email: profile.email,
              password: bridgePassword
            },
            { headers, withCredentials: true })

            const apiResponse = response.data;
            applyUserToToken(token, apiResponse.user);
            token.accessToken = apiResponse.access_token;
          } catch (error: any) {
            console.error("❌ Erreur login Google via Sanctum:", error.response?.data?.message ?? error.message);
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
          applyUserToToken(token, session.user as any);
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
          session.user.email = token.email ?? null;
          session.user.firstname = token.firstname ?? null;
          session.user.lastname = token.lastname ?? null;
          session.user.is_admin = token.is_admin ?? false;
          session.user.provider = token.provider ?? null;
          (session.user as any).accessToken = (token as any).accessToken;
          session.user.email_verified_at = token.email_verified_at ?? null;
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