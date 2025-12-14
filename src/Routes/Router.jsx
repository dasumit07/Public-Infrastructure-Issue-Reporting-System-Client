import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home";
import NotFound from "../Pages/NotFound";
import AuthLayout from "../Layout/AuthLayout";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import PrivateRoute from "./PrivateRoute";
import AboutUs from "../Pages/AboutUs";
import AllIssues from "../Pages/AllIssues";
import DashBoardLayout from "../Layout/DashBoardLayout";
import ReportAnIssue from "../Pages/Dashboard/ReportAnIssue";
import MyIssue from "../Pages/Dashboard/MyIssue";
import Details from "../Pages/Card/Details";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory";
import ManageUsers from "../Pages/Dashboard/ManageUsers";
import ManageStaff from "../Pages/Dashboard/ManageStaff";
import AssignedIssues from "../Pages/Dashboard/AssignedIssues";
import AdminRoute from "./AdminRoute";
import DashboardAllIssues from "../Pages/Dashboard/DashboardAllIssues";

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
        path: "/issues/:id",
          element: <PrivateRoute>
            <Details></Details>
          </PrivateRoute>,
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
    path: "dashboard",
    element: <PrivateRoute>
      <DashBoardLayout></DashBoardLayout>
    </PrivateRoute>,
    children: [
      {
        path: "report-issue",
        element: <ReportAnIssue></ReportAnIssue>
      },
      {
        path: "my-issue",
        element: <MyIssue></MyIssue>
      },
      {
        path: "payment-history",
        element: <AdminRoute><PaymentHistory></PaymentHistory></AdminRoute>
      },
      {
        path: "all-issues",
        element: <AdminRoute><DashboardAllIssues></DashboardAllIssues></AdminRoute>
      },
      {
        path: "manage-users",
        element: <AdminRoute><ManageUsers></ManageUsers></AdminRoute>
      },
      {
        path: "manage-staff",
        element: <AdminRoute><ManageStaff></ManageStaff></AdminRoute>
      },
      {
        path: "assigned-issues",
        element: <AssignedIssues></AssignedIssues>
      },
    ]
  },
  {
    path: "*",
    element: <NotFound></NotFound>
  }
]);