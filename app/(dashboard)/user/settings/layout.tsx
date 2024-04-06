interface OrganizationLayoutProps {
  children: React.ReactNode;
}

export default function SettingLayout({ children }: OrganizationLayoutProps) {
  return (
    <main className="pt-20 md:pt-24 px-4 max-w-6xl 2xl:max-w-screen-xl mx-auto">
      {children}
    </main>
  );
}
