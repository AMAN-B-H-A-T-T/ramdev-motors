import React, { useEffect, useState } from "react";
import BookingsForm from "./BookingsForm";
import BookingForEmployees from "./BookingForEmployees";
import BookingsForNonEmployees from "./BookingsForNonEmployees";
import axios from "axios";
import { base_url } from "../statics/exports";

function Bookings() {
  const [selectedCategory, setSelectedCategory] = useState("employees");
  const [sidebar,setSidebar] = useState(false)
  const [BookingsEmployees,SetBookingsEmployees] = useState([])
  const [FilteredBookingsEmployees,setFilteredBookingsEmployees] = useState(BookingsEmployees)  
  const [BookingsNonEmployees,SetBookingsNonEmployees] = useState([])
  const [FilteredBookingsNonEmployees,setFilteredBookingsNonEmployees] = useState(BookingsNonEmployees)  

  
  return (
    <section className="h-screen w-full flex flex-col">
    <BookingsForm sidebar={sidebar} setSidebar={setSidebar} SetBookingsEmployees={SetBookingsEmployees} setFilteredBookingsEmployees={setFilteredBookingsEmployees} SetBookingsNonEmployees={SetBookingsNonEmployees} setFilteredBookingsNonEmployees={setFilteredBookingsNonEmployees}/>
      
      <div className=" mt-14">     
          <BookingForEmployees setSidebar={setSidebar} Bookings={BookingsEmployees} SetBookings={SetBookingsEmployees} FilteredBookings={FilteredBookingsEmployees} setFilteredBookings={setFilteredBookingsEmployees}/>
         {selectedCategory == 'non-employees' ? <BookingsForNonEmployees setSidebar={setSidebar} Bookings={BookingsNonEmployees} SetBookings={SetBookingsNonEmployees} FilteredBookings={FilteredBookingsNonEmployees} setFilteredBookings={setFilteredBookingsNonEmployees} /> : null}
      </div>
    </section>
  );
}

export default Bookings;
