import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Navbar } from "./Navbar.jsx";
import Feed from '../../components/Feed.jsx';
import SearchPosts from "../../components/SearchPosts.jsx";


export function Dashboard() {

  const { register, setValue } = useForm();
  const nav = useNavigate();
  const [user, setUser] = useState(null);
  const [page, setPage] = useState(1);

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
  }, []);

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


      } catch (err) {
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

      <SearchPosts />
      <Feed currentUser={user} page={page} />

    </div>
  );
}
