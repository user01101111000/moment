import { useMutation, useQueryClient } from "@tanstack/react-query";
import postComment from "../../service/postComment/postComment";

const useAddCommentMutation = (id) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["postsAndComments", id] });
    },
  });
};

export default useAddCommentMutation;
