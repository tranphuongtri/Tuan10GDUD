import React, { useState, useEffect } from "react";
import StudentList from "./Components/StudentList";
import StudentForm from "./Components/StundentForm";
import { v4 as uuidv4 } from "uuid";

function App() {
  const loadStudentsFromLocalStorage = () => {
    const storedStudents = localStorage.getItem("students");
    return storedStudents ? JSON.parse(storedStudents) : [];
  };

  const [students, setStudents] = useState(loadStudentsFromLocalStorage());
  const [selectedClass, setSelectedClass] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Cập nhật lại localStorage mỗi khi students thay đổi
  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);

  const handleAddStudent = (student) => {
    const newStudent = { ...student, id: uuidv4() };
    setStudents((prevStudents) => [...prevStudents, newStudent]);
  };

  const handleDelete = (id) => {
    const updatedStudents = students.filter((student) => student.id !== id);
    setStudents(updatedStudents);
  };

  const handleUpdateStudent = (id, updatedData) => {
    const updatedList = students.map((student) =>
      student.id === id ? { ...student, ...updatedData } : student
    );
    setStudents(updatedList);
  };

  const filteredStudentsByClass = selectedClass
    ? students.filter((sv) => sv.class === selectedClass)
    : students;

  const filteredStudents = filteredStudentsByClass.filter((sv) =>
    sv.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Quản lý sinh viên</h1>

      <div className="flex justify-between items-center mb-6">
        {/* Input tìm kiếm */}
        <input
          type="text"
          placeholder="Tìm kiếm theo tên..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 p-3 rounded-md w-full sm:w-1/2 lg:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Dropdown lọc theo lớp */}
        <div className="ml-4 w-1/3">
          <label htmlFor="classSelect" className="block text-sm font-medium text-gray-700 mb-2">
            Chọn lớp:
          </label>
          <select
            id="classSelect"
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Tất cả lớp</option>
            {[...new Set(students.map((sv) => sv.class))].map((classItem) => (
              <option key={classItem} value={classItem}>
                {classItem}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Form Thêm Sinh Viên */}
      <StudentForm onAdd={handleAddStudent} />

      {/* Danh Sách Sinh Viên */}
      <StudentList
        students={filteredStudents}
        onDelete={handleDelete}
        onUpdate={handleUpdateStudent}
      />
    </div>
  );
}

export default App;
