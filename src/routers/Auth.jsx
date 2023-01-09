import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "../page/auth/Login";
import Signup from "../page/auth/Signup";

export default function Auth() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
      console.log("hi");
    }
  }, []);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}
