import { useQuery } from "@tanstack/react-query";
import getOnePost from "../../service/getOnePost/getOnePost";
import getComments from "../../service/getComments/getComments";

const useGetPostAndCommentsQuery = (id) => {
  return useQuery({
    queryKey: ["postsAndComments", id],
    refetchIntervalInBackground: true,
    queryFn: async () => {
      const data = await Promise.all([getOnePost(id), getComments(id)]);

      return data;
    },
    retry: 1,
  });
};

export default useGetPostAndCommentsQuery;
