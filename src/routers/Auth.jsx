import { Route, Routes } from "react-router-dom";
import Login from "../page/auth/Login";
import Signup from "../page/auth/Signup";

export default function Auth() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}
