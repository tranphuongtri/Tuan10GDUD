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
    <tr>
      {editing ? (
        <>
          <td>
            <input
              value={editData.name}
              onChange={(e) => setEditData({ ...editData, name: e.target.value })}
              className="border p-1"
            />
          </td>
          <td>
            <input
              value={editData.class}
              onChange={(e) => setEditData({ ...editData, class: e.target.value })}
              className="border p-1"
            />
          </td>
          <td>
            <input
              type="number"
              value={editData.age}
              onChange={(e) => setEditData({ ...editData, age: e.target.value })}
              className="border p-1"
            />
          </td>
          <td>
            <button onClick={handleSave} className="bg-green-500 text-white p-2 rounded mr-2">
              Lưu
            </button>
            <button onClick={handleCancel} className="bg-gray-500 text-white p-2 rounded">
              Huỷ
            </button>
          </td>
        </>
      ) : (
        <>
          <td>{student.name}</td>
          <td>{student.class}</td>
          <td>{student.age}</td>
          <td>
            <button
              onClick={handleEditClick}
              className="bg-yellow-500 text-white p-2 rounded mr-2"
            >
              Sửa
            </button>
            <button
              onClick={() => onDelete(student.id)}
              className="bg-red-500 text-white p-2 rounded"
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
