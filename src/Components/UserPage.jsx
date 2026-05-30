import axios from 'axios';
import React, { useState } from 'react'
import { FaSearch } from "react-icons/fa";
import SerachList from './SerachList';

import BASE_URL from '../config.js'; 


const UserPage = () => {




  

const [serch, setfirst] = useState('')
const [resuts,setresults]=useState([])
 const token=localStorage.getItem("token")

 const clearsearch=(name)=>{
  setfirst(name);
  setresults([]);
 }



const fetchData=async (value)=>{
  const response=await axios.get(`${BASE_URL}/users`,{
    headers:{
       Authorization:`Bearer ${token}`
    }
  }
)
let result=[];
if(value.trim()){
 result=response.data.filter(item=>
     item.medicineName.toLowerCase().includes(value.toLowerCase())
 )
}



  console.log(result);
  setresults(result);
}

  return (
    <div>
     
  
   <FaSearch id="search-icon" />
    <input  id="medicine-search" type='text' placeholder='please enter the text' onChange={ (e)=>{setfirst(e.target.value)
      fetchData(e.target.value);
    }}></input>
    <h1>please enter the search</h1>
    <SerachList results={resuts} clear={clearsearch}></SerachList>





    </div>
  )
}

export default UserPage
