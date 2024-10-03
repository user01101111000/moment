import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Suspense, useState } from "react";
import "./HomeLayout.css";
import SuspenseLoading from "../components/helper/SuspenseLoading";
import { AnimatePresence } from "framer-motion";
import { FaRegUser } from "react-icons/fa";
import { IoMdAddCircleOutline } from "react-icons/io";
import { HiHome } from "react-icons/hi2";
import useAddPostMutation from "../hooks/api/useAddPostMutation";
import AddPostWindow from "../components/home/AddPostWindow/AddPostWindow";

const HomeLayout = () => {
  const { mutateAsync } = useAddPostMutation();

  async function callback(values) {
    await mutateAsync(values);
  }

  const navigate = useNavigate();
  const [add, setAdd] = useState(false);
  const location = useLocation();

  return (
    <main className="home-layout">
      <article className="flow">
        <Suspense fallback={<></>}>
          <Outlet />
        </Suspense>
        <div className="navigation_bar">
          <div className="nav_buttons">
            <HiHome
              className="nav_button"
              onClick={() => {
                if (location.pathname != "/") navigate("/");
              }}
            />

            <IoMdAddCircleOutline
              className="nav_button"
              onClick={() => setAdd((prev) => !prev)}
            />

            <FaRegUser className="nav_button" />
          </div>
        </div>
      </article>

      <AnimatePresence>
        {add && (
          <AddPostWindow
            setAdd={setAdd}
            callback={callback}
            username="Username"
            content="Content"
            buttonName="Post"
          />
        )}
      </AnimatePresence>
    </main>
  );
};

export default HomeLayout;
