import "./App.css";
import { Route, Routes } from "react-router-dom";
import LoginPages from "./Pages/Login";
import RegisterPages from "./Pages/Register";
import AdminPages from "./Pages/Admin";
import UserPages from "./Pages/User";
import { RequireAuth } from "./component/requireAuth";
import Product from "./component/admin/product";
import Category from "./component/admin/category";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPages />} />
      <Route path="/register" element={<RegisterPages />} />
      <Route path="/user" element={<UserPages />} />
      <Route element={<RequireAuth />}>
        <Route path="/admin" element={<AdminPages />} />
        <Route path="/admin/product" element={<Product />} />
        <Route path="/admin/category" element={<Category />} />
      </Route>
    </Routes>
  );
}

export default App;
