// import React, { useEffect } from 'react';
// import { useForm } from 'react-hook-form';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';


// export function Dashboard() {
//   const params  = useParams();
//   const { register, setValue } = useForm();

//   let id = params.id;
//   console.log('Params:', params);

//   useEffect(() => {
//     console.log('Dashboard loaded with id:', id);
    
//     if (!id) return;
//     async function load() {
//       try {
//         const res = await axios.get(
//           `${import.meta.env.VITE_API_BASE_URL}/api/auth/me`,
//           { withCredentials: true }
//         );
//         console.log('User details loaded:', res.data);
//         const u = res.data;
//         setValue('name', u.user.username);
//         setValue('email', u.user.email);
        
//       } catch (err) {
//         console.error('failed to load user details', err);
//       }
//     }
//     load();
//   }, [id, setValue]);

//   return (
//     <div>
//       <h2>My details</h2>
//       <form>
//         <div>
//           <label>Name:</label>
//           <input type="text" {...register('name')} readOnly />
//         </div>
//         <br></br>
//         <div>
//           <label>Email:</label>
//           <input type="text" {...register('email')} readOnly />
//         </div>
    
//       </form>
//     </div>
//   );
// }

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Dashboard() {

  const { register, setValue } = useForm();
  const nav = useNavigate();
     useEffect(()=>{
        const checkUser = async ()=>{
            try{
                const res = await axios.get(
                    `${import.meta.env.VITE_API_BASE_URL}/api/auth/current-user`,
                    { withCredentials:true }
                );
                
            }catch(err){
                console.log("User not logged in");
                nav("/login");
            }
        };

        checkUser();
    },[]);

  useEffect(() => {

    async function load() {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/auth/current-user`,
          { withCredentials: true }
        );

        console.log("User details loaded:", res.data);

        const u = res.data.user;

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
      <h2>My details</h2>

      <form>
        <div>
          <label>Name:</label>
          <input type="text" {...register("name")} readOnly />
        </div>

        <br />

        <div>
          <label>Email:</label>
          <input type="text" {...register("email")} readOnly />
        </div>
      </form>
    </div>
  );
}