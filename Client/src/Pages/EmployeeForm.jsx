import React, { useState, useEffect } from "react";
import { FaUser, FaPhone, FaBriefcase } from "react-icons/fa"; // Use React icons

function EmployeeForm({ employeeToEdit, saveEmployee, closeModal }) {
  const [employee, setEmployee] = useState({ name: "", contact: "", position: "" });
  const [errors, setErrors] = useState({ name: "", contact: "", position: "" });

  useEffect(() => {
    if (employeeToEdit) {
      setEmployee(employeeToEdit);
    } else {
      // Reset the form if no employee is being edited
      setEmployee({ name: "", contact: "", position: "" });
    }
  }, [employeeToEdit]);

  const handleInputChange = (e) => {
    setEmployee({
      ...employee,
      [e.target.name]: e.target.value,
    });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = (employee) => {
    let isValid = true;
    let validationErrors = { name: "", contact: "", position: "" };

    if (!employee.name.trim()) {
      validationErrors.name = "Name is required";
      isValid = false;
    }
    if (!employee.contact.trim() || !/^\d{10}$/.test(employee.contact)) {
      validationErrors.contact = "Contact number must be 10 digits";
      isValid = false;
    }
    if (!employee.position.trim()) {
      validationErrors.position = "Position is required";
      isValid = false;
    }

    setErrors(validationErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate(employee)) {
      saveEmployee(employee);
      setEmployee({ name: "", contact: "", position: "" });
      closeModal(); // Close the modal after saving
    }
  };



  return (
    <div className="container mt-4 d-flex justify-content-center">
      <div className="card shadow-lg" style={{ width: '500px', borderRadius: '15px', background: 'linear-gradient(135deg, rgba(139, 0, 0, 0.8), rgba(255, 20, 147, 0.8))' }}>
        <div className="card-body text-center">
          <h5 className="card-title text-white mb-4">{employeeToEdit ? "Edit Employee" : "Add Employee"}</h5>
          <form onSubmit={handleSubmit}>
            <div className="form-row justify-content-center mb-3">
              
              {/* Name field with icon */}
              <div className="col-md-12 mb-3">
                <div className="input-group ">
                  <span className="input-group-text bg-light text-dark"><FaUser /></span> {/* Updated icon */}
                  <input
                    type="text"
                    name="name"
                    className={`form-control ${errors.name ? "is-invalid" : ""}`}
                    placeholder="Name"
                    value={employee.name}
                    onChange={handleInputChange}
                    style={{
                      backgroundColor: 'rgba(245, 245, 245, 1)', // Light input field background
                      color: 'black', // Black text color
                    }}
                  />
                  <div className="invalid-feedback" style={{
                    background: 'linear-gradient(135deg, rgba(139, 0, 0, 0.8), rgba(255, 20, 147, 0.8))',
                    color: 'white',
                    border: '1px solid white',
                    borderRadius: '5px',
                    padding: '5px',
                    marginTop: '5px',
                  }}>
                    {errors.name}
                  </div>
                </div>
              </div>

              {/* Contact field with icon */}
              <div className="col-md-12 mb-3">
                <div className="input-group">
                  <span className="input-group-text bg-light text-dark"><FaPhone /></span> {/* Updated icon */}
                  <input
                    type="text"
                    name="contact"
                    className={`form-control ${errors.contact ? "is-invalid" : ""}`}
                    placeholder="Contact"
                    value={employee.contact}
                    onChange={handleInputChange}
                    style={{
                      backgroundColor: 'rgba(245, 245, 245, 1)', // Light input field background
                      color: 'black', // Black text color
                    }}
                  />
                  <div className="invalid-feedback" style={{
                    background: 'linear-gradient(135deg, rgba(139, 0, 0, 0.8), rgba(255, 20, 147, 0.8))',
                    color: 'white',
                    border: '1px solid white',
                    borderRadius: '5px',
                    padding: '5px',
                    marginTop: '5px',
                  }}>
                    {errors.contact}
                  </div>
                </div>
              </div>

              {/* Position field with icon */}
              <div className="col-md-12 mb-3">
                <div className="input-group">
                  <span className="input-group-text bg-light text-dark"><FaBriefcase /></span> {/* Updated icon */}
                  <input
                    type="text"
                    name="position"
                    className={`form-control ${errors.position ? "is-invalid" : ""}`}
                    placeholder="Position"
                    value={employee.position}
                    onChange={handleInputChange}
                    style={{
                      backgroundColor: 'rgba(245, 245, 245, 1)', // Light input field background
                      color: 'black', // Black text color
                    }}
                  />
                  <div className="invalid-feedback" style={{
                    background: 'linear-gradient(135deg, rgba(139, 0, 0, 0.8), rgba(255, 20, 147, 0.8))',
                    color: 'white',
                    border: '1px solid white',
                    borderRadius: '5px',
                    padding: '5px',
                    marginTop: '5px',
                  }}>
                    {errors.position}
                  </div>
                </div>
              </div>

            </div>
            <div className="text-center mb-4">
              <button className="btn btn-light text-primary" style={{ borderRadius: '20px', fontWeight: 'bold' }} type="submit">
                {employeeToEdit ? "Update Employee" : "Add Employee"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EmployeeForm;

