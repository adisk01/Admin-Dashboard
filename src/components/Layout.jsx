import React, { useState ,useEffect } from 'react'
import {Button, Table } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import './Layout.css'
const Layout = (props) => {
    const { data } = props;
    const alldata=data;
    console.log("render" , alldata);
    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const [editID, setEditID] = useState(-1);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [selectedItems, setSelectedItems] = useState([]);
    const itemsPerPage=10;
    const handleCheckboxChange = () => {
      // If all items are already selected, clear the selection
      if (selectedItems.length === currentItems.length) {
        setSelectedItems([]);
      } else {
        // Otherwise, select all items
        const allItemIds = currentItems.map(item => item.id);
        setSelectedItems(allItemIds);
      }
    };
  
    const handleEdit = (id) => {
      const editItem = data.find((item) => item.id === id);
  
      if (editItem) {
        setEditID(id);
        // Set the initial state for edit fields
        setName(editItem.name);
        setEmail(editItem.email);
        setRole(editItem.role);
      }
    };
  
    const handleDelete = () => {
      // Filter out the selected items
      const updatedData = data.filter((item) => !selectedItems.includes(item.id));
  
      setCurrentItems(updatedData);
  
      // Update page count and current items
      const startIndex = itemOffset;
      const endIndex = startIndex + itemsPerPage;
      const currentItemsAfterDelete = updatedData.slice(startIndex, endIndex);
  
      setCurrentItems(currentItemsAfterDelete);
  
      setPageCount(Math.ceil(updatedData.length / itemsPerPage));
  
      // Adjust item offset if it exceeds the updated page count
      if (itemOffset >= pageCount * itemsPerPage) {
        setItemOffset(Math.max(0, (pageCount - 1) * itemsPerPage));
      }
  
      // Clear selected items
      setSelectedItems([]);
      setEditID(-1);
    };
  
    const handleUpdate = (id) => {
      const updatedItemIndex = data.findIndex((item) => item.id === id);
  
      if (updatedItemIndex !== -1) {
        const updatedData = [...data];
        updatedData[updatedItemIndex] = {
          ...data[updatedItemIndex],
          name: name,
          email: email,
          role: role,
        };
  
        setCurrentItems(updatedData);
  
        const startIndex = itemOffset;
        const endIndex = startIndex + itemsPerPage;
        const currentItemsAfterUpdate = updatedData.slice(startIndex, endIndex);
  
        setCurrentItems(currentItemsAfterUpdate);
  
        setPageCount(Math.ceil(updatedData.length / itemsPerPage));
  
        // Adjust item offset if it exceeds the updated page count
        if (itemOffset >= pageCount * itemsPerPage) {
          setItemOffset(Math.max(0, (pageCount - 1) * itemsPerPage));
        }
  
        setEditID(-1);
      }
    };
  
    useEffect(() => {
      const startIndex = itemOffset;
      const endIndex = startIndex + itemsPerPage;
  
      const updatedData = data.slice(startIndex, endIndex);
      setCurrentItems(updatedData);
  
      const updatedPageCount = Math.ceil(data.length / itemsPerPage);
      setPageCount(updatedPageCount);
  
      // Adjust item offset if it exceeds the updated page count
      if (itemOffset >= updatedPageCount * itemsPerPage) {
        setItemOffset(Math.max(0, (updatedPageCount - 1) * itemsPerPage));
      }
    }, [itemOffset, itemsPerPage, data]);
  
    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % data.length;
      setItemOffset(newOffset);
    };
  
    return (
      <>
        <div style={{ margin: "10rem" }}>
          <Button
            variant="danger"
            size="sm"
            onClick={() => handleDelete()}
            style={{ marginBottom: '10px', float: 'right' }}
          >
            Delete Selected
          </Button>
          <Table className="Table" striped bordered hover size="sm">
            <thead>
              <tr>
                <th>
                  <input type="checkbox" onChange={() => handleCheckboxChange()} />
                </th>
                <th>Id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item) => (
                item.id === editID ? (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td><input type="text" value={name} onChange={(e) => setName(e.target.value)} /></td>
                    <td><input type="text" value={email} onChange={(e) => setEmail(e.target.value)} /></td>
                    <td><input type="text" value={role} onChange={(e) => setRole(e.target.value)} /></td>
                    <td><button onClick={() => handleUpdate(item.id)}>Update</button></td>
                  </tr>
                ) : (
                  <tr key={item.id}>
                    <td className="style"><input type="checkbox" onChange={() => handleCheckboxChange(item.id)} checked={selectedItems.includes(item.id)} /></td>
                    <td className="style">{item.id}</td>
                    <td className="style">{item.name}</td>
                    <td className="style">{item.email}</td>
                    <td className="style">{item.role}</td>
                    <td>
                      <Button variant="info" size="sm" onClick={() => handleEdit(item.id)}>Edit</Button>
                    </td>
                  </tr>
                )
              ))}
            </tbody>
          </Table>
        </div>
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          containerClassName='pagination'
          pageLinkClassName='page-num'
          previousLinkClassName='page-num'
          nextLinkClassName='page-num'
          activeLinkClassName='active'
        />
      </>
    )
  }
  
  export default Layout;