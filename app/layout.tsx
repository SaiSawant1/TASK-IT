import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
const inter = Inter({ subsets: ["latin"] });
import { ErrorBoundary } from "react-error-boundary";
import { SocketProvider } from "@/components/providers/socket-provider";

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
          <SocketProvider>
            <body className={inter.className}>{children}</body>
          </SocketProvider>
        </SessionProvider>
      </ErrorBoundary>
    </html>
  );
}
