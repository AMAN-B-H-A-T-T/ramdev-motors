import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Calender from './Calender'
import Bookings from './Bookings'
import Users from './Users'
import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate()
  useEffect(() => {
      if(!localStorage.getItem('access')){
        navigate('/login')
      }
  },[])
  const [selectedScreen,setSelectedScreen] = useState('calender')    
  return (
    <>
      <Navbar selectedScreen={selectedScreen} onSelectScreen={setSelectedScreen} />
      {
        selectedScreen == 'calender' ? <Calender/> : null
      }
      {
        selectedScreen == 'booking-list' ? <Bookings/> : null
      }
      {
        selectedScreen == 'user-list' ? <Users/> : null
      }
    </>
  )
}

export default Home