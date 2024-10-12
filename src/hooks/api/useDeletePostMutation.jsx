import { useMutation, useQueryClient } from "@tanstack/react-query";
import deletePost from "../../service/deletePost/deletePost";

const useDeletePostMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["posts"] });
      queryClient.refetchQueries({ queryKey: ["postsAndComments"] });
    },
  });
};

export default useDeletePostMutation;
