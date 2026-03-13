import { useEffect } from "react";
import { checkAuth } from "../features/auth/authSlice";
import { useAppDispatch } from "../shared/hooks/redux";
import { Route, Routes } from "react-router";
import AuthLayout from "../layouts/AuthLayout";
import Register from "../features/auth/pages/Register";
import Login from "../features/auth/pages/Login";
import Dashboard from "../features/dashboard/Dashboard";
import PublicRoute from "../routes/PublicRoute";
import CreateCoursePage from "../features/tutorCourses/pages/CreateCoursePage";
import Home from "../features/home/Home";
import { Toaster } from "react-hot-toast";
import MyCoursesPage from "../features/tutorCourses/pages/MyCoursesPage";
import EditCoursePage from "../features/tutorCourses/pages/EditCoursePage";
import CourseOverviewPage from "../features/tutorCourses/pages/CourseOverviewPage";
import CoursesPage from "../features/courses/pages/CoursesPage";
import CourseDetailsPage from "../features/courses/pages/CourseDetailsPage";
import TutorProfilePage from "../features/profile/tutor/pages/TutorProfilePage";
import EditTutorProfilePage from "../features/profile/tutor/pages/EditTutorProfilePage";
import MainLayout from "../layouts/MainLayout";
import ProtectedRoute from "../routes/ProtectedRoute";
import Wallet from "../features/wallet/Wallet";
import MyActivity from "../features/courses/pages/MyActivity";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkAuth(() => { }));
  }, [dispatch]);

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />

      <Routes>
        <Route element={<MainLayout />}>
          {/* Public App Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/courses/:id" element={<CourseDetailsPage />} />

          {/* Protected / App Routes */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/create-course" element={<CreateCoursePage />} />
          <Route path="/my-courses" element={<MyCoursesPage />} />
          <Route path="/edit-course/:id" element={<EditCoursePage />} />
        </Route>

        {/* Auth Routes */}
        <Route element={<PublicRoute />}>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute allowedRole="student" />}>
          <Route path="/wallet" element={<Wallet />} />
        </Route>

        {/* Protected / App Routes */}
        <Route path="/" element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/my-activity" element={<MyActivity />} />
          <Route path="/create-course" element={<CreateCoursePage />} />
          <Route path="/my-courses" element={<MyCoursesPage />} />
          <Route path="/course-overview/:id" element={<CourseOverviewPage />} />
          <Route path="/edit-course/:id" element={<EditCoursePage />} />
          <Route path="/profile" element={<TutorProfilePage />} />
          <Route path="/profile/edit" element={<EditTutorProfilePage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;