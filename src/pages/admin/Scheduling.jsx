import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Card, Button } from "react-bootstrap";
import "../../styles/Scheduling.css"; // optional styling file
import TodaysAppointments from "../../components/TodaysAppointments";
import ScheduleTable from "../../components/ScheduleTable";

const Scheduling = () => {
  // Dummy data
  const [selectedDate, setSelectedDate] = useState(new Date(2025, 10, 7)); // November 7, 2025

  const chairs = [
    { id: 1, status: "Occupied" },
    { id: 2, status: "Available" },
    { id: 3, status: "Occupied" },
    { id: 4, status: "Available" },
    { id: 5, status: "Available" },
    { id: 6, status: "Maintenance" },
    { id: 7, status: "Available" },
    { id: 8, status: "Available" },
    { id: 9, status: "Available" },
    { id: 10, status: "Available" },
    { id: 11, status: "Available" },
    { id: 12, status: "Available" },
  ];

  const todaySchedule = [
    { name: "John Smith", time: "9:00 AM – 1:00 PM", station: "Station 3" },
    { name: "Maria Rodriguez", time: "9:30 AM – 1:30 PM", station: "Station 7" },
    { name: "Robert Johnson", time: "10:00 AM – 2:00 PM", station: "Station 2" },
    { name: "Linda Davis", time: "10:30 AM – 2:30 PM", station: "Station 5" },
  ];

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

  return (
    <>
      <Navbar />
      <div className="container p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h3 className="fw-bold">Appointment Scheduling</h3>
            <p className="text-muted">
              Visual calendar and chair allocation for dialysis sessions
            </p>
          </div>
          <Button variant="teal">+ New Appointment</Button>
        </div>

        <div className="row">
          {/* Left side: Calendar */}
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


          {/* Right side: Chair Status + Schedule + Stats */}
          <div className="col-lg-4">
            {/* Chair Status */}
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
                  🟢 Available Chairs:{" "}
                  {chairs.filter((c) => c.status === "Available").length}
                </li>
                <li>
                  🔴 Occupied Chairs:{" "}
                  {chairs.filter((c) => c.status === "Occupied").length}
                </li>
                <li>
                  🟡 Maintenance:{" "}
                  {chairs.filter((c) => c.status === "Maintenance").length}
                </li>
              </ul>
            </Card>

            {/* Today’s Schedule */}
            <Card className="shadow-sm border-0 mb-4 p-3">
              <h6 className="fw-bold mb-3">Today's Schedule</h6>
              {todaySchedule.map((s, index) => (
                <div
                  key={index}
                  className="d-flex justify-content-between align-items-center schedule-item mb-2 p-2 rounded"
                >
                  <div>
                    <strong>{s.name}</strong>
                    <div className="text-muted small">{s.time}</div>
                  </div>
                  <span className="badge bg-teal">{s.station}</span>
                </div>
              ))}
              <div className="text-end mt-2">
                <Button variant="link" className="text-teal p-0">
                  View Full Schedule →
                </Button>
              </div>
            </Card>

            {/* Stats */}
            <Card className="shadow-sm border-0 p-3">
              <h6 className="fw-bold mb-3">Today's Stats</h6>
              <ul className="list-unstyled mb-0">
                <li>Total Appointments: {stats.total}</li>
                <li>Completed: {stats.completed}</li>
                <li>In Progress: {stats.inProgress}</li>
                <li>Scheduled: {stats.scheduled}</li>
                <li>
                  Utilization Rate:{" "}
                  <span className="fw-bold text-teal">
                    {stats.utilization}%
                  </span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
        <div>
            {/* <ScheduleTable /> */}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Scheduling;
