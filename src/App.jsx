import { Routes, Route } from "react-router-dom"
import { useState, useEffect } from "react"

import Sidebar from "./components/Sidebar"
import Dashboard from "./pages/Dashboard"
import Attendance from "./pages/Attendance"

export default function App() {

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true"
  })

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode)
  }, [darkMode])

  return (
    <div
      className={`min-h-screen flex transition-all duration-300 ${
        darkMode
          ? "bg-gray-900 text-white"
          : "bg-gray-100 text-black"
      }`}
    >

      <Sidebar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      <div className="flex-1 p-8">

        <Routes>

          <Route
            path="/"
            element={
              <Dashboard
                darkMode={darkMode}
              />
            }
          />

          <Route
            path="/attendance"
            element={
              <Attendance
                darkMode={darkMode}
              />
            }
          />

        </Routes>

      </div>

    </div>
  )
}