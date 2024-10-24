import axios from "axios";
import React,{useRef, useState} from "react";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { base_url } from "../statics/exports";
import axiosInstance from "../config/axiosSetup";
import BookingsForm from "./BookingsForm";

function BookingForEmployees({
  setSidebar,
  Bookings,

  setFilteredBookings,
}) {
  const tableRef = useRef()
  const [bill_list,set_bill_list] = useState(null)
  const [mobile_no,set_mobile_no] = useState(null)
  const [Vehicle_no,set_vehicle_no]  = useState(null);
  const [preview,set_preview] = useState(false)
  const [bill_data,set_bill_data] = useState(null)
  const SearchInArray = (query) => {
    const lowercasedSearchTerm = query.toLowerCase();
    const results = Bookings.filter((booking) => {
      return booking.meal_category.toLowerCase().includes(lowercasedSearchTerm);
    });
    setFilteredBookings(results);
  };

  const FilterByMonth = (query) => {
    const results = Bookings.filter((booking) => {
      return (
        new Date(query).getMonth() == new Date(booking.meal_date).getMonth()
      );
    });
    setFilteredBookings(results);
  };
  
  


  const get_bills_of_customer = (type)=>{
    try{
      const param = {}
      if(type == "mobile_no"){
          param['mobile_no'] = mobile_no
      }
      else{
        param['vehicle_no'] = Vehicle_no
      }
      
      
      
      const header = {
        Authorization: `Bearer ${localStorage.getItem('access')}`
      }

      axiosInstance.get(`${base_url}/api/manage/get_bills_of_customer`,{headers:header,params : param})
      .then((respose)=>{
          set_bill_list(respose.data.data)
      })
      .catch((error)=>{
        alert(error.response.data.message)
      })
    }
    catch(error){
      alert(error.message)
    }
  }
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-10 mx-2">
      {bill_data && <BookingsForm preview={preview} set_preview={set_preview} bill = {bill_data}></BookingsForm>}
      <div className="my-3 flex flex-col sm:flex-row justify-between items-center mx-2 sm:space-x-8 space-y-4 sm:space-y-0">
        <div className="sm:w-1/2 w-full">
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-slate-200 focus:ring-blue-500 focus:border-blue-500 "
              placeholder="Search by Mobile No."
              required=""
              onChange={(e) => {
                set_mobile_no(e.target.value);
              }}
            />
            <button
              type="submit"
              className="text-white absolute end-2.5 bottom-2.5 bg-blue-600 hover:bg-white hover:text-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 "
              onClick={()=>{get_bills_of_customer("mobile_no")}}
            >
              Search
            </button>
          </div>
        </div>
        <div className="sm:w-1/2 w-full">
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="flex w-full flex-col sm:flex-row items-center sm:gap-x-2 gap-y-2">
          <div className="relative sm:w-4/5 w-full">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-slate-200 focus:ring-blue-500 focus:border-blue-500 "
              placeholder="Search by Vehicle No."
              required=""
              onChange={(e) => {
                set_vehicle_no(e.target.value);
              }}
            />
            <button
              type="submit"
              className="text-white absolute end-2.5 bottom-2.5 bg-blue-600 hover:bg-white hover:text-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 "
              onClick={()=>{get_bills_of_customer("vehicle_no")}}
            >
              Search
            </button>
          </div>
          <div className="sm:w-auto w-full">
          <DownloadTableExcel
                    filename="users table"
                    sheet="users"
                    currentTableRef={tableRef && tableRef.current}
                >
                <button className="text-white bg-black hover:bg-white hover:text-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-3 flex sm:w-auto w-full justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={16}
                height={16}
                fill="currentColor"
                className="bi bi-floppy "
                viewBox="0 0 16 16"
              >
                <path d="M11 2H9v3h2z" />
                <path d="M1.5 0h11.586a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 14.5v-13A1.5 1.5 0 0 1 1.5 0M1 1.5v13a.5.5 0 0 0 .5.5H2v-4.5A1.5 1.5 0 0 1 3.5 9h9a1.5 1.5 0 0 1 1.5 1.5V15h.5a.5.5 0 0 0 .5-.5V2.914a.5.5 0 0 0-.146-.353l-1.415-1.415A.5.5 0 0 0 13.086 1H13v4.5A1.5 1.5 0 0 1 11.5 7h-7A1.5 1.5 0 0 1 3 5.5V1H1.5a.5.5 0 0 0-.5.5m3 4a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5V1H4zM3 15h10v-4.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5z" />
              </svg>
              
            </button>
          </DownloadTableExcel>
          </div>
          </div>
          
        </div>
        
      </div>
      <div className="overflow-x-scroll">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400" ref={tableRef}>
          <thead className="text-xs text-black uppercase bg-gray-200">
            <tr className="text-center">
              <th scope="col" className="px-6 py-3">
                Bill No.
              </th>
              <th scope="col" className="px-6 py-3">
                Customer Name
              </th>
              <th scope="col" className="px-6 py-3">
                 Mobile No.
              </th>
              <th scope="col" className="px-6 py-3">
                Vehicle No.
              </th>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                Total Amt.
              </th>
            </tr>
          </thead>
          <tbody className="overflow-y-scroll">
            {bill_list &&
              bill_list.map((bill, index) => (
                <tr
                  className="odd:bg-white even:bg-gray-50 border-b text-black text-center"
                  key={index}
                  onClick={()=>{set_bill_data(bill);set_preview(true)}}
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {bill.bill_no}
                  </th>
                  <td className="px-6 py-4">{bill.customer_profile.customer_name}</td>
                  <td className="px-6 py-4">{bill.customer_profile.customer_mobile}</td>
                  <td className="px-6 py-4">{bill.vehicle.vehicle_no}</td>
                  <td className="px-6 py-4">
                      {bill.date}
                  </td>
                  <td className="px-6 py-4">
                    {bill.total_price}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      
    </div>
  );
}

export default BookingForEmployees;
