import { useInfiniteQuery } from "@tanstack/react-query";
import getPosts from "../../service/getPosts/getPosts";

const useGetInifiedPostsQuery = () => {
  return useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
    getNextPageParam: (lastPage) => {
      return lastPage?.nextPageToken;
    },
  });
};

export default useGetInifiedPostsQuery;
