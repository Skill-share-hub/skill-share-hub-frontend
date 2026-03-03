import { Routes, Route } from "react-router-dom";
import Login from "../features/auth/Login";
import Register from "../features/auth/Register";
import ProfileSetup from "../features/profile/profileSetup";
import Dashboard from "../features/dashboard/Dashboard";

function App() {
  return (
    <Routes>

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<ProfileSetup /> }/>
      <Route path="/dashboard" element={<Dashboard/> }/>
    </Routes>
  );
}

export default App;