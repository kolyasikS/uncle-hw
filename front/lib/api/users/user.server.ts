import { QueryClient } from "@tanstack/react-query";
import { UserApi } from "@/lib/api/users/user.api";
import { USERS_QK } from "@/lib/api/users/user.query-keys";
import { STALE_TIME } from "@/lib/constants";

export const prefetchUsers = async (queryClient: QueryClient) => {
  await queryClient.prefetchQuery({
    queryKey: [USERS_QK],
    queryFn: UserApi.getUsers,
    staleTime: STALE_TIME.SHORT,
  });

  return queryClient;
};
