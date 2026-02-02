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
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Register</h2>
<div>
      <input
        type="text"
        placeholder="Full Name"
        {...register("username", { required: "Name is required" })}
      />
      {errors.username && <p>{errors.username.message}</p>}
</div>
<div>

      <input
        type="email"
        placeholder="Email"
        {...register("email", { required: "Email is required" })}
      />
      {errors.email && <p>{errors.email.message}</p>}
</div>
<div>

      <input
        type="password"
        placeholder="Password"
        {...register("password", {
          required: "Password is required",
          minLength: { value: 6, message: "Min 6 characters" },
        })}
      />
      {errors.password && <p>{errors.password.message}</p>}

      {error && <p style={{ color: "red" }}>{error}</p>}
</div>
<div>

      <input type="text" placeholder="role" {...register("role", { required: "Role is required" })} />
      {errors.role && <p>{errors.role.message}</p>}
</div>
<div>

      <button type="submit" disabled={loading}>
        {loading ? "Registering..." : "Register"}
      </button>
</div>
    </form>
  );
}
