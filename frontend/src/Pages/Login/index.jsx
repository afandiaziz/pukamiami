import React from "react";
import Background from "../../assets/Background.svg";
import logo from "../../assets/logo.svg";

export default function LoginPages() {
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
          <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-1 pt-36 place-items-center">
            <div className="mx-auto">
              <img className="w-3/4" src={logo} alt="" />
            </div>
            <div className="bg-white rounded-lg lg:w-1/2 md:w-1/2">
              <div className="bg-[#FCAC5A] py-4 rounded-lg">
                <h1 className=" text-white text-center text-2xl">SIGN IN</h1>
              </div>
              <div className="w-full max-w-xs">
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
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
                  <div className="mb-6">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="password"
                    >
                      Password
                    </label>
                    <input
                      className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                      id="password"
                      type="password"
                      placeholder="******************"
                    />
                    <p className="text-red-500 text-xs italic">Please choose a password.</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      type="button"
                    >
                      Sign In
                    </button>
                    <a
                      className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                      href="#"
                    >
                      Forgot Password?
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
