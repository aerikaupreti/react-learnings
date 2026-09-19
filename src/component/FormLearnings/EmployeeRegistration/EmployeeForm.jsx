import { useState } from "react";
import "./createemployeeForm.css";

const initialForm = {
  employeeName: "",
  email: "",
  phone: "",
  dateOfBirth: "",
  department: "IT",
  designation: "Intern",
  employmentType: "Full-Time",
  salary: "",
  joiningDate: "",
  workForm: "Remote",
  skills: ["Javascript"],
  emergencyContact: "",
  employeeStatus: true,
};

const EmployeeForm = () => {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [annualSalary, setAnnualSalary] = useState(0);

  const updateField = (event) => {
    const { name, value, type, checked } = event.target;

    if (name === "skills") {
      setForm((currentForm) => ({
        ...currentForm,
        skills: checked
          ? [...currentForm.skills, value]
          : currentForm.skills.filter((skill) => skill !== value),
      }));

      return;
    }
    if (name === "salary") {
      const salaryValue = parseFloat(value);
      setAnnualSalary(salaryValue * 12);
    }
    setForm((currentForm) => ({
      ...currentForm,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ type: "loading", message: "Creating employee..." });

    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        },
      );
      if (!response.ok) {
        throw new Error("The demo API could not create the employee.");
      }

      const result = await response.json();
      setStatus({
        type: "success",
        message: `Employee created successfully (demo id: ${result.id}).`,
      });
      setForm(initialForm);
    } catch (error) {
      setStatus({ type: "error", message: error.message });
    }
  };

  return (
    <main className="employee-page">
      <section className="employee-intro">
        <p className="eyebrow">Coursework studio</p>
        <h1>Create an Employee</h1>
        <p>
          Shape the brief, set the hand-in window, and send it to the demo
          service.
        </p>
      </section>

      <form className="employee-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          <label className="field field-wide">
            Employee Name
            <input
              type="text"
              name="employeeName"
              value={form.employeeName}
              onChange={updateField}
              placeholder="John Doe"
              required
            />
          </label>

          <label className="field field-wide">
            Email
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={updateField}
              placeholder="john.doe@example.com"
              required
            />
          </label>
          <label className="field field-wide">
            Phone
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={updateField}
              placeholder="123-456-7890"
              required
            />
          </label>
          <label className="field field-wide">
            Date of Birth
            <input
              type="date"
              name="dateOfBirth"
              value={form.dateOfBirth}
              onChange={updateField}
              required
            />
          </label>

          <label className="field">
            Department
            <select
              name="department"
              value={form.department}
              onChange={updateField}
            >
              <option>IT</option>
              <option>HR</option>
              <option>Finance</option>
              <option>Marketing</option>
              <option>Management</option>
            </select>
          </label>
          <label className="field">
            Designation
            <select
              name="designation"
              value={form.designation}
              onChange={updateField}
            >
              <option>Intern</option>
              <option>Junior Developer</option>
              <option>Senior Developer</option>
              <option>Manager</option>
              <option>Accountant</option>
            </select>
          </label>

          <fieldset className="field field-wide">
            <legend>Employment Type</legend>
            <div className="radio-group">
              {["Full-time", "Part-time", "Contract"].map((type) => (
                <label className="radio-option" key={type}>
                  <input
                    type="radio"
                    name="employmentType"
                    value={type}
                    checked={form.employmentType === type}
                    onChange={updateField}
                  />
                  {type}
                </label>
              ))}
            </div>
          </fieldset>

          <label className="field">
            Salary
            <input
              type="number"
              name="salary"
              value={form.salary}
              onChange={updateField}
              required
            />
          </label>
          {annualSalary > 0 && (
            <label className="field">
              Annual Salary
              <input
                type="number"
                name="annualSalary"
                value={annualSalary}
                readOnly
                required
              />
            </label>
          )}
          <label className="field">
            Joining Date
            <input
              type="date"
              name="joiningDate"
              value={form.joiningDate}
              onChange={updateField}
              required
            />
          </label>

          <fieldset className="field field-wide">
            <legend>Skills</legend>
            <div className="radio-group">
              {["Javascript", "React", "Node.js", "Python", "SQL"].map(
                (type) => (
                  <label className="radio-option" key={type}>
                    <input
                      type="checkbox"
                      name="skills"
                      value={type}
                      checked={form.skills.includes(type)}
                      onChange={updateField}
                    />
                    {type}
                  </label>
                ),
              )}
            </div>
          </fieldset>
          <label className="field field-wide">
            Emergency Contact
            <input
              type="number"
              name="emergencyContact"
              value={form.emergencyContact}
              onChange={updateField}
              placeholder="123-456-7890"
              required
            />
          </label>
          <label className="checkbox-option">
            <input
              type="checkbox"
              name="employeeStatus"
              checked={form.employeeStatus}
              onChange={updateField}
            />
            Mark as active
          </label>
        </div>
        <div className="form-actions">
          <button type="submit" disabled={status.type === "loading"}>
            {status.type === "loading" ? "Sending..." : "Create employee"}
          </button>
          {status.message && (
            <p className={`form-status ${status.type}`} role="status">
              {status.message}
            </p>
          )}
        </div>
      </form>
    </main>
  );
};

export default EmployeeForm;
