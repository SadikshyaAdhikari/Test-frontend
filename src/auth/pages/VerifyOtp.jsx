import react from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



export function VerifyOtp(){
    const nav = useNavigate();
    const [otp, setOtp] = react.useState('');
    const [email, setEmail] = react.useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try{
            const res = await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/api/auth/forgot-password/verify-otp`,
                { email, otp: otp.trim() },
                { withCredentials: true }
            );
            // const data = await res.json();
            console.log('OTP verification response:', res);
            alert('OTP verified successfully. You can now reset your password.');
            nav(`/reset-password/${res.data.resetToken}`);   
        } catch (err) {
            alert(data.message || 'OTP verification failed');
        }
    };
    return(
        <form onSubmit={handleSubmit}>
            <h2>Verify OTP</h2>
            <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            />
            <input  
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
            />
            <button type="submit">
                Verify OTP
            </button>
        </form>     
    )
}