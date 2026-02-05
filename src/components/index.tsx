import { createHashRouter } from "react-router-dom";
import Home from "./Home";

const router = createHashRouter([
  { path: "/", element: <Home /> },
  {
    path: "*",
    element: <div>404 | Page not found.</div>,
  },
]);

export default router;