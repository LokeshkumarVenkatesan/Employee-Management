import React, { useState } from "react";


const EmployeeDetails = ({ employees, onRemoveEmployee, onEditEmployee }) => {
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({});

  const handleEdit = (employee) => {
    setEditing(employee.id);
    setFormData(employee);
  };

  const handleSave = () => {
    onEditEmployee(editing, formData);
    setEditing(null);
  };

  const renderEmployees = (employeeList) => {
    return employeeList.map((employee) => (
      <li key={employee.id} className="employee-item">
        {editing === employee.id ? (
          <>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <div className="Aof">
            <input
              type="text"
              value={formData.position}
              
              onChange={(e) => setFormData({ ...formData, position: e.target.value })}
            />
            <button onClick={handleSave} className="update"> Save</button>
            </div>
          </>
        ) : (
          <>
            <span>
              <strong>ID: {employee.id}</strong> - {employee.name} - {employee.position}
            </span>
            <button className="edit" onClick={() => handleEdit(employee)}>Edit</button>
            <button className="remove" onClick={() => onRemoveEmployee(employee.id)}>Remove</button>
          </>
        )}
        {employee.subordinates.length > 0 && (
          <ul className="subordinate-list">
            <span className="arrow">➔</span> 
            {renderEmployees(employee.subordinates)}
          </ul>
        )}
      </li>
    ));
  };

  return (
    <div>
      <h2>Employee Directory</h2>
      <ul>{renderEmployees(employees)}</ul>
    </div>
  );
};

export default EmployeeDetails;
