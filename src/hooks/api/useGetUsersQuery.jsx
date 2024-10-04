import { useQuery } from "@tanstack/react-query";
import getUsers from "../../service/getUsers/getUsers";

const useGetUsersQuery = (trueUser) => {
  return useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
    retry: 1,
    enabled: trueUser,
    //    refetchInterval: 10000,
  });
};

export default useGetUsersQuery;
