import { getAvatarUrl } from "@/entities/user";
import clsx from "clsx";
import Image from "next/image";

export function AvatarsList({
  avatarsIds,
  className,
}: {
  avatarsIds: string[];
  className?: string;
}) {
  return (
    <div className={clsx("flex", className)}>
      {avatarsIds.map((id, key) => (
        <Image
          key={key}
          alt="avatar"
          className="-mr-2 last:mr-0 w-8 h-8"
          src={getAvatarUrl(id)}
        />
      ))}
    </div>
  );
}
