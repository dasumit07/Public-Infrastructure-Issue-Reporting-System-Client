import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home";
import NotFound from "../Pages/NotFound";
import AuthLayout from "../Layout/AuthLayout";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import ReportAnIssue from "../Pages/ReportAnIssue";
import PrivateRoute from "./PrivateRoute";
import AboutUs from "../Pages/AboutUs";
import AllIssues from "../Pages/AllIssues";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home></Home>
      },
      {
        path: "all-issues",
        element: <AllIssues></AllIssues>
      },
      {
        path: "report-issue",
        element: <PrivateRoute>
          <ReportAnIssue></ReportAnIssue>
        </PrivateRoute>
      },
      {
        path: "about-us",
        element: <AboutUs></AboutUs>
      }
    ],
  },
  {
    path: "auth",
    element: <AuthLayout></AuthLayout>,
    children: [
      {
        path: "login",
        element: <Login></Login>
      },
      {
        path: "register",
        element: <Register></Register>
      }
    ]
  },
  {
    path: "*",
    element: <NotFound></NotFound>
  }
]);