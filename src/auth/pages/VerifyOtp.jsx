import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import InputField from "@/components/InputField";
import { colors } from "@/utils/colors";

export function VerifyOtp() {
  const nav = useNavigate();

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
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/forgot-password/verify-otp`,
        {
          email: data.email,
          otp: data.otp.trim(),
        },
        { withCredentials: true }
      );

      alert("OTP verified successfully.");
      nav(`/reset-password/${res.data.resetToken}`);
    } catch (err) {
      setError(
        err.response?.data?.error ||
          err.message ||
          "OTP verification failed"
      );
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

        <h2 className="text-xl font-bold mb-6">Verify OTP</h2>

        <InputField
          id="email"
          type="email"
          label="Email"
          register={register}
          errors={errors}
          required="Email is required"
        />

        <InputField
          id="otp"
          type="text"
          label="Enter OTP"
          register={register}
          errors={errors}
          required="OTP is required"
        />

        {error && (
          <p className="text-red-500 text-sm mb-3 text-center">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`w-full font-semibold py-2 px-4 rounded-3xl transition
            ${
              loading
                ? "bg-[#133b6e] text-gray-500 border border-gray-600 cursor-not-allowed"
                : "bg-[#133b6e] text-white hover:bg-[#0064e0] focus:ring-2 focus:ring-[#0064e0]"
            }`}
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>

        <div className="text-center mt-6">
          <Link
            to="/forgot-password"
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
            Back
          </Link>
        </div>
      </form>
    </div>
  );
}