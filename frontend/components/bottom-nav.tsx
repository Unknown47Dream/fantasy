"use client";

import { Page } from "@/types/page";
import { viewport } from "@telegram-apps/sdk";

const RankIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    className={className}
  >
    <path
      fill="currentColor"
      d="M3 21q-.425 0-.712-.288T2 20V10q0-.425.288-.712T3 9h3.5q.425 0 .713.288T7.5 10v10q0 .425-.288.713T6.5 21zm7.25 0q-.425 0-.712-.288T9.25 20V4q0-.425.288-.712T10.25 3h3.5q.425 0 .713.288T14.75 4v16q0 .425-.288.713T13.75 21zm7.25 0q-.425 0-.712-.288T16.5 20v-8q0-.425.288-.712T17.5 11H21q.425 0 .713.288T22 12v8q0 .425-.288.713T21 21z"
    ></path>
  </svg>
);

const HomeIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={1024}
    height={1024}
    viewBox="0 0 1024 1024"
    className={className}
  >
    <path
      fill="currentColor"
      d="M946.5 505L560.1 118.8l-25.9-25.9a31.5 31.5 0 0 0-44.4 0L77.5 505a63.9 63.9 0 0 0-18.8 46c.4 35.2 29.7 63.3 64.9 63.3h42.5V940h691.8V614.3h43.4c17.1 0 33.2-6.7 45.3-18.8a63.6 63.6 0 0 0 18.7-45.3c0-17-6.7-33.1-18.8-45.2M568 868H456V664h112zm217.9-325.7V868H632V640c0-22.1-17.9-40-40-40H432c-22.1 0-40 17.9-40 40v228H238.1V542.3h-96l370-369.7l23.1 23.1L882 542.3z"
    ></path>
  </svg>
);

const ShopIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    className={className}
  >
    <g fill="none">
      <path d="M4 8h16v14H4z"></path>
      <path
        stroke="currentColor"
        strokeLinecap="square"
        strokeWidth={2}
        d="M15.5 11V5.5a3.5 3.5 0 1 0-7 0V11M4 8h16v14H4z"
      ></path>
    </g>
  </svg>
);

const WalletIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    className={className}
  >
    <path fill="currentColor" d="M16 12h2v4h-2z"></path>
    <path
      fill="currentColor"
      d="M20 7V5c0-1.103-.897-2-2-2H5C3.346 3 2 4.346 2 6v12c0 2.201 1.794 3 3 3h15c1.103 0 2-.897 2-2V9c0-1.103-.897-2-2-2M5 5h13v2H5a1.001 1.001 0 0 1 0-2m15 14H5.012C4.55 18.988 4 18.805 4 18V8.815c.314.113.647.185 1 .185h15z"
    ></path>
  </svg>
);

const ReferralIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    className={className}
  >
    <path
      fill="currentColor"
      d="m12.1 18.55l-.1.1l-.11-.1C7.14 14.24 4 11.39 4 8.5C4 6.5 5.5 5 7.5 5c1.54 0 3.04 1 3.57 2.36h1.86C13.46 6 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5c0 2.89-3.14 5.74-7.9 10.05M16.5 3c-1.74 0-3.41.81-4.5 2.08C10.91 3.81 9.24 3 7.5 3C4.42 3 2 5.41 2 8.5c0 3.77 3.4 6.86 8.55 11.53L12 21.35l1.45-1.32C18.6 15.36 22 12.27 22 8.5C22 5.41 19.58 3 16.5 3"
    ></path>
  </svg>
);

interface BottomNavProps {
  currentPage: Page;
  onPageChange: (page: Page) => void;
}

export function BottomNav({ currentPage, onPageChange }: BottomNavProps) {
  const items = [
    { id: "HOME" as Page, label: "Home", icon: HomeIcon },
    { id: "REFERRAL" as Page, label: "Refer", icon: ReferralIcon },
    { id: "SHOP" as Page, label: "Shop", icon: ShopIcon },
    { id: "WALLET" as Page, label: "Wallet", icon: WalletIcon },
    { id: "RANK" as Page, label: "Rank", icon: RankIcon },
  ];
  const safeAreaInsetBottom = viewport.safeAreaInsetBottom();

  return (
    <div
      className="bg-brand-background-3 grid grid-cols-5 pt-1"
      style={{
        paddingBottom: `${safeAreaInsetBottom + 4}px`,
      }}
    >
      {items.map((item) => {
        const isActive = currentPage === item.id;

        return (
          <button
            key={item.id}
            onClick={() => onPageChange(item.id)}
            className={`flex-1 col-span-1 flex flex-col items-center p-2 cursor-pointer transition-all duration-300 relative ${
              isActive ? "" : ""
            }`}
          >
            <div className="mb-1 transition-colors duration-300">
              <item.icon className={`size-6 shrink-0`}></item.icon>
            </div>
            <div className="text-xs font-semibold">{item.label}</div>
          </button>
        );
      })}
    </div>
  );
}
