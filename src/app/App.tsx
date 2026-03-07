import { useEffect } from "react";
import { checkAuth } from "../features/auth/authSlice";
import { useAppDispatch } from "../shared/hooks/redux";
import { Route, Routes } from "react-router";
import AuthLayout from "../layouts/AuthLayout";
import Register from "../features/auth/pages/Register";
import Login from "../features/auth/pages/Login";
import Dashboard from "../features/dashboard/Dashboard";
import PublicRoute from "../routes/PublicRoute";
import CreateCoursePage from "../features/courses/pages/CreateCoursePage";
import Home from "../features/home/Home"; // added
import { Toaster } from "react-hot-toast";
import MyCoursesPage from "../features/tutorCourses/pages/MyCoursesPage";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkAuth(() => {}));
  }, [dispatch]);

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />

      <Routes>
        {/* Home Page */}
        <Route path="/" element={<Home />} />

        {/* Auth Routes */}
        <Route element={<PublicRoute />}>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Route>

        {/* Protected / App Routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-course" element={<CreateCoursePage />} />
        <Route path="/my-courses" element={<MyCoursesPage />} />
      </Routes>
    </>
  );
}

export default App;