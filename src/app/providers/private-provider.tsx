import { useSession } from "@/entities/session";
import { ComposeChildren } from "@/shared/lib/react";
import { SocketProvider } from "@/shared/lib/socket";

export function PrivateProvider({ children }: { children: React.ReactNode }) {
  const session = useSession((s) => s.currentSession);

  return (
    <ComposeChildren>
      <SocketProvider clientId={session?.userId ?? ""} />
      {children}
    </ComposeChildren>
  );
}
