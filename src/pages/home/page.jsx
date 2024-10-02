import "./page.css";
import HomeContainer from "../../containers/home/HomeContainer";
import useGetPostsQuery from "../../hooks/api/useGetPostsQuery";
import timeSorter from "../../utils/timeSorter";
import HomeLoading from "../../containers/home/HomeLoading";

const Home = () => {
  const { data, isLoading, isError, error } = useGetPostsQuery();

  if (isLoading) return <HomeLoading />;

  if (isError) return <div>Error: {error.message}</div>;

  const posts = timeSorter(data).map((x) => x.fields);

  return <HomeContainer posts={posts} />;
};

export default Home;
