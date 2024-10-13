import { useParams } from "react-router-dom";
import PostDetailContainer from "../../containers/post_detail/PostDetailContainer";
import useGetPostAndCommentsQuery from "../../hooks/api/getPostAndCommentsQuery";
import HomeLaoding from "../../containers/home/HomeLoading";
import timeSorter from "../../utils/timeSorter";

const PostDetail = () => {
  const { id } = useParams();

  const { data, isLoading, isError, error } = useGetPostAndCommentsQuery(id);

  if (isLoading) return <HomeLaoding />;

  if (isError) return <div>Error: {error.message}</div>;

  const currentPost = data[0].fields;

  const comments = timeSorter(data[1] ?? [])?.map((x) => x?.fields) ?? [];

  const commentPublishers = comments.map((x) => x?.publisher?.stringValue);

  return (
    <PostDetailContainer
      post={currentPost}
      comments={comments}
      commentPublishers={commentPublishers}
    />
  );
};

export default PostDetail;
