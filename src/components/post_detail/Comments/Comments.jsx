import Comment from "../Comment/Comment";
import "./Comments.css";

const Comments = ({ comments }) => {
  const commentsList = comments.map((comment) => {
    return (
      <div key={comment.id.stringValue} className="comment_wrapper">
        <hr className="divider" />
        <Comment comment={comment} />
      </div>
    );
  });

  return <div className="comment_list">{commentsList}</div>;
};

export default Comments;
