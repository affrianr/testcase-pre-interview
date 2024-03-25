import { Outlet, redirect } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import Add from "./pages/Add";
import EditProfile from "./pages/EditProfile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/:emp_code",
    element: <Profile />,
  },
  {
    path: "/add",
    element: <Add />,
  },
  {
    path: "/edit/:emp_code",
    element: <EditProfile />,
  },
]);

export default router;
