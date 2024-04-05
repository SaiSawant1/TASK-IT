import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db";
import { getUserByID } from "./data/user";
export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: { strategy: "jwt" },
  adapter: PrismaAdapter(db),
  trustHost: true,
  events: {
    async linkAccount({ user, account }) {
      await db.user.update({
        where: {
          id: user.id,
        },
        data: {
          emailVerified: new Date(),
        },
      });
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") return true;
      const existingUser = await getUserByID(user?.id!);
      if (!existingUser || !existingUser.emailVerified) return false;
      return true;
    },
    async session({ token, session }: any) {
      if (session?.user && token.sub) {
        session.user.id = token.sub;
      }
      if (session?.user) {
        session.user.emailVerified = token.emailVerified;
      }
      return session;
    },
    async jwt({ token }) {
      if (token.sub) {
        const existingUser = await getUserByID(token.sub);
        if (existingUser) {
          token.emailVerified = existingUser.emailVerified;
        }
      }
      return token;
    },
  },
  ...authConfig,
});
