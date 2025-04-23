import React from "react";

const StudentList = ({ students, onDelete }) => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Danh sách sinh viên</h2>
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
          {students.map((sv) => (
            <tr key={sv.id} className="hover:bg-gray-50">
              <td className="p-2 border">{sv.name}</td>
              <td className="p-2 border">{sv.class}</td>
              <td className="p-2 border">{sv.age}</td>
              <td className="p-2 border">
                <button
                  onClick={() => onDelete(sv.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                >
                  Xoá
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;
