import React, { useState } from "react";

const AddEmployeeForm = ({ onAddEmployee }) => {
  const [formData, setFormData] = useState({ id: "", name: "", position: "", subordinates: [] });
  const [managerId, setManagerId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.id && formData.name && formData.position) {
      onAddEmployee(Number(managerId), formData);
      setFormData({ id: "", name: "", position: "", subordinates: [] }); 
      setManagerId(""); 
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Employee</h2>
      <div className="Aofone">
      <input className="Aoftwo"
        type="text"
        placeholder="ID"
        value={formData.id}
        onChange={(e) => setFormData({ ...formData, id: e.target.value })}
      />
      <input
        type="text" className="Aoftwo"
        placeholder="Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      <input
        type="text" className="Aoftwo"
        placeholder="Position"
        value={formData.position}
        onChange={(e) => setFormData({ ...formData, position: e.target.value })}
      />
      <input
        type="text" className="Aoftwo"
        placeholder="Manager ID"
        value={managerId}
        onChange={(e) => setManagerId(e.target.value)}
      />
      </div>
      <div className="Aof">
      <button type="submit" className="update">Add Employee</button>
      </div>
    </form>
  );
};

export default AddEmployeeForm;
