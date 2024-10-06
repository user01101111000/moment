import "./style/reset.css";
import "./style/global.css";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./routes/routes.jsx";
import AllProviders from "./utils/providers.jsx";
import "./i18n.js";

createRoot(document.getElementById("root")).render(
  <AllProviders>
    <RouterProvider router={router} />
  </AllProviders>
);
