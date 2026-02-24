import react from 'react';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import axios from 'axios';

export function ForgotPassword(){
   const [email, setEmail] = react.useState('');
   const [error, setError] = react.useState('');
   const [loading, setLoading] = react.useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/api/auth/forgot-password`,
                { email },
                { withCredentials: true }
            );
            alert('Password reset link sent to your email.');
            window.location.href = '/verify-otp';
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to send reset link');
        } finally {
            setLoading(false);
        }   
    };

    return( 
            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
                <form onSubmit={handleSubmit}>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Forgot Password</h2>
                    
                    <div className="mb-6">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-900 bg-white text-black  rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                    </div>
                    
                    <div className="mb-4">
                        <button 
                            type="submit" 
                            disabled={loading}
                            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
                        >
                            {loading ? 'Sending...' : 'Send OTP'}
                        </button>
                        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                    </div>

                    <div className="text-center">
                        <a href="/login" className="text-indigo-600 hover:text-indigo-900 underline text-sm">Back to Login</a>
                    </div>
                </form>
            </div>
    
    );
}