import ProtectedRoute from "../components/helper/ProtectedRoute";
import ProtectedProfileRoute from "../components/helper/ProtectedProfileRoute";
import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import SuspenseLoading from "../components/helper/SuspenseLoading";

const HomeLayout = lazy(() => import("../layout/HomeLayout"));
const Auth = lazy(() => import("../pages/auth/page"));
const Home = lazy(() => import("../pages/home/page"));
const PostDetail = lazy(() => import("../pages/post_detail/page"));
const Profile = lazy(() => import("../pages/profile/page"));
const NotFound = lazy(() => import("../pages/not_found/page"));

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
        path: ":username",
        element: (
          <ProtectedProfileRoute>
            <Profile />
          </ProtectedProfileRoute>
        ),
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
  {
    path: "/auth",
    element: (
      <Suspense fallback={<SuspenseLoading />}>
        <Auth />
      </Suspense>
    ),
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
