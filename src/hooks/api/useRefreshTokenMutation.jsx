import { useMutation } from "@tanstack/react-query";
import refreshToken from "../../service/refreshToken/refreshToken";
import useAuth from "../../hooks/common/useAuth";
import { encryptToken } from "../../utils/cryptoID";

const useRefreshTokenMutation = () => {
  const { login: loginContext } = useAuth();

  return useMutation({
    mutationFn: refreshToken,
    onSuccess: (data) => {
      const idToken = encryptToken(data.id_token);
      const refreshToken = encryptToken(data.refresh_token);

      const tokens = {
        m_i: idToken,
        m_r: refreshToken,
      };

      localStorage.setItem("m_i&r", JSON.stringify(tokens));

      loginContext(tokens);
    },
  });
};

export default useRefreshTokenMutation;
