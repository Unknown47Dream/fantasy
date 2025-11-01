/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Page } from "@/types/page";
import { viewport } from "@telegram-apps/sdk";
import Image from "next/image";

interface HeaderNavProps {
  currentPage: Page;
  user: any;
}

export function HeaderNav({ user }: HeaderNavProps) {
  const safeAreaInsetTop = viewport.safeAreaInsetTop();

  return (
    <div
      className="grid grid-cols-5 pb-2 px-2"
      style={{
        paddingTop: `${safeAreaInsetTop + 8}px`,
      }}
    >
      <Image
        src={user.user.photo_url}
        alt={user.user.first_name}
        width={32}
        height={32}
        className="object-cover rounded-full"
      />
    </div>
  );
}
