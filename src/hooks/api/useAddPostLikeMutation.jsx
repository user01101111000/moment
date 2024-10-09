import { useMutation, useQueryClient } from "@tanstack/react-query";
import postLike from "../../service/postLike/postLike";

const useAddPostLikeMutation = (id) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postLike,
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["posts"] });
      queryClient.refetchQueries({ queryKey: ["postsAndComments", id] });
    },
  });
};

export default useAddPostLikeMutation;
