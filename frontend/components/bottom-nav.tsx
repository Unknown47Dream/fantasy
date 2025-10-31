"use client";

type Page = "main" | "referral" | "leaderboard" | "buy" | "wallet";

interface BottomNavProps {
  currentPage: Page;
  onPageChange: (page: Page) => void;
}

export function BottomNav({ currentPage, onPageChange }: BottomNavProps) {
  const items = [
    { id: "main" as Page, label: "HOME", icon: "fa-home" },
    { id: "referral" as Page, label: "REFER", icon: "fa-user-friends" },
    { id: "leaderboard" as Page, label: "RANK", icon: "fa-trophy" },
    { id: "buy" as Page, label: "BUY", icon: "fa-shopping-cart" },
    { id: "wallet" as Page, label: "WALLET", icon: "fa-wallet" },
  ];

  return (
    <div
      className="fixed bottom-0 left-0 right-0 bg-white flex justify-around z-[100]"
      style={{
        borderTop: "4px solid var(--text-primary)",
        padding: "8px 0",
        paddingBottom: "calc(8px + env(safe-area-inset-bottom))",
        boxShadow: "0 -10px 30px rgba(0, 0, 0, 0.1)",
      }}
    >
      {items.map((item) => {
        const isActive = currentPage === item.id;

        return (
          <button
            key={item.id}
            onClick={() => onPageChange(item.id)}
            className={`flex-1 flex flex-col items-center p-2 cursor-pointer transition-all duration-300 relative ${
              isActive ? "" : ""
            }`}
            style={{
              transform: isActive ? "translateY(-4px)" : "translateY(0)",
              color: isActive ? "var(--primary)" : "var(--text-light)",
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.transform = "scale(0.9)";
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.transform = isActive ? "translateY(-4px)" : "translateY(0)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = isActive ? "translateY(-4px)" : "translateY(0)";
            }}
            onTouchStart={(e) => {
              e.currentTarget.style.transform = "scale(0.9)";
            }}
            onTouchEnd={(e) => {
              e.currentTarget.style.transform = isActive ? "translateY(-4px)" : "translateY(0)";
            }}
          >
            {/* Top indicator bar for active item */}
            {isActive && (
              <div
                className="absolute"
                style={{
                  top: "-8px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "40px",
                  height: "4px",
                  background: "var(--primary)",
                  borderRadius: "2px",
                }}
              />
            )}

            {/* Icon */}
            <div
              className="text-2xl mb-1 transition-all duration-300"
              style={{
                animation: isActive ? "iconBounce 0.5s ease" : "none",
              }}
            >
              <i className={`fas ${item.icon}`}></i>
            </div>

            {/* Label */}
            <div
              className="text-[11px] font-semibold uppercase"
              style={{
                letterSpacing: "0.3px",
              }}
            >
              {item.label}
            </div>
          </button>
        );
      })}
    </div>
  );
}
