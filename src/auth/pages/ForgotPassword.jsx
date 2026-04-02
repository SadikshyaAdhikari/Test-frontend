import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import InputField from "@/components/InputField";
import { colors } from "@/utils/colors";

export function ForgotPassword() {
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
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/forgot-password`,
        { email: data.email },
        { withCredentials: true }
      );

      alert("OTP sent to your email.");
      window.location.href = "/verify-otp";
    } catch (err) {
      setError(err.response?.data?.error || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{ backgroundColor: colors.background }}
      className="text-white rounded-lg shadow-lg p-8 w-full max-w-md mx-auto mt-8"
    >
      <form onSubmit={handleSubmit(onSubmit)}>

        

        <h2 className="flex justify-start text-xl font-bold mb-4">Trouble Logging In?</h2>

        <p className="flex justify-start text-sm text-gray-200 mb-6">
          Enter your email and we’ll send you an OTP to reset your password.
        </p>

        <InputField
          id="email"
          type="email"
          label="Email"
          register={register}
          errors={errors}
          required="Email is required"
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full font-semibold py-2 px-4 rounded-3xl transition
            ${
              loading
                ? "bg-[#133b6e] text-gray-500 border border-gray-600 cursor-not-allowed"
                : "bg-[#1e4f8f] text-white hover:bg-[#0064e0] focus:ring-2 focus:ring-[#0064e0]"
            }`}
        >
          {loading ? "Sending..." : "Send OTP"}
        </button>

        {error && (
          <p className="text-red-500 text-sm mt-3">{error}</p>
        )}

        <div className="text-center mt-6">
          <Link
            to="/login"
            className="text-white hover:underline text-sm"
          >
            Back to Login
          </Link>
        </div>
      </form>
    </div>
  );
}