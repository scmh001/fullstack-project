import React, { useState, useEffect } from 'react'
import axios from "axios";


function Home() {
    const [count, setCount] = useState(0);
    const [array, setArray] = useState([]);
  
    const fetchAPI = async () => {
      const response = await axios.get("http://127.0.0.1:8080/api/users")
      console.log(response.data.users);
      setArray(response.data.users);
    };
  
    useEffect(() => {
      fetchAPI()
  
    },[])


  return (
    <>
    <div>This is Home page</div>
    <form>
        <lable for="loc1">Location 1:</lable><br></br>
        <input type="text" id="firstName"></input><br></br>
        <lable for="loc2">Location 2:</lable><br></br>
        <input type="text" id="firstName"></input><br></br>
        <input type="submit" value="Submit"></input><br></br>
    </form>
    {array.map((user, index) => (
              <div key={index}>
                  <span>{user}</span>
                  <br></br>
              </div>
            ))}
    </>
  )
}

export default Home