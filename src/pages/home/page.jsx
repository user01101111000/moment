import HomeContainer from "../../containers/home/HomeContainer";
import timeSorter from "../../utils/timeSorter";
import HomeLoading from "../../containers/home/HomeLoading";
import useGetInifiedPostsQuery from "../../hooks/api/useGetPostsQuery";

const Home = () => {
  const {
    data,
    status,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useGetInifiedPostsQuery();

  if (isLoading) return <HomeLoading />;

  if (isError) return <div>Error: {error.message}</div>;

  const posts = timeSorter(data?.pages?.map((x) => x?.documents)?.flat())?.map(
    (x) => x?.fields
  );

  return (
    <HomeContainer
      posts={!posts[0] ? [] : posts}
      status={status}
      fetchNextPage={fetchNextPage}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
    />
  );
};

export default Home;
