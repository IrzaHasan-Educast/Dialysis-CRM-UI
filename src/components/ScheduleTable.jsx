// 📁 src/components/ScheduleTable.jsx
import React from "react";
import { PencilSquare, Trash, Eye } from "react-bootstrap-icons";
import "../styles/ScheduleTable.css";

const ScheduleTable = ({ schedules, onEdit, onDelete, onView }) => {
  return (
    <div className="card shadow-sm mt-4">
      <div className="card-header bg-light d-flex justify-content-between align-items-center">
        <h3 className="mb-0 fw-bold">Current Schedules</h3>
      </div>

      <div className="table-responsive">
        <table className="table table-striped align-middle text-center mb-0">
          <thead className="table-light">
            <tr>
              <th>#</th>
              <th>Patient</th>
              <th>Bed</th>
              <th>Date</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {schedules.length > 0 ? (
              schedules.map((s, index) => (
                <tr key={s.id}>
                  <td>{index + 1}</td>
                  <td>{s.patient}</td>
                  <td>{s.bed}</td>
                  <td>{s.date}</td>
                  <td>{s.startTime}</td>
                  <td>{s.endTime}</td>
                  <td>
                    <span
                      className={`badge ${
                        s.status === "Scheduled"
                          ? "bg-info text-dark"
                          : s.status === "Completed"
                          ? "bg-success"
                          : s.status === "Cancelled"
                          ? "bg-danger"
                          : "bg-secondary"
                      }`}
                    >
                      {s.status}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-outline-primary me-2"
                      onClick={() => onView(s)}
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      className="btn btn-sm btn-outline-warning me-2"
                      onClick={() => onEdit(s)}
                    >
                      <PencilSquare size={16} />
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => onDelete(s.id)}
                    >
                      <Trash size={16} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-muted py-3">
                  No schedules found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ScheduleTable;
