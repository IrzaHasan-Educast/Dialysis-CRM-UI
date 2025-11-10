import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import CalendarView from "../../components/CalendarView";
import DayView from "../../components/DayView";

export default function BedSchedule() {
  const [selectedDate, setSelectedDate] = useState(new Date());
// ====== Bed & Hours Data (pehle BedData.js me tha) ======
const HOURS = Array.from({ length: 24 }, (_, i) => i);

const BEDS_DATA = [
  {
    id: 1,
    name: "Bed 1",
    reservations: [
      { startTime: 8, endTime: 12, status: "reserved", guestName: "John Doe" },
      { startTime: 12, endTime: 12.5, status: "maintenance" },
      { startTime: 14, endTime: 18, status: "reserved", guestName: "Jane Smith" },
      { startTime: 18, endTime: 18.5, status: "maintenance" },
    ],
  },
  {
    id: 2,
    name: "Bed 2",
    reservations: [
      { startTime: 10, endTime: 14, status: "reserved", guestName: "Mike Johnson" },
      { startTime: 14, endTime: 14.5, status: "maintenance" },
      { startTime: 19, endTime: 22, status: "reserved", guestName: "Emma Davis" },
      { startTime: 22, endTime: 22.5, status: "maintenance" },
    ],
  },
  {
    id: 3,
    name: "Bed 3",
    reservations: [
      { startTime: 6, endTime: 10, status: "reserved", guestName: "Sarah Lee" },
      { startTime: 10, endTime: 10.5, status: "maintenance" },
    ],
  },
];


  return (
    <>
      <Navbar />
      <div className="container my-4">
        <div className="row">
          <div className="col-lg-4">
            <CalendarView selectedDate={selectedDate} onDateSelect={setSelectedDate} />
          </div>
          <div className="col-lg-8">
            <DayView selectedDate={selectedDate} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
