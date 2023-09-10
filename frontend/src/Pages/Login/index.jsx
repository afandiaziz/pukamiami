import React, { useEffect, useRef, useState } from "react";
import Background from "../../assets/Background.svg";
import logo from "../../assets/logo.svg";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { login } from "../../api/auth";
import { ROLES } from "../../config/roles";

export default function LoginPages() {
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.id;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await login({
        email: formData.email,
        password: formData.password,
      });
      const { email, name, token, role } = response.data.data;
      const user = { email, name, token, role };

      setAuth(user);

      setTimeout(() => {
        if (role == ROLES.user) return navigate("/user");

        if (role == ROLES.admin) return navigate("/admin");
      }, 3000);
    } catch (err) {
      console.log(err.response);
    }
  };

  return (
    <>
      <div
        className="w-full h-screen bg-no-repeat"
        style={{
          backgroundImage: `url(${Background})`,
          backgroundSize: "cover",
        }}
      >
        <div className="container mx-auto ">
          <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-1 pt-40 place-items-center">
            <div className="mx-auto hidden lg:block">
              <img className="w-3/4" src={logo} alt="" />
            </div>
            <div className="mx-auto lg:w-1/2">
              <div className="bg-white rounded-lg">
                <div className="bg-[#FCAC5A] py-4 rounded-lg">
                  <h1 className=" text-white text-center text-xl">SIGN IN</h1>
                </div>

                <form className="px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                      Email
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="email"
                      type="email"
                      placeholder="email@gmail.com"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-6">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="password"
                    >
                      Password
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                      id="password"
                      type="password"
                      placeholder="******************"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <button className="px-4 w-full py-2 border flex gap-2 border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:bg-gray-200 hover:shadow transition duration-150">
                    <img
                      className="w-6 h-6"
                      src="https://www.svgrepo.com/show/475656/google-color.svg"
                      loading="lazy"
                      alt="google logo"
                    />
                    <span>Login with Google</span>
                  </button>
                  <button
                    className="mt-3 w-full shadow-lg bg-[#F68C1F] hover:bg-orange-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    Sign In
                  </button>
                  <a
                    className="flex justify-center blue text-blue-600 hover:text-blue-400"
                    href="#"
                  >
                    Forgot Password?
                  </a>
                </form>
              </div>
              <div className="text-center">
                <p>Don’t have an account yet?</p>
                <div className="text-blue-600 cursor-pointer" onClick={() => navigate(`/register`)}>
                  Create an Account
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
