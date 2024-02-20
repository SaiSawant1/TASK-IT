import { Navbar } from "./_components/navbar";
import { Toaster } from "sonner";
interface DashboardLayoutProps {
  children: React.ReactNode;
}
export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="h-full">
      <Toaster />
      <Navbar />
      {children}
    </div>
  );
}
