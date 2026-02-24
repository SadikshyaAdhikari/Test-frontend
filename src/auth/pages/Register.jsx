import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

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
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Register</h2>
          
          <div className="mb-4">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full px-4 py-2 border border-gray-900 bg-white text-black  rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              {...register("username", { required: "Name is required" })}
            />
            {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>}
          </div>

          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 border border-gray-900 bg-white text-black  rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <div className="mb-4">
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 border border-gray-900 bg-white text-black  rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Min 6 characters" },
              })}
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          <div className="mb-6">
            <input
              type="text"
              placeholder="Role"
              className="w-full px-4 py-2 border border-gray-900 bg-white text-black  rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              {...register("role", { required: "Role is required" })}
            />
            {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>}
          </div>

          <div className="mb-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
            >
              {loading ? "Registering..." : "Register"}
            </button>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>

          <div className="text-center">
            <a href="/login" className="text-indigo-700 hover:text-indigo-900 underline text-sm">Already have an account? Login</a>
          </div>
        </form>
      </div>
    
  );
}