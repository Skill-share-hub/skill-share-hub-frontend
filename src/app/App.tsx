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
import TutorProfilePage from "../features/profile/pages/TutorProfilePage";
import MainLayout from "../layouts/MainLayout";
import CourseDetailsPage from "../features/courses/pages/CourseDetailsPage";
import ProtectedRoute from "../routes/ProtectedRoute";
import Wallet from "../features/wallet/Wallet";
import MyActivity from "../features/courses/pages/MyActivity";
import StudentProfilePage from "../features/profile/pages/studentProfilePage";
import Content from "../features/content/Content";
import CoursePurchasePage from "../features/coursePurchase/pages/CoursePurchasePage";

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
          
          <Route element={<ProtectedRoute />}>
              <Route path="/courses/:id/purchase" element={<CoursePurchasePage />} />
          </Route>

          {/* Any Authenticated User */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<TutorProfilePage />} />
            <Route path="/student-profile" element={<StudentProfilePage />} />
            <Route path="/my-activity/:id" element={<Content />} />
            <Route path="/wallet" element={<Wallet />} />
          </Route>

          {/* Tutor & Premium Tutor Only */}
          <Route element={<ProtectedRoute allowedRoles={["tutor", "premiumTutor"]} />}>
            <Route path="/create-course" element={<CreateCoursePage />} />
            <Route path="/my-courses" element={<MyCoursesPage />} />
            <Route path="/edit-course/:id" element={<EditCoursePage />} />
            <Route path="/course-overview/:id" element={<CourseOverviewPage />} />
          </Route>

          {/* Admin Only */}
          <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
            <Route path="/admin" element={<Dashboard />} />
          </Route>
        </Route>

        {/* Auth Routes */}
        <Route element={<PublicRoute />}>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
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
        </Route>
      </Routes>
    </>
  );
}

export default App;