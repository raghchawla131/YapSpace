import {
  createBrowserRouter,
  RouterProvider,
  Route,
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


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/signup",
    element: <Signup/>
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
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
