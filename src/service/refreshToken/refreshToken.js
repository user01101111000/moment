import { getAxiosRefreshTokenInstance } from "../axios_instance";

async function refreshToken(ref_token) {
  const bodyData = {
    grant_type: "refresh_token",
    refresh_token: ref_token,
  };

  const { data } = await getAxiosRefreshTokenInstance().post("", bodyData);

  return data;
}

export default refreshToken;
