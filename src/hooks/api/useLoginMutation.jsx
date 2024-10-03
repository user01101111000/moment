import { useMutation } from "@tanstack/react-query";
import login from "../../service/login/login";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/common/useAuth";
import { encryptToken } from "../../utils/cryptoID";

const useLoginMutation = () => {
  const navigate = useNavigate();
  const { login: loginContext } = useAuth();

  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      const idToken = encryptToken(data.idToken);
      const refreshToken = encryptToken(data.refreshToken);

      const tokens = {
        m_i: idToken,
        m_r: refreshToken,
      };

      localStorage.setItem("m_i&r", JSON.stringify(tokens));

      loginContext(tokens);
      navigate("/");
    },
  });
};

export default useLoginMutation;
