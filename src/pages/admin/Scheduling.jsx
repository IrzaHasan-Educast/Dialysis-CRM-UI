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

const Scheduling = () => {
    const [selectedDate, setSelectedDate] = useState(new Date(2025, 10, 7));
    const [showModal, setShowModal] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [selectedSchedule, setSelectedSchedule] = useState(null);
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [selectedCancel, setSelectedCancel] = useState(null);

  // 💾 Dummy chairs
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

  // 💾 Dummy schedule data
  const [schedules, setSchedules] = useState([
    {
      id: 1,
      patient: "Ali Khan",
      bed: "Bed 03",
      date: "2025-11-05",
      startTime: "09:00 AM",
      endTime: "11:00 AM",
      status: "Scheduled",
    },
    {
      id: 2,
      patient: "Sara Ahmed",
      bed: "Bed 02",
      date: "2025-11-05",
      startTime: "12:00 PM",
      endTime: "02:00 PM",
      status: "Completed",
    },
    {
      id: 3,
      patient: "John Doe",
      bed: "Bed 07",
      date: "2025-11-05",
      startTime: "03:00 PM",
      endTime: "05:00 PM",
      status: "Cancelled",
    },
  ]);

  const stats = {
    total: 12,
    completed: 3,
    inProgress: 2,
    scheduled: 7,
    utilization: 75,
  };

  // 🗓️ Calendar rendering
  const renderCalendar = () => {
    const days = [];
    for (let i = 1; i <= 30; i++) {
      days.push(
        <div
          key={i}
          className={`calendar-day ${
            selectedDate.getDate() === i ? "selected" : ""
          }`}
          onClick={() => setSelectedDate(new Date(2025, 10, i))}
        >
          {i}
        </div>
      );
    }
    return days;
  };

  // 🛠️ Handlers
  const handleEdit = (schedule) => {
    setSelectedSchedule(schedule);
    setEditMode(true);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this schedule?")) {
      setSchedules(schedules.filter((s) => s.id !== id));
    }
  };

  const handleApproveClick = (schedule) => {
  setSelectedCancel(schedule);
  setShowCancelModal(true);
};

//  const handleApproveCancel = async (id) => {
//   try {
//     const res = await fetch(`/api/schedules/${id}/approveCancel`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//     });
//     const data = await res.json();
//     if (res.ok) {
//       alert("✅ Cancellation approved successfully.");
//       setSchedules((prev) =>
//         prev.map((s) => (s.id === id ? data.schedule : s))
//       );
//     } else {
//       alert(data.message || "Error approving cancellation.");
//     }
//   } catch (err) {
//     console.error("approveCancel error:", err);
//   }
// };


const handleApproveCancel = (id) => {
  if (!window.confirm("Approve this cancellation request?")) return;

  // simulate approval on frontend
  setSchedules((prev) =>
    prev.map((s) =>
      s.id === id ? { ...s, status: "Cancelled (Approved)" } : s
    )
  );

  alert("✅ Cancellation approved (simulated)");
};


  const handleView = (schedule) => {
    alert(`Viewing appointment details for ${schedule.patient}`);
  };

  const handleSaveAppointment = (formData) => {
    if (editMode && selectedSchedule) {
      const updated = schedules.map((s) =>
        s.id === selectedSchedule.id
          ? {
              ...s,
              patient: formData.patientName,
              bed: formData.bed,
              date: formData.date,
              startTime: formData.startTime,
              endTime: formData.endTime,
              status: formData.status || "Scheduled",
            }
          : s
      );
      setSchedules(updated);
    } else {
      const newSchedule = {
        id: schedules.length + 1,
        patient: formData.patientName,
        bed: formData.bed,
        date: formData.date,
        startTime: formData.startTime,
        endTime: formData.endTime,
        status: "Scheduled",
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
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h3 className="fw-bold">Appointment Scheduling</h3>
            <p className="text-muted">
              Visual calendar and chair allocation for dialysis sessions
            </p>
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

        {/* Calendar and Chair Section */}
        <div className="row">
          <div className="col-lg-8 mb-4">
            <Card className="shadow-sm border-0 p-3">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <Button variant="outline-secondary" size="sm">
                  ‹
                </Button>
                <h5 className="mb-0">November 2025</h5>
                <Button variant="outline-secondary" size="sm">
                  ›
                </Button>
              </div>
              <div className="calendar-grid">{renderCalendar()}</div>
            </Card>
          </div>

          <div className="col-lg-4">
            <Card className="shadow-sm border-0 mb-4 p-3">
              <h6 className="fw-bold mb-3">Chair Status</h6>
              <div className="d-flex flex-wrap gap-2">
                {chairs.map((c) => (
                  <div
                    key={c.id}
                    className={`chair-box ${c.status.toLowerCase()}`}
                  >
                    {c.id}
                  </div>
                ))}
              </div>
              <ul className="list-unstyled small mt-3 mb-0">
                <li>
                  <CircleFill color="green" size={10} /> Available Chairs:{" "}
                  {chairs.filter((c) => c.status === "Available").length}
                </li>
                <li>
                  <CircleFill color="red" size={10} /> Occupied Chairs:{" "}
                  {chairs.filter((c) => c.status === "Occupied").length}
                </li>
                <li>
                  <CircleFill color="gold" size={10} /> Maintenance:{" "}
                  {chairs.filter((c) => c.status === "Maintenance").length}
                </li>
              </ul>
            </Card>

            <Card className="shadow-sm border-0 p-3">
              <h6 className="fw-bold mb-3">Today's Stats</h6>
              <ul className="list-unstyled mb-0">
                <li>Total Appointments: {stats.total}</li>
                <li>Completed: {stats.completed}</li>
                <li>In Progress: {stats.inProgress}</li>
                <li>Scheduled: {stats.scheduled}</li>
                <li>
                  Utilization Rate:{" "}
                  <span className="fw-bold text-primary">
                    {stats.utilization}%
                  </span>
                </li>
              </ul>
            </Card>
          </div>
        </div>

        {/* Schedule Table */}
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

      <Footer />
    </>
  );
};

export default Scheduling;
