// 📁 src/pages/admin/Scheduling.jsx
import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Card, Button } from "react-bootstrap";
import { CircleFill } from "react-bootstrap-icons";
import "../../styles/Scheduling.css";
import ScheduleTable from "../../components/ScheduleTable";
import NewAppointmentModal from "../../components/NewAppointmentModal";
import CancelApprovalModal from "../../components/CancelApprovalModal";
import ViewAppointmentModal from "../../components/ViewAppointmentModal";

const Scheduling = () => {
  const [selectedDate, setSelectedDate] = useState(new Date(2025, 10, 7));
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedCancel, setSelectedCancel] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedView, setSelectedView] = useState(null);

  const chairs = [
    { id: 1, status: "Occupied" },
    { id: 2, status: "Available" },
    { id: 3, status: "Occupied" },
    { id: 4, status: "Available" },
    { id: 5, status: "Available" },
    { id: 6, status: "Maintenance" },
    { id: 7, status: "Available" },
    { id: 8, status: "Available" },
  ];

  const [schedules, setSchedules] = useState([
    {
      _id: "690afc40dc1e20155edb8b3e",
      patient: {
        _id: "690aefaa22a57c1d3986f839",
        mrn: "12",
        firstName: "Amir",
        lastName: "Munir",
        phone: "03001234567",
      },
      date: "2025-11-01T00:00:00.000Z",
      startTime: "20:00",
      endTime: "22:00",
      station: "Machine 3",
      nurse: "690afb3cdc1e20155edb8b34",
      status: "Scheduled",
      cancel: { requested: false, approved: false },
    },
    {
      _id: "690afc40dc1e20155edb8b4f",
      patient: {
        _id: "690aefaa22a57c1d3986f839",
        mrn: "15",
        firstName: "Sara",
        lastName: "Ahmed",
        phone: "03119876543",
      },
      date: "2025-11-02T00:00:00.000Z",
      startTime: "10:00",
      endTime: "12:00",
      station: "Machine 1",
      nurse: "690afb3cdc1e20155edb8b35",
      status: "Completed",
      cancel: { requested: false, approved: false },
    },
  ]);

  const stats = {
    total: 12,
    completed: 3,
    inProgress: 2,
    scheduled: 7,
    utilization: 75,
  };

  const renderCalendar = () => {
    const days = [];
    for (let i = 1; i <= 30; i++) {
      days.push(
        <div
          key={i}
          className={`calendar-day ${selectedDate.getDate() === i ? "selected" : ""}`}
          onClick={() => setSelectedDate(new Date(2025, 10, i))}
        >
          {i}
        </div>
      );
    }
    return days;
  };

  const handleChairClick = (chairId) => {
  // Find schedule for this chair on the selected date
    const schedule = schedules.find(
    (s) =>
      s.station === `Machine ${chairId}` &&
      new Date(s.date).toDateString() === selectedDate.toDateString()
    );

    if (schedule) {
      setSelectedView(schedule);
      setShowViewModal(true);
    } else {
      alert("No schedule found for this machine on selected date");
    }
  };


  // Handlers
  const handleEdit = (schedule) => {
    setSelectedSchedule(schedule);
    setEditMode(true);
    setShowModal(true);
  };

  const handleDelete = (_id) => {
    if (window.confirm("Are you sure you want to delete this schedule?")) {
      setSchedules(schedules.filter((s) => s._id !== _id));
    }
  };

  const handleApproveCancel = (_id) => {
    if (!window.confirm("Approve this cancellation request?")) return;
    setSchedules((prev) =>
      prev.map((s) => (s._id === _id ? { ...s, status: "Cancelled (Approved)" } : s))
    );
    alert("✅ Cancellation approved (simulated)");
  };

  const handleView = (schedule) => {
    setSelectedView(schedule);
    setShowViewModal(true);
  };

  const handleSaveAppointment = (formData) => {
    if (editMode && selectedSchedule) {
      const updated = schedules.map((s) =>
        s._id === selectedSchedule._id
          ? {
              ...s,
              patient: {
                ...s.patient,
                firstName: formData.firstName || "",
                lastName: formData.lastName || "",
                phone: formData.phone || "",
              },
              station: formData.bed,
              date: formData.date,
              startTime: formData.startTime,
              endTime: formData.endTime,
              status: "Scheduled",
            }
          : s
      );
      setSchedules(updated);
    } else {
      const newSchedule = {
        _id: Date.now().toString(),
        patient: {
          _id: Date.now().toString(),
          mrn: "XX",
          firstName: formData.firstName || "",
          lastName: formData.lastName || "",
          phone: formData.phone || "",
        },
        date: formData.date,
        startTime: formData.startTime,
        endTime: formData.endTime,
        station: formData.bed,
        nurse: "DummyNurseID",
        status: "Scheduled",
        cancel: { requested: false, approved: false },
      };
      setSchedules([...schedules, newSchedule]);
    }
    setShowModal(false);
    setEditMode(false);
    setSelectedSchedule(null);
  };

  return (
    <>
      <Navbar />
      <div className="container p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h3 className="fw-bold">Appointment Scheduling</h3>
            <p className="text-muted">Visual calendar and chair allocation for dialysis sessions</p>
          </div>
          <Button
            variant="primary"
            onClick={() => {
              setEditMode(false);
              setShowModal(true);
            }}
          >
            + New Appointment
          </Button>
        </div>

        <div className="row">
          <div className="col-lg-8 mb-4">
            <Card className="shadow-sm border-0 p-3">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <Button variant="outline-secondary" size="sm">‹</Button>
                <h5 className="mb-0">November 2025</h5>
                <Button variant="outline-secondary" size="sm">›</Button>
              </div>
              <div className="calendar-grid">{renderCalendar()}</div>
            </Card>
          </div>

          <div className="col-lg-4">
            <Card className="shadow-sm border-0 mb-4 p-3">
              <h6 className="fw-bold mb-3">Chair Status</h6>
              <div className="d-flex flex-wrap gap-2">
                {chairs.map((c) => (
                  <div key={c.id} className={`chair-box ${c.status.toLowerCase()}`}>{c.id}</div>
                ))}
              </div>
              <ul className="list-unstyled small mt-3 mb-0">
                <li><CircleFill color="green" size={10} /> Available Chairs: {chairs.filter((c) => c.status === "Available").length}</li>
                <li><CircleFill color="red" size={10} /> Occupied Chairs: {chairs.filter((c) => c.status === "Occupied").length}</li>
                <li><CircleFill color="gold" size={10} /> Maintenance: {chairs.filter((c) => c.status === "Maintenance").length}</li>
              </ul>
            </Card>

            <Card className="shadow-sm border-0 p-3">
              <h6 className="fw-bold mb-3">Today's Stats</h6>
              <ul className="list-unstyled mb-0">
                <li>Total Appointments: {stats.total}</li>
                <li>Completed: {stats.completed}</li>
                <li>In Progress: {stats.inProgress}</li>
                <li>Scheduled: {stats.scheduled}</li>
                <li>Utilization Rate: <span className="fw-bold text-primary">{stats.utilization}%</span></li>
              </ul>
            </Card>
          </div>
        </div>

        <ScheduleTable
          schedules={schedules}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onView={handleView}
          onApproveCancel={handleApproveCancel}
        />
      </div>

      {showModal && (
        <NewAppointmentModal
          show={showModal}
          handleClose={() => setShowModal(false)}
          handleSave={handleSaveAppointment}
          editMode={editMode}
          existingData={selectedSchedule}
        />
      )}

      <CancelApprovalModal
        show={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        schedule={selectedCancel}
        onApprove={handleApproveCancel}
      />

      {showViewModal && (
        <ViewAppointmentModal
          show={showViewModal}
          handleClose={() => setShowViewModal(false)}
          schedule={selectedView}
        />
      )}

      <Footer />
    </>
  );
};

export default Scheduling;
