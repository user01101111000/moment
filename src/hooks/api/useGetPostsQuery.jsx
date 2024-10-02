import { useQuery } from "@tanstack/react-query";
import getPosts from "../../service/getPosts/getPosts";

const useGetPostsQuery = () => {
  return useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
    retry: 1,
//    refetchInterval: 10000,
  });
};

export default useGetPostsQuery;
