import React, { useState } from "react";
import StudentList from "./Components/StudentList";
import StudentForm from "./Components/StundentForm";
import { v4 as uuidv4 } from "uuid";


function App() {
  const [students, setStudents] = useState([
    { id: uuidv4(), name: "Nguyễn Văn A", class: "12A1", age: 17 },
    { id: uuidv4(), name: "Trần Thị B", class: "12A2", age: 18 },
    { id: uuidv4(), name: "Lê Văn C", class: "11B1", age: 16 },
  ]);
  const handleUpdateStudent = (id, updatedData) => {
  const updatedList = students.map((sv) =>
    sv.id === id ? { ...sv, ...updatedData } : sv
  );
    setStudents(updatedList);
  };
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  const filteredStudents = students.filter((sv) =>
    sv.name.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const handleAddStudent = (student) => {
    setStudents([...students, { ...student, id: uuidv4() }]);
  };

  const handleDelete = (id) => {
    setStudents(students.filter((sv) => sv.id !== id));
  };
  const [selectedClass, setSelectedClass] = useState("");
  const classes = [...new Set(students.map(sv => sv.class))]; // Lấy danh sách lớp duy nhất từ sinh viên
  const filteredStudentsByClass = selectedClass
  ? students.filter((sv) => sv.class === selectedClass)
  : students;
    return (
      <div className="max-w-4xl mx-auto mt-10 p-4">
        <h1 className="text-2xl font-bold mb-4">Quản lý sinh viên</h1>
    
        {/* Dropdown lọc theo lớp */}
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
            {classes.map((classItem) => (
              <option key={classItem} value={classItem}>
                {classItem}
              </option>
            ))}
          </select>
        </div>
        <input
      type="text"
      placeholder="Tìm kiếm theo tên..."
      value={searchTerm}
      onChange={handleSearch}
      className="border p-2 rounded w-full mb-4"
    />

        {/* Form và danh sách sinh viên */}
        <StudentForm onAdd={handleAddStudent} />
        <StudentList
          students={filteredStudentsByClass}
          onDelete={handleDelete}
          onUpdate={handleUpdateStudent}
        />
      </div>
    );
    
  
}

export default App;
