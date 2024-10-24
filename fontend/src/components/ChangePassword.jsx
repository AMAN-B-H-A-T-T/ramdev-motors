import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form"
import { useParams } from "react-router-dom";
import axios from "axios";
import { base_url } from "../statics/exports";

function ChangePassword() {
  const [isPassword, setIsPassword] = useState(true);
  const [isConfirmPassword, setIsConfirmPassword] = useState(true);
  let { userId } = useParams();  

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const handleChangePassword = async (data) => {    
    if(data.new_password !== data.confirm_new_password){
      alert("The passwords do not match!!")
      return;
    }
    data.customerId = userId
    delete data.confirm_new_password
    axios.post(`${base_url}/api/manage/set_password`,data,{ headers: {
      "ngrok-skip-browser-warning": true,
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    }}).then(res => {
      alert("Password updated successfully")
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
              <h1 className="text-3xl font-semibold text-gray-900">Change Password</h1>              
            </div>
            <div className="mt-5">
              <form onSubmit={handleSubmit(handleChangePassword)}>
              <div className="relative mt-6">
                  <input
                    type={isPassword ? "password" : "text"}
                    name="password"
                    id="password"
                    placeholder="New Password"
                    {...register("new_password")}
                    className="peer mt-1 w-full bg-transparent border-b-2 border-black px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                  />

                  {isPassword ? (
                    <button
                      type="button"
                      className="absolute top-0 end-0 p-3.5 rounded-e-md"
                      onClick={() => {setIsPassword(!isPassword)}}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={16}
                        height={16}
                        fill="currentColor"
                        className="bi bi-eye-slash"
                        viewBox="0 0 16 16"
                      >
                        <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z" />
                        <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829" />
                        <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z" />
                      </svg>
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="absolute top-0 end-0 p-3.5 rounded-e-md"
                      onClick={() => {setIsPassword(!isPassword)}}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={16}
                        height={16}
                        fill="currentColor"
                        className="bi bi-eye"
                        viewBox="0 0 16 16"
                      >
                        <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                        <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                      </svg>
                    </button>
                  )}

                  <label
                    htmlFor="password"
                    className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800"
                  >
                    New Password
                  </label>
                </div>
                <div className="relative mt-6">
                  <input
                    type={isConfirmPassword ? "password" : "text"}
                    name="password"
                    id="password"
                    placeholder="Password"
                    {...register("confirm_new_password")}
                    className="peer mt-1 w-full bg-transparent border-b-2 border-black px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                  />

                  {isConfirmPassword ? (
                    <button
                      type="button"
                      className="absolute top-0 end-0 p-3.5 rounded-e-md"
                      onClick={() => {setIsConfirmPassword(!isConfirmPassword)}}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={16}
                        height={16}
                        fill="currentColor"
                        className="bi bi-eye-slash"
                        viewBox="0 0 16 16"
                      >
                        <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z" />
                        <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829" />
                        <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z" />
                      </svg>
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="absolute top-0 end-0 p-3.5 rounded-e-md"
                      onClick={() => {setIsConfirmPassword(!isConfirmPassword)}}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={16}
                        height={16}
                        fill="currentColor"
                        className="bi bi-eye"
                        viewBox="0 0 16 16"
                      >
                        <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                        <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                      </svg>
                    </button>
                  )}

                  <label
                    htmlFor="password"
                    className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800"
                  >
                    Confirm New Password
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

export default ChangePassword;
