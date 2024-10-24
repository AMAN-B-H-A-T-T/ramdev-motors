import React,{useRef} from "react";
import { DownloadTableExcel } from "react-export-table-to-excel";
import axios from "axios";
import { base_url } from "../statics/exports";

function BookingsForNonEmployees({
  setSidebar,
  Bookings,
  SetBookings,
  FilteredBookings,
  setFilteredBookings,
}) {
  const tableRef = useRef()
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
  const deleteBooking = async(id) => {      
    let config = {
      params: {
        bookingId:id,
      },
      headers: {
        "ngrok-skip-browser-warning": true,
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    };
    axios.delete(`${base_url}/api/manage/delete_booking`,config).then(res => {
        let NewBookings = Bookings.filter(booking => {
          return (booking._id !== id)
        })
        let NewFilterdBookings = FilteredBookings.filter(booking => {
          return (booking._id !== id)
        })
        SetBookings(NewBookings)
        setFilteredBookings(NewFilterdBookings)
        alert("Booking successfully deleted!!")
    }).catch(error => { 
      console.log(error);
    })
  }
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-10 mx-2">
      <div className="my-3 flex flex-col sm:flex-row justify-between items-center mx-2 space-y-4 sm:space-y-0">
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
              placeholder="Search by meal category..."
              required=""
              onChange={(e) => {
                SearchInArray(e.target.value);
              }}
            />
            <button
              type="submit"
              className="text-white absolute end-2.5 bottom-2.5 bg-blue-600 hover:bg-white hover:text-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 "
            >
              Search
            </button>
          </div>
        </div>
        <div className="sm:w-1/3 w-full flex justify-center items-center space-x-3">
          <input
            type="month"
            id="start"
            name="start"
            min={`${new Date().getFullYear()}-${String(
              new Date().getMonth() + 1
            ).padStart(2, "0")}`}
            // value={`${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}`}
            onChange={(e) => {
              FilterByMonth(e.target.value);
            }}
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-slate-200 focus:ring-blue-500 focus:border-blue-500 "
          />
          <div>
          <DownloadTableExcel
                    filename="users table"
                    sheet="users"
                    currentTableRef={tableRef && tableRef.current}
                >
            <button className="text-white bg-black hover:bg-white hover:text-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-3">
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
        <div className="w-full sm:w-auto">
          <button
            type="submit"
            className="text-white w-full bg-green-600 hover:bg-white hover:text-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-3 hover:border "
            onClick={() => {
              setSidebar(true);
            }}
          >
            Add a booking
          </button>
        </div>
      </div>
      <div className="overflow-x-scroll">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400" ref={tableRef}>
          <thead className="text-xs text-black uppercase bg-gray-200">
            <tr className="text-center">
              <th scope="col" className="px-6 py-3">
                Booking ID
              </th>
              <th scope="col" className="px-6 py-3">
                Meal Type
              </th>
              <th scope="col" className="px-6 py-3">
                Total Meals Booked
              </th>
              <th scope="col" className="px-6 py-3">
                Meal Dates
              </th>
              <th scope="col" className="px-6 py-3">
                On Weekend
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="overflow-y-scroll">
            {FilteredBookings &&
              FilteredBookings.map((item, index) => (
                <tr
                  className="odd:bg-white even:bg-gray-50 border-b text-black text-center"
                  key={index}
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {item._id}
                  </th>
                  <td className="px-6 py-4">{item.meal_category}</td>
                  <td className="px-6 py-4">{item.booking_count}</td>
                  <td className="px-6 py-4">{item.meal_date}</td>
                  <td className="px-6 py-4">
                    {item.is_weekend ? "Yes" : "No"}
                  </td>
                  <td className="px-6 py-4">
                    <button className="rounded-xl border border-red-600 p-3 w-full text-center text-black hover:bg-red-600 hover:text-white" onClick={() => {deleteBooking(item._id)}}>Delete</button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BookingsForNonEmployees;
