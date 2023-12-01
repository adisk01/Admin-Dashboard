import React, { useState ,useEffect } from 'react'
import {Button, Table } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import './Layout.css'
const Layout = (props) => {

    const { data } = props;
    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 10;
    const handleCheckboxChange = async () => {

    }
    const handleEdit = async () => {
  
    }
    const handleDelete = async () => {
  
    }
    useEffect(() => {
        const endoffset = itemOffset + itemsPerPage;
        setCurrentItems(data.slice(itemOffset, endoffset));
        setPageCount(Math.ceil(data.length / itemsPerPage));

    }, [itemOffset, itemsPerPage, data]);
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % data.length;
        setItemOffset(newOffset);
    };

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
                        {currentItems.map((item) => (
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

export default Layout