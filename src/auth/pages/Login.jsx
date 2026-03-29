import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "../../lib/AuthContext.jsx";

export function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const nav = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/auth/current-user`,
          { withCredentials: true }
        );
        if (res.data) {
          nav("/dashboard");
        }
      } catch (err) {
        console.log("User not logged in");
      }
    };
    checkUser();
  }, []);

  const onSubmit = async (data) => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/login`,
        data,
        { withCredentials: true }
      );
      console.log("Login success:", res.data);
      login(res.data.user);
      nav("/dashboard");
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async (credentialResponse) => {
    if (!credentialResponse?.credential) return;

    setLoading(true);
    setError("");

    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/google`,
        { token: credentialResponse.credential },
        { withCredentials: true }
      );

      nav("/dashboard");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Google login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#242526] text-white rounded-lg shadow-lg p-8 w-full max-w-md mx-auto mt-16">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className="flex justify-start text-xl font-bold text-white mb-6 text-center">Login</h2>


        <div className="mb-4">
          <input
            type="email"
            placeholder="email"
            className="w-full px-4 py-2 
               bg-[#242526] text-white 
               border border-white 
               rounded-2xl
               placeholder-gray-400
               focus:outline-none 
               focus:ring-1 focus:ring-white
               focus:border-transparent"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="mb-6">
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 
               bg-[#242526] text-white 
               border border-white 
               rounded-2xl
               placeholder-gray-400
               focus:outline-none 
               focus:ring-1 focus:ring-white
               focus:border-transparent"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>


        <div className="mb-4">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0064e0] hover:bg-[#0064e0] disabled:bg-indigo-400 text-white font-semibold py-2 px-4 rounded-3xl transition duration-200"
          >
            {loading ? "Logging in..." : "Log in"}
          </button>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>

        <div className="text-center">
          <a href="/forgot-password" className="text-white hover:text-indigo-700 text-sm">
            Forgot Password?
          </a>
        </div>
        <br />
        <br />




        <div className="mb-4 w-full">
          <button
            onClick={handleGoogleLogin}
            className="w-full px-4 py-2
               bg-[#242526] text-white
               border border-white
               rounded-3xl 
               placeholder-gray-400
               focus:outline-none 
               focus:ring-2 focus:ring-indigo-500 
               focus:border-transparent
               text-center
               hover:bg-gray-900
               transition"
          >
            Continue with Google
          </button>
        </div>

        <div className="mb-4 w-full">
          <a
            href="/register"
            className="block w-full px-4 py-2 
               bg-[#1f1f22] text-[#0064e0]
               border border-[#0064e0]
               rounded-3xl
               placeholder-gray-400
               focus:outline-none 
               focus:ring-2 focus:ring-indigo-500 
               focus:border-transparent
               text-center"
          >
            Create new account
          </a>
        </div>

      </form>
    </div>
  );
}