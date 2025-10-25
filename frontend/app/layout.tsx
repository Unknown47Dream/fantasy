import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { TonProvider } from "@/providers/ton-provider";

// Configure Fredoka font
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
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
    <html lang="en">
      <body className={`${inter.className} overflow-x-hidden antialiased`}>
        <TonProvider>{children}</TonProvider>
      </body>
    </html>
  );
}
