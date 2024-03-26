import { ModalProvider } from "@/components/providers/modal-provider";
import { Navbar } from "./_components/navbar";
import { Toaster } from "sonner";
import { QueryProvider } from "@/components/providers/query-providers";
import { ErrorBoundary } from "react-error-boundary";
interface DashboardLayoutProps {
  children: React.ReactNode;
}
export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <ErrorBoundary fallback={<p>something went wrong</p>}>
      <div className="h-full">
        <QueryProvider>
          <Toaster />
          <ModalProvider />
          <Navbar />
          {children}
        </QueryProvider>
      </div>
    </ErrorBoundary>
  );
}
