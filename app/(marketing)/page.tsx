import { Button } from "@/components/ui/button";
import { Medal } from "lucide-react";
import Link from "next/link";

export default function MarketingPage() {
  return (
    <div className="items-center flex justify-center  flex-col">
      <div className={"items-center flex justify-center flex-col"}>
        <div className="flex items-center mb-4 border shadow-sm p-4 bg-amber-100 text-amber-700 rounded-full uppercase">
          <Medal className="h-6 w-6 mr-2" />
          No. 1 Task Manager
        </div>
        <h1 className="text-3xl md:text-6xl text-center text-neutral-800 mb-6">
          {" "}
          TASK-IT helps team prosper.
        </h1>
        <div className="text-3xl md:text-6xl bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white px-4 p-2 rounded-md pb-4 w-fit">
          Work ahead.
        </div>
      </div>
      <div
        className={
          "text-sm md:text-xl text-neutral-500 mt-4 max-w-xs md:max-w-2xl text-center mx-auto"
        }
      >
        Collaborate, manage projects, and reach productivity peaks. From high
        rises to home office, the way your team works is unique - accompish it
        all by TASK-IT
      </div>
      <Button className="mt-6" size={"lg"} asChild>
        <Link href={"/sign-up"}>Lets TASK-IT</Link>
      </Button>
    </div>
  );
}
