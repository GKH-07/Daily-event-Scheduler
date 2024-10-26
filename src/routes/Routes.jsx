import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/Auth/Login";
import Signup from "../pages/Auth/Signup";
import Home from "../pages/Home";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/signup" element={<Signup />} />
      <Route path="/" element={<Home />} />
    </Routes>
  );
}
