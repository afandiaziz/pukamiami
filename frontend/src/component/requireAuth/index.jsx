import { Outlet } from "react-router-dom";

import Sidebar from "../ui/sidebar";

export const RequireAuth = () => {
  return (
    <Sidebar>
      <Outlet />
    </Sidebar>
  );
};
