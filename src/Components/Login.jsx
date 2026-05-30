import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import BASE_URL from '../config.js';

const Login = () => {

  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');
  const [role, setrole] = useState('');

  const navigate=useNavigate();

  const handlesubmit = async () => {
    const loginurl = `${BASE_URL}/auth/login`;
    const data = {
      username: username,
      password: password
    };

    try {
      const response = await axios.post(loginurl, data);

      // assuming token comes from response.data.token
      const token = response.data;

      localStorage.setItem("token", token);

      const decoded = jwtDecode(token);
      console.log(decoded.role);

      setrole(decoded.role);

    } catch (error) {
        Swal.fire({
            icon: 'error',
          title: 'Failed',
          text: error.response?.data || `wrong credentials login failed`,
           })
    }
  };
  useEffect(()=>{
    if(!role) return;

    if(role==="USER")
      navigate('/user')

    if(role=="PHARMACIST")
      navigate('/pharmapage')
  },[role,navigate]);

  return (
    <div style={{
      width: '350px',
      margin: '100px auto',
      padding: '25px',
      borderRadius: '10px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      fontFamily: 'Arial, sans-serif'
    }}>

      <label style={{ fontWeight: 'bold' }}>Username</label>
      <input
        type="text"
        name="username"
        id="username"
        value={username}
        required
        onChange={(e) => setusername(e.target.value)}
        style={{
          width: '100%',
          padding: '10px',
          margin: '8px 0 16px 0',
          borderRadius: '6px',
          border: '1px solid #ccc',
          outline: 'none'
        }}
      />

      <label style={{ fontWeight: 'bold' }}>Password</label>
      <input
        type="password"
        name="password"
        id="password"
        value={password}
        required
        onChange={(e) => setpassword(e.target.value)}
        style={{
          width: '100%',
          padding: '10px',
          margin: '8px 0 20px 0',
          borderRadius: '6px',
          border: '1px solid #ccc',
          outline: 'none'
        }}
      />

      <button
        onClick={handlesubmit}
        style={{
          width: '100%',
          padding: '12px',
          backgroundColor: '#4f46e5',
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontSize: '16px',
          fontWeight: 'bold'
        }}
      >
        Submit
      </button>

    </div>
  );
};

export default Login;
