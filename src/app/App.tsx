import { useEffect } from "react"
import { checkAuth } from "../features/auth/authSlice";
import { useAppDispatch } from "../shared/hooks/redux";
import { Route, Routes } from "react-router";
import AuthLayout from "../layouts/AuthLayout";
import Register from "../features/auth/pages/Register";
import Login from "../features/auth/pages/Login";
// import ProfileSetup from "../features/profile/profileSetup";
import Dashboard from "../features/dashboard/Dashboard";
import PublicRoute from "../routes/PublicRoute";
import Home from "../features/home/Home";

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(checkAuth(() => { }));
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route element={<PublicRoute />}>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Route>
      {/* <Route path="/profile" element={<ProfileSetup />} /> */}
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
