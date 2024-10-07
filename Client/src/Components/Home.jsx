import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import EmployeeForm from "./Pages/EmployeeForm";
import EmployeeTable from "./Pages/EmployeeTable";
import 'bootstrap/dist/css/bootstrap.min.css';

function Home() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [fetchError, setFetchError] = useState("");
  const [employeeToEdit, setEmployeeToEdit] = useState(null);
  const [showModal, setShowModal] = useState(false); // State to control the modal visibility

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      const fetchEmployees = async () => {
        try {
          const response = await axios.get("http://localhost:3001/employee", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setEmployees(response.data);
        } catch (error) {
          setFetchError(error.response?.data?.message || error.message);
        }
      };
      fetchEmployees();
    }
  }, [token, navigate]);

  const addEmployee = async (employee) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/employee",
        employee,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setEmployees((prev) => [...prev, response.data]);
      setShowModal(false); // Close modal after adding
    } catch (error) {
      console.error("Error adding employee:", error.response?.data?.message || error.message);
    }
  };

  const editEmployee = async (employee) => {
    try {
      const response = await axios.put(
        `http://localhost:3001/employee/${employee._id}`,
        employee,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setEmployees((prev) =>
        prev.map((emp) => (emp._id === employee._id ? response.data : emp))
      );
      setEmployeeToEdit(null);
      setShowModal(false); // Close modal after editing
    } catch (error) {
      console.error("Error updating employee:", error.response?.data?.message || error.message);
    }
  };

  const deleteEmployee = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/employee/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEmployees((prev) => prev.filter((emp) => emp._id !== id));
    } catch (error) {
      console.error("Error deleting employee:", error.response?.data?.message || error.message);
    }
  };

  const handleEditClick = (id) => {
    const employee = employees.find((emp) => emp._id === id);
    setEmployeeToEdit(employee);
    setShowModal(true); // Open modal for editing
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const closeModal = () => {
    setShowModal(false); // Close modal
    setEmployeeToEdit(null); // Reset employee state
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Employee Management</h2>
      {fetchError && <div className="alert alert-danger">{fetchError}</div>}

      <div className="text-center mb-3">
        <button
          className="btn"
          style={{
            background: 'linear-gradient(135deg, rgba(139, 0, 0, 0.8), rgba(255, 20, 147, 0.8))',
            color: 'white',
          }}
          onClick={() => {
            setShowModal(true); // Open modal for adding
            setEmployeeToEdit(null); // Clear edit state
          }}
        >
          Add Employee
        </button>
      </div>

      <EmployeeTable employees={employees} onEdit={handleEditClick} onDelete={deleteEmployee} />

      {/* Modal for adding/editing employees */}
      <div className={`modal fade ${showModal ? "show d-block" : ""}`} style={{ backdropFilter: "blur(5px)" }}>
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{employeeToEdit ? "Edit Employee" : "Add Employee"}</h5>
            </div>
            <div className="modal-body">
              <EmployeeForm
                employeeToEdit={employeeToEdit}
                saveEmployee={employeeToEdit ? editEmployee : addEmployee}
                closeModal={closeModal} // Pass close function to form
              />
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={closeModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>

      <footer className="container mt-5 py-3 text-center">
        <button
          className="btn"
          style={{
            background: 'linear-gradient(to right, rgb(139, 0, 0), rgb(255, 69, 0))',
            color: 'white',
            position: 'absolute',
            top: '20px',
            right: '20px',
          }}
          onClick={handleLogout}
        >
          Logout
        </button>
      </footer>
    </div>
  );
}

export default Home;
