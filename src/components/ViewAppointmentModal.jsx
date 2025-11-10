// 📁 src/components/ViewAppointmentModal.jsx
import React from "react";
import { Modal, Button, Badge } from "react-bootstrap";

const ViewAppointmentModal = ({ show, handleClose, schedule }) => {
  if (!schedule) return null;

  const patient = schedule.patient || {};

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    return d.toLocaleDateString();
  };

  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Appointment Details</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="mb-3 p-3 border rounded shadow-sm">
          <div className="row mb-2">
            <div className="col-md-4 fw-bold">Patient Name:</div>
            <div className="col-md-8">
              {patient.firstName} {patient.lastName}
            </div>
          </div>

          <div className="row mb-2">
            <div className="col-md-4 fw-bold">MRN:</div>
            <div className="col-md-8">{patient.mrn || "N/A"}</div>
          </div>

          <div className="row mb-2">
            <div className="col-md-4 fw-bold">Phone:</div>
            <div className="col-md-8">{patient.phone || "N/A"}</div>
          </div>

          <div className="row mb-2">
            <div className="col-md-4 fw-bold">Date:</div>
            <div className="col-md-8">{formatDate(schedule.date)}</div>
          </div>

          <div className="row mb-2">
            <div className="col-md-4 fw-bold">Time:</div>
            <div className="col-md-8">
              {schedule.startTime} - {schedule.endTime}
            </div>
          </div>

          <div className="row mb-2">
            <div className="col-md-4 fw-bold">Station / Chair:</div>
            <div className="col-md-8">{schedule.station || schedule.bed}</div>
          </div>

          <div className="row mb-2">
            <div className="col-md-4 fw-bold">Status:</div>
            <div className="col-md-8">
              <Badge
                bg={
                  schedule.status.includes("Scheduled")
                    ? "info"
                    : schedule.status.includes("Completed")
                    ? "success"
                    : "danger"
                }
              >
                {schedule.status}
              </Badge>
            </div>
          </div>

          <div className="row mb-2">
            <div className="col-md-4 fw-bold">Cancel Requested:</div>
            <div className="col-md-8">{schedule.cancel?.requested ? "Yes" : "No"}</div>
          </div>

          <div className="row mb-2">
            <div className="col-md-4 fw-bold">Cancel Approved:</div>
            <div className="col-md-8">{schedule.cancel?.approved ? "Yes" : "No"}</div>
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ViewAppointmentModal;
