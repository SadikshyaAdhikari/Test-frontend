import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "../../lib/AuthContext.jsx";
import { Link } from "react-router-dom";
import { colors } from "@/utils/colors.js";
import InputField from "@/components/InputField";



export function Login() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm({ mode: "onChange" }); const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const nav = useNavigate();
  const { login } = useAuth();

  const email = watch("email");
  const password = watch("password");

  const isDisabled = !email || !password || loading;

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

    <div
      style={{ backgroundColor: colors.background }}
      className="text-white rounded-lg shadow-lg p-8 w-full max-w-md mx-auto mt-8">
      <form onSubmit={handleSubmit(onSubmit)}>

        <div className="flex justify-start">
          <Link to="/" className="text-gray-200 text-4xl font-extrabold">
            ←
          </Link>
        </div>

        <h2 className="flex justify-start text-xl font-bold text-white mb-6 text-center">Login</h2>

        <InputField
          id="email"
          type="email"
          label="Email"
          register={register}
          errors={errors}
          required="Email is required"
        />

        <InputField
          id="password"
          type="password"
          label="Password"
          register={register}
          errors={errors}
          required="Password is required"
        />

        <div className="mb-4">
          <button
            type="submit"
            disabled={isDisabled}
            className={`w-full font-semibold py-2 px-4 rounded-3xl transition
      ${isDisabled
                ? "bg-[#133b6e] text-gray-500 border border-gray-600 cursor-not-allowed"
                : "bg-[#133b6e] text-white hover:bg-[#0064e0] focus:ring-2 focus:ring-[#0064e0]"
              }`}
          >
            {loading ? "Logging in..." : "Log in"}
          </button>

          {error && (
            <p className="text-red-500 text-sm mt-2">
              {error}
            </p>
          )}
        </div>


        <div className="text-center">
          <a
            href="/forgot-password"
            className="text-white text-base
               w-full
               px-4 py-2
               rounded-3xl
               hover:border
               hover:border-none
               hover:bg-[#35353b]
               transition
               inline-block"
          >
            Forgot Password?
          </a>
        </div>

        <br />
        <br />


        {/* <div className="mb-4 w-full flex justify-center"> <GoogleLogin onSuccess={handleGoogleLogin} onError={() => setError("Google login failed")} /> </div> */}


        <div className="mb-4 w-full">
          <div className="w-full rounded-lg overflow-hidden">
            <GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={() => setError("Google login failed")}
              width={380}
              shape="pill"
              size="large"
              logo_alignment="center"
            />
          </div>
        </div>

        <div className="mb-4 w-full">
          <a
            href="/register"
            className="block w-full px-4 py-2
               bg-[#2b2c30] text-[#0064e0]
               border border-[#0064e0]
               rounded-3xl
               placeholder-gray-400
               focus:outline-none 
               focus:ring-2 focus:ring-indigo-500 
               focus:border-transparent
               text-center
                hover:bg-[#35353b]"
          >
            Create new account
          </a>
        </div>

      </form>
    </div>
  );
}