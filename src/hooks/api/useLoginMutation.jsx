import { useMutation } from "@tanstack/react-query";
import login from "../../service/login/login";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/common/useAuth";

const useLoginMutation = () => {
  const navigate = useNavigate();
  const { login: loginContext } = useAuth();

  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      loginContext(data);
      navigate("/");
    },
  });
};

export default useLoginMutation;
