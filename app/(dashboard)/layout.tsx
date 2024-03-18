import { ModalProvider } from "@/components/providers/modal-provider";
import { Navbar } from "./_components/navbar";
import { Toaster } from "sonner";
import { QueryProvider } from "@/components/providers/query-providers";
interface DashboardLayoutProps {
  children: React.ReactNode;
}
export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="h-full">
      <QueryProvider>
        <Toaster />
        <ModalProvider />
        <Navbar />
        {children}
      </QueryProvider>
    </div>
  );
}
