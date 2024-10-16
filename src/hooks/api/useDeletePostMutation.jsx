import { useMutation, useQueryClient } from "@tanstack/react-query";
import deletePost from "../../service/deletePost/deletePost";
import { setPostsDataInfo } from "../../lib/features/userInfo/userInfoSlice";
import { useDispatch } from "react-redux";

const useDeletePostMutation = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: deletePost,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["postsAndComments"] });

      dispatch(setPostsDataInfo(data));
    },
  });
};

export default useDeletePostMutation;
