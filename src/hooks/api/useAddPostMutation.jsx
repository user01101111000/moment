import { useMutation, useQueryClient } from "@tanstack/react-query";
import addPost from "../../service/addPost/addPost";

const useAddPostMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addPost,
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["posts"] });
    },
  });
};

export default useAddPostMutation;
