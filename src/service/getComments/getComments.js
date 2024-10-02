import { getAxiosCommentsInstance } from "../axios_instance";

async function getComments(postID) {
  const { data } = await getAxiosCommentsInstance(postID).get(`/`);

  return data.documents;
}

export default getComments;
