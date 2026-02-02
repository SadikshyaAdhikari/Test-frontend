import React from 'react'
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";

export function Login (){
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();

      const[loading,setLoading]=useState(false);
      const[error,setError]=useState("");

        const onSubmit=async(data)=>{
            setLoading(true);
            setError("");
            try{
                const res=await axios.post(
                    `${import.meta.env.VITE_API_BASE_URL}/api/auth/login`,
                    data,
                    {withCredentials:true}
                );
                console.log("Login success:",res.data);
                alert("Logged in successfully!");
            }catch(err){
                setError(err.response?.data?.error || "Login failed");
            }finally{
                setLoading(false);
            }   
    };
    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <h2>Login</h2> 
            <div>
            <input
                type="email"
                placeholder="Email"
                {...register("email",{required:"Email is required"})}
            />
            {errors.email && <p>{errors.email.message}</p>}
                </div> 
            <div>

            <input
                type="password"
                placeholder="Password"
                {...register("password",{required:"Password is required"})}
            />
            {errors.password && <p>{errors.password.message}</p>}
            </div>
            <div>

            <button type="submit" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
            </button>
            {error && <p>{error}</p>}
            </div>

            <div>
                <a href="/register">Don't have an account? Register</a>
            </div>
            <div>
                <a href="/forgot-password">Forgot Password?</a>
            </div>
        </form>
    );
}

