"use client";

import { useEffect, useState, useRef } from "react";
import { init, miniApp, viewport, retrieveRawInitData } from "@telegram-apps/sdk";
import { useGetUser } from "@/hooks/use-get-user";

type Page = "MAIN" | "REFERRAL" | "LEADERBOARD" | "SHOP" | "WALLET";

export default function Home() {
  const [currentPage, setCurrentPage] = useState<Page>("MAIN");
  const [initData, setInitData] = useState("");
  const authAttempted = useRef(false);
  const getUser = useGetUser(initData);

  useEffect(() => {
    if (authAttempted.current) return;
    authAttempted.current = true;
    const setupApp = async () => {
      try {
        init();
        miniApp.ready();
        viewport.expand();
        const initDataRaw = retrieveRawInitData();
        if (initDataRaw) {
          setInitData(initDataRaw);
        }
      } catch (error) {
        console.error("Setup failed:", error);
        // showToast("Authentication failed. Please refresh.");
      }
    };
    setupApp();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  if (true) {
    return (
      <div className="w-full min-h-screen space-y-4 flex flex-col items-center justify-center bg-brand-background-1 text-white">
        <div className="loader"></div>
        <p className="text-primary text-sm font-medium">Loading Fantasy</p>
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
