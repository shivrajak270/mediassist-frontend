import React, { useState } from 'react'
import axios from 'axios'
import '../index.css' 
import BASE_URL from '../config.js'; 
import { useNavigate } from "react-router-dom";


const Login = () => {
  const navigate = useNavigate();

  const [username, setusername] = useState('')
  const [password,setpassword] = useState('')
  const [role, setrole] = useState('')
  const [email, setemail] = useState('')
   const [shopName, setShopName] = useState("");
  const [shopState, setShopState] = useState("");
  const [shopCity, setShopCity] = useState("");
  const [shopCountry, setShopCountry] = useState("");
  const [shopOpenHours, setShopOpenHours] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const handleSubmit=async (e)=>{
      e.preventDefault();

      const url=`${BASE_URL}/auth/resister`
      const data={
          username:username,
          password:password,
          role:role,
          email:email
      }
      try{
        const response= await axios.post(url,data);
        console.log(response)
        if(data.role=="PHARMACIST"){
         const url_pharm = `${BASE_URL}/auth/resister/pharmacy`;
         const dataForPharma={
    
            shopName: shopName,
            shopState: shopState,
            shopCity: shopCity,
            shopCountry: shopCountry,
            shopOpenHours: shopOpenHours,
            latitude: latitude,
            userid: response.data.id,
            longitude: longitude
         }
         const reponseforrest= await axios.post(url_pharm,dataForPharma);
                console.log("FULL RESPONSE:", response);
        console.log("RESPONSE.DATA:", response.data);
console.log("TYPE OF DATA:", typeof response.data);
         console.log("the. response is ",response.data.id);
        }
        console.log(response);
 
    alert("Form submitted successfully!");
    navigate("/login");
    setusername('');
    setpassword('');
    setrole('');
    setemail('');
      }
      catch(error){
        console.log(error);
         alert("Registration failed");
      }
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Create Your Account</h2>

        <label>Username</label>
        <input type="text" name="username" id="username" value={username} required onChange={(e)=>setusername(e.target.value)} />

        <label>Password</label>
        <input type="password" name="password" id="password" value={password} required onChange={(e)=>setpassword(e.target.value)} />

        <label>Role</label>
        <select id="role" name="role" value={role} onChange={(e)=>setrole(e.target.value)}>
            <option value="">Select Role</option>
            <option value="USER">USER</option>
            <option value="PHARMACIST">Pharmacist</option>
            </select>

        <label>Email</label>
        <input type="email" name="email" id="email" value={email} required onChange={(e)=>setemail(e.target.value)} />
        {role=="PHARMACIST" && (
        <>
        <label>ShopName</label>
          <input 
            type="text"
            value={shopName}
            onChange={(e) => setShopName(e.target.value)}
          />
          <label>shopState</label>
          <input 
            type="text"
            value={shopState}
            onChange={(e) => setShopState(e.target.value)}
          />
          <label>shopOpenHours</label>
          <input 
            type="text"
            value={shopOpenHours}
            onChange={(e) => setShopOpenHours(e.target.value)}
          />
          <label>shopCountry</label>
          <input 
            type="text"
            value={shopCountry}
            onChange={(e) => setShopCountry(e.target.value)}
          />
          <label>shopCity</label>
          <input 
            type="text"
            value={shopCity}
            onChange={(e) => setShopCity(e.target.value)}
            
          />
           <label>latitude</label>
          <input 
            type="text"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            
          />
          <label>longitude</label>
          <input 
            type="text"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}   
          />
          </>
        )
        }

        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default Login
