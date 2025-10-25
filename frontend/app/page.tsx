"use client";

import { useEffect, useState, useRef } from "react";
import type { User } from "@/lib/db/schema";
import { MainSection } from "@/components/MainSection";
import { BottomNav } from "@/components/BottomNav";
import { ReferralSection } from "@/components/ReferralSection";
import { LeaderboardSection } from "@/components/LeaderboardSection";
import { ShopSection } from "@/components/ShopSection";
import { WalletSection } from "@/components/WalletSection";

type Page = "main" | "referral" | "leaderboard" | "buy" | "wallet";

export default function Home() {
  const [currentPage, setCurrentPage] = useState<Page>("main");
  const authAttempted = useRef(false);

  useEffect(() => {
    const initApp = async () => {
      // Prevent double initialization
      if (authAttempted.current) return;
      authAttempted.current = true;
      try {
        const WebApp = (await import("@twa-dev/sdk")).default;
        WebApp.ready();
        WebApp.expand();
        WebApp.setHeaderColor("#3498DB");
        WebApp.setBackgroundColor("#aac3ff");
        await new Promise((resolve) => setTimeout(resolve, 100));
        if (WebApp.initData) {
          const referralCode = WebApp.initDataUnsafe?.start_param || null;
          try {
            const response = await fetch("/api/auth/telegram", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                initData: WebApp.initData,
                referralCode,
              }),
            });
            if (response.ok) {
              const data = await response.json();
              // setUser(data.user);
              // setPoints(data.user.points);
              if (data.isNewUser && referralCode) {
                setTimeout(() => {
                  // showToast("🎉 Welcome! You got bonus points for joining!");
                }, 500);
              }
            } else {
              console.error("Auth failed:", response.status);
              // showToast("Authentication failed. Please refresh.");
            }
          } catch (error) {
            console.error("Auth error:", error);
            // showToast("Connection error. Please check your internet.");
          }
        } else {
          console.log("No Telegram WebApp data");
        }
      } catch (error) {
        console.error("Init error:", error);
      } finally {
        // setLoading(false);
      }
    };
    initApp();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  if (true) {
    return (
      <div className="min-h-screen bg-gray-700 flex items-center justify-center">
        <p className="text-primary text-lg font-semibold">Loading...</p>
      </div>
    );
  }

  // if (!user) {
  //   return (
  //     <div className="min-h-screen bg-checkered flex items-center justify-center p-4">
  //       <div className="text-center bg-white rounded-[20px] p-8 max-w-md card-3d">
  //         <h2 className="text-2xl font-bold text-primary mb-4">Welcome to ESPORT Fantasy Game!</h2>
  //         <p className="text-secondary mb-6">
  //           This app needs to be opened in Telegram to work properly.
  //         </p>
  //         <a
  //           href={`https://t.me/${process.env.NEXT_PUBLIC_BOT_USERNAME}`}
  //           className="inline-block btn-primary px-8 py-4 text-lg"
  //         >
  //           Open in Telegram
  //         </a>
  //       </div>
  //     </div>
  //   );
  // }

  // return (
  //   <div className="min-h-screen bg-checkered relative">
  //     <div className="container mx-auto max-w-md pb-20 relative">
  //       {currentPage === "main" && (
  //         <MainSection
  //           user={user}
  //           points={points}
  //           onPointsEarned={updatePoints}
  //           onShowToast={showToast}
  //         />
  //       )}
  //       {currentPage === "referral" && <ReferralSection user={user} onShowToast={showToast} />}
  //       {currentPage === "leaderboard" && (
  //         <LeaderboardSection currentUserId={user?.id} currentUserPoints={points} />
  //       )}
  //       {currentPage === "buy" && (
  //         <ShopSection userId={user?.id} onPurchase={updatePoints} onShowToast={showToast} />
  //       )}
  //       {currentPage === "wallet" && <WalletSection userId={user?.id} onShowToast={showToast} />}
  //     </div>
  //     <BottomNav currentPage={currentPage} onPageChange={setCurrentPage} />
  //   </div>
  // );
}
