import axios from "axios";
import { useState } from "react";
import ResultCard from "./ResultCard";
import BASE_URL from '../config.js'; 

const SerachList = ({ results ,clear}) => {
  const [response, setresponse] = useState([]);
  const[medicinename,setmedicinename]=useState("");


  const listOfShops = async (id, name) => {

    setmedicinename(name);
    let data = {
      id: id,
      medicineName: name,
    };

    let response = await axios.post(
      `${BASE_URL}/users/getmedicine`,
      data,
      {
        withCredentials:true
      }
    );

    console.log("this is the data", response.data);
    setresponse(response.data);
    clear();
  };

  return (
    <div className="searchlist-container">
      <ul className="medicine-list">
        {results.map((med) => (
          <li
            className="medicine-item"
            key={med.medicine_id}
            onClick={() => {listOfShops(med.medicine_id, med.medicineName)
                           setmedicinename(med.medicineName);
            }

            }
          >
            {med.medicineName}
          </li>
        ))}
      </ul>

      <div className="resultcard-container">
        {medicinename!="" && response.length > 0 &&  (
          <h1>following is the result for :{medicinename}</h1>
        )
        }
          {medicinename!="" && response.length == 0 &&  (
          <h1>no results found for:{medicinename}</h1>
        )
        }
        
        {response.length > 0 && 
          response.map((data) => (
            <ResultCard className="resultcard" results={data} medicinename={medicinename}></ResultCard>
          ))}
      </div>
    </div>
  );
};

export default SerachList;
