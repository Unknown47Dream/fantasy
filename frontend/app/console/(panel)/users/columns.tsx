"use client";

import { ColumnDef } from "@tanstack/react-table";
import { User } from "@/types/user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";

export const userColumns: ColumnDef<User>[] = [
  {
    accessorKey: "photoUrl",
    header: "Avatar",
    cell: ({ row }) => {
      const user = row.original;
      return (
        <Avatar className="h-8 w-8">
          <AvatarImage src={user.photoUrl} alt={user.username} />
          <AvatarFallback>
            {user.firstName?.[0]}
            {user.lastName?.[0]}
          </AvatarFallback>
        </Avatar>
      );
    },
  },
  {
    accessorKey: "username",
    header: "Username",
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div className="flex flex-col">
          <span className="font-medium">@{user.username}</span>
          <span className="text-sm text-muted-foreground">
            {user.firstName} {user.lastName}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "telegramId",
    header: "Telegram ID",
  },
  {
    accessorKey: "points",
    header: "Points",
    cell: ({ row }) => {
      const points = row.getValue("points") as number;
      return (
        <Badge variant="secondary" className="font-mono">
          {points.toLocaleString()}
        </Badge>
      );
    },
  },
  {
    accessorKey: "xp",
    header: "XP",
    cell: ({ row }) => {
      const xp = row.getValue("xp") as number;
      return (
        <Badge variant="outline" className="font-mono">
          {xp.toLocaleString()}
        </Badge>
      );
    },
  },
  {
    accessorKey: "isPremium",
    header: "Premium",
    cell: ({ row }) => {
      const isPremium = row.getValue("isPremium") as boolean;
      return (
        <Badge variant={isPremium ? "default" : "secondary"}>
          {isPremium ? "Premium" : "Free"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "dailyStreak",
    header: "Streak",
    cell: ({ row }) => {
      const streak = row.getValue("dailyStreak") as number;
      return (
        <div className="flex items-center space-x-1">
          <span>🔥</span>
          <span className="font-medium">{streak}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "referralCount",
    header: "Referrals",
    cell: ({ row }) => {
      const count = row.getValue("referralCount") as number;
      return <span className="font-medium">{count}</span>;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Joined",
    cell: ({ row }) => {
      const date = row.getValue("createdAt") as string;
      return (
        <span className="text-sm text-muted-foreground">
          {formatDistanceToNow(new Date(date), { addSuffix: true })}
        </span>
      );
    },
  },
];
