import { UserApi } from "@/lib/api/users/user.api";
import { USERS_QK } from "@/lib/api/users/user.query-keys";
import { createQueryClient } from "@/lib/config/network/ts-query";

export const prefetchUsers = async () => {
  const queryClient = createQueryClient();

  await queryClient.prefetchQuery({
    queryKey: [USERS_QK],
    queryFn: UserApi.getUsers,
  });

  return queryClient;
};
