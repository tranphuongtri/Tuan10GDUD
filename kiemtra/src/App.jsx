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
    <div className="min-h-screen bg-gradient-to-r from-teal-500 to-blue-600 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-6 tracking-tight">
          Quản lý sinh viên
        </h1>

        <div className="flex justify-between items-center mb-6 space-x-4">
          {/* Input tìm kiếm */}
          <div className="w-full sm:w-1/2 lg:w-1/3">
            <input
              type="text"
              placeholder="Tìm kiếm theo tên..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border-2 border-teal-400 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300"
            />
          </div>

          {/* Dropdown lọc theo lớp */}
          <div className="w-1/3">
            <label htmlFor="classSelect" className="text-sm font-medium text-gray-700 mb-2 block">
              Chọn lớp:
            </label>
            <select
              id="classSelect"
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full border-2 border-teal-400 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300"
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
        <div className="mt-8 overflow-x-auto shadow-lg rounded-lg">
          <StudentList
            students={filteredStudents}
            onDelete={handleDelete}
            onUpdate={handleUpdateStudent}
          />
        </div>
      </div>
    </div>
  );
}

export default App;

