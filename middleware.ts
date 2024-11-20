import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "@/routes";

import { NextApiRequest, NextApiResponse } from "next";
import { auth } from "@/auth";

interface AuthRequest extends NextApiRequest {
  nextUrl: URL;
}

export default async function handler(req: AuthRequest, res: NextApiResponse) {
  const nextUrl = new URL(
    req.nextUrl.pathname || "",
    `http://${req.headers.host}`,
  );
  const session = await auth();
  let isLoggedIn = false;
  if (session?.user) {
    isLoggedIn = true;
  }
  const isAPIAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (nextUrl.pathname === "/" && isLoggedIn) {
    const newUrl = new URL(DEFAULT_LOGIN_REDIRECT, req.nextUrl.origin);
    return Response.redirect(newUrl);
  }

  if (isAPIAuthRoute) return null;

  if (isAuthRoute) {
    if (isLoggedIn) {
      const newUrl = new URL(DEFAULT_LOGIN_REDIRECT, req.nextUrl.origin);
      return Response.redirect(newUrl);
    }
    return null;
  }

  if (!isLoggedIn && !isPublicRoute) {
    const newUrl = new URL("/login", req.nextUrl.origin);
    return Response.redirect(newUrl);
  }

  return null;
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
