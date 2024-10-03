import Loading from "../ui/Loading";

const SuspenseLoading = () => {
  return (
    <section
      style={{
        height: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#09090b",
      }}
    >
      <Loading size={"1.3rem"} />
    </section>
  );
};

export default SuspenseLoading;
