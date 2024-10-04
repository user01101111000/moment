import { getAxiosRefreshTokenInstance } from "../axios_instance";

async function refreshToken(ref_token) {
  console.log("refresh token isledi");
  const bodyData = {
    grant_type: "refresh_token",
    refresh_token: ref_token,
  };

  const { data } = await getAxiosRefreshTokenInstance().post("", bodyData);

  return data;
}

export default refreshToken;
