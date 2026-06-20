export default function StudentTable({
  students,
  deleteStudent,
  editStudent,
  darkMode,
}) {

  if (students.length === 0) {

    return (

      <div
        className={`p-10 rounded-2xl shadow-md text-center ${
          darkMode
            ? "bg-gray-800 text-gray-300"
            : "bg-white text-gray-500"
        }`}
      >

        <h2 className="text-2xl font-bold">
          No students added yet
        </h2>

      </div>
    )
  }

  return (

    <div
      className={`p-6 rounded-2xl shadow-md overflow-auto ${
        darkMode
          ? "bg-gray-800 text-white"
          : "bg-white text-black"
      }`}
    >

      <table className="w-full">

        <thead>

          <tr className="border-b text-left">

            <th className="pb-4">
              ID
            </th>

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

            <th className="pb-4">
              Total Days
            </th>

            <th className="pb-4">
              Attendance %
            </th>

            <th className="pb-4">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {students.map((student) => {

            const present =
              student.present || 0

            const absent =
              student.absent || 0

            const vacation =
              student.vacation || 0

            const total =
              present +
              absent +
              vacation

            const attendancePercentage =
              total === 0
                ? 0
                : Math.round(
                    (present / total) * 100
                  )

            return (

              <tr
                key={student.id}
                className="border-b"
              >

                <td className="py-4">
                  {student.id}
                </td>

                <td>
                  {student.name}
                </td>

                <td>
                  {present}
                </td>

                <td>
                  {absent}
                </td>

                <td>
                  {vacation}
                </td>

                <td>
                  {present} / {total}
                </td>

                <td>
                  {attendancePercentage}%
                </td>

                <td className="space-x-2">

                  <button
                    onClick={() =>
                      editStudent(student)
                    }
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      deleteStudent(student.id)
                    }
                    className="bg-red-500 text-white px-4 py-2 rounded-lg"
                  >
                    Delete
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