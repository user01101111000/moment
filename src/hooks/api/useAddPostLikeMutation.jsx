import { useMutation, useQueryClient } from "@tanstack/react-query";
import postLike from "../../service/postLike/postLike";

const useAddPostLikeMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postLike,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts", "postsAndComments"],
      });
    },
  });
};

export default useAddPostLikeMutation;
