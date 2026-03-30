import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link } from "react-router-dom";


export function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (data) => {
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/register`,
        data,
        { withCredentials: true }
      );

      console.log("Registration success:", res.data);
      alert("Registered successfully!");

      window.location.href = "/login";

    } catch (err) {
      setError(err.response?.data?.error || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#242526] text-white rounded-lg shadow-lg p-8 w-full max-w-md mx-auto mt-16">
      <form onSubmit={handleSubmit(onSubmit)}>

        <div className="flex justify-start">
          <Link to="/login" className="text-gray-500 py-2 rounded-md text-4xl font-extrabold">
            ←
          </Link>
        </div>

        <h2 className="flex justify-start text-xl font-bold text-white text-center">Get Started</h2>
        <p className="flex justify-start text-xl text-white mb-6 text-left">Sign up to see photos and videos from your friends.</p>

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
               focus:ring-1 focus:ring-gray-500
               focus:border-transparent"
            {...register("email")}
          />

          <label
            htmlFor="email"
            className="absolute left-4 top-3 text-gray-400 text-base
             transition-all
             
             peer-placeholder-shown:top-3
             peer-placeholder-shown:text-base
             
             peer-focus:top-1
             peer-focus:text-xs
             peer-focus:text-

             peer-[&:not(:placeholder-shown)]:top-1
             peer-[&:not(:placeholder-shown)]:text-xs
             peer-[&:not(:placeholder-shown)]:text-gray-500"
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
                focus:ring-1 focus:ring-gray-500
               focus:border-transparent"
            {...register("password")}
          />

          <label
            htmlFor="password"
            className="absolute left-4 top-3 text-gray-400 text-base
             transition-all
             
             peer-placeholder-shown:top-3
             peer-placeholder-shown:text-base
             
             peer-focus:top-1
             peer-focus:text-xs
             peer-focus:text-gray-500

             peer-[&:not(:placeholder-shown)]:top-1
             peer-[&:not(:placeholder-shown)]:text-xs
             peer-[&:not(:placeholder-shown)]:text-gray-500"
          >
            Password
          </label>



          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>


        <div className="relative mb-6">
          <input
            type="text"
            id="fullname"
            placeholder=""
            className="peer w-full px-4 py-3
               bg-[#242526] text-white 
               border border-gray-500
               rounded-2xl
               focus:outline-none 
                focus:ring-1 focus:ring-gray-500
               focus:border-transparent"
            {...register("username", { required: "Name is required" })}

          />
          <label
            htmlFor="fullname"
            className="absolute left-4 top-3 text-gray-400 text-base
             transition-all
             
             peer-placeholder-shown:top-3
             peer-placeholder-shown:text-base
             
             peer-focus:top-1
             peer-focus:text-xs
             peer-focus:text-gray-500

             peer-[&:not(:placeholder-shown)]:top-1
             peer-[&:not(:placeholder-shown)]:text-xs
             peer-[&:not(:placeholder-shown)]:text-gray-500"
          >
            Full Name
          </label>
          {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>}
        </div>

        <div className="relative mb-6">
          <input
            type="role"
            id="role"
            placeholder=""
            className="peer w-full px-4 py-3
               bg-[#242526] text-white 
               border border-gray-500
               rounded-2xl
               focus:outline-none 
                focus:ring-1 focus:ring-gray-500
               focus:border-transparent"
            {...register("role", { required: "Role is required" })}

          />
          <label
            htmlFor="role"
            className="absolute left-4 top-3 text-gray-400 text-base
             transition-all
             
             peer-placeholder-shown:top-3
             peer-placeholder-shown:text-base
             
             peer-focus:top-1
             peer-focus:text-xs
             peer-focus:text-gray-500

             peer-[&:not(:placeholder-shown)]:top-1
             peer-[&:not(:placeholder-shown)]:text-xs
             peer-[&:not(:placeholder-shown)]:text-gray-500"
          >
            Role
          </label>
          {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>}
        </div>

        <p className="flex justify-start text-base text-white mb-6 text-left">By tapping Submit, you agree to create an account.</p>

        <div className="mb-4">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0064e0] hover:bg-[#3385ff] disabled:bg-indigo-400 text-white font-semibold py-2 px-4 rounded-3xl transition duration-200"
          >
            {loading ? "Registering..." : "Submit"}
          </button>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>

        <div className="mb-4 w-full">
          <a
            href="/login"
            className="block w-full px-4 py-2
               bg-[#242526] 
               border border-gray-500
               rounded-3xl
               placeholder-gray-400
               focus:outline-none 
               focus:ring-2 focus:ring-indigo-500 
               focus:border-transparent
               text-center
                hover:bg-[#35353b]"
          >
            I already have an account
          </a>
        </div>

      </form>
    </div>

  );
}