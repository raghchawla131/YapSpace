import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Search from "./pages/Search/Search";
import UserProfile from "./pages/UserProfile/UserProfile";
import CreatePost from "./pages/CreatePost/CreatePost";
import Activity from "./pages/Activity/Activity";
import Profile from "./pages/Profile/Profile";
import Footer from "./components/layout/Footer";
import AddComment from "./pages/comment/AddComment";
import YapDiscussion from "./pages/YapDiscussion/YapDiscussion";

const Layout = () => {
  return (
    <div className="layout">
      <Outlet />
      <Footer />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/search",
        element: <Search />,
      },
      {
        path: "/activity",
        element: <Activity />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/profile/:user_id/:username",
        element: <UserProfile />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/create",
    element: <CreatePost />,
  },
  {
    path: "/yap-discussion/:yap_id",
    element: <YapDiscussion />,
  },
  {
    path: "/add-root-comment/:yap_id",
    element: <AddComment />,
  },
  {
    path: "/add-nested-comment/:comment_id",
    element: <AddComment />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
