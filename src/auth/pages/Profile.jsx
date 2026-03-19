//user profile page - shows user's details and their posts
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Navbar } from "./Navbar.jsx";
import Feed from '../../components/Feed.jsx';
import { Link } from "react-router-dom";
import CreatePost from "../../components/CreatePost.jsx";

export function Profile() {

    const { register, setValue } = useForm();
    const nav = useNavigate();
    const [user, setUser] = useState(null);
    useEffect(() => {
        const checkUser = async () => {
            try {
                const res = await axios.get(
                    `${import.meta.env.VITE_API_BASE_URL}/api/auth/current-user`,
                    { withCredentials: true }
                );
            } catch (err) {
                console.log("User not logged in");
                nav("/login");
            }
        };

        checkUser();
    }
        , []);

    useEffect(() => {
        async function load() {
            try {
                const res = await axios.get(
                    `${import.meta.env.VITE_API_BASE_URL}/api/auth/current-user`,
                    { withCredentials: true }
                );
                console.log("User details loaded:", res.data);
                const u = res.data.user;
                setUser(u);
                setValue("name", u.username);
                setValue("email", u.email);
            }
            catch (err) {
                console.error("failed to load user details", err);
            }
        }

        load();
    }, [setValue]);

    return (
        <div>
            <Navbar
                isLoggedIn={true}
                onLogout={async () => {
                    try {
                        await axios.post(
                            `${import.meta.env.VITE_API_BASE_URL}/api/auth/logout`,
                            {},
                            { withCredentials: true }
                        );
                        nav("/login");
                    } catch (err) {
                        console.error("Logout failed", err);
                        alert("Logout failed");
                    }
                }}
            />
            <div className="flex justify-end">
                <Link to="/dashboard" className="text-gray-500 px-3 py-2 rounded-md text-sm font-medium">Back</Link>
            </div>
            
            <div className="max-w-xl mx-auto mt-6">
                <h2 className="text-2xl font-bold mb-4">My Profile</h2>
                <div className="bg-white p-4 rounded shadow mb-6">
                    <p><strong>Username:</strong> {user?.username}</p>
                    <p><strong>Email:</strong> {user?.email}</p>
                </div>
                <h3 className="text-xl font-bold mb-2">My Posts</h3>
                <Feed currentUser={user} userId={user?.id} />

            </div>
        </div>
    );
}
