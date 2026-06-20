import NextAuth from "next-auth"
import { authOptions } from "@/utils/authOptions"

const handler = NextAuth(authOptions)
export { handler as POST, handler as GET }