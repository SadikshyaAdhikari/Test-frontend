import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Notifications() {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchNotifications = async () => {
        try {
            const res = await axios.get(
                `${import.meta.env.VITE_API_BASE_URL}/api/notifications`,
                { withCredentials: true }
            );

            setNotifications(res.data.notifications || []);
        } catch (err) {
            console.error("Failed to fetch notifications", err);
            setNotifications([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNotifications();

        const interval = setInterval(fetchNotifications, 5000);

        return () => clearInterval(interval);
    }, []);

    const markAsRead = async (id) => {
        try {
            await axios.put(
                `${import.meta.env.VITE_API_BASE_URL}/api/notifications/${id}/read`,
                {}, 
                { withCredentials: true }
            );
            setNotifications((prev) =>
                prev.map((n) =>
                    n.id === id ? { ...n, is_read: true } : n
                )
            );
        } catch (err) {
            console.error("Failed to mark as read", err);
        }
    };

    if (loading) return <p>Loading notifications...</p>;

    return (
        <div style={{ maxWidth: "400px", margin: "0 auto" }}>
            <h3>Notifications</h3>
            {notifications.length === 0 && <p>No notifications</p>}
            <ul style={{ listStyle: "none", padding: 0 }}>
                {notifications.map((n) => (
                    <li
                        key={n.id}
                        style={{
                            background: n.is_read ? "#f0f0f0" : "#e0f7fa",
                            margin: "10px 0",
                            padding: "10px",
                            borderRadius: "5px",
                            cursor: "pointer",
                        }}
                        onClick={() => markAsRead(n.id)}
                    >
                        {n.message}
                        {!n.is_read && <span style={{ color: "red", marginLeft: "5px" }}>●</span>}
                        <div style={{ fontSize: "0.8em", color: "#555" }}>
                            {new Date(n.created_at).toLocaleString()}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}