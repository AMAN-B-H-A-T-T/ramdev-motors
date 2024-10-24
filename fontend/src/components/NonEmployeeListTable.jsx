import React from 'react'
import { base_url } from '../statics/exports';
import axios from 'axios';

function NonEmployeeListTable({NonEmployees,setNonEmployees,setshowUpdateForm,setemployeeData}) {
  const deleteCustomer = async(customerId)=>{
    let config = {
      params: {
        customerId:customerId,
      },
      headers: {
        "ngrok-skip-browser-warning": true,
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    };
    axios.delete(`${base_url}/api/manage/delete_customer`,config)
    .then((response)=>{
        const new_userList = NonEmployees.filter(employee => {
          return (employee._id != customerId)
        })
        console.log(new_userList)
        setNonEmployees(new_userList)
    })
    .catch((error)=>{
      console.log(error);
    })
  }
  return (
    <table className="w-full text-sm rtl:text-right text-gray-500 dark:text-gray-400 text-center">
            <thead className="text-xs text-black uppercase bg-gray-200">
              <tr>
                <th scope="col" className="px-6 py-3">
                  User Code
                </th>
                <th scope="col" className="px-6 py-3">
                    User Name
                </th>        
                <th scope="col" className="px-6 py-3">
                    Action
                </th>        
              </tr>
            </thead>
            <tbody className="overflow-y-scroll">
            {
              NonEmployees.map((item,index) => (
              <tr className="odd:bg-white even:bg-gray-50 border-b text-black" key={index}>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  {item._id}
                </th>
                <td className="px-6 py-4">{item.Fname +' '+ item.Lname}</td>
                <td className='px-6 py-4'>
                <button className="rounded-xl border border-red-600 px-6 py-3 mx-2 text-center text-black hover:bg-red-600 hover:text-white" onClick={(e)=>{e.preventDefault();deleteCustomer(item._id)}}>Delete</button>
                <button className="rounded-xl border border-amber-600 px-6 py-3 mx-2 text-center text-black hover:bg-amber-600 hover:text-white" onClick={(e) =>{e.preventDefault(); setshowUpdateForm(true); setemployeeData(item)}}>Update</button>
                </td>
              </tr>
              ))
            }
            </tbody>
          </table>
  )
}

export default NonEmployeeListTable