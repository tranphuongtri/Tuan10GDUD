import React, { useState } from "react";

const StudentForm = ({ onAdd }) => {
  const [name, setName] = useState("");
  const [className, setClassName] = useState("");
  const [age, setAge] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !className || !age) return;

    onAdd({ name, class: className, age: parseInt(age) });

    setName("");
    setClassName("");
    setAge("");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-50 p-4 rounded border mb-6">
      <h2 className="text-lg font-semibold mb-4">Thêm sinh viên mới</h2>
      <div className="flex flex-wrap gap-4">
        <input
          type="text"
          placeholder="Họ tên"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded w-full sm:w-1/3"
        />
        <input
          type="text"
          placeholder="Lớp"
          value={className}
          onChange={(e) => setClassName(e.target.value)}
          className="border p-2 rounded w-full sm:w-1/3"
        />
        <input
          type="number"
          placeholder="Tuổi"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="border p-2 rounded w-full sm:w-1/3"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Thêm sinh viên
        </button>
      </div>
    </form>
  );
};

export default StudentForm;
