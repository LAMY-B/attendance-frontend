import { useState, useEffect } from "react"

export default function StudentForm({
  addStudent,
  editingStudent,
  updateStudent,
}) {

  const [name, setName] = useState("")
  const [id, setId] = useState("")

  useEffect(() => {

    if (editingStudent) {

      setName(editingStudent.name)
      setId(editingStudent.id)

    }

  }, [editingStudent])

  function handleSubmit(e) {

    e.preventDefault()

    if (!name || !id) return

    const studentData = {

      id,
      name,

      present: editingStudent
        ? editingStudent.present
        : 0,

      absent: editingStudent
        ? editingStudent.absent
        : 0,

      vacation: editingStudent
        ? editingStudent.vacation || 0
        : 0,
    }

    if (editingStudent) {

      updateStudent(studentData)

    } else {

      addStudent(studentData)

    }

    setName("")
    setId("")
  }

  return (

    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md mb-8"
    >

      <h2 className="text-2xl font-bold mb-5 dark:text-white">

        {editingStudent
          ? "Edit Student"
          : "Add Student"}

      </h2>

      <div className="grid grid-cols-3 gap-4">

        <input
          type="text"
          placeholder="Student Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          className="border p-3 rounded-xl dark:bg-gray-700 dark:text-white"
        />

        <input
          type="text"
          placeholder="Student ID"
          value={id}
          onChange={(e) =>
            setId(e.target.value)
          }
          className="border p-3 rounded-xl dark:bg-gray-700 dark:text-white"
        />

        <button className="bg-green-500 text-white rounded-xl">

          {editingStudent
            ? "Update"
            : "Add"}

        </button>

      </div>

    </form>
  )
}