import { useEffect } from "react"
import { checkAuth } from "../features/profile/userSlice";
import { useAppDispatch } from "../shared/hooks/redux";
import { Route,Routes } from "react-router";
import AuthLayout from "../layouts/AuthLayout";
import Register from "../features/auth/Register";
import Login from "../features/auth/Login";
import ProfileSetup from "../features/profile/profileSetup";
import Dashboard from "../features/dashboard/Dashboard";

function App() {
  const dispatch = useAppDispatch();
  useEffect(()=>{
    dispatch(checkAuth());
  },[dispatch])
  return (
    <Routes>
      <Route element={<AuthLayout/>}>
       <Route path="/login" element={<Login/>} />
       <Route path="/register" element={<Register/>} />
      </Route>
      <Route path="/profile" element={<ProfileSetup /> }/>
      <Route path="/dashboard" element={<Dashboard/> }/>
    </Routes>
  );
}

export default App;
