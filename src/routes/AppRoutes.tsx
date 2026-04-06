import AddEditBlog from "@/pages/AddEditBlog";
import BlogList from "@/pages/BlogList";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Layout from "@/layout/Layout";
import PublicRoute from "./PublicRoute";
import BlogDetails from "@/pages/BlogDetails";
import UserBlogList from "@/pages/UserBlogList";
import PageNotFound from "@/pages/PageNotFound";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/blogspace" replace />} />
          <Route path="/blogspace" element={<BlogList />} />
          <Route path="/blog/:id" element={<BlogDetails />} />
          <Route
            path="/addBlog"
            element={
              <ProtectedRoute>
                <AddEditBlog />
              </ProtectedRoute>
            }
          />
          <Route
            path="/editBlog/:id"
            element={
              <ProtectedRoute>
                <AddEditBlog />
              </ProtectedRoute>
            }
          />
          <Route
            path="/myBlogs"
            element={
              <ProtectedRoute>
                <UserBlogList />
              </ProtectedRoute>
            }
          />
        </Route>

        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
export default AppRoutes;
