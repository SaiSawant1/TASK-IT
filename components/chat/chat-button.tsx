import { MessageSquare } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Input } from "../ui/input";
import { ChatDisplay } from "./chat-display";
import { SocketIndicator } from "./socket-indicator";
import { fetchCurrentOrg } from "@/actions/redis-org/redis-fetch-current-org";
import { ChatInput } from "./chat-input";

export const ChatButton = async () => {
  const org = await fetchCurrentOrg();

  if (!org.data?.orgId) {
    return;
  }

  return (
    <div className="fixed bottom-10 right-10">
      <Sheet>
        <SheetTrigger asChild>
          <MessageSquare className="h-8 w-8 bg-" />
        </SheetTrigger>
        <SheetContent side={"right"}>
          <SheetHeader>
            <SheetTitle className="flex space-x-4 justify-start items-center">
              <h1>Organization Chat</h1>
              <SocketIndicator />
            </SheetTitle>
            <SheetDescription>
              Communicated with in an organization
            </SheetDescription>
          </SheetHeader>
          <div className="h-full space-y-2 flex flex-col pb-12">
            <ChatDisplay />
            <ChatInput
              name={org.data?.orgName}
              apiUrl="/api/socket/messages"
              query={{
                organizationId: org.data?.orgId,
              }}
            />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};
