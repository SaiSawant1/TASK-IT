interface AuthPageLayoutProps {
  children: React.ReactNode;
}
export default function AuthPageLayout({ children }: AuthPageLayoutProps) {
  return (
    <div className="h-full flex items-center justify-center bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-pink-300 via-purple-300 to-indigo-400">
      {children}
    </div>
  );
}
