import { getAxiosUsersInstance } from "../axios_instance";

async function getAnyUserInfo(userID) {
  const { data } = await getAxiosUsersInstance().get("/" + userID);
  return data.fields;
}

export default getAnyUserInfo;
