import { useSession } from "@/entities/session";
import { getAvatarUrl } from "@/entities/user";
import Image from "next/image";

export function Profile() {
  const { currentSession } = useSession();

  if (!currentSession) return null;

  return (
    <div className="flex gap-2 items-center justify-end">
      <Image
        className="w-8 h-8"
        alt="avatar"
        src={getAvatarUrl(currentSession.avatarId)}
      />
      <div className="text-lg">{currentSession.name}</div>
    </div>
  );
}
