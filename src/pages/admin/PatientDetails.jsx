import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const dummyPatients = [
  {
    mrn: "13",
    firstName: "Azhar",
    lastName: "Khan",
    dob: "2000-01-01",
    gender: "M",
    phone: "923142371339",
    email: "azharkhan@gmail.com",
    address: "House No 123, Street 13A, Karachi",
    insurance: {
      provider: "BlueCross",
      memberId: "BC12345",
      groupNumber: "GRP67890",
    },
    dialysis: {
      modality: "HD",
      scheduleDays: ["Mon", "Wed", "Fri"],
      shift: "Morning",
    },
    status: "Active",
  },
  {
    mrn: "14",
    firstName: "Sara",
    lastName: "Ali",
    dob: "1998-06-15",
    gender: "F",
    phone: "923001234567",
    email: "saraali@example.com",
    address: "Block B, Lahore",
    insurance: {
      provider: "United Health",
      memberId: "UHC56789",
      groupNumber: "GRP99999",
    },
    dialysis: {
      modality: "PD",
      scheduleDays: ["Tue", "Thu", "Sat"],
      shift: "Evening",
    },
    status: "Active",
  },
];

const PatientDetails = () => {
  const { mrn } = useParams();
  const navigate = useNavigate();
  const patient = dummyPatients.find((p) => p.mrn === mrn);

  if (!patient) {
    return (
      <div className="container text-center mt-5">
        <h3>Patient not found</h3>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container mt-5 p-4">
        <button className="btn btn-outline-secondary mb-3" onClick={() => navigate(-1)}>
          <i className="bi bi-arrow-left"></i> Back
        </button>

        <h2 className="fw-bold mb-4">{`${patient.firstName} ${patient.lastName}`}</h2>

        {/* Personal Info */}
        <div className="card mb-3 shadow-sm">
          <div className="card-header bg-success text-white fw-bold">
            Personal Information
          </div>
          <div className="card-body">
            <p><strong>MRN:</strong> {patient.mrn}</p>
            <p><strong>DOB:</strong> {patient.dob}</p>
            <p><strong>Gender:</strong> {patient.gender}</p>
            <p><strong>Phone:</strong> {patient.phone}</p>
            <p><strong>Email:</strong> {patient.email}</p>
            <p><strong>Address:</strong> {patient.address}</p>
          </div>
        </div>

        {/* Insurance Info */}
        <div className="card mb-3 shadow-sm">
          <div className="card-header bg-primary text-white fw-bold">
            Insurance Information
          </div>
          <div className="card-body">
            <p><strong>Provider:</strong> {patient.insurance.provider}</p>
            <p><strong>Member ID:</strong> {patient.insurance.memberId}</p>
            <p><strong>Group Number:</strong> {patient.insurance.groupNumber}</p>
          </div>
        </div>

        {/* Dialysis Info */}
        <div className="card shadow-sm">
          <div className="card-header bg-info text-white fw-bold">
            Dialysis Information
          </div>
          <div className="card-body">
            <p><strong>Modality:</strong> {patient.dialysis.modality}</p>
            <p><strong>Schedule:</strong> {patient.dialysis.scheduleDays.join(", ")}</p>
            <p><strong>Shift:</strong> {patient.dialysis.shift}</p>
            <p><strong>Status:</strong> {patient.status}</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PatientDetails;
