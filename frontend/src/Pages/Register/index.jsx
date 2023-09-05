import React from "react";
import Background from "../../assets/Background.svg";
import logo from "../../assets/logo.svg";

export default function RegisterPages() {
  return (
    <>
      <div
        className="w-full h-screen bg-no-repeat"
        style={{
          backgroundImage: `url(${Background})`,
          backgroundSize: "100%",
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
                  <h1 className=" text-white text-center text-xl">SIGN IN</h1>
                </div>
                <form className="px-8 pt-6 pb-8 mb-4">
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="username"
                    >
                      Username
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="username"
                      type="text"
                      placeholder="Username"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                      Email
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="email"
                      type="email"
                      placeholder="email"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="phone_number"
                    >
                      Phone Number
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="phone_number"
                      type="number"
                      placeholder="phone_number"
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
                    />
                  </div>
                  <div className="mb-6">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="confirm_password"
                    >
                      Confirm Password
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                      id="confirm_password"
                      type="password"
                      placeholder="******************"
                    />
                  </div>
                  <button class="px-4 w-full py-2 border flex gap-2 border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:bg-gray-200 hover:shadow transition duration-150">
                    <img
                      class="w-6 h-6"
                      src="https://www.svgrepo.com/show/475656/google-color.svg"
                      loading="lazy"
                      alt="google logo"
                    />
                    <span>Login with Google</span>
                  </button>
                  <button
                    className="mt-3 w-full shadow-lg bg-[#F68C1F] hover:bg-orange-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
