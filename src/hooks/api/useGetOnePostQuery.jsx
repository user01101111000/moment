import { useQuery } from "@tanstack/react-query";
import getOnePost from "../../service/getOnePost/getOnePost";

const useGetOnePostQuery = (id) => {
  return useQuery({
    queryKey: ["post", id],
    queryFn: () => getOnePost(id),
    retry: 1,
    refetchIntervalInBackground: true,
  });
};

export default useGetOnePostQuery;
