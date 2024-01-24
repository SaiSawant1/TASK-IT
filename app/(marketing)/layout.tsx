import { Navbar } from "@/app/(marketing)/_components/navbar";
import { Footer } from "./_components/footer";

interface MarketingLayoutProps {
  children: React.ReactNode;
}
export default function MarketingLayout({ children }: MarketingLayoutProps) {
  return (
    <div className="h-full bg-slate-200">
      {/* nav bar*/}
      <Navbar />
      <main className="pt-40 pb-20 bg-slate-200">{children}</main>
      {/* footer */}
      <Footer />
    </div>
  );
}
