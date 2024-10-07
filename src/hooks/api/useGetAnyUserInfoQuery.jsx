import { useQuery } from "@tanstack/react-query";
import getAnyUserInfo from "../../service/getAnyUserInfo/getAnyUserInfo";

const useGetAnyUserInfoQuery = (id) => {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => getAnyUserInfo(id),
    retry: 1,
  });
};

export default useGetAnyUserInfoQuery;
