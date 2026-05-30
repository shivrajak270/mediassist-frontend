import React from 'react'
import { useNavigate } from 'react-router-dom'

const Welcome = () => {
const navigate=useNavigate();

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Welcome to MediAssist</h1>

      <div style={styles.buttonRow}>
        <button  onClick={()=>navigate("/login")}style={styles.loginBtn}>LOGIN</button>
        <button onClick={()=>navigate("/resister")} style={styles.registerBtn}>RESISTER</button>
      </div> 
    </div>
  )
}

const styles = {
  container: {
    height: "100vh",
    width: "100%",
    background: "linear-gradient(135deg, #6a11cb, #2575fc)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Arial, sans-serif"
  },

  heading: {
    color: "white",
    fontSize: "42px",
    marginBottom: "40px"
  },

  buttonRow: {
    display: "flex",
    gap: "20px"
  },

  loginBtn: {
    padding: "14px 30px",
    fontSize: "16px",
    fontWeight: "bold",
    borderRadius: "25px",
    border: "2px solid white",
    background: "transparent",
    color: "white",
    cursor: "pointer"
  },

  registerBtn: {
    padding: "14px 30px",
    fontSize: "16px",
    fontWeight: "bold",
    borderRadius: "25px",
    border: "none",
    background: "white",
    color: "#6a11cb",
    cursor: "pointer"
  }
}

export default Welcome
