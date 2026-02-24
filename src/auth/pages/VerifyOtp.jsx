import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export function VerifyOtp(){
    const nav = useNavigate();
    const [otp, setOtp] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
    
        try{
            const res = await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/api/auth/forgot-password/verify-otp`,
                { email, otp: otp.trim() },
                { withCredentials: true }
            );
            console.log('OTP verification response:', res);
            alert('OTP verified successfully. You can now reset your password.');
            nav(`/reset-password/${res.data.resetToken}`);   
        } catch (err) {
            setError(err.response?.data?.error || err.message || 'OTP verification failed');
        } finally {
            setLoading(false);
        }
    };
    return(
        // <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
                <form onSubmit={handleSubmit}>
                    <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Verify OTP</h2>

                    <div className="mb-4">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-900 bg-white text-black  rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                    </div>

                    <div className="mb-6">
                        <input  
                            type="text"
                            placeholder="Enter OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-900 bg-white text-black  rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                    </div>

                    {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

                    <div className="mb-4">
                        <button 
                            type="submit"
                            disabled={loading}
                            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
                        >
                            {loading ? 'Verifying...' : 'Verify OTP'}
                        </button>
                    </div>

                    <div className="text-center">
                        <a href="/forgot-password" className="text-indigo-600 hover:text-indigo-700 underline text-sm">Back</a>
                    </div>
                </form> 
            </div>
        
    )
}
