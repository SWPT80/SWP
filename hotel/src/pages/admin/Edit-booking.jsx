import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EditBooking = () => {
  const { id: bookingId } = useParams();

  const [booking, setBooking] = useState({
    userFullName: '',
    checkInDate: '',
    checkOutDate: '',
    status: '',
    totalAmount: '',
    note: '',
  });

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (bookingId) {
      axios.get(`http://localhost:8080/api/bookings/${bookingId}/with-user-info`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => setBooking(res.data))
        .catch((err) => {
          console.error("Lỗi lấy booking:", err.response?.data || err.message);
          alert("Không tìm thấy thông tin booking.");
        });
    }
  }, [bookingId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBooking(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    const token = localStorage.getItem("token");

    axios.put(`http://localhost:8080/api/bookings/${bookingId}`, booking, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => alert("Cập nhật booking thành công"))
      .catch(err => {
        console.error("Lỗi cập nhật:", err);
        alert("Cập nhật thất bại.");
      });
  };

  return (
    <div className="main-wrapper">
      <div className="page-wrapper">
        <div className="content container-fluid">
          <div className="page-header">
            <div className="row align-items-center">
              <div className="col">
                <h3 className="page-title mt-5">Edit Booking</h3>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12">
              <form>
                <div className="row formtype">
                  <div className="col-md-4">
                    <div className="form-group">
                      <label>Customer Name</label>
                      <input
                        className="form-control"
                        name="userFullName"
                        value={booking.userFullName || ''}
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="form-group">
                      <label>Check In</label>
                      <input
                        type="date"
                        className="form-control"
                        name="checkInDate"
                        value={booking.checkInDate}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="form-group">
                      <label>Check Out</label>
                      <input
                        type="date"
                        className="form-control"
                        name="checkOutDate"
                        value={booking.checkOutDate}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="form-group">
                      <label>Status</label>
                      <select
                        className="form-control"
                        name="status"
                        value={booking.status}
                        onChange={handleChange}
                      >
                        <option value="Booked">Booked</option>
                        <option value="Checked In">Checked In</option>
                        <option value="Checked Out">Checked Out</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="form-group">
                      <label>Total Amount</label>
                      <input
                        type="number"
                        className="form-control"
                        name="totalAmount"
                        value={booking.totalAmount}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="form-group">
                      <label>Note</label>
                      <textarea
                        className="form-control"
                        name="note"
                        rows="3"
                        placeholder="Any additional notes..."
                        value={booking.note || ''}
                        onChange={handleChange}
                      ></textarea>
                    </div>
                  </div>
                </div>

                <button type="button" className="btn btn-primary" onClick={handleSave}>
                  Save Changes
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default EditBooking;
