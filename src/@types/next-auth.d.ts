import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    passwordConfirmedAt?: number | null;
    user: {
      id: string;
      email?: string | null;
      firstname: string | null;
      lastname: string | null;
      is_admin: boolean ;
      provider?: string | null;
      email_verified_at?: string | null;
    };
  }

  interface User {
    id: string;
    email?: string | null;
    firstname: string | null;
    lastname: string | null;
    is_admin: boolean ;
    provider?: string | null;
    email_verified_at?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    email?: string | null;
    firstname?: string | null;
    lastname?: string | null;
    is_admin: boolean ;
    provider?: string | null;
    accessToken?: string;
    email_verified_at?: string | null;
    passwordConfirmedAt?: number | null;
  }
}
