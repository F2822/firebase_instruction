import React from "react";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import Auth from "./pages/Auth";
import Blog from "./pages/Blog";
import Post from "./pages/Post";
import NewPost from "./pages/NewPost";
import PrivateRoute from "./components/PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/auth",
    element: <Auth />
  },
  {
    path: "/",
    element: <Navigate to="/blog" replace={true} />
  },
  {
    path: "/blog",
    element: (
      <PrivateRoute>
        <Blog />
      </PrivateRoute>
    )
  },
  {
    path: "/blog/:postId",
    element: (
      <PrivateRoute>
        <Post />
      </PrivateRoute>
    )
  },
  {
    path: "/new-post",
    element: (
      <PrivateRoute>
        <NewPost />
      </PrivateRoute>
    )
  }
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
