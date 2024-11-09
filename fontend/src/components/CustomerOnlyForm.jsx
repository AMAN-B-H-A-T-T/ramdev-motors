import React from 'react'
import { useForm } from "react-hook-form";
import { base_url } from '../statics/exports';
import axiosInstance from '../config/axiosSetup';
const CustomerOnlyForm = ({sidebar_cust, setSidebar_cust,set_search_state,set_customer_details}) => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm();

      const addCustomer = (data)=>{
        const header = {
            Authorization: `Bearer ${localStorage.getItem('access')}`
          }

          axiosInstance.post(`${base_url}/api/manage/create_profile`,data,{headers:header,})
          .then((respose)=>{
            alert("Customer Added Successfully")
            const customer = {
                customer : respose.data.data
            }
            set_customer_details(customer)
            set_search_state(true)
            setSidebar_cust(false)

          })
          .catch((error)=>{
            alert(error.response.data)
          })

          
      }
  return (
    <section
      className={`${
        sidebar_cust ? "translate-x-0" : "translate-x-full"
      } overflow-y-scroll  shadow-xl border ease-in-out fixed bg-white z-10 duration-500 right-0 group-hover:left-0 h-screen w-full sm:w-1/3`}
    >
      <div className="h-full relative">
        <button
          className="absolute top-12 right-10"
          onClick={() => {
            setSidebar_cust(false);
          }}
        >
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
        <div className="mx-auto max-w-md px-6 py-12 bg-white border-0 shadow-lg sm:rounded-3xl">
          <h1 className="text-2xl font-bold mb-8">Add Customer</h1>
          <form onSubmit={handleSubmit(addCustomer)}>
          

            
           
            <div className="relative z-0 w-full my-5">
              <input
                type="text"
                name="count"
                placeholder="Customer Name"
                {...register("customer_name")}
                className="pt-3 pb-2 pl-5 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
                required={true}
              />
            </div>
            <div className="relative z-0 w-full my-5">
              <input
                type="tel"
                name="count"
                placeholder="Mobile No."
                {...register("customer_mobile")}
                className="pt-3 pb-2 pl-5 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
                required={true}
              />
            </div>
            <button
              id="button"
              type="submit"
              className="w-full my-3 px-6 py-3 text-lg text-white transition-all duration-150 ease-linear rounded-lg shadow outline-none bg-black focus:outline-none"
            >
              Add Customer
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default CustomerOnlyForm