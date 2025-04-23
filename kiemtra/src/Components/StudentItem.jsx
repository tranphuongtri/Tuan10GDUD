import React, { useState } from "react";

const StudentItem = ({ student, onDelete, onUpdate }) => {
  const [editing, setEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: student.name,
    class: student.class,
    age: student.age,
  });

  // Hàm xử lý sửa thông tin
  const handleEditClick = () => {
    setEditing(true);
  };

  const handleSave = () => {
    onUpdate(student.id, editData);
    setEditing(false);
  };

  const handleCancel = () => {
    setEditing(false);
    setEditData({
      name: student.name,
      class: student.class,
      age: student.age,
    });
  };

  return (
    <tr className="border-b">
      {editing ? (
        <>
          <td className="px-4 py-2">
            <input
              value={editData.name}
              onChange={(e) => setEditData({ ...editData, name: e.target.value })}
              className="border p-2 rounded-md w-full"
            />
          </td>
          <td className="px-4 py-2">
            <input
              value={editData.class}
              onChange={(e) => setEditData({ ...editData, class: e.target.value })}
              className="border p-2 rounded-md w-full"
            />
          </td>
          <td className="px-4 py-2">
            <input
              type="number"
              value={editData.age}
              onChange={(e) => setEditData({ ...editData, age: e.target.value })}
              className="border p-2 rounded-md w-full"
            />
          </td>
          <td className="px-4 py-2 flex space-x-2">
            <button
              onClick={handleSave}
              className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
            >
              Lưu
            </button>
            <button
              onClick={handleCancel}
              className="bg-gray-500 text-white p-2 rounded-md hover:bg-gray-600"
            >
              Huỷ
            </button>
          </td>
        </>
      ) : (
        <>
          <td className="px-4 py-2">{student.name}</td>
          <td className="px-4 py-2">{student.class}</td>
          <td className="px-4 py-2">{student.age}</td>
          <td className="px-4 py-2 flex space-x-2">
            <button
              onClick={handleEditClick}
              className="bg-yellow-500 text-white p-2 rounded-md hover:bg-yellow-600"
            >
              Sửa
            </button>
            <button
              onClick={() => onDelete(student.id)}
              className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
            >
              Xoá
            </button>
          </td>
        </>
      )}
    </tr>
  );
};

export default StudentItem;
