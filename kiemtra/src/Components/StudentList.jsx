import React, { useState } from "react";

const StudentList = ({ students, onDelete, onUpdate }) => {
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ name: "", class: "", age: "" });

  const handleEditClick = (student) => {
    setEditingId(student.id);
    setEditData({ name: student.name, class: student.class, age: student.age });
  };

  const handleSave = () => {
    onUpdate(editingId, editData);
    setEditingId(null);
  };

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
              {editingId === sv.id ? (
                <>
                  <td className="p-2 border">
                    <input
                      value={editData.name}
                      onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                      className="border p-1 rounded w-full"
                    />
                  </td>
                  <td className="p-2 border">
                    <input
                      value={editData.class}
                      onChange={(e) => setEditData({ ...editData, class: e.target.value })}
                      className="border p-1 rounded w-full"
                    />
                  </td>
                  <td className="p-2 border">
                    <input
                      type="number"
                      value={editData.age}
                      onChange={(e) => setEditData({ ...editData, age: e.target.value })}
                      className="border p-1 rounded w-full"
                    />
                  </td>
                  <td className="p-2 border">
                    <button
                      onClick={handleSave}
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded mr-2"
                    >
                      Lưu
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="bg-gray-400 hover:bg-gray-500 text-white px-3 py-1 rounded"
                    >
                      Huỷ
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td className="p-2 border">{sv.name}</td>
                  <td className="p-2 border">{sv.class}</td>
                  <td className="p-2 border">{sv.age}</td>
                  <td className="p-2 border">
                    <button
                      onClick={() => handleEditClick(sv)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded mr-2"
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() => onDelete(sv.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Xoá
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;
