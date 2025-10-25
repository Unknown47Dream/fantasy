/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Dynamically import TonConnectUIProvider to avoid SSR issues
const TonConnectUIProvider = dynamic(
  () => import("@tonconnect/ui-react").then((mod) => mod.TonConnectUIProvider),
  { ssr: false }
);

export function TonProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render anything on the server
  if (!mounted) {
    return <>{children}</>;
  }

  const manifestUrl = `${process.env.NEXT_PUBLIC_APP_URL}/tonconnect-manifest.json`;
  const botUsername = process.env.NEXT_PUBLIC_BOT_USERNAME || "YourBotUsername";

  return (
    <TonConnectUIProvider
      manifestUrl={manifestUrl}
      actionsConfiguration={{
        twaReturnUrl: `https://t.me/${botUsername}`,
      }}
    >
      {children}
    </TonConnectUIProvider>
  );
}
