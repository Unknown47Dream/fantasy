import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import { TonProvider } from "@/providers/ton-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import TanstackProviders from "./tanstack-providers";
import { Toaster } from "@/components/ui/sonner";

// Configure Fredoka font
const ibm = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Fantasy - Telegram Mini App",
  description: "ESPORT Fantasy League",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${ibm.className} overflow-x-hidden antialiased`}>
        <TanstackProviders>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <TonProvider>{children}</TonProvider>
            <Toaster />
          </ThemeProvider>
        </TanstackProviders>
      </body>
    </html>
  );
}
