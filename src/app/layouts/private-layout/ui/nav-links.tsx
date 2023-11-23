import { ROUTER_PATHS } from "@/shared/constants";
import clsx from "clsx";
import Link from "next/link";

export function NavLinks() {
  const linkClassName = clsx("underline");
  return (
    <div className="text-lg flex gap-5">
      <Link href={ROUTER_PATHS.USERS} className={linkClassName}>
        Пользователи
      </Link>
      <Link href={ROUTER_PATHS.BOARDS} className={linkClassName}>
        Доски
      </Link>
    </div>
  );
}
