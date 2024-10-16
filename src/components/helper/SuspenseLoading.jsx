import LoadingImageComponent from "../ui/LoadingImageComponent/LoadingImageComponent";

const SuspenseLoading = () => {
  return (
    <section
      style={{
        height: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#181818",
      }}
    >
      <LoadingImageComponent size={"1.3rem"} />
    </section>
  );
};

export default SuspenseLoading;
