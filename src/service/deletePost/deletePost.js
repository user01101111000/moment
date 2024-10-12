import { getAxiosInstance } from "../axios_instance";

async function deletePost(id) {
  await getAxiosInstance().delete("/" + id);
}

export default deletePost;
