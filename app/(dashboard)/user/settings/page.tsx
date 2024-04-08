import { auth } from "@/auth";
import { Header } from "./_components/header";
import { ProfileImage } from "./_components/profile-image";

export default async function SettingPage() {
  const session = await auth();
  return (
    <div className="h-full flex flex-col space-y-10 w-full">
      <Header />
      <ProfileImage image={session?.user.image} userId={session?.user.id} />
    </div>
  );
}
