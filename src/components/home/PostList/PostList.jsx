import "./PostList.css";
import LoadingImageComponent from "../../ui/LoadingImageComponent/LoadingImageComponent";
import Post from "../Post/Post";

const PostList = ({ posts = [], refProp, isFetchingNextPage }) => {
  const postList = posts.map((post, _) =>
    _ == posts.length - 1 ? (
      <div key={post.id.stringValue} className="post_wrapper" ref={refProp}>
        <Post post={post} />

        {isFetchingNextPage && (
          <div className="infinitie_loading_area">
            <LoadingImageComponent size={"1rem"} />
          </div>
        )}
      </div>
    ) : (
      <div key={post.id.stringValue} className="post_wrapper">
        <Post post={post} />

        <hr className="divider" />
      </div>
    )
  );

  return <div className="post_list">{postList}</div>;
};

export default PostList;
