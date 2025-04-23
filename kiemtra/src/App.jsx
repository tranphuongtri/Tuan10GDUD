import React, { useState } from "react";
import StudentList from "./Components/StudentList";
import StudentForm from "./Components/StundentForm";

function App() {
  const [students, setStudents] = useState([
    { name: "Nguyễn Văn A", class: "12A1", age: 17 },
    { name: "Trần Thị B", class: "12A2", age: 18 },
    { name: "Lê Văn C", class: "11B1", age: 16 },
  ]);

  const handleAddStudent = (student) => {
    setStudents([...students, student]);
  };

  const handleDelete = (index) => {
    const newList = [...students];
    newList.splice(index, 1);
    setStudents(newList);
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold mb-6">Quản lý sinh viên</h1>

      <StudentForm onAdd={handleAddStudent} />
      <StudentList students={students} onDelete={handleDelete} />
    </div>
  );
}

export default App;
