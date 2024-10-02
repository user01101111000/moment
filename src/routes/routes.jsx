import Home from "@/pages/home/page.jsx";
import NotFound from "@/pages/notFound/page.jsx";
import HomeLayout from "@/layout/HomeLayout.jsx";
import PostDetail from "@/pages/post_detail/page.jsx";
import { createBrowserRouter } from "react-router-dom";

const routes = [
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "post/:id",
        element: <PostDetail />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
