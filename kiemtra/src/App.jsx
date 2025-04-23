import React, { useState } from "react";
import StudentList from "./Components/StudentList";

function App() {
  const [students, setStudents] = useState([
    { name: "Nguyễn Văn An", class: "12A1", age: 17 },
    { name: "Trần Phương Trí", class: "12A2", age: 18 },
    { name: "Lê Văn Thành", class: "11B1", age: 16 },
  ]);

  const handleDelete = (index) => {
    const newList = [...students];
    newList.splice(index, 1);
    setStudents(newList);
  };

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <StudentList students={students} onDelete={handleDelete} />
    </div>
  );
}

export default App;
