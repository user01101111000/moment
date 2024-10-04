import { useMutation } from "@tanstack/react-query";
import getUserInfo from "../../service/getUserInfo/getUserInfo";
import { setUserInfo } from "../../lib/features/userInfo/userInfoSlice";
import { useDispatch } from "react-redux";

const useGetUserInfoMutation = () => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: getUserInfo,
    onSuccess: (data) => {
      dispatch(setUserInfo(data));
    },
  });
};

export default useGetUserInfoMutation;
