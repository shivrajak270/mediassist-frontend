import React from 'react'
import Resister from './Components/Resister'
import Welcome from './Components/Welcome'
import Login from './Components/Login'
import UserPage from './Components/UserPage'
import PharmasistPage from './Components/PharmasistPage'
import { BrowserRouter, Routes, Route } from "react-router-dom";


const App = () => {
  return(
<BrowserRouter>
  <Routes>
<Route path="/" element={<Welcome></Welcome>}></Route>
<Route path="/resister" element={<Resister></Resister>}></Route>
<Route path="/login" element={<Login></Login>}></Route>
<Route path="/user" element={<UserPage></UserPage>}/>
<Route path="/pharmapage" element={<PharmasistPage></PharmasistPage>}/>
  </Routes>
  </BrowserRouter>
  )
}


export default App;