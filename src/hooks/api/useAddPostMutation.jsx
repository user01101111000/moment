import { useMutation, useQueryClient } from "@tanstack/react-query";
import addPost from "../../service/addPost/addPost";
import { setPostsDataInfo } from "../../lib/features/userInfo/userInfoSlice";
import { useDispatch } from "react-redux";

const useAddPostMutation = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: addPost,
    onSuccess: (data) => {
      queryClient.refetchQueries({ queryKey: ["posts"] });
      dispatch(setPostsDataInfo(data));
    },
  });
};

export default useAddPostMutation;
