import { getAxiosInstance } from "../axios_instance";

async function getOnePost(id) {
  const { data } = await getAxiosInstance().get("/" + id);

  return data;
}

export default getOnePost;
