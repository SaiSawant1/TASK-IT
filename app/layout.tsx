import type { Metadata } from "next";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { ErrorBoundary } from "react-error-boundary";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: [{ url: "/logo.svg", href: "/logo.svg" }],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="en">
      <ErrorBoundary fallback={<p>something went wrong</p>}>
        <SessionProvider session={session}>
          <body>{children}</body>
        </SessionProvider>
      </ErrorBoundary>
    </html>
  );
}
