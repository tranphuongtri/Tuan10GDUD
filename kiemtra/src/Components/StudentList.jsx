import React from "react";
import StudentItem from "./StudentItem";

const StudentList = ({ students, onDelete, onUpdate }) => {
  return (
    <table className="w-full border border-gray-300 text-left">
      <thead className="bg-gray-100">
        <tr>
          <th className="p-2 border">Tên</th>
          <th className="p-2 border">Lớp</th>
          <th className="p-2 border">Tuổi</th>
          <th className="p-2 border">Hành động</th>
        </tr>
      </thead>
      <tbody>
        {students.map((student) => (
          <StudentItem
            key={student.id}
            student={student}
            onDelete={onDelete}
            onUpdate={onUpdate}
          />
        ))}
      </tbody>
    </table>
  );
};

export default StudentList;
