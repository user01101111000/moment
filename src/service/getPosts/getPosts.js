import { getAxiosInstance } from "../axios_instance";

async function getPosts({ pageParam = "" }) {
  const { data } = await getAxiosInstance().get("/", {
    params: {
      pageSize: 9,
      orderBy: "createdAt desc",
      pageToken: pageParam,
    },
  });

  return data;
}

export default getPosts;
