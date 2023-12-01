import React, { useState, useEffect } from "react";
import {Button, Table } from 'react-bootstrap';
import './App.css'
const App = () => {
  const API = "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";
  const [data, setData] = useState([]);
  const handleCheckboxChange = async () => {

  }
  const handleEdit = async () => {

  }
  const handleDelete = async () => {

  }
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
  }, [API]);

  return (
    <>
      <div style={{ margin: "10rem" }}>
      <Table className="Table" striped bordered hover size="sm">
          <thead>
            <tr>
              <th><input type="checkbox" onChange={() => handleCheckboxChange()} /></th>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td class="style"><input type="checkbox" onChange={() => handleCheckboxChange(item.id)} /></td>
                <td class="style">{item.id}</td>
                <td class="style">{item.name}</td>
                <td class="style">{item.email}</td>
                <td class="style">{item.role}</td>
                <td >
                <Button variant="info" size="sm" onClick={() => handleEdit(item.id)}>Edit</Button>
                  {' '}
                  <Button variant="danger" size="sm" onClick={() => handleDelete(item.id)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default App;
