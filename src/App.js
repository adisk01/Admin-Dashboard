import React, { useState, useEffect } from "react";
import Layout from "./components/Layout";
import './App.css'
const App = () => {
  const API = "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";
  const [data, setData] = useState([]);
  const fetchAPIdata = async (url) => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAPIdata(API);
  }, []);

  return (
    <>
    <Layout data={data} setData={setData} />

    </>
  );
};

export default App;
