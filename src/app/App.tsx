import { useEffect } from "react"
import { checkAuth } from "../features/auth/authSlice";
import { useAppDispatch } from "../shared/hooks/redux";
import { Route, Routes } from "react-router";
import AuthLayout from "../layouts/AuthLayout";
import Register from "../features/auth/pages/Register";
import Login from "../features/auth/pages/Login";
import Dashboard from "../features/dashboard/Dashboard";
import PublicRoute from "../routes/PublicRoute";
import CreateCoursePage from "../features/courses/pages/CreateCoursePage";
import { Toaster } from "react-hot-toast";

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(checkAuth(() => { }));
  }, [dispatch]);

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route element={<PublicRoute />}>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Route>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-course" element={<CreateCoursePage />} />
      </Routes>
    </>
  );
}

export default App;
