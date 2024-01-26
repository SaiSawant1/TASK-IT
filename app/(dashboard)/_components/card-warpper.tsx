import { Header } from "@/components/auth/header";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface CardWrapperProps {
  headerLabel: string;
  children: React.ReactNode;
}
export const CardWrapper = ({ children, headerLabel }: CardWrapperProps) => {
  return (
    <Card>
      <CardHeader className="text-2xl font-semibold">{headerLabel}</CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};
