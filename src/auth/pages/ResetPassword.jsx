import React, { useState } from "react";
import axios from 'axios';
import { useParams, useSearchParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

export function ResetPassword(){
    const [newPassword, setNewPassword] = useState('');
    const [searchParams] = useSearchParams();
    const params = useParams();
    const resetToken = params.resetToken;
    const nav = useNavigate();


    console.log('URL params:', Object.fromEntries(searchParams));
    console.log('Reset token:', resetToken);

    const handleSubmit = async (e) => {
        e.preventDefault();

      
        try{
            const res = await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/api/auth/reset-password/${resetToken}`,  
                { newPassword },
                { withCredentials: true }
            );
            alert('Password reset successfully. You can now log in with your new password.');
            nav('/login');  
        } catch (err) {
            alert(err.response?.data?.error || 'Password reset failed');
        }
    };
    return(
        <form onSubmit={handleSubmit}>
            <h2>Reset Password</h2>
            
            <input
               type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
            />
            <button type="submit">
                Reset Password 
                </button>
        </form>     
    )
}