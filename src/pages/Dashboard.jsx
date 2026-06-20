import { useState, useEffect } from "react"
import axios from "axios"
import StudentForm from "../components/StudentForm"
import StudentTable from "../components/StudentTable"
import StatsCards from "../components/StatsCards"
import SearchBar from "../components/SearchBar"

export default function Dashboard({ darkMode }) {

  const today = new Date()

  const formattedDate =
    today.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })

const [students, setStudents] = useState([])

  const [search, setSearch] = useState("")
  const [editingStudent, setEditingStudent] = useState(null)

  useEffect(() => {
  fetchStudents()
}, [])

async function fetchStudents() {

  try {

    const res = await axios.get(
      "https://attendance-backend-e2rf.onrender.com/api/students"
    )

    const formatted =
      res.data.map(student => ({
        ...student,
        id: student.studentId
      }))

    setStudents(formatted)

  } catch (error) {

    console.log(error)

  }

}

 async function addStudent(student) {

  try {

    await axios.post(
      "https://attendance-backend-e2rf.onrender.com/api/students",
      {
        studentId: student.id,
        name: student.name,
        present: student.present,
        absent: student.absent,
        vacation: student.vacation
      }
    )

    fetchStudents()

  } catch (error) {

    console.log(error)

  }

}

  async function deleteStudent(id) {

  const confirmDelete =
    window.confirm(
      "Delete this student?"
    )

  if (!confirmDelete) return

  const student =
    students.find(
      s => s.id === id
    )

  if (!student) return

  await axios.delete(
    `https://attendance-backend-e2rf.onrender.com/api/students/${student._id}`
  )

  fetchStudents()

}

  function editStudent(student) {
    setEditingStudent(student)
  }

  async function updateStudent(
  updatedStudent
) {

  const student =
    students.find(
      s =>
        s.id ===
        updatedStudent.id
    )

  if (!student) return

  await axios.put(
    `https://attendance-backend-e2rf.onrender.com/api/students/${student._id}`,
    {

      studentId:
        updatedStudent.id,

      name:
        updatedStudent.name,

      present:
        updatedStudent.present,

      absent:
        updatedStudent.absent,

      vacation:
        updatedStudent.vacation

    }
  )

  setEditingStudent(null)

  fetchStudents()

}

  
  

  const filteredStudents = students.filter(
    (student) =>
      student.name
        .toLowerCase()
        .includes(search.toLowerCase())
  )

  return (

    <div
      className={`min-h-screen transition-all duration-300 ${
        darkMode
          ? "bg-gray-900 text-white"
          : "bg-gray-100 text-black"
      }`}
    >

      {/* DATE */}

      <div className="mb-4">

        <p className="text-lg font-semibold">
          {formattedDate}
        </p>

      </div>

      {/* WELCOME CARD */}

      <div className="bg-gradient-to-r from-green-500 to-green-700 text-white p-6 rounded-2xl mb-6">

        <h2 className="text-3xl font-bold">
          Class Attendance System
        </h2>

        <p className="mt-2">
          Track attendance, manage students,
          and view statistics.
        </p>

      </div>

      {/* PAGE TITLE */}

      <h1 className="text-4xl font-bold mb-8">
        Dashboard
      </h1>

      {/* STATS */}

      <StatsCards students={students} />

      {/* SEARCH */}

      <SearchBar
        search={search}
        setSearch={setSearch}
      />

      <StudentForm
        addStudent={addStudent}
        editingStudent={editingStudent}
        updateStudent={updateStudent}
        darkMode={darkMode}
      />

      <StudentTable
        students={filteredStudents}
        deleteStudent={deleteStudent}
        editStudent={editStudent}
        darkMode={darkMode}
      />

    </div>
  )
}
