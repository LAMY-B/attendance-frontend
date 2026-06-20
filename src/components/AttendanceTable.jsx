import { useEffect, useState } from "react"
import axios from "axios"

export default function AttendanceTable({
  selectedDate,
}) {

  const [students, setStudents] = useState([])

  const [attendance, setAttendance] =
    useState({})

  useEffect(() => {

    fetchStudents()

    const savedAttendance =
      JSON.parse(
        localStorage.getItem("attendance")
      ) || {}

    setAttendance(savedAttendance)

  }, [])

  async function fetchStudents() {

    try {

      const res =
        await axios.get(
          "https://attendance-backend-e2rf.onrender.com"
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

  async function updateStudentTotals(
    studentId,
    previousStatus,
    newStatus
  ) {

    const student =
      students.find(
        s => s.id === studentId
      )

    if (!student) return

    let present =
      student.present || 0

    let absent =
      student.absent || 0

    let vacation =
      student.vacation || 0

    if (previousStatus === "present")
      present--

    if (previousStatus === "absent")
      absent--

    if (previousStatus === "vacation")
      vacation--

    if (newStatus === "present")
      present++

    if (newStatus === "absent")
      absent++

    if (newStatus === "vacation")
      vacation++

    try {

      await axios.put(
        `https://attendance-backend-e2rf.onrender.com/${student._id}`,
        {
          studentId: student.id,
          name: student.name,
          present,
          absent,
          vacation
        }
      )

      fetchStudents()

    } catch (error) {

      console.log(error)

    }

  }

  async function markAttendance(
    studentId,
    status
  ) {

    const updatedAttendance = {
      ...attendance,
    }

    if (!updatedAttendance[selectedDate]) {

      updatedAttendance[selectedDate] = {}

    }

    const previousStatus =
      updatedAttendance[selectedDate][studentId]

    updatedAttendance[selectedDate][studentId] =
      status

    setAttendance(updatedAttendance)

    localStorage.setItem(
      "attendance",
      JSON.stringify(updatedAttendance)
    )

    await updateStudentTotals(
      studentId,
      previousStatus,
      status
    )

  }

  function getStatus(studentId) {

    return attendance[selectedDate]?.[
      studentId
    ]

  }

  const presentCount =
    students.filter(
      (student) =>
        attendance[selectedDate]?.[
          student.id
        ] === "present"
    ).length

  const absentCount =
    students.filter(
      (student) =>
        attendance[selectedDate]?.[
          student.id
        ] === "absent"
    ).length

  const vacationCount =
    students.filter(
      (student) =>
        attendance[selectedDate]?.[
          student.id
        ] === "vacation"
    ).length

  return (

    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md overflow-auto">

      <div className="grid grid-cols-3 gap-4 mb-6">

        <div className="bg-green-500 text-white p-4 rounded-xl text-center">
          <h3 className="font-bold">
            Present
          </h3>
          <p className="text-3xl">
            {presentCount}
          </p>
        </div>

        <div className="bg-red-500 text-white p-4 rounded-xl text-center">
          <h3 className="font-bold">
            Absent
          </h3>
          <p className="text-3xl">
            {absentCount}
          </p>
        </div>

        <div className="bg-yellow-500 text-white p-4 rounded-xl text-center">
          <h3 className="font-bold">
            Vacation
          </h3>
          <p className="text-3xl">
            {vacationCount}
          </p>
        </div>

      </div>

      <table className="w-full">

        <thead>

          <tr className="border-b text-left dark:text-white">

            <th className="pb-4">
              Name
            </th>

            <th className="pb-4">
              Present
            </th>

            <th className="pb-4">
              Absent
            </th>

            <th className="pb-4">
              Vacation
            </th>

          </tr>

        </thead>

        <tbody>

          {students.map((student) => {

            const status =
              getStatus(student.id)

            return (

              <tr
                key={student.id}
                className="border-b dark:text-white"
              >

                <td className="py-4">
                  {student.name}
                </td>

                <td>

                  <button
                    onClick={() =>
                      markAttendance(
                        student.id,
                        "present"
                      )
                    }
                    className={`px-5 py-2 rounded-lg text-white ${
                      status === "present"
                        ? "bg-green-700"
                        : "bg-green-500"
                    }`}
                  >
                    ✓
                  </button>

                </td>

                <td>

                  <button
                    onClick={() =>
                      markAttendance(
                        student.id,
                        "absent"
                      )
                    }
                    className={`px-5 py-2 rounded-lg text-white ${
                      status === "absent"
                        ? "bg-red-700"
                        : "bg-red-500"
                    }`}
                  >
                    ✕
                  </button>

                </td>

                <td>

                  <button
                    onClick={() =>
                      markAttendance(
                        student.id,
                        "vacation"
                      )
                    }
                    className={`px-5 py-2 rounded-lg text-white ${
                      status === "vacation"
                        ? "bg-yellow-700"
                        : "bg-yellow-500"
                    }`}
                  >
                    🌴
                  </button>

                </td>

              </tr>

            )

          })}

        </tbody>

      </table>

    </div>

  )

}