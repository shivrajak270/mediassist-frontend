import axios from 'axios';
import React, { useEffect, useState } from 'react';
import BASE_URL from '../config.js'; 
import Swal from 'sweetalert2';


const PharmasistPage = () => {

  const [clicked, setclick] = useState(false)
  const [responsedata, setresponsedata] = useState([])
  const [add, setadd] = useState("")
  const token = localStorage.getItem("token")
  const [medicinename, setmedicinename] = useState('')
  const [quantity, setquantity] = useState('')
  const [price, setprice] = useState('')
  const [editindex, setindex] = useState(null)
  const [deleteindex, setdel] = useState(null)

  useEffect(() => {
    console.log("Updated values:", {
      medicinename,
      quantity,
      price
    });
  }, [medicinename, quantity, price]);


  const handlecancel=()=>{
     setadd("");            
  setmedicinename("");    
  setquantity("");
  setprice("");
  }
   const handleeditcancel=()=>{
   setindex(null)
  setquantity("");
  setprice("");
  }

  const fetchStocks = async () => {
  const url = `${BASE_URL}/pharmasists/stockscheck`;

  const response = await axios.get(url, {
    headers: { Authorization: `Bearer ${token}` }
  });
 console.log("thisis the data");
 console.log(response.data);
  setresponsedata(response.data);
};

  const handledelete = async (item, index) => {

     const result = await Swal.fire({
    title: `Are you sure you want to delete ${item.medicine_name}?`,
    text: "This action cannot be undone!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'Cancel'
  });


    const url = `${BASE_URL}/pharmasists/stock/delete`;



    if (result.isConfirmed) {
      console.log("confirmed")
      try{
      const response = await axios.delete(url, {
        data: {
          medicine_name: item.medicine_name,
          quantity: item.quantity,
          price: item.price
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
       Swal.fire('Deleted!', `${item.medicine_name} has been deleted.`, 'success');
        await fetchStocks();
    
    }
      catch(error){
         Swal.fire({
      icon: 'error',
    title: 'Failed',
    text: error.response?.data || `deletion for medicine:${medicinename} failed`,
     })

      }
      console.log(response);
    }
  }

  useEffect(() => {
    console.log(responsedata);
  }, [responsedata])

  const hanndleSumit = async () => {
    setclick(true)
    try {
      const url = `${BASE_URL}/pharmasists/stockscheck`;

      const response = await axios.get(url,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setresponsedata(response.data);

    } catch (error) {
      console.log(error)
    }
  }

  const handleadd = () => {
    setadd("ADD")
    setindex(null)
    console.log(medicinename);
    console.log(quantity);
    console.log(price);
  }

  const handleaddpostrequest = async () => {
    const url = `${BASE_URL}/pharmasists/stocks/add`;
      const qty = Number(quantity);
  if (!Number.isInteger(qty)) {
     Swal.fire({
      icon: 'error',
    title: 'Invalid Price',
    text: 'Quantity must be a positive number',
     })

     
     return;
  }

  const pricecheck = Number(price);

if (isNaN(pricecheck) || pricecheck <= 0) {
   Swal.fire({
      icon: 'error',
    title: 'Invalid Price',
    text: 'Price must be a positive number',
     })
  return;
}
    const data = {
      "medicine_name": medicinename,
      "quantity": quantity,
      "price": price
    }
    try{
    const response = await axios.post(url, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    Swal.fire({
      icon: 'Success',
    title: 'Success',
    text: `Adding of the medicine ${medicinename} was successfull`,
     })
    }
    catch(error){
      console.log(error.response);

      Swal.fire({
      icon: 'error',
    title: 'Failed',
    text: error.response?.data || `Error: adding of the medicine ${medicinename} failed`,
     })
    }
    setadd("");            
    setmedicinename("");
    setquantity("");
    setprice("");
    await fetchStocks();

    console.log(response);
  }

  const handleedit = (item, index) => {
    setindex(index)

    setmedicinename(item.medicine_name)
    setquantity(item.quantity)
    setprice(item.price)
  }

  const handleupdatesubmit = async () => {
    console.log("inside the function ");
    const url = `${BASE_URL}/pharmasists/stock/update`;
   const quantitycheck = Number(quantity);
if(!Number.isInteger(quantitycheck) || quantitycheck <= 0){
  Swal.fire({
    icon: 'error',
    title:'Invalid Input',
    text:'Please enter quantity as a positive integer'
  })
  return;
}


   const pricecheck=Number(price);
   if(isNaN(pricecheck) || pricecheck<=0){
    Swal.fire({
      icon: 'error',
      title:'Invalid Input',
      text:'Please enter price as a positive number'
    })
    return;
   }
    const data = {
      "medicine_name": medicinename,
      "quantity": quantity,
      "price": price
    }
       try{
    const response = await axios.patch(url, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }catch(error){
     console.log(error.response);

      Swal.fire({
      icon: 'error',
    title: 'Failed',
    text: error.response?.data || `updating for the medicine failed ${medicinename} failed`,
     })

  }
    await fetchStocks();
      setindex(null); 
    setmedicinename("");
    setquantity("");
    setprice("");
  }

  return (
    <div className="pharmacist-container">

      <button className="pharmacist-btn pharmacist-btn-primary" onClick={hanndleSumit}>
        View/updateStocks
      </button>

      {clicked && (
        <div className="pharmacist-content">

          <button className="pharmacist-btn pharmacist-btn-secondary" onClick={handleadd}>
            add
          </button>
          

          <table className="pharmacist-table" border="1" cellPadding="10" style={{ marginTop: "20px" }}>
            <thead className="pharmacist-table-head">
              <tr className="pharmacist-table-row">
                <th className="pharmacist-table-th">Medicine Name</th>
                <th className="pharmacist-table-th">Quantity</th>
                <th className="pharmacist-table-th">Price</th>
                <th className="pharmacist-table-th">Edit</th>
                <th className="pharmacist-table-th">Delete</th>
              
              </tr>
            </thead>

            <tbody className="pharmacist-table-body">

              {add == "ADD" && (
                <tr className="pharmacist-table-row">
                  <td className="pharmacist-table-td">
                    <input className="pharmacist-input" type='text' onChange={(e) => { setmedicinename(e.target.value); console.log(medicinename) }} />
                  </td>

                  <td className="pharmacist-table-td">
                    <input className="pharmacist-input" type='text' onChange={(e) => { setquantity(e.target.value); console.log(quantity) }} />
                  </td>

                  <td className="pharmacist-table-td">
                    <input className="pharmacist-input" type='text' onChange={(e) => { setprice(e.target.value); console.log(price) }} />
                  </td>

                  <td className="pharmacist-table-td">
                    <button className="pharmacist-btn pharmacist-btn-primary" onClick={handleaddpostrequest}>
                      save
                    </button>
                  </td>
                  <td className="pharmacist-table-td">
                    <button className="pharmacist-btn pharmacist-btn-primary" onClick={handlecancel}>
                      cancel
                    </button>
                  </td>
                </tr>
              )}

              {responsedata.map((item, index) => (
                <tr className="pharmacist-table-row" key={index}>
                  {editindex == index ? (
                    <>
                      <td className="pharmacist-table-td">
                        <input className="pharmacist-input" type='text' value={medicinename} disabled />
                      </td>

                      <td className="pharmacist-table-td">
                        <input className="pharmacist-input" type='text' value={quantity} onChange={(e) => setquantity(e.target.value)} />
                      </td>

                      <td className="pharmacist-table-td">
                        <input className="pharmacist-input" type='text' value={price} onChange={(e) => setprice(e.target.value)} />
                      </td>

                      <button className="pharmacist-btn pharmacist-btn-primary" onClick={handleupdatesubmit}>
                        save
                      </button>

                      <button className="pharmacist-btn pharmacist-btn-secondary" onClick={handleeditcancel}>
                        cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <td className="pharmacist-table-td">{item.medicine_name}</td>
                      <td className="pharmacist-table-td">{item.quantity}</td>
                      <td className="pharmacist-table-td">₹{item.price}</td>

                      <td className="pharmacist-table-td">
                        <button className="pharmacist-btn pharmacist-btn-secondary" onClick={() => handleedit(item, index)}>
                          EDIT
                        </button>
                      </td>

                      <td className="pharmacist-table-td">
                        <button className="pharmacist-btn pharmacist-btn-danger" onClick={() => handledelete(item, index)}>
                          DELETE
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}

            </tbody>
          </table>

        </div>
      )}

    </div>
  )
}

export default PharmasistPage;
