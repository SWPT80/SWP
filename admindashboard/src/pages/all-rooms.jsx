// File: AllRoomsPage.jsx
import React from 'react';


const AllRooms = () => {
  return (
    <div className="main-wrapper">
 
      <div className="page-wrapper">
        <div className="content container-fluid">
          <div className="page-header">
            <div className="row align-items-center">
              <div className="col">
                <div className="mt-5">
                  <h4 className="card-title float-left mt-2">All Rooms</h4>
                  <a href="/add-room" className="btn btn-primary float-right veiwbutton">Add Room</a>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <div className="card card-table">
                <div className="card-body booking_card">
                  <div className="table-responsive">
                    <table className="table table-hover table-center mb-0">
                      <thead>
                        <tr>
                          <th>Room ID</th>
                          <th>Homestay ID</th>
                          <th>Image</th>
                          <th>Room Number</th>
                          <th>Room Type</th>
                          <th>Capacity</th>
                          <th>Price</th>
                          <th>Status</th>
                          <th className="text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[...Array(3)].map((_, idx) => (
                          <tr key={idx}>
                            <td>1</td>
                            <td>1</td>
                            <td>
                              <h2 className="table-avatar">
                                <img className="avatar-img rounded-circle" src="assets/img/profiles/avatar-03.jpg" alt="User" width="30" />
                                Tommy Bernal <span>#0001</span>
                              </h2>
                            </td>
                            <td>R101</td>
                            <td>Family</td>
                            <td>10</td>
                            <td>850.000đ</td>
                            <td>
                              <span className="badge badge-success">Active</span>
                            </td>
                            <td className="text-right">
                              <div className="dropdown dropdown-action">
                                <button className="btn btn-sm bg-success-light mr-2">Edit</button>
                                <button className="btn btn-sm bg-danger-light">Delete</button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllRooms;