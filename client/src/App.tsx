import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet,
  Link,
} from "react-router-dom";
import './App.css'
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Search from "./pages/Search/Search";
import CreatePost from "./pages/CreatePost/CreatePost";
import Activity from "./pages/Activity/Activity";
import Profile from "./pages/Profile/Profile";
import Footer from "./components/layout/Footer";

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
        element: <Home/>
      },
      {
        path: "/search",
        element: <Search/>
      },
      {
        path: "/create",
        element: <CreatePost/>
      },
      {
        path: "/activity",
        element: <Activity/>
      },
      {
        path: "/profile",
        element: <Profile/>
      },
    ],
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/signup",
    element: <Signup/>
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
