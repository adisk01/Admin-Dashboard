import React, { useState, useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import './Layout.css';
import PaginationComponent from './Paginate';

const Layout = (props) => {
  const { data } = props;

  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [editID, setEditID] = useState(-1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [filteredName, setFilteredName] = useState('');
  const [filteredRole, setFilteredRole] = useState('');
  const itemsPerPage = 10;

  const handleCheckboxChange = (id) => {
    if (id === 'all') {
      // If the "Select All" checkbox is clicked
      if (selectedItems.length === currentItems.length) {
        setSelectedItems([]);
      } else {
        const allItemIds = currentItems.map((item) => item.id);
        setSelectedItems(allItemIds);
      }
    } else {
      // If an individual checkbox is clicked
      if (selectedItems.includes(id)) {
        setSelectedItems((prev) => prev.filter((item) => item !== id));
      } else {
        setSelectedItems((prev) => [...prev, id]);
      }
    }
  };

  const handleEdit = (id) => {
    const editItem = data.find((item) => item.id === id);

    if (editItem) {
      setEditID(id);
      setName(editItem.name);
      setEmail(editItem.email);
      setRole(editItem.role);
    }
  };

  const handleDelete = () => {
    const updatedData = data.filter((item) => !selectedItems.includes(item.id));

    props.setData(updatedData);

    const startIndex = itemOffset;
    const endIndex = startIndex + itemsPerPage;
    const currentItemsAfterDelete = updatedData.slice(startIndex, endIndex);

    setCurrentItems(currentItemsAfterDelete);

    setPageCount(Math.ceil(updatedData.length / itemsPerPage));
    if (itemOffset >= pageCount * itemsPerPage) {
      setItemOffset(Math.max(0, (pageCount - 1) * itemsPerPage));
    }

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

      props.setData(updatedData);
      alert("Updated Sucessfully")
      const startIndex = itemOffset;
      const endIndex = startIndex + itemsPerPage;
      const currentItemsAfterUpdate = updatedData.slice(startIndex, endIndex);

      setCurrentItems(currentItemsAfterUpdate);

      setPageCount(Math.ceil(updatedData.length / itemsPerPage));

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

    if (itemOffset >= updatedPageCount * itemsPerPage) {
      setItemOffset(Math.max(0, (updatedPageCount - 1) * itemsPerPage));
    }
  }, [itemOffset, itemsPerPage, data]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.length;
    setItemOffset(newOffset);
  };

  const Filterbyname = (e) => {
    setFilteredName(e.target.value);
  };

  const Filterbyrole = (e) => {
    setFilteredRole(e.target.value);
  };

  const applyFilters = () => {
    const filteredData = data.filter((item) => {
      const nameMatch = item.name.toLowerCase().includes(filteredName.toLowerCase());
      const roleMatch = item.role.toLowerCase().includes(filteredRole.toLowerCase());
      return nameMatch && roleMatch;
    });

    const startIndex = itemOffset;
    const endIndex = startIndex + itemsPerPage;
    const currentItemsAfterFilter = filteredData.slice(startIndex, endIndex);

    setCurrentItems(currentItemsAfterFilter);

    setPageCount(Math.ceil(filteredData.length / itemsPerPage));

    if (itemOffset >= pageCount * itemsPerPage) {
      setItemOffset(Math.max(0, (pageCount - 1) * itemsPerPage));
    }
  };

  useEffect(() => {
    applyFilters();
  }, [filteredName, filteredRole, itemOffset, itemsPerPage, data]);
  return (
    <div className='filter' style={{ margin: '10rem' }}> 
        <div>
          <input className='namefilter' type="text" placeholder='Filter By Name' onChange={Filterbyname} />
          {'   '}
          <input className='rolefilter' type="text" placeholder='Filter By Role' onChange={Filterbyrole} />
        </div>
        <Button
        className='deleteall'
          variant="danger"
          size="sm"
          onClick={() => handleDelete()}
          style={{ marginBottom: '10px', float: 'right' }}
        >
          Delete Selected
        </Button>
        <Table className="Table" striped bordered hover size="sm">
          <thead className='tablehead'>
            <tr>
              <th>
                <input
                  type="checkbox"
                  onChange={() => handleCheckboxChange('all')}
                  checked={selectedItems.length === currentItems.length}
                />
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
                <tr key={item.id} className="selected">
                  <td>{item.id}</td>
                  <td><input type="text" value={name} onChange={(e) => setName(e.target.value)} /></td>
                  <td><input type="text" value={email} onChange={(e) => setEmail(e.target.value)} /></td>
                  <td><input type="text" value={role} onChange={(e) => setRole(e.target.value)} /></td>
                  <td><button className='update' onClick={() => handleUpdate(item.id)}>Update</button></td>
                </tr>
              ) : (
                <tr key={item.id} className={selectedItems.includes(item.id) ? 'selected' : ''}>
                  <td className="style"><input type="checkbox" onChange={() => handleCheckboxChange(item.id)} checked={selectedItems.includes(item.id)} /></td>
                  <td className="style">{item.id}</td>
                  <td className="style">{item.name}</td>
                  <td className="style">{item.email}</td>
                  <td className="style">{item.role}</td>
                  <td>
                    <Button className='edit' variant="info" size="sm" onClick={() => handleEdit(item.id)}>Edit</Button>
                    {'   '}
                    <Button className='delete' variant="info" size="sm" onClick={() => handleDelete(item.id)}>Delete</Button>
                  </td>
                </tr>
              )
            ))}
          </tbody>
        </Table>
     
      <PaginationComponent pageCount={pageCount} handlePageClick={handlePageClick} />
    </div>
  );
};

export default Layout;
