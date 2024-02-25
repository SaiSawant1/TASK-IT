import { auth } from "@/auth";

export default async function BoardIdPage() {
  const session = await auth();
  return <div className="   h-full w-full "></div>;
}
