import { useQuery } from "@tanstack/react-query";
import { User } from "@telegram-apps/init-data-node";
import axios from "axios";

export const UserQueryKey = "User";

export const getUser = async (initDataRaw: string) => {
  const res = await axios<User>(`/api/auth/telegram`, {
    headers: {
      Authorization: `tma ${initDataRaw}`,
    },
  });
  return res.data;
};

export const useGetUser = (initDataRaw: string) => {
  return useQuery({
    queryKey: [UserQueryKey],
    enabled: !!initDataRaw,
    queryFn: async (): Promise<User> => getUser(initDataRaw),
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};
