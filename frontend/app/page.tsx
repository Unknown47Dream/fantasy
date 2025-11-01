"use client";

import { useEffect, useState, useRef } from "react";
import { init, miniApp, viewport, retrieveRawInitData, isTMA } from "@telegram-apps/sdk";
import { useGetUser } from "@/hooks/use-get-user";
import { mockEnvFn } from "@/utils/mock-telegram";
import { parse } from "@telegram-apps/init-data-node";
import { BottomNav } from "@/components/bottom-nav";
import MainSection from "@/components/main-section";
import { Page } from "@/types/page";
import { HeaderNav } from "@/components/header-nav";

export default function Home() {
  const [currentPage, setCurrentPage] = useState<Page>("HOME");
  const [loading, setLoading] = useState(true);
  const [initData, setInitData] = useState("");
  const authAttempted = useRef(false);
  // const getUser = useGetUser(initData);
  const getUser = initData
    ? { data: parse(initData), isLoading: false, error: null }
    : { isLoading: true, error: null, data: null };

  useEffect(() => {
    if (authAttempted.current) return;
    authAttempted.current = true;
    mockEnvFn();
    const setupApp = async () => {
      try {
        if (isTMA()) {
          init();
          miniApp.ready();
          await viewport.mount();
          viewport.expand();
          const initDataRaw = retrieveRawInitData();
          if (initDataRaw) {
            setInitData(initDataRaw);
            setLoading(false);
          }
        } else {
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        console.error("Setup failed:", error);
      }
    };
    setupApp();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  if (loading || getUser.isLoading) {
    return (
      <div className="w-full min-h-screen space-y-4 flex flex-col items-center justify-center bg-brand-background-1 text-white">
        <div className="loader"></div>
        <p className="text-primary text-sm font-medium">
          Loading {`${process.env.NEXT_PUBLIC_TITLE}`}
        </p>
      </div>
    );
  }

  if (!initData) {
    return (
      <div className="w-full min-h-screen p-6 space-y-4 flex flex-col items-center justify-center bg-brand-background-1 text-white">
        <h2 className="text-lg font-medium text-white mb-4">
          Welcome to {`${process.env.NEXT_PUBLIC_TITLE}`}
        </h2>
        <p className="text-white text-lg text-center sm:underline sm:underline-offset-4">
          This app needs to be opened in Telegram to work properly.
        </p>
        <a
          href={`https://t.me/${process.env.NEXT_PUBLIC_BOT_USERNAME}`}
          className="flex items-center justify-center text-normal bg-brand-background-2 text-brand-font-4 px-6 h-11 rounded transition-colors hover:bg-brand-background-hover-1"
        >
          Open in Telegram
        </a>
      </div>
    );
  }

  if (getUser.error || !getUser.data) {
    return (
      <div className="w-full min-h-screen p-6 space-y-4 flex flex-col items-center justify-center bg-brand-background-1 text-white">
        <h2 className="text-lg font-medium text-white mb-4">
          Welcome to {`${process.env.NEXT_PUBLIC_TITLE}`}
        </h2>
        <p className="text-white text-lg text-center sm:underline sm:underline-offset-4">
          There is an issue retrieving your user data.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="flex items-center justify-center text-normal bg-brand-background-2 text-brand-font-4 px-6 h-11 rounded transition-colors hover:bg-brand-background-hover-1"
        >
          Reload the Page
        </button>
      </div>
    );
  }

  return (
    <div className="bg-brand-background-1 text-white">
      <div className="flex flex-col h-dvh container mx-auto max-w-md relative">
        <HeaderNav currentPage={currentPage} user={getUser.data} />
        <main className="flex flex-1 overflow-y-auto">
          {currentPage === "HOME" && <MainSection user={getUser.data} />}
        </main>
        <BottomNav currentPage={currentPage} onPageChange={setCurrentPage} />
      </div>
    </div>
  );
}
