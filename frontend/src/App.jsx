import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPages from "./Pages/Login";
import RegisterPages from "./Pages/Register";
import { Layout } from "./component/layout";
import AdminPages from "./Pages/Admin";
import UserPages from "./Pages/User";
import { RequireAuth } from "./component/requireAuth";
import { ROLES } from "./config/roles";



function App() {
   // const [token, setToken] = useState(null)
   // useEffect(() => {
   //    if (!token) {
   //       setToken(cookieCutter.get('token'))
   //    }
   // }, [token])

   // if (!token) {
   //    return (
   //       <Routes>
   //       </Routes>
   //    );

   // } else {

   // }
   return (
      <Routes>
         <Route path="/" element={<UserPages />} />
         <Route path="/login" element={<LoginPages />} />
         <Route path="/register" element={<RegisterPages />} />
         {/* <Route element={<RequireAuth allowedRoles={ROLES.admin} />}> */}
         <Route path="admin" element={<AdminPages />} />
         {/* </Route> */}
         {/* <Route element={<RequireAuth allowedRoles={ROLES.user} />}> */}
         {/* <Route path="user" element={<UserPages />} /> */}
      </Routes>
   );
}

export default App;
