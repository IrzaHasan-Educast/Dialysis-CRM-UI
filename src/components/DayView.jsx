import React from "react";
import { BEDS_DATA, HOURS } from "../pages/admin/BedData";

const statusColors = {
  reserved: "bg-primary text-white",
  maintenance: "bg-warning text-dark",
  available: "bg-success text-white",
};

export default function DayView({ selectedDate }) {
  return (
    <div className="card mb-4 shadow-sm">
      <div className="card-header bg-primary text-white">
        <h5 className="mb-0">
          {selectedDate.toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </h5>
        <small>Bed Status & Schedule</small>
      </div>
      <div className="card-body p-0">
        {BEDS_DATA.map((bed) => (
          <div key={bed.id} className="d-flex border-bottom position-relative" style={{ minHeight: "60px" }}>
            <div className="border-end d-flex align-items-center justify-content-center" style={{ width: "120px", background: "#f8f9fa", fontWeight: 600 }}>
              {bed.name}
            </div>
            <div className="flex-grow-1 position-relative">
              {HOURS.map((hour) => (
                <div key={hour} className="border-end d-inline-block" style={{ width: "4.16%", height: "60px" }}></div>
              ))}
              {bed.reservations.map((res, idx) => {
                const leftPercent = (res.startTime / 24) * 100;
                const widthPercent = ((res.endTime - res.startTime) / 24) * 100;
                return (
                  <div
                    key={idx}
                    className={`position-absolute top-1 start-0 h-75 rounded text-center small ${statusColors[res.status]}`}
                    style={{ left: `${leftPercent}%`, width: `${widthPercent}%`, lineHeight: "1.2rem", fontSize: "0.7rem" }}
                    title={`${res.guestName || "Maintenance"}: ${res.startTime}-${res.endTime}`}
                  >
                    {res.status === "maintenance" ? "🔧 Maintenance" : res.guestName}
                    <div>{res.startTime}-{res.endTime}</div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <div className="card-footer bg-light d-flex gap-3 flex-wrap">
        <span className="badge bg-primary">Reserved</span>
        <span className="badge bg-success">Available</span>
        <span className="badge bg-warning text-dark">Maintenance</span>
      </div>
    </div>
  );
}
