import React, { useState } from "react";
import AuthTemp from "../../components/layouts/AuthTemp";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { useAuth } from "../../context/AuthContext";

export default function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const navigate = useNavigate();
  const { login } = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.email && formData.password !== "") {
      try {
        const res = await axiosInstance.post("/auth/register", {
          name: formData.username,
          email: formData.email,
          password: formData.password,
        });
        if (res.status === 200) {
          login(res.data.name, res.data.accessToken);
          navigate("/");
        }
      } catch (error) {
        alert("Invalid credentials");
        console.log(error)
      }
    }
  };

  return (
    <AuthTemp>
      <div className="flex flex-col gap-2">
        <p className="text-center text-sm text-zinc-600">
          Register to create the resources
        </p>
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col gap-2 text-[14px]"
        >
          <input
            type="text"
            name="username"
            onChange={handleChange}
            className="border rounded-full px-4 py-2 outline-none h-11"
            placeholder="Username"
          />
          <input
            type="email"
            name="email"
            onChange={handleChange}
            className="border rounded-full px-4 py-2 outline-none h-11"
            placeholder="Email"
          />
          <input
            type="password"
            name="password"
            onChange={handleChange}
            className="border rounded-full px-4 py-2 outline-none h-11"
            placeholder="Password"
          />

          <button className="border rounded-full h-11 px-4 py-2 bg-black text-white text-sm">
            Continue
          </button>
        </form>

        {/* Divider */}
        <div className="w-full h-1 border-t"></div>

        <Link
          to="/auth/login"
          className="text-center flex justify-center items-center border rounded-full h-11 px-4 py-2 bg-white text-black text-sm hover:bg-blue-100 transition"
        >
          <p>Already have an account?</p>
        </Link>
      </div>
    </AuthTemp>
  );
}
