import Home from "@/pages/home/page.jsx";
import NotFound from "@/pages/not_found/page.jsx";
import HomeLayout from "@/layout/HomeLayout.jsx";
import PostDetail from "@/pages/post_detail/page.jsx";
import Auth from "../pages/auth/page";
import ProtectedRoute from "../components/helper/ProtectedRoute";
import { createBrowserRouter } from "react-router-dom";

const routes = [
  {
    path: "/",
    element: <HomeLayout />,
    auth: true,
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
  {
    path: "/auth",
    element: <Auth />,
    auth: false,
  },
];

const protectedFullRoutes = routes.map((route) => {
  if (route.auth)
    route.element = <ProtectedRoute>{route.element}</ProtectedRoute>;

  return route;
});

const router = createBrowserRouter(protectedFullRoutes);

export default router;
