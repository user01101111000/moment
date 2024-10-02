import { useState } from "react";
import "../../pages/home/page.css";
import Flow from "@/components/home/Flow/Flow";
import AddPostWindow from "@/components/home/AddPostWindow/AddPostWindow";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import useAddPostMutation from "../../hooks/api/useAddPostMutation";

const HomeContainer = ({ posts }) => {
  const { mutateAsync } = useAddPostMutation();

  const [add, setAdd] = useState(false);

  async function callback(values) {
    await mutateAsync(values);
  }

  return (
    <>
      <motion.article
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="home"
      >
        <Flow posts={posts} />
        <button onClick={() => setAdd(!add)} className="add_post_button">
          +
        </button>

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
      </motion.article>
    </>
  );
};

export default HomeContainer;
