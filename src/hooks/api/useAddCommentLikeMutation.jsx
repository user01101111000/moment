import { useMutation, useQueryClient } from "@tanstack/react-query";
import postCommentLike from "../../service/postCommentLike/postCommentLike";

const useAddCommentLikeMutation = (id) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postCommentLike,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["postsAndComments", id] });
    },
  });
};

export default useAddCommentLikeMutation;
