import { Outlet } from "react-router-dom";
import Sidebar from "../ui/sidebar";

export const Layout = () => {
  return (
    <Sidebar>
      <Outlet />
    </Sidebar>
  );
};
