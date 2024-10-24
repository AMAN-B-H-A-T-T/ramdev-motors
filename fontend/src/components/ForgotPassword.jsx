import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form"
import axios from "axios";
import { base_url } from "../statics/exports";

function ForgotPassword() {  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const handleForgotPassword = async (data) => {
    axios.post(`${base_url}/api/manage/forgot_email`,data,{ headers: {
      "ngrok-skip-browser-warning": true,
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    }}).then(res => {
      alert("Please check your email!!")
    }).catch(error => {
      console.log(error);
    })
  }
  return (
    <div
      className="h-screen w-full"
      style={{
        backgroundImage: 'url("/images/graphics/bg.webp")',
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div className="h-screen w-full bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 flex justify-center items-center ">
        <div className="max-w-lg w-full bg-white bg-opacity-50 px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:rounded-xl sm:px-10">
          <div className="w-full">
            <div className="flex items-center mb-5 justify-center">
              <img src="/images/logos/logo.svg"></img>
              <h1 className="ml-2 sm:text-4xl text-3xl font-extrabold text-red-500 uppercase">
                Meal Facility
              </h1>
            </div>
            <div className="text-center">
              <h1 className="text-3xl font-semibold text-gray-900">Forgot Password</h1>
              <p className="mt-2 text-slate-800">
                Enter your email address to receive a reset password link
              </p>
            </div>
            <div className="mt-5">
            <form onSubmit={handleSubmit(handleForgotPassword)}>
                <div className="relative mt-6bg-opacity-50">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email Address"
                    className="peer mt-1 w-full bg-transparent border-b-2 border-black px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                    autoComplete="NA"
                    {...register("email")}
                  />
                  <label
                    htmlFor="email"
                    className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800"
                  >
                    Email Address
                  </label>
                </div>
                <div className="my-6">
                  <button
                    type="submit"
                    className="w-full rounded-md bg-black px-3 py-4 text-white focus:bg-gray-600 focus:outline-none"
                  >
                    Submit
                  </button>
                </div>
                <p className="text-center text-sm text-gray-500">
                  Back to login?
                  <Link
                    to="/login"
                    className="ml-2 font-semibold text-gray-600 hover:underline focus:text-gray-800 focus:outline-none"
                  >
                    Click Here
                  </Link>
                  .
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
