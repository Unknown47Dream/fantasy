import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { UsersListResponse, UsersQueryParams } from "@/types/user";

export const UsersQueryKey = "Users";

export const getUsers = async (params?: UsersQueryParams): Promise<UsersListResponse> => {
  const queryParams = new URLSearchParams();
  if (params?.page) queryParams.append("page", params.page.toString());
  if (params?.take) queryParams.append("take", params.take.toString());
  const queryString = queryParams.toString();
  const url = `/api/users${queryString ? `?${queryString}` : ""}`;
  const res = await axios.get<UsersListResponse>(url);
  return res.data;
};

export const useGetUsers = (params?: UsersQueryParams) => {
  return useQuery({
    queryKey: [UsersQueryKey, params?.page, params?.take],
    queryFn: async (): Promise<UsersListResponse> => getUsers(params),
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1,
  });
};
