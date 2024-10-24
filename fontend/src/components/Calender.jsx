import React, { Profiler, useEffect, useRef, useState } from "react";
import Calendar from "react-calendar";
import axios from "axios";
import { base_url } from "../statics/exports";
import "react-calendar/dist/Calendar.css";
import axiosInstance from "../config/axiosSetup";
import CustomerForm from "./CustomerForm";
import CustomerOnlyForm from "./CustomerOnlyForm";
import Bills from "./Bills";

function Calender() {
  const [, setSelectedDate] = useState(new Date());
  const [countings, setCountings] = useState({});
  const [updateCounts, setUpdateCounts] = useState(0);
  const [predefined_services, set_predefined_services] = useState(null)
  const [predefined_service_status, set_pre_defined_service_status] = useState({})
  const [selectedServices, setSelectedServices] = useState([]);
  const [customer_details, set_customer_details] = useState(null)
  const [customer_mobile, set_customer_mobile] = useState("")
  const [vehicle_lst, set_vehicle_lst] = useState([])
  const [search_state, set_search_state] = useState(false)
  const [search_type, set_search_type] = useState(true)
  const [vehicle_num, set_vehicle_num] = useState("")
  const [sidebar, setSidebar] = useState(false)
  const [sidebar_cust, setSidebar_cust] = useState(false)
  const [km,set_km] = useState("")
  const [sidebar_bill,setSidebar_bill] = useState(false)
  const [bill,set_bill] = useState(null)

  const formRef = useRef(null)
  useEffect(() => {
    get_all_predefinoed_services()
  }, [])


  const get_customer_details = () => {
    const header = {
      Authorization: `Bearer ${localStorage.getItem('access')}`
    }

    axiosInstance.get(`${base_url}/api/manage/get_vehicles_by_customer`, { headers: header, params: { customer_mobile: customer_mobile } })
      .then((response) => {
        const customer = {
          customer: response.data.data[0].customer
        }
        set_customer_details(customer)
        set_vehicle_lst(response.data.data)
        set_search_state(true)
      })
      .catch((error) => {
        alert(error.response.data.message)
        if (error.response.data.message == "no Customer found") {
          setSidebar_cust(true)
        }
      })
  }

  const get_customer_details_by_vehicle_no = () => {
    try {
      const header = {
        Authorization: `Bearer ${localStorage.getItem('access')}`
      }
      axiosInstance.get(`${base_url}/api/manage/get_vehicl_by_no`, { headers: header, params: { vehicle_no: vehicle_num } })
        .then((response) => {
          set_customer_details(response.data.data)
          set_search_state(true)
        })
        .catch((error) => {
          alert(error.response.data.message)
        })
    }
    catch (error) {
      alert(error.message)
    }
  }

  const get_all_predefinoed_services = () => {

    const header = {
      Authorization: `Bearer ${localStorage.getItem('access')}`
    }

    try {
      axiosInstance.get(`${base_url}/api/manage/get_all_services`, { headers: header })
        .then((response) => {
          set_predefined_services(response.data.data)
          let service_status = {}
          response.data.data.map((service, index) => {
            service_status[service.slug] = false
          })
          console.log(service_status)
          set_pre_defined_service_status(service_status)
        })
        .catch((error) => {
          alert(error.response.data.message)
        })
    }
    catch (error) {
      throw new Error(error.message)
    }
  }



  const [services, setServices] = useState([
    { id: 1, service_name: '', price: '', quantity: '' }
  ]);

  const handleAddService = () => {
    setServices([...services, { id: services.length + 1, service_name: '', price: '', quantity: '' }]);
  };

  const handleInputChange = (id, event) => {
    const updatedServices = services.map(service =>
      service.id === id ? { ...service, [event.target.name]: event.target.value } : service
    );
    setServices(updatedServices);
  };

  const handleServiceToggle = (service) => {
    set_pre_defined_service_status((prevState) => ({
      ...prevState,
      [service.slug]: !prevState[service.slug],  // Toggle the visibility of quantity/price inputs
    }));

    if (!predefined_service_status[service.slug]) {
      // If the service is being selected, add it to selectedServices with default qty and price
      setSelectedServices((prevServices) => [
        ...prevServices,
        { slug: service.slug, service_name: service.service_name, qty: 1, price: 0 }
      ]);
    } else {
      // If the service is being unselected, remove it from selectedServices
      setSelectedServices((prevServices) =>
        prevServices.filter((item) => item.slug !== service.slug)
      );
    }
  };

  const handleQtyChange = (slug, qty) => {
    setSelectedServices((prevServices) =>
      prevServices.map((item) =>
        item.slug === slug ? { ...item, qty: qty } : item
      )
    );
  };

  const handlePriceChange = (slug, price) => {
    setSelectedServices((prevServices) =>
      prevServices.map((item) =>
        item.slug === slug ? { ...item, price: price } : item
      )
    );
  };


  const handleAddVehicle = () => {
    try {
      const vehicle_no = prompt("Enter Vehicle No.")
      if (!vehicle_no) {
        return
      }
      const header = {
        Authorization: `Bearer ${localStorage.getItem('access')}`
      }
      const body = {
        vehicle_no: vehicle_no,
        profile_id: customer_details.customer.slug
      }
      axiosInstance.post(`${base_url}/api/manage/add_vehicle`, body, { headers: header })
        .then((response) => {
          set_vehicle_lst((preList) => [...preList, response.data.data])
        })
        .catch((error) => {
          alert(error.response.data.message)
        })
    }
    catch (error) {
      alert(error.message)
    }

  }

  const handelGenerateBill = () => {
    try {
      console.log(customer_details)
      console.log(selectedServices)
      console.log(services)


      // foramt the selected services array 

      const formated_selected_service = selectedServices.length > 0 ? selectedServices.map((service, index) => {
        return ({
          service_name: service.service_name,
          quentity: service.qty,
          price: service.price
        })
      }) : []

      const formated_entered_service = services.length > 0 && services[0].service_name != "" ? services.map((service, index) => {
        return ({
          service_name: service.service_name,
          quentity: service.quantity,
          price: service.price
        })
      }) : []

      if (formated_selected_service.length == 0 && formated_entered_service.length == 0) {
        alert("please select atlease one service to generate bill")
        return
      }
      
      const final_service = [...formated_entered_service, ...formated_selected_service]

      const body = {
        profile_id: customer_details.customer.slug,
        vehicle_id: customer_details.vehicle,
        date: new Date().toLocaleDateString(),
        service_list: final_service,
        kilometer: km
      }
      const header = {
        Authorization: `Bearer ${localStorage.getItem('access')}`
      }
      axiosInstance.post(`${base_url}/api/manage/save_bill`,body,{headers:header})
      .then((response)=>{
        set_bill(response.data.data)
        setSidebar_bill(true)
        clearform()
      })
      .catch((error)=>{
        alert(error.response.data.message)
      })  
    }

    
    catch (error) {
      alert(error.message)
    }
  }

  const clearform = () =>{
    set_customer_details(null)
    set_customer_mobile("")
    set_pre_defined_service_status({})
    set_search_state(false)
    set_km("")
    setServices([
      { id: 1, service_name: '', price: '', quantity: '' }
    ]);
    setSelectedServices([])
    formRef.current.reset();
  }
  return (
    <section className="h-screen w-full flex flex-col sm:flex-row">
      <div className="w-full mt-24 px-3">
        <form ref={formRef}>
        <div className="w-full flex flex-col bg-white rounded-md shadow-xl border">
          {/* Header of the card  */}
          <div className="w-full flex border-b px-3 py-2 bg-slate-50 mb-3 items-center justify-between">
            <div className="text-lg">Create Bill</div>
            <div className="">
              <button
                type="submit"
                className="text-white w-full bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
                onClick={() => { setSidebar(true) }}
              >
                Add Customer
              </button>
            </div>
          </div>
          {/* body of the card */}

          <div className="w-full  px-3 py-3 flex flex-col">
            {/* get the customer and vehicle details  */}
            <div className="w-full border">
              <div className="w-full  px-3 py-2 bg-slate-50 border-b">
                Customer Details
              </div>

              {/* // search type for the getting the customer details */}
              <div className="block pt-3 pb-2 space-x-4 px-3">
                <label>
                  <input
                    type="radio"
                    name="search-category"
                    value={"Mobile No"}
                    onChange={null}
                    checked={search_type}
                    onClick={() => {
                      set_search_type(true)
                    }}

                    className="mr-2 text-black border-2 border-gray-300 focus:border-gray-300 focus:ring-black"

                  />
                  Mobile No
                </label>
                <label>
                  <input
                    type="radio"
                    name="search-category"
                    value={"Vehicle No"}
                    // checked={set_search_type ? false : true }
                    onChange={null}
                    onClick={() => {
                      set_search_type(false)
                    }}

                    className="mr-2 text-black border-2 border-gray-300 focus:border-gray-300 focus:ring-black"
                  />
                  Vehicle No
                </label>
              </div>

              {/* //basd on the seach type display the details (customer mobile search) */}
              <div className={`w-full  flex-col px-2 ${search_type ? "flex" : "hidden"}`}>
                <div className="relative  w-full sm:w-3/4">
                  <input
                    type="tel"
                    name="customer_mobile"
                    id="customer_mobile"
                    placeholder="Enter Mobile Numner"
                    className="peer mt-1 w-full bg-transparent border-b-2 border-black px-0 py-1 placeholder:text-transparent focus:outline-none"
                    autoComplete="NA"
                    onChange={(e) => { set_customer_mobile(e.target.value) }}
                  />
                  <label
                    htmlFor="email"
                    className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800"
                  >
                    Mobile Number
                  </label>
                </div>
                <div className="w-full justify-center mt-3 mb-3 flex">
                  <button
                    type="button"
                    className="text-white bg-blue-700 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
                    onClick={() => { get_customer_details() }}
                  >
                    Get Customer
                  </button>
                </div>

                <div className={`mt-2 ${search_state ? "flex" : "hidden"}`}>Customer:-{customer_details && customer_details.customer.customer_name} </div>
                <div className={`flex flex-col mt-2 ${search_state ? "flex" : "hidden"}`}>
                  <label>Select Vehicle No</label>
                  <div className="w-full flex items-center gap-x-2 mt-1">
                    {/* for listing the vehicles */}
                    <div className={`relative bg-opacity-50 w-full sm:w-3/4 mb-3`}>
                      <select id="countries" class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        onChange={(e) => {
                          set_customer_details((prevState) => ({
                            ...prevState,
                            vehicle: e.target.value,
                          }))
                        }}
                      >
                        <option selected value={""}>Choose a Vehicle No</option>
                        {
                          vehicle_lst &&
                          vehicle_lst.map((vehicle, index) => {
                            return (
                              <option key={index} value={vehicle.slug}>{vehicle.vehicle_no}</option>
                            )
                          })
                        }
                      </select>
                    </div>
                    {/* for add new vehicle */}
                    <div className="flex justify-center">
                      <button
                      type="button"
                        onClick={handleAddVehicle}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-2 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition ease-in-out duration-300"
                      >
                        +
                      </button>
                    </div>
                  </div>

                </div>
                <div className="relative mt-2 w-full sm:w-3/4">
                  <input
                    type="number"
                    name="customer_mobile"
                    id="customer_mobile"
                    placeholder="Enter kilometer"
                    className="peer mt-1 w-full bg-transparent border-b-2 border-black px-0 py-1 placeholder:text-transparent focus:outline-none"
                    autoComplete="NA"
                    onChange={(e) => { set_km(e.target.value) }}
                  />
                  <label
                    htmlFor="email"
                    className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800"
                  >
                    kilometer
                  </label>
                </div>
              </div>

              {/* //basd on the seach type display the details (customer vehicle search) */}
              <div className={`w-full flex-col px-2 ${search_type ? "hidden" : "flex"}`}>
                <div className="relative  w-full sm:w-3/4">
                  <input
                    type="text"
                    name="customer_mobile"
                    id="customer_mobile"
                    placeholder="Enter Mobile Numner"
                    className="peer mt-1 w-full bg-transparent border-b-2 border-black px-0 py-1 placeholder:text-transparent focus:outline-none"
                    autoComplete="NA"
                    onChange={(e) => { set_vehicle_num(e.target.value) }}
                  />
                  <label
                    htmlFor="email"
                    className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800"
                  >
                    Vehicle Number
                  </label>
                </div>
                <div className="w-full justify-center mt-3 flex">
                  <button
                    className="text-white bg-blue-700 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
                    onClick={() => { get_customer_details_by_vehicle_no() }}
                  >
                    Get Customer
                  </button>
                </div>

                <div className={`mt-2 ${search_state ? "flex" : "hidden"}`}>Customer:- {customer_details && customer_details.customer.customer_name} </div>
                {/* <div className="flex flex-col mt-2">
                  <label>Select Vehicle No</label>
                  <div className="w-full flex items-center gap-x-2 mt-1">
                     for listing the vehicles 
                    <div className={`relative bg-opacity-50 w-full sm:w-3/4`}>
                      <select id="countries" class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                        <option selected value={""}>Choose a Vehicle No</option>
                        {
                          vehicle_lst &&
                          vehicle_lst.map((vehicle, index) => {
                            return (
                              <option value={vehicle.slug}>{vehicle.vehicle_no}</option>
                            )
                          })
                        }
                      </select>
                    </div>
                     for add new vehicle 
                    <div className="flex justify-center">
                    <button
                      onClick={handleAddService}
                      className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-2 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition ease-in-out duration-300"
                    >
                      +
                    </button>
                  </div>
                  </div>

                </div> */}
              </div>
            </div>

            <div className="w-full flex flex-col sm:flex-row items-center  gap-x-3 justify-between">
              {/* <div className="sm:w-1/2 max-w-md flex flex-col p-2">
                <div className="mt-1  text-md flex flex-col">
                  <div className="w-full flex flex-col sm:flex-row items-center gap-x-6">
                    <div className="relative  w-full sm:w-3/4">
                      <input
                        type="tel"
                        name="customer_mobile"
                        id="customer_mobile"
                        placeholder="Enter Mobile Numner"
                        className="peer mt-1 w-full bg-transparent border-b-2 border-black px-0 py-1 placeholder:text-transparent focus:outline-none"
                        autoComplete="NA"
                        required={true}
                        onChange={(e) => { set_customer_mobile(e.target.value) }}
                      />
                      <label
                        htmlFor="email"
                        className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800"
                      >
                        Mobile Number
                      </label>
                    </div>
                    <div className="w-32 mt-3 flex">
                      <button
                        className="text-white bg-blue-700 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
                        onClick={() => { get_customer_details() }}
                      >
                        Get Customer
                      </button>
                    </div>
                  </div>

                </div>
                <div className="mt-4 text-gray-500 font-bold text-sm">
                  Customer Name - {customer_details.customer_name}
                </div>
              </div>
              <div className="">
                <div className="text-lg">OR</div>
              </div>
              <div className="w-full sm:w-1/2 max-w-md flex flex-col p-2 mr-3">
                <div className="mt-1 text-md flex flex-col">
                  <div className="w-full flex flex-col sm:flex-row items-center gap-x-6 ">
                    <div className={`relative bg-opacity-50 w-full sm:w-3/4 ${search_state ? "flex" : "hidden"}`}>
                      <select id="countries" class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                        <option selected value={""}>Choose a Vehicle No</option>
                        {
                          vehicle_lst &&
                          vehicle_lst.map((vehicle, index) => {
                            return (
                              <option value={vehicle.slug}>{vehicle.vehicle_no}</option>
                            )
                          })
                        }
                      </select>
                    </div>
                    <div className={`relative bg-opacity-50 w-full sm:w-3/4 ${search_state ? "hidden" : "flex"}`}>
                      <input
                        type="tel"
                        name="customer_mobile"
                        id="customer_mobile"
                        placeholder="Vehicle No"
                        className="peer mt-1 w-full bg-transparent border-b-2 border-black px-0 py-1 placeholder:text-transparent focus:outline-none"
                        autoComplete="NA"
                        required={true}
                      />
                      <label
                        htmlFor="email"
                        className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800"
                      >
                        Vehicle No
                      </label>
                    </div>
                    <div className={`w-32 ${search_state ? "hidden" : "flex"}`}>
                      <button
                        className="text-white bg-blue-700 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2">
                        Get Details
                      </button>
                    </div>
                  </div>

                </div>
              </div> */}
            </div>
            {/* second card  */}
            <div className="w-full flex flex-col mt-5 border">
              {/* header of the card*/}
              <div className="w-full flex border-b px-3 py-2 bg-slate-50 mb-3 items-center justify-between">
                <div className="text-lg">Select Services</div>
              </div>
              {/* body of the card  */}
              <div className="w-full flex flex-col px-4">
                <div className="w-full h-60 overflow-y-scroll">
                  {predefined_services &&
                    predefined_services.map((service, index) => (
                      <div className="w-full bg-slate-100 my-3 flex flex-col" key={index}>
                        <div className="flex gap-x-2 items-center px-3 py-3">
                          <input
                            type="checkbox"
                            onChange={() => handleServiceToggle(service)}
                            checked={!!predefined_service_status[service.slug]}  // Set checked status
                            className="w-4 h-4 mr-2 text-blue-600 bg-gray-100 border-gray-300 rounded-xl focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          />
                          <div className="text-md">{service.service_name}</div>
                        </div>
                        {/* Conditionally show qty and price inputs if the checkbox is checked */}
                        <div className={`sm:w-1/2 w-full gap-x-3 px-3 pb-3 ${predefined_service_status[service.slug] ? "flex" : "hidden"}`}>
                          <input
                            type="number"
                            className="w-12 border font-medium"
                            min={1}
                            value={selectedServices.find((item) => item.slug === service.slug)?.qty || 1}
                            onChange={(e) => handleQtyChange(service.slug, parseInt(e.target.value))}
                            placeholder="Qty."
                          />
                          X
                          <input
                            type="number"
                            className="w-16"
                            value={selectedServices.find((item) => item.slug === service.slug)?.price || 0}
                            onChange={(e) => handlePriceChange(service.slug, parseFloat(e.target.value))}
                            placeholder="Rs."
                            min={0}
                          />
                          =
                          <input
                            type="number"
                            readOnly
                            className="w-16"
                            value={(selectedServices.find((item) => item.slug === service.slug)?.qty || 1) *
                              (selectedServices.find((item) => item.slug === service.slug)?.price || 0)}
                            placeholder="Tot."
                          />
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
            {/* third card  */}
            <div className="w-full flex flex-col mt-5 border">
              {/* header of the card*/}
              <div className="w-full flex border-b px-3 py-2 bg-slate-50 mb-3 items-center justify-between">
                <div className="text-lg">Select Services</div>
              </div>
              {/* body of the card  */}
              <div className="w-full flex flex-col px-4">
                <div className="w-full h-60 overflow-y-scroll">




                  {services.map((service, index) => (

                    <div className="w-full bg-slate-100 my-3 flex flex-col mt-1" key={index}>
                      <div className="flex gap-x-2 items-center px-3 py-3">
                        <div className="relative bg-opacity-50 w-full">
                          <input
                            type="tel"
                            name="service_name"
                            id="name"
                            placeholder="Enter Mobile Numner"
                            className="peer mt-1 w-full bg-transparent border-b-2 border-black px-0 py-1 placeholder:text-transparent focus:outline-none"
                            autoComplete="NA"
                            value={service.service_name}
                            onChange={(e) => handleInputChange(service.id, e)}
                          />
                          <label
                            htmlFor="email"
                            className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800"
                          >
                            Service
                          </label>
                        </div>
                      </div>
                      <div className=" sm:w-1/2 w-full gap-x-3  px-3 pb-3 flex">
                        <input type="number" name="quantity" className="w-12 border font-medium" min={1} placeholder="Qty." value={service.quantity} onChange={(e) => handleInputChange(service.id, e)}></input> X
                        <input type="number" name="price" className="w-16" placeholder="Rs." value={service.price} onChange={(e) => handleInputChange(service.id, e)} min={0}></input> =
                        <input type="number" readOnly className="w-16" placeholder="Tot." value={service.price}></input>
                      </div>
                    </div>

                  ))}
                  <div className="flex justify-center">
                    <button
                      onClick={handleAddService}
                      className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition ease-in-out duration-300"
                    >
                      +
                    </button>
                  </div>

                </div>
              </div>
            </div>

            <div className="flex justify-center mt-3">
              <button
                type="button"
                onClick={handelGenerateBill}
                className="w-full my-3 px-6 py-3 text-lg text-white transition-all duration-150 ease-linear rounded-lg shadow outline-none bg-black focus:outline-none"
              >
                Generate Bill
              </button>
            </div>
          </div>

        </div>
        <div>

        </div>
        </form>
      </div>
      <CustomerForm sidebar={sidebar} setSidebar={setSidebar}></CustomerForm>
      <CustomerOnlyForm sidebar_cust={sidebar_cust} setSidebar_cust={setSidebar_cust} set_search_state={set_search_state} set_customer_details={set_customer_details}></CustomerOnlyForm>
      {bill && <Bills sidebar_bill={sidebar_bill} setSidebar_bill={setSidebar_bill} bill={bill}></Bills>}
    </section>
  );
}

export default Calender;
