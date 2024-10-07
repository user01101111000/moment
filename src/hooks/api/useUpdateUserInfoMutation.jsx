import { useMutation } from "@tanstack/react-query";
import updateUserInfo from "../../service/updateUserInfo/updateUserInfo";

import { updateUserPartInfo } from "../../lib/features/userInfo/userInfoSlice";
import { useDispatch } from "react-redux";

const useUpdateUserInfoMutation = () => {
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: updateUserInfo,
    onSuccess: (data) => {
      dispatch(updateUserPartInfo(data));
    },
  });
};

export default useUpdateUserInfoMutation;
