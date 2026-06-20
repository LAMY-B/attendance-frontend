export default function StatsCards({ students }) {

  const totalStudents = students.length

  const totalPresent = students.reduce(
    (sum, student) => sum + student.present,
    0
  )

  const totalAbsent = students.reduce(
    (sum, student) => sum + student.absent,
    0
  )

  const totalVacation = students.reduce(
    (sum, student) =>
      sum + (student.vacation || 0),
    0
  )

  return (
    <div className="grid grid-cols-4 gap-5 mb-8">

      <div className="bg-blue-500 text-white p-6 rounded-2xl">
        <h2 className="text-3xl font-bold">
          {totalStudents}
        </h2>

        <p>Total Students</p>
      </div>

      <div className="bg-green-500 text-white p-6 rounded-2xl">
        <h2 className="text-3xl font-bold">
          {totalPresent}
        </h2>

        <p>Total Present</p>
      </div>

      <div className="bg-red-500 text-white p-6 rounded-2xl">
        <h2 className="text-3xl font-bold">
          {totalAbsent}
        </h2>

        <p>Total Absent</p>
      </div>

      <div className="bg-yellow-500 text-white p-6 rounded-2xl">
        <h2 className="text-3xl font-bold">
          {totalVacation}
        </h2>

        <p>Vacation</p>
      </div>

    </div>
  )
}