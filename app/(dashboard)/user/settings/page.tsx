import { Header } from "./_components/header";
import { ProfileImage } from "./_components/profile-image";

export default function SettingPage() {
  return (
    <div className="h-full flex flex-col space-y-10 w-full">
      <Header />
      <ProfileImage />
    </div>
  );
}
