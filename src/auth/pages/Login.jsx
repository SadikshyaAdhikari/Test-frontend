import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "../../lib/AuthContext.jsx";

export function Login() {
const { register, handleSubmit, watch, formState: { errors } } = useForm({ mode: "onChange" });  const [loading, setLoading] = useState(false);
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
    <div className="bg-[#242526] text-white rounded-lg shadow-lg p-8 w-full max-w-md mx-auto mt-16">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className="flex justify-start text-xl font-bold text-white mb-6 text-center">Login</h2>

        <div className="relative mb-4 w-full">
          <input
            type="email"
            id="email"
            placeholder=" "
            className="peer w-full px-4 py-3
               bg-[#242526] text-white 
               border border-gray-500
               rounded-2xl
               focus:outline-none 
               focus:ring-1 focus:ring-[#0064e0]
               focus:border-transparent"
            {...register("email", { required: "Email is required" })}
          />

          <label
            htmlFor="email"
            className="absolute left-4 top-3 text-gray-400 text-base
             transition-all
             
             peer-placeholder-shown:top-3
             peer-placeholder-shown:text-base
             
             peer-focus:top-1
             peer-focus:text-xs
             peer-focus:text-[#0064e0]

             peer-[&:not(:placeholder-shown)]:top-1
             peer-[&:not(:placeholder-shown)]:text-xs
             peer-[&:not(:placeholder-shown)]:text-[#0064e0]"
          >
            Email
          </label>

          {errors.email && (
            <p className="text-red-500 text-sm mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="relative mb-6">
          <input
            type="password"
            id="password"
            placeholder=" "
            className="peer w-full px-4 py-3
               bg-[#242526] text-white 
               border border-gray-500
               rounded-2xl
               focus:outline-none 
                focus:ring-1 focus:ring-[#0064e0]
               focus:border-transparent"
            {...register("password", { required: "Password is required" })}
          />

          <label
            htmlFor="password"
            className="absolute left-4 top-3 text-gray-400 text-base
             transition-all
             
             peer-placeholder-shown:top-3
             peer-placeholder-shown:text-base
             
             peer-focus:top-1
             peer-focus:text-xs
             peer-focus:text-[#0064e0]

             peer-[&:not(:placeholder-shown)]:top-1
             peer-[&:not(:placeholder-shown)]:text-xs
             peer-[&:not(:placeholder-shown)]:text-[#0064e0]"
          >
            Password
          </label>

          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>



        {/* <div className="mb-4">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#133b6e] hover:bg-[#0064e0] disabled:bg-indigo-400 text-white font-semibold py-2 px-4 rounded-3xl transition duration-200"
          >
            {loading ? "Logging in..." : "Log in"}
          </button>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div> */}

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
               bg-[#242526] text-[#0064e0]
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