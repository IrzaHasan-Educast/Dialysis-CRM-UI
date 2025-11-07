import React, { useState, useEffect } from "react";
import "../../styles/PatientTable.css";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import PatientTable from "../../components/PatientTable";
import AddPatientModal from "../../components/AddPatientModal";
import EditPatientModal from "../../components/EditPatientModal";

const PatientManagement = () => {
  const [patients, setPatients] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  // Dummy Data (for demo)
  useEffect(() => {
    const dummyData = [
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
    setPatients(dummyData);
  }, []);

  // Delete patient
  const handleDelete = (mrn) => {
    if (window.confirm("Are you sure you want to delete this patient?")) {
      setPatients(patients.filter((p) => p.mrn !== mrn));
    }
  };

  // Add new patient
  const handleAddPatient = (newPatient) => {
    setPatients([...patients, newPatient]);
  };

  // Edit patient (open modal)
  const handleEdit = (patient) => {
    setSelectedPatient(patient);
    setShowEditModal(true);
  };

  // Save updated patient
  const handleSaveEdit = (updatedPatient) => {
    const updatedList = patients.map((p) =>
      p.mrn === updatedPatient.mrn ? updatedPatient : p
    );
    setPatients(updatedList);
    setShowEditModal(false);
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5 p-4">
        {/* Header Section */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="fw-bold page-title">Patient Management</h2>
            <p className="text-muted">Manage patient profiles and details</p>
          </div>
          <div>
            <button
              className="btn btn-teal me-2"
              onClick={() => setShowAddModal(true)}
            >
              + Add New Patient
            </button>
            {/* <button className="btn btn-outline-secondary">Export Data</button> */}
          </div>
        </div>

        {/* Patient Table */}
        <PatientTable
          patients={patients}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      </div>

      {/* Add Patient Modal */}
      <AddPatientModal
        show={showAddModal}
        handleClose={() => setShowAddModal(false)}
        onSave={handleAddPatient}
      />

      {/* Edit Patient Modal */}
      {selectedPatient && (
        <EditPatientModal
          show={showEditModal}
          handleClose={() => setShowEditModal(false)}
          patient={selectedPatient}
          handleSave={handleSaveEdit}   // ✅ renamed correctly
        />
      )}

      <Footer />
    </>
  );
};

export default PatientManagement;
