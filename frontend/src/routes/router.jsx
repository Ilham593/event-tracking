import { createBrowserRouter } from "react-router-dom";
import { Navigate } from "react-router-dom";
import MainLayouts from "../Layouts";
import Home from "../pages/Home";
import LoginPage from "../features/auth/components/LoginPage";
import Register from "../features/auth/components/RegisterPage";
import ProfilePage from "../features/profile/components/profilePage";
export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: <MainLayouts />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
    ],
  },
]);
