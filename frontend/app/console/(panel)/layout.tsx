"use client";

import { GalleryVerticalEnd, Home, LogOut, Users } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import Link from "next/link";
import { useAuth } from "@/hooks/auth/use-auth";
import { ThemeToggle } from "@/components/theme-toggle";
import { useLogout } from "@/hooks/auth/use-logout";

const businessRoutes = {
  navMain: [
    {
      title: "Dashboard",
      url: "/console",
      icon: Home,
      items: [],
    },
    {
      title: "Users",
      url: "/console/users",
      icon: Users,
      items: [],
    },
  ],
};

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: Readonly<LayoutProps>) {
  const me = useAuth();
  const logout = useLogout();

  const handleLogout = () => {
    logout.mutate();
  };

  return (
    <main className="bg-gray-50 min-h-screen dark:bg-neutral-900 overflow-hidden select-none">
      <SidebarProvider>
        <Sidebar>
          <SidebarHeader>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton size="lg" asChild>
                  <Link href="/panel">
                    <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                      <GalleryVerticalEnd className="size-4" />
                    </div>
                    <div className="flex flex-col gap-0.5 leading-none">
                      <span className="font-medium">{process.env.NEXT_PUBLIC_TITLE}</span>
                      <span className="">v1.0.2</span>
                    </div>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarMenu>
                {businessRoutes.navMain.map((item) => {
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        // isActive={isActive}
                      >
                        <Link href={item.url} className="font-medium flex items-center gap-2">
                          <item.icon className="size-4" />
                          {item.title}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
          <SidebarRail />
        </Sidebar>
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b">
            <div className="flex items-center gap-2 px-3">
              <SidebarTrigger />
              <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
            </div>
            <div className="flex items-center col-span-4 justify-end space-x-4 pr-6">
              <ThemeToggle />
              {me.isAuthenticated ? (
                <button onClick={handleLogout} className="text-red-400 cursor-pointer">
                  <LogOut className="size-5" />
                </button>
              ) : null}
            </div>
          </header>
          <div className="flex flex-1 py-4 px-4 lg:p-6">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </main>
  );
}
