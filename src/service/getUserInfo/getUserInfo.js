import {
  getAxiosUserInfoInstance,
  getAxiosUsersInstance,
} from "../axios_instance";
import refreshToken from "../refreshToken/refreshToken";
import isTokenExpired from "../../utils/isTokenExpired ";
import { decryptToken, encryptToken } from "../../utils/cryptoID";

async function getUserInfo() {
  const cur_i_t = decryptToken(JSON.parse(localStorage.getItem("m_i&r")).m_i);
  const cur_r_t = decryptToken(JSON.parse(localStorage.getItem("m_i&r")).m_r);

  if (isTokenExpired(cur_i_t)) {
    const newUserTokens = await refreshToken(cur_r_t);

    const new_i_t = encryptToken(newUserTokens.id_token);
    const new_r_t = encryptToken(newUserTokens.refresh_token);

    const tokens = {
      m_i: new_i_t,
      m_r: new_r_t,
    };

    localStorage.setItem("m_i&r", JSON.stringify(tokens));
  }

  const bodyData = {
    idToken: decryptToken(JSON.parse(localStorage.getItem("m_i&r")).m_i),
  };

  const { data: userAuthData } = await getAxiosUserInfoInstance().post(
    "",
    bodyData
  );

  const userID = userAuthData.users[0].localId;

  const { data: userData } = await getAxiosUsersInstance().get(`/` + userID);

  console.log("sorgu atdi melumati getirdi");

  return userData;
}

export default getUserInfo;
