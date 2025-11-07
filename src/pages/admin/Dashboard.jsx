import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import "../../styles/adminDashboard.css";
import "../../styles/global.css";
import ChairUtilization from "../../components/ChairUtilization";
import TodaysAppointments from "../../components/TodaysAppointments";
import BedAvailabilityCard from "../../components/BedAvailabilityCard";
import Slider from "../../components/Slider";


const AdminDashboard = () => {
  // Temporary dummy data (will connect to backend later)
  const totalPatients = 42;
  const totalBeds = 20;
  const availableBeds = 8;
  const reservedBeds = totalBeds - availableBeds;

  const bedStatus = [
    { id: 1, name: "Bed A1", status: "Available" },
    { id: 2, name: "Bed A2", status: "Reserved" },
    { id: 3, name: "Bed B1", status: "Available" },
    { id: 4, name: "Bed B2", status: "Reserved" },
  ];

  return (
    <>
      <Navbar />
      <Slider />

      <div className="container my-5">
        <h2 className="mb-4 fw-bold ">
          Admin Dashboard
        </h2>

        {/* Cards Section */}
        <div className="row text-center mb-4">
          <div className="col-md-4 mb-3">
            <div className="card shadow-sm border-0 rounded-3 p-3">
              <h5 className="text-muted">Total Patients</h5>
              <h3 className="fw-bold text-primary">{totalPatients}</h3>
            </div>
          </div>

          <div className="col-md-4 mb-3">
            <div className="card shadow-sm border-0 rounded-3 p-3">
              <h5 className="text-muted">Total Beds</h5>
              <h3 className="fw-bold text-success">{totalBeds}</h3>
            </div>
          </div>

          <div className="col-md-4 mb-3">
            <div className="card shadow-sm border-0 rounded-3 p-3">
              <h5 className="text-muted">Available Beds</h5>
              <h3 className="fw-bold text-info">{availableBeds}</h3>
            </div>
          </div>
        </div>

        {/* Bed Status Table */}
        <div className="card border-0">
            <p className="fw-bold fs-4 px-2">Bed Availability Status</p>
          <div className="card-body">
            <table className="table table-bordered rounded-3 table-hover align-middle">
              <thead className="table-success text-center">
                <tr>
                  <th>#</th>
                  <th>Bed Name</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {bedStatus.map((bed) => (
                  <tr key={bed.id}>
                    <td>{bed.id}</td>
                    <td>{bed.name}</td>
                    <td>
                      <span
                        className={`p-1 fw-semibold ${
                          bed.status === "Available"
                            ? "text-success"
                            : "text-danger"
                        }`}
                      >
                        {bed.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ChairUtilization />
      <div className="container my-5">
        <div class="row">
          <div class="col-sm-8">
            <div class="card border-0">
              <TodaysAppointments />
            </div>
          </div>
          <div class="col-sm-4">
            <div class="card border-0">
              <BedAvailabilityCard />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AdminDashboard;
