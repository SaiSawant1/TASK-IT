import NextAuth, { type DefaultSession } from "next-auth";
export type ExtendedUser = DefaultSession["user"] & {
  emailVerified: string | null;
};
declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}
