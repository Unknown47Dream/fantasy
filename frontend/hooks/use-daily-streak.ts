import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { UserQueryKey } from "./use-get-user";
import { User } from "@/types/user";

export const dailyStreak = async (initDataRaw: string) => {
  const res = await axios.post<User>("/api/daily-streak", {
    headers: {
      Authorization: `tma ${initDataRaw}`,
    },
  });
  return res.data;
};

export const useDailyStreak = () => {
  const queryClient = useQueryClient();

  return useMutation<User, AxiosError<unknown>, string, unknown>({
    mutationFn: (data) => dailyStreak(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [UserQueryKey] });
    },
  });
};
