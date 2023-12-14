import { Outlet } from "react-router-dom";

import Sidebar from "../ui/sidebar";
import { useCookie } from "../../hooks/useCookie";
import { useEffect, useState } from "react";

export const RequireAuth = () => {
  const { getItem } = useCookie();
  const [getToken, setToken] = useState("");

  useEffect(() => {
    const token = getItem("token");
    setToken(token);
  }, []);

  let auth = getToken;

  return !auth.token ? (
    <Sidebar>
      <Outlet />
    </Sidebar>
  ) : (
    console.log("Not Authenticated")
  );
};
