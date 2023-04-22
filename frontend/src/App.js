import React, { useEffect, useState } from "react";
import Navbar from "./Components/Navbar"
import BlockGrid from "./Components/Card"
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
  const [blockchain, setBlockchain] = useState();

  const getApiData = async () => {
    const response = await fetch(
      "http://localhost:3000/getChain"
    ).then((response) => response.json());

    setBlockchain(response);
  };

  useEffect(() => {
    getApiData();
  }, []);


  if(blockchain){
  return (
    <div>
         <Navbar/>
         <BlockGrid bc={blockchain}/>
     </div>
  );
  }
}