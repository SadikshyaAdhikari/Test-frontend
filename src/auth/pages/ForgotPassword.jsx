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
        <form onSubmit={handleSubmit}>
            <h2>Forgot Password</h2>
            <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <button type="submit" disabled={loading}>
                {loading ? 'Sending...' : 'Send OTP'}
            </button>
            {error && <p>{error}</p>}
        </form>
    );

}