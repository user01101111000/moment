import { useMutation, useQueryClient } from "@tanstack/react-query";
import editPost from "../../service/editPost/editPost";

const useEditPostMutation = (id) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: editPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["postsAndComments", id] });
      queryClient.invalidateQueries({ queryKey: ["post", id] });
    },
  });
};

export default useEditPostMutation;
