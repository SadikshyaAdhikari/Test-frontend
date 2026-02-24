import React, { useState } from "react";
import axios from 'axios';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';

export function ResetPassword(){
    const [newPassword, setNewPassword] = useState('');
    const [searchParams] = useSearchParams();
    const params = useParams();
    const resetToken = params.resetToken;
    const nav = useNavigate();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    console.log('URL params:', Object.fromEntries(searchParams));
    console.log('Reset token:', resetToken);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try{
            const res = await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/api/auth/reset-password/${resetToken}`,  
                { newPassword },
                { withCredentials: true }
            );
            alert('Password reset successfully. You can now log in with your new password.');
            nav('/login');  
        } catch (err) {
            setError(err.response?.data?.error || 'Password reset failed');
        } finally {
            setLoading(false);
        }
    };
    return(
        // <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
                <form onSubmit={handleSubmit}>
                    <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Reset Password</h2>
                    
                    <div className="mb-4">
                        <input
                           type="password"
                            placeholder="Enter new password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-900 bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                    </div>

                    {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

                    <div className="mb-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
                        >
                            {loading ? 'Resetting...' : 'Reset Password'}
                        </button>
                    </div>

                    <div className="text-center">
                        <a href="/login" className="text-indigo-700 hover:text-indigo-900 underline text-sm">Back to Login</a>
                    </div>
                </form>
            </div>
        // </div>     
    )
}
