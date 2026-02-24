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
        // <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Login</h2> 
                    <div className="mb-4">
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full px-4 py-2 border border-gray-900 bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            {...register("email",{required:"Email is required"})}
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                    </div> 
                    <div className="mb-6">
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full px-4 py-2 border border-gray-900 bg-white text-black  rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            {...register("password",{required:"Password is required"})}
                        />
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                    </div>
                    <div className="mb-4">
                        <button 
                            type="submit" 
                            disabled={loading}
                            className="w-full bg-indigo-500 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
                        >
                            {loading ? "Logging in..." : "Login"}
                        </button>
                        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                    </div>

                    <div className="mb-3 text-center">
                        <a href="/register" className="text-indigo-900 hover:text-indigo-700 underline text-sm">Don't have an account? Register</a>
                    </div>
                    <div className="text-center">
                        <a href="/forgot-password" className="text-indigo-900 hover:text-indigo-700 underline text-sm">Forgot Password?</a>
                    </div>
                </form>
            </div>
        // </div>
    );
}