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

  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);

  const handleAddStudent = (student) => {
    setStudents([...students, { ...student, id: uuidv4() }]);
  };

  const handleDelete = (id) => {
    setStudents(students.filter((sv) => sv.id !== id));
  };

  const handleUpdateStudent = (id, updatedData) => {
    const updatedList = students.map((sv) =>
      sv.id === id ? { ...sv, ...updatedData } : sv
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
    <div className="max-w-4xl mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold mb-4">Quản lý sinh viên</h1>

      <input
        type="text"
        placeholder="Tìm kiếm theo tên..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border p-2 rounded w-full mb-4"
      />

      <div className="mb-4">
        <label htmlFor="classSelect" className="block text-sm font-medium mb-2">
          Chọn lớp:
        </label>
        <select
          id="classSelect"
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
          className="border p-2 rounded w-full sm:w-1/3"
        >
          <option value="">Tất cả lớp</option>
          {[...new Set(students.map((sv) => sv.class))].map((classItem) => (
            <option key={classItem} value={classItem}>
              {classItem}
            </option>
          ))}
        </select>
      </div>

      <StudentForm onAdd={handleAddStudent} />
      <StudentList
        students={filteredStudents}
        onDelete={handleDelete}
        onUpdate={handleUpdateStudent}
      />
    </div>
  );
}

export default App;
