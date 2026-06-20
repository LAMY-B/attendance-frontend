import { Link, useLocation } from "react-router-dom"

export default function Sidebar({
  darkMode,
  setDarkMode,
}) {

  const location = useLocation()

  return (

    <div
      className={`w-64 min-h-screen p-5 shadow-lg ${
        darkMode
          ? "bg-gray-800 text-white"
          : "bg-white text-black"
      }`}
    >

      <h1 className="text-2xl font-bold mb-10">
        Attendance System
      </h1>

      <div className="space-y-4">

        <Link to="/">
          <button
            className={`w-full p-3 rounded-xl text-white ${
              location.pathname === "/"
                ? "bg-green-500"
                : "bg-gray-500"
            }`}
          >
            Dashboard
          </button>
        </Link>

        <Link to="/attendance">
          <button
            className={`w-full p-3 rounded-xl text-white ${
              location.pathname === "/attendance"
                ? "bg-green-500"
                : "bg-gray-500"
            }`}
          >
            Attendance
          </button>
        </Link>

        <button
          onClick={() =>
            setDarkMode(!darkMode)
          }
          className="w-full p-3 rounded-xl bg-black text-white"
        >
          {darkMode
            ? "☀ Light Mode"
            : "🌙 Dark Mode"}
        </button>

      </div>

    </div>
  )
}