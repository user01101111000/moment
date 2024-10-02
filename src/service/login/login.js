import { getAxiosAuthLoginInstance } from "../axios_instance";

async function login({ email, password }) {
  const userData = {
    email,
    password,
    returnSecureToken: true,
  };

  const { data: authData } = await getAxiosAuthLoginInstance().post(
    "",
    userData
  );

  return authData;
}

export default login;
