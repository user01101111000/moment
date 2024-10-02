import { useMutation } from "@tanstack/react-query";
import register from "../../service/register/register";

const useRegisterMutation = () => {
  return useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      console.log(data);
    },
  });
};

export default useRegisterMutation;
