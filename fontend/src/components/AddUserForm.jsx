import React, { useEffect, useState } from "react";
import axios from "axios";
import { base_url } from "../statics/exports";
import { useForm } from "react-hook-form"
import Swal from "sweetalert2";

function AddUserForm({ AddUserSidebarForm, showAddUserForm, setEmployees, setNonEmployees }) {
  const [isEmployee, setIsEmployee] = useState(false);
  const [departments,setDepartments] = useState([])  
  const [accessToken,setAccessToken] = useState(null)
  useEffect(() => {
    setAccessToken(localStorage.getItem('access'))
  },[])
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const handleCreateUser = async (data) => {
    axios.post(`${base_url}/api/manage/create_user`, {
      Fname:data.Fname,
      Lname:data.Lname,
      email:data.email,
      ph_no:data.ph_no,
      department:data.department,
      is_employee:isEmployee,
      is_superAdmin:false
    },{
      'ngrok-skip-browser-warning':true,
      "Authorization" : `Bearer ${accessToken}`
    })
    .then(function (response) {      
      let timerInterval;
      Swal.fire({
        title: "Employee is added successfully!!",        
        timer: 1000,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
          const timer = Swal.getPopup().querySelector("b");
          timerInterval = setInterval(() => {
            timer.textContent = `${Swal.getTimerLeft()}`;
          }, 100);
        },
        willClose: () => {
          clearInterval(timerInterval);
        }
      }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
          console.log("I was closed by the timer");
        }
      });
        if(response.data.data.is_employee == false){
          setNonEmployees(prevArr => [...prevArr,response.data.data])
        }else{
          setEmployees(prevArr => [...prevArr,response.data.data])
        }
    })
    .catch(function (error) {      
      if(error.response.data.message){
        alert(error.response.data.message);  
      }else{
        alert(error.response.data.error);
      }
    });
  }

  useEffect(() => {
    if(isEmployee){      
      axios.get(`${base_url}/api/manage/get_department`, { headers: {'ngrok-skip-browser-warning':true,"Authorization" : `Bearer ${accessToken}`} })
        .then(function (response) {      
          setDepartments(response.data.data)
      })
      .catch(function (error) {
        alert(error.response.data.error);
      });
    }
  },[isEmployee])
  return (
    <section
      className={`${
        AddUserSidebarForm ? "translate-x-0" : "translate-x-full"
      } overflow-y-scroll  shadow-xl border ease-in-out fixed bg-white z-10 duration-500 right-0 group-hover:left-0 h-screen w-full sm:w-1/3`}
    >
      <div className="h-full relative mx-3">
      <button className="absolute top-5 right-5" onClick={() => {showAddUserForm(false)}}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            fill="currentColor"
            className="bi bi-x-lg"
            viewBox="0 0 16 16"
          >
            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
          </svg>
        </button>
        <div className="min-h-screen bg-gray-100 p-0 sm:p-12">
          <div className="mx-auto max-w-md px-6 py-12 bg-white border-0 shadow-lg sm:rounded-3xl">
            <h1 className="text-2xl font-bold mb-8">Add Employee Form</h1>
            <form id="form" onSubmit={handleSubmit(handleCreateUser)}>
              <div className="relative z-0 w-full mb-5">
                <input
                  type="text"
                  name="name"
                  placeholder="Enter First Name.."
                  required=""
                  {...register("Fname")}
                  className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
                />
                <span className="text-sm text-red-600 hidden" id="error">
                  First Name is required
                </span>
              </div>
              <div className="relative z-0 w-full mb-5">
                <input
                  type="text"
                  name="name"
                  placeholder="Enter Last Name.."
                  required=""
                  {...register("Lname")}
                  className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
                />
                <span className="text-sm text-red-600 hidden" id="error">
                  Last Name is required
                </span>
              </div>
              <div className="relative z-0 w-full mb-5">
                <input
                  type="email"
                  name="email"
                  placeholder="Enter Email.."
                  required=""
                  {...register("email")}
                  className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
                />
                <span className="text-sm text-red-600 hidden" id="error">
                  Name is required
                </span>
              </div>
              <div className="relative z-0 w-full mb-5">
                <input
                  type="numner"
                  name="phone"
                  placeholder="Enter Phone Number.."
                  required=""
                  {...register("ph_no")}
                  className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
                />
                <span className="text-sm text-red-600 hidden" id="error">
                  Phone Number is required
                </span>
              </div>
              <div className="flex items-center">
                <input
                  id="is-employee"
                  type="checkbox"
                  {...register("is_employee")}
                  value={isEmployee}
                  onChange={() => setIsEmployee(!isEmployee)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="default-checkbox"
                  className="ms-2 text-sm font-medium text-gray-900"
                >
                  Is Employee
                </label>
              </div>
              {isEmployee ? (<div className="w-full relative mb-4">
                <label
                  htmlFor="countries"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Select Department
                </label>
                <select
                  id="countries"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  defaultValue={""}
                  {...register("department")}
                >
                  <option >Choose a department</option>                  
                  {departments && departments.map((item,index) => (
                    <option value={item._id} key={index}>{item.department_name}</option>
                  ))}
                </select>
              </div>) : null}
              <button
                id="button"
                type="submit"
                className="w-full px-6 py-3 mt-3 text-lg text-white transition-all duration-150 ease-linear rounded-lg shadow outline-none bg-black hover:shadow-lg focus:outline-none"
              >
                Create User
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AddUserForm;
