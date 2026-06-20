import { useState } from "react"
import AttendanceTable from "../components/AttendanceTable"

export default function Attendance({
  darkMode,
}) {

  const today = new Date()
    .toISOString()
    .split("T")[0]

  const [selectedDate, setSelectedDate] =
    useState(today)

  return (
    <div>

      <h1 className="text-4xl font-bold mb-6">
        Attendance
      </h1>

      {/* Calendar */}
 <div className={
    darkMode
      ? "text-white"
      : "text-black"
 }
 >
        <h2 className="text-2xl font-bold mb-4">
          Select Date
        </h2>

        <input
          type="date"
          value={selectedDate}
          onChange={(e) =>
            setSelectedDate(e.target.value)
          }
          className="border p-3 rounded-xl"
        />

      </div>
      
      <h2 className="text-2xl font-bold mt-4">
  Attendance for:
  {" "}
  {selectedDate}
</h2>

      <AttendanceTable selectedDate={selectedDate} />

    </div>
  )
}