import "./page.css";
import { useParams } from "react-router-dom";
import PostDetailContainer from "@/containers/post_detail/PostDetailContainer";
import useGetPostAndCommentsQuery from "../../hooks/api/getPostAndCommentsQuery";
import HomeLoading from "../../containers/home/HomeLoading";

const PostDetail = () => {
  const { id } = useParams();

  const { data, isLoading, isError, error } = useGetPostAndCommentsQuery(id);

  if (isLoading) return <HomeLoading />;

  if (isError) return <div>Error: {error.message}</div>;

  const currentPost = data[0]
    .map((x) => x.fields)
    .find((x) => x.id.stringValue == id);

  const comments = data[1]?.map((x) => x?.fields) ?? [];

  return <PostDetailContainer post={currentPost} comments={comments} />;
};

export default PostDetail;
