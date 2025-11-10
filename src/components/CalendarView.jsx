import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "react-bootstrap-icons";

export default function CalendarView({ selectedDate, onDateSelect }) {
  const [viewDate, setViewDate] = useState(new Date());

  const daysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  const days = Array.from({ length: daysInMonth(viewDate) }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: firstDayOfMonth(viewDate) }, () => 0);

  const handlePrevMonth = () => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1));
  const handleNextMonth = () => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1));

  const isToday = (day) => {
    const today = new Date();
    return day === today.getDate() && viewDate.getMonth() === today.getMonth() && viewDate.getFullYear() === today.getFullYear();
  };

  const isSelected = (day) => day === selectedDate.getDate() && viewDate.getMonth() === selectedDate.getMonth() && viewDate.getFullYear() === selectedDate.getFullYear();

  const handleSelectDate = (day) => onDateSelect(new Date(viewDate.getFullYear(), viewDate.getMonth(), day));

  const monthName = viewDate.toLocaleDateString("en-US", { month: "long", year: "numeric" });

  return (
    <div className="card mb-4 shadow-sm">
      <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
        <h5 className="mb-0">{monthName}</h5>
        <div>
          <button className="btn btn-light btn-sm me-1" onClick={handlePrevMonth}><ChevronLeft /></button>
          <button className="btn btn-light btn-sm" onClick={handleNextMonth}><ChevronRight /></button>
        </div>
      </div>
      <div className="card-body p-2">
        <div className="d-flex justify-content-between fw-bold text-center text-secondary mb-1">
          {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map((d) => <div key={d} className="flex-fill">{d}</div>)}
        </div>
        <div className="d-flex flex-wrap">
          {emptyDays.map((_, i) => <div key={`empty-${i}`} className="flex-fill p-2" style={{ width: "14.28%" }}></div>)}
          {days.map((day) => (
            <div
              key={day}
              className={`flex-fill p-2 m-1 text-center rounded ${isSelected(day) ? "bg-primary text-white" : isToday(day) ? "bg-info text-white" : "bg-light text-dark"} cursor-pointer`}
              style={{ width: "calc(100% / 7 - 0.5rem)" }}
              onClick={() => handleSelectDate(day)}
            >
              {day}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
