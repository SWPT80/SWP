// File: AddRoomPage.jsx
import React from 'react';


const AddRoom = () => {
  return (
    <div className="main-wrapper">
    
      <div className="page-wrapper">
        <div className="content container-fluid">
          <div className="page-header">
            <div className="row align-items-center">
              <div className="col">
                <h3 className="page-title mt-5">Add Room</h3>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <form>
                <div className="row formtype">
                  {[
                    { label: "Homestay ID", value: "BKG-0001" },
                    { label: "Room Number" },
                    { label: "Capacity" },
                    { label: "Price" }
                  ].map((field, index) => (
                    <div className="col-md-4" key={index}>
                      <div className="form-group">
                        <label>{field.label}</label>
                        <input className="form-control" type="text" defaultValue={field.value || ''} />
                      </div>
                    </div>
                  ))}

                  <div className="col-md-4">
                    <div className="form-group">
                      <label>Room Type</label>
                      <select className="form-control">
                        <option>Vip</option>
                        <option>Family</option>
                        <option>PenHouse</option>
                        <option>...</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="form-group">
                      <label>File Upload</label>
                      <input type="file" className="form-control" />
                    </div>
                  </div>
                </div>
              </form>
              <button type="button" className="btn btn-primary buttonedit ml-2">Save</button>
              <button type="button" className="btn btn-secondary buttonedit">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddRoom;