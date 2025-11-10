import React, { useState, useEffect } from "react";
import { Modal, Button, Form, ProgressBar } from "react-bootstrap";
// import { getAllPatients } from "../../services/api";

const NewAppointmentModal = ({
  show,
  handleClose,
  handleSave,
  editMode,
  existingData,
}) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    patientId: "",
    patientName: "",
    gender: "",
    phone: "",
    date: "",
    startTime: "",
    endTime: "",
    bed: "",
    type: "",
  });

  const [patients, setPatients] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPatients, setFilteredPatients] = useState([]);

  // // 🔹 Load Patients from API
  // useEffect(() => {
  //   const fetchPatients = async () => {
  //     try {
  //       const data = await getAllPatients();
  //       const formatted = data.map((p) => ({
  //         id: p.id,
  //         name: p.fullName,
  //         gender: p.gender,
  //         phone: p.phone,
  //       }));
  //       setPatients(formatted);
  //     } catch (error) {
  //       console.error("Error fetching patients:", error);
  //     }
  //   };

  //   fetchPatients();
  // }, []);

  // // 🔹 Populate data in edit mode
  // useEffect(() => {
  //   if (editMode && existingData) {
  //     setFormData({
  //       patientId: existingData.patientId || "",
  //       patientName: existingData.patient || "",
  //       gender: existingData.gender || "",
  //       phone: existingData.phone || "",
  //       date: existingData.date || "",
  //       startTime: existingData.startTime || "",
  //       endTime: existingData.endTime || "",
  //       bed: existingData.bed || "",
  //       type: existingData.type || "Dialysis",
  //     });
  //     setStep(2); // Skip to step 2 for editing
  //   }
  // }, [editMode, existingData]);

// 🔹 Dummy patients data (frontend only)
  useEffect(() => {
    const dummyPatients = [
      { id: 1, name: "Ali Raza", gender: "Male", phone: "03001234567" },
      { id: 2, name: "Sara Khan", gender: "Female", phone: "03119876543" },
      { id: 3, name: "Ahmed Malik", gender: "Male", phone: "03215558888" },
      { id: 4, name: "Fatima Noor", gender: "Female", phone: "03451231234" },
    ];
    setPatients(dummyPatients);
  }, []);

  // 🔹 Populate data in edit mode
  useEffect(() => {
    if (editMode && existingData) {
      setFormData({
        patientId: existingData.patientId || "",
        patientName: existingData.patient || "",
        gender: existingData.gender || "",
        phone: existingData.phone || "",
        date: existingData.date || "",
        startTime: existingData.startTime || "",
        endTime: existingData.endTime || "",
        bed: existingData.bed || "",
        type: existingData.type || "Dialysis",
      });
      setStep(2); // Go to step 2 directly
    }
  }, [editMode, existingData]);

  // 🔍 Search by ID or Name
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = patients.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.id.toString().includes(query)
    );
    setFilteredPatients(filtered);
  };

  // 🧩 Select patient
  const selectPatient = (patient) => {
    setFormData((prev) => ({
      ...prev,
      patientId: patient.id,
      patientName: patient.name,
      gender: patient.gender,
      phone: patient.phone,
    }));
    setSearchQuery(patient.name);
    setFilteredPatients([]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);
  const progressValue = (step / 3) * 100;

  const onSave = () => {
    console.log("Saving new appointment:", formData);
    handleSave(formData);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>
          {editMode ? "Edit Appointment" : "New Appointment"}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <ProgressBar now={progressValue} className="mb-3" />

        {/* STEP 1 - Select Patient */}
        {step === 1 && (
          <>
            <h5 className="fw-bold mb-3">Select Patient</h5>
            <Form>
              <Form.Group className="mb-3 position-relative">
                <Form.Label>Search Patient</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Search by name or ID..."
                  value={searchQuery}
                  onChange={handleSearch}
                />

                {searchQuery && filteredPatients.length > 0 && (
                  <div
                    className="border position-absolute bg-white w-100 shadow-sm rounded"
                    style={{
                      zIndex: 10,
                      maxHeight: "180px",
                      overflowY: "auto",
                    }}
                  >
                    {filteredPatients.map((p) => (
                      <div
                        key={p.id}
                        className="p-2 cursor-pointer hover-bg-light"
                        onClick={() => selectPatient(p)}
                      >
                        <strong>{p.name}</strong> —{" "}
                        <small className="text-muted ms-2">ID: {p.id}</small>
                      </div>
                    ))}
                  </div>
                )}
              </Form.Group>

              {/* Optional Dropdown Fallback */}
              <Form.Group className="mb-3">
                <Form.Label>Select from List (Optional)</Form.Label>
                <Form.Select
                  onChange={(e) => {
                    const selected = patients.find(
                      (p) => p.id === Number(e.target.value)
                    );
                    if (selected) selectPatient(selected);
                  }}
                  value={formData.patientId}
                >
                  <option value="">-- Select Patient --</option>
                  {patients.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} (ID: {p.id})
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              {formData.patientId && (
                <>
                  <Form.Group className="mb-3">
                    <Form.Label>Patient ID</Form.Label>
                    <Form.Control value={formData.patientId} disabled />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Gender</Form.Label>
                    <Form.Control value={formData.gender} disabled />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control value={formData.phone} disabled />
                  </Form.Group>
                </>
              )}
            </Form>
          </>
        )}

        {/* STEP 2 - Session Info */}
        {step === 2 && (
          <>
            <h5 className="fw-bold mb-3">Session Information</h5>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                />
              </Form.Group>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <Form.Label>Start Time</Form.Label>
                  <Form.Control
                    type="time"
                    name="startTime"
                    value={formData.startTime}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <Form.Label>End Time</Form.Label>
                  <Form.Control
                    type="time"
                    name="endTime"
                    value={formData.endTime}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <Form.Group className="mb-3">
                <Form.Label>Chair</Form.Label>
                <Form.Select
                  name="bed"
                  value={formData.bed}
                  onChange={handleChange}
                >
                  <option value="">Select Chair</option>
                  {[...Array(12)].map((_, i) => (
                    <option key={i + 1}>Chair {i + 1}</option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Session Type</Form.Label>
                <Form.Select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option>Dialysis</option>
                  <option>Consultation</option>
                  <option>Follow-up</option>
                </Form.Select>
              </Form.Group>
            </Form>
          </>
        )}

        {/* STEP 3 - Confirmation */}
        {step === 3 && (
          <>
            <h5 className="fw-bold mb-3">Confirm Appointment</h5>
            <ul className="list-group">
              <li className="list-group-item">
                <strong>Patient:</strong> {formData.patientName} (
                {formData.patientId})
              </li>
              <li className="list-group-item">
                <strong>Phone:</strong> {formData.phone}
              </li>
              <li className="list-group-item">
                <strong>Date:</strong> {formData.date}
              </li>
              <li className="list-group-item">
                <strong>Time:</strong> {formData.startTime} -{" "}
                {formData.endTime}
              </li>
              <li className="list-group-item">
                <strong>Chair:</strong> {formData.bed}
              </li>
              <li className="list-group-item">
                <strong>Type:</strong> {formData.type}
              </li>
            </ul>
          </>
        )}
      </Modal.Body>

      <Modal.Footer>
        {step > 1 && (
          <Button variant="secondary" onClick={prevStep}>
            Back
          </Button>
        )}
        {step < 3 ? (
          <Button
            variant="success"
            onClick={nextStep}
            disabled={step === 1 && !formData.patientId}
          >
            Next
          </Button>
        ) : (
          <Button variant="success" onClick={onSave}>
            Confirm & Save
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default NewAppointmentModal;
