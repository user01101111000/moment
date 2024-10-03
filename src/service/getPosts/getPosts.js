import { getAxiosInstance } from "../axios_instance";

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getPosts() {
  const { data } = await getAxiosInstance().get("/");

  return data?.documents ?? [];
}

export default getPosts;
