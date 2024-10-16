import "../../../components/home/Post/Post.css";
import Skeleton from "../../ui/Skeleton/Skeleton";

const OnePostLoading = ({ hr = false }) => {
  return (
    <div className="post_wrapper">
      <div className="post">
        <figure>
          <Skeleton width="3rem" height="3rem" borderRadius="50%" />
        </figure>

        <div className="post_main">
          <div className="name_area">
            <Skeleton width="100%" height="1rem" borderRadius="4px" />

            <p>|</p>

            <Skeleton width="100%" height="1rem" borderRadius="4px" />
          </div>

          <Skeleton width="100%" height="3rem" borderRadius="4px" />
        </div>
      </div>

      {hr && <hr className="divider" />}
    </div>
  );
};

export default OnePostLoading;
