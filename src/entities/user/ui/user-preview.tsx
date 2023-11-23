import clsx from "clsx";
import { getAvatarUrl } from "./get-avatar-url";
import Image from "next/image";

export function UserPreview({
  name,
  avatarId,
  size,
  className,
}: {
  className?: string;
  name: string;
  avatarId: string;
  size: "sm" | "md" | "lg";
}) {
  return (
    <div className={clsx(className, "flex gap-2 items-center")}>
      <Image
        className={{ sm: "w-8 h-8", md: "w-10 h-10", lg: "w-12 h-12" }[size]}
        alt="avatar"
        src={getAvatarUrl(avatarId)}
      />
      <div
        className={clsx(
          { sm: "text-lg", md: "text-lg", lg: "text-xl" }[size],
          "whitespace-nowrap overflow-hidden text-ellipsis min-w-[50px]",
        )}
      >
        {name}
      </div>
    </div>
  );
}
