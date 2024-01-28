import { Sidebar } from "../_components/sidebar";

interface OrganizationLayoutProps {
  children: React.ReactNode;
}

export default function OrganizationLayout({
  children,
}: OrganizationLayoutProps) {
  return (
    <main className="pt-20 md:pt-24 px-4 max-w-6xl 2xl:max-w-screen-xl mx-auto">
      <div className="flex gap-x-7 ">
        <div className="w-64 hidden shrink-0 md:block ">
          <Sidebar />
        </div>
        {children}
      </div>
    </main>
  );
}
