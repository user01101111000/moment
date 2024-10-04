import { getAxiosUsersInstance } from "../axios_instance";

async function getUsers() {
  const { data } = await getAxiosUsersInstance().get("/");

  return data.documents;
}

export default getUsers;