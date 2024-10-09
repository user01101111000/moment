import { useQuery } from "@tanstack/react-query";
import getPosts from "../../service/getPosts/getPosts";
import getComments from "../../service/getComments/getComments";

const useGetPostAndCommentsQuery = (id) => {
  return useQuery({
    queryKey: ["postsAndComments", id],
    refetchIntervalInBackground: true,
    queryFn: async () => {
      const data = await Promise.all([getPosts(), getComments(id)]);

      return data;
    },
    retry: 1,
  });
};

export default useGetPostAndCommentsQuery;
