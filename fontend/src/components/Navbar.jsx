import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Navbar({selectedScreen,onSelectScreen}) {  
  const navigate = useNavigate()
  const Logout = async () => {    
    localStorage.removeItem('access')
    navigate('/login')
  }
    const [profileDropdown,setProfileDropdown] = useState(false)
  return (
    <nav
      className="w-full fixed top-0 z-10 sm:bg-transparent"
      style={{ fontFamily: "dosislight", backdropFilter: "blur(5px)" }}
    >
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-20 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center lg:hidden">
            <button
              type="button"
              className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
              onClick={() => setProfileDropdown(!profileDropdown)}
            >
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <svg
                className="block h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
                
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
            <div
                    id="dropdown"
                    className={`${profileDropdown?'':'hidden'} z-10 absolute top-16 left-2 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
                  >
                    <ul
                      className="py-2 text-sm text-gray-700 dark:text-gray-200"
                      aria-labelledby="dropdownDefaultButton"
                    >
                      <li>
                      <button
                  className={`text-zinc-950 ${selectedScreen == 'Bill' ? 'underline decoration-violet-500	decoration-solid decoration-4' :null } rounded-md px-3 py-2 text-sm font-medium`}
                  onClick={() => {setProfileDropdown(!profileDropdown);onSelectScreen('calender')}}
                >
                  Bills
                </button>
                      </li>
                      <li>
                      <button
                  className={`text-zinc-950 ${selectedScreen == 'Search Bill' ? 'underline decoration-violet-500	decoration-solid decoration-4' :null } rounded-md px-3 py-2 text-sm font-medium`}
                  onClick={() => {setProfileDropdown(!profileDropdown);onSelectScreen('booking-list')}}
                >
                  Seach Bills
                </button>
                      </li>
                    </ul>
                  </div>
          </div>
          <div className="flex flex-1 items-center justify-center lg:items-stretch lg:justify-between">
            <div className="flex flex-shrink-0 items-center">
              <Link
                to="/"
                className="text-blue-700 flex justify-center items-center text-3xl"
              >
                <img
                  alt="Your Company"
                  fetchpriority="high"
                  width={300}
                  height={192}
                  decoding="async"
                  data-nimg={1}
                  className="h-auto w-24 mix-blend-darken mr-2"
                  style={{ color: "transparent" }}
                  src="/images/logos/ram.svg"
                />
              </Link>
            </div>
            <div className="hidden lg:ml-6 lg:flex items-center">
              <div className="flex space-x-4">
                <button
                  className={`text-zinc-950 ${selectedScreen == 'Bill' ? 'underline decoration-violet-500	decoration-solid decoration-4' :null } rounded-md px-3 py-2 text-sm font-medium`}
                  onClick={() => {onSelectScreen('calender')}}
                >
                  Bills
                </button>
                <button
                  className={`text-zinc-950 ${selectedScreen == 'Search Bill' ? 'underline decoration-violet-500	decoration-solid decoration-4' :null } rounded-md px-3 py-2 text-sm font-medium`}
                  onClick={() => {onSelectScreen('booking-list')}}
                >
                  Seach Bills
                </button>
                <button
                  className={`text-zinc-950 ${selectedScreen == 'user-list' ? 'underline decoration-violet-500	decoration-solid decoration-4' :null } rounded-md px-3 py-2 text-sm font-medium`}
                  onClick={() => onSelectScreen('user-list')}
                >
                  Users
                </button>
              </div>
            </div>
            <div className="hidden lg:ml-6 lg:flex items-center">
              <div className="flex space-x-4">
                {/* <div className="relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={20}
                    height={20}
                    fill="currentColor"
                    className="bi bi-bell"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4 4 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4 4 0 0 0-3.203-3.92zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5 5 0 0 1 13 6c0 .88.32 4.2 1.22 6" />
                  </svg>
                  <div className="absolute" style={{ top: -3, right: -3 }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={12}
                      height={12}
                      fill="currentColor"
                      className="bi bi-1-circle-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M9.283 4.002H7.971L6.072 5.385v1.271l1.834-1.318h.065V12h1.312z" />
                    </svg>
                  </div>
                </div> */}
                <div className=" flex items-center relative">
                <svg
                className="block h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
                onClick={() => setProfileDropdown(!profileDropdown)}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
                  <div
                    id="dropdown"
                    className={`${profileDropdown?'':'hidden'} z-10 absolute top-12 right-12 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
                  >
                    <ul
                      className="py-2 text-sm text-gray-700 dark:text-gray-200"
                      aria-labelledby="dropdownDefaultButton"
                    >
                      <li>
                        <button className="block px-4 py-2 w-full  text-left hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => {Logout()}}>Logout</button>
                      </li>
                      <li>
                        <Link className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" to='change-password'>Change Password</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:hidden hidden" id="mobile-menu">
        <div className="space-y-1 px-2 pb-3 pt-2">
          <a
            className="block text-zinc-950 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
            href="#clientssection"
          >
            Clients
          </a>
          <a
            className="block text-zinc-950 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
            href="#servicescontainer"
          >
            Services
          </a>
          <a
            className="block text-zinc-950 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
            href="#teamdetailscontainer"
          >
            Team
          </a>
          <a
            className="block text-zinc-950 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
            href="#projectssection"
          >
            Projects
          </a>
          <a
            className="block text-zinc-950 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
            href="#aboutussection"
          >
            About us
          </a>
          <a
            className="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium"
            aria-current="page"
            href="/contact-us"
          >
            Contact Us
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
