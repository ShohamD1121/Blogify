import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Main from "./pages/Main";
import Posts from "./pages/Posts";
import Register from "./pages/Register";
import Write from "./pages/Write";

const MainLayout: React.FC = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

const PostLayout: React.FC = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "",
        element: <Main />,
      },
    ],
  },
  {
    path: "/posts",
    element: <PostLayout />,
    children: [
      {
        path: "",
        element: <Posts />,
      },
      {
        path: "/posts/write",
        element: <Write />,
      },
    ],
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
