import React, { useState } from "react";
import AddEmployeeForm from "../src/AddEmployeeForm";
import EmployeeDetails from "../src/EmployeeDetails";
import "./App.css";

const initialData = {
  id: 1,
  name: "Tech Corp",
  employees: [
    {
      id: 101,
      name: "John Smith",
      position: "CEO",
      subordinates: [
        {
          id: 102,
          name: "Jane Doe",
          position: "CTO",
          subordinates: [
            { id: 103, name: "Jim Brown", position: "Senior Developer", subordinates: [] },
            { id: 104, name: "Jake Blues", position: "Junior Developer", subordinates: [] },
          ],
        },
        {
          id: 105,
          name: "Sara Connor",
          position: "CFO",
          subordinates: [
            { id: 106, name: "Kyle Reese", position: "Account Manager", subordinates: [] },
          ],
        },
      ],
    },
  ],
};

const App = () => {
  const [organization, setOrganization] = useState(initialData);
  const [message, setMessage] = useState("");

  const handleAddEmployee = (managerId, newEmployee) => {
    const updatedOrg = { ...organization };

    const addToSubordinates = (employees) => {
      for (const employee of employees) {
        if (employee.id === managerId) {
          employee.subordinates.push(newEmployee);
          setMessage(`Employee ${newEmployee.name} added successfully!`);
        } else {
          addToSubordinates(employee.subordinates);
        }
      }
    };

    addToSubordinates(updatedOrg.employees);
    setOrganization(updatedOrg);
  };

  const handleEditEmployee = (employeeId, updatedDetails) => {
    const updatedOrg = { ...organization };

    const updateEmployee = (employees) => {
      for (const employee of employees) {
        if (employee.id === employeeId) {
          Object.assign(employee, updatedDetails);
          setMessage(`Employee ${updatedDetails.name} updated successfully!`);
        } else {
          updateEmployee(employee.subordinates);
        }
      }
    };

    updateEmployee(updatedOrg.employees);
    setOrganization(updatedOrg);
  };

  const handleRemoveEmployee = (employeeId) => {
    const updatedOrg = { ...organization };

    const removeEmployee = (employees) => {
      return employees.filter((employee) => {
        if (employee.id === employeeId) {
          setMessage(`Employee deleted successfully!`);
          return false;
        }
        employee.subordinates = removeEmployee(employee.subordinates);
        return true;
      });
    };

    updatedOrg.employees = removeEmployee(updatedOrg.employees);
    setOrganization(updatedOrg);
  };

  return (
    <div className="container">
      <h1>Employee Management Application</h1>
      {message && <div className="message">{message}</div>}
      <EmployeeDetails
        employees={organization.employees}
        onRemoveEmployee={handleRemoveEmployee}
        onEditEmployee={handleEditEmployee}
      />
      <AddEmployeeForm onAddEmployee={handleAddEmployee} />
    </div>
  );
};

export default App;
