import React, { useEffect, useState } from "react";
import Background from "../../assets/Background.svg";
import logo from "../../assets/logo.svg";
import { useNavigate } from "react-router-dom";
import { register } from "../../api/auth";
import cookieCutter from 'cookie-cutter';

export default function RegisterPages() {
  const navigate = useNavigate();
  useEffect(() => {
     if (cookieCutter.get('token')) {
        return navigate("/")
     }
  }, [])

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
    phone: "",
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

    if (formData.password !== formData.confirm) {
      console.log("tidak sesuai");
    }

    try {
      const response = await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        confirm: formData.confirm,
        phone: formData.phone,
      });
      setTimeout(() => {
        navigate("/login");
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
          <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-1 pt-4 place-items-center">
            <div className="mx-auto hidden lg:block">
              <img className="w-3/4" src={logo} alt="" />
            </div>
            <div className="mx-auto lg:w-1/2">
              <div className="bg-white rounded-lg">
                <div className="bg-[#FCAC5A] py-4 rounded-lg">
                  <h1 className=" text-white text-center text-xl">SIGN UP</h1>
                </div>
                <form className="px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                      Name
                    </label>
                    <input
                      onChange={handleChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="name"
                      type="text"
                      placeholder="name"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                      Email
                    </label>
                    <input
                      onChange={handleChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="email"
                      type="email"
                      placeholder="email"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                      Phone Number
                    </label>
                    <input
                      onChange={handleChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="phone"
                      type="number"
                      placeholder="phone"
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
                      onChange={handleChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                      id="password"
                      type="password"
                      placeholder="******************"
                    />
                  </div>
                  <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirm">
                      Confirm Password
                    </label>
                    <input
                      onChange={handleChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                      id="confirm"
                      type="password"
                      placeholder="******************"
                    />
                  </div>
                  <button
                    className="mt-3 w-full shadow-lg bg-[#F68C1F] hover:bg-orange-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    Sign Up
                  </button>
                  <a
                    className="flex justify-center blue text-blue-600 hover:text-blue-400"
                    href="/login"
                  >
                    Sudah Memiliki Akun?
                  </a>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
