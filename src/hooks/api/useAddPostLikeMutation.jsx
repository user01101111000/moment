import { useMutation, useQueryClient } from "@tanstack/react-query";
import postLike from "../../service/postLike/postLike";

const useAddPostLikeMutation = (id) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postLike,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["postsAndComments", id] });
    },
  });
};

export default useAddPostLikeMutation;
