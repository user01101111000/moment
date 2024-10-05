import { getAxiosInstance } from "../axios_instance";

async function getPosts() {
  const { data } = await getAxiosInstance().get("/");

  return data?.documents ?? [];
}

export default getPosts;
