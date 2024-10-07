import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
// import 'bootstrap/dist/css/bootstrap.min.css';

function EmployeeTable({ employees, onEdit, onDelete }) {
  return (
    <div className="container mt-4">
      <div className="card shadow-lg" style={{ borderRadius: '15px', background: 'linear-gradient(135deg, rgba(139, 0, 0, 0.8), rgba(255, 20, 147, 0.8))' }}>
        <div className="card-body">
          <h5 className="card-title text-center text-white mb-4">Employee List</h5>
          <div className="table-responsive">
            <table className="table table-hover table-bordered">
              <thead className="thead-dark">
                <tr>
                  <th>Name</th>
                  <th>Contact</th>
                  <th>Position</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee) => (
                  <tr key={employee._id}>
                    <td>{employee.name}</td>
                    <td>{employee.contact}</td>
                    <td>{employee.position}</td>
                    <td>
                      <button
                        className="btn btn-sm"
                        style={{
                          background: 'linear-gradient(to right, rgb(255, 20, 147), rgb(255, 105, 180))', // Dark rose gradient for Edit button
                          color: 'white',
                        }}
                        onClick={() => onEdit(employee._id)}
                      >
                        <FaEdit /> Edit
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-sm"
                        style={{
                          background: 'linear-gradient(to right, rgb(139, 0, 0), rgb(255, 69, 0))', // Dark red gradient for Delete button
                          color: 'white',
                        }}
                        onClick={() => onDelete(employee._id)}
                      >
                        <FaTrash /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeTable;
