import { useState } from "react";
import "./createassingmentForm.css";

const initialForm = {
  title: "",
  course: "",
  subjectTeacher: "",
  description: "",
  dueDate: "",
};

const NewCreateAssignment = () => {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({ type: "", message: "" });

  const updateField = (event) => {
    const { name, value, type, checked } = event.target;
    console.log(`Updating field: ${name} = ${value}`);
    setForm((currentForm) => ({
      ...currentForm,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ type: "loading", message: "Creating assignment..." });

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
        throw new Error("The demo API could not create the assignment.");
      }

      const result = await response.json();
      setStatus({
        type: "success",
        message: `Assignment created successfully (demo id: ${result.id}).`,
      });
      setForm(initialForm);
    } catch (error) {
      setStatus({ type: "error", message: error.message });
    }
  };

  return (
    <main className="assignment-page">
      <section className="assignment-intro">
        <p className="eyebrow">Coursework studio</p>
        <h1>Create an assignment</h1>
        <p>
          Shape the brief, set the hand-in window, and send it to the demo
          service.
        </p>
      </section>

      <form className="assignment-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          <label className="field field-wide">
            Assignment Title
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={updateField}
              placeholder="e.g. Build a weather dashboard"
              required
            />
          </label>

          <label className="field field-wide">
            Course
            <input
              type="text"
              name="course"
              value={form.course}
              onChange={updateField}
              placeholder="e.g. Introduction to React"
              required
            />
          </label>
          <label className="field field-wide">
            Subject Teacher
            <input
              type="text"
              name="subjectTeacher"
              value={form.subjectTeacher}
              onChange={updateField}
              placeholder="e.g. John Doe"
              required
            />
          </label>
          <label className="field field-wide">
            Description
            <textarea
              type="text"
              name="description"
              value={form.description}
              onChange={updateField}
              placeholder="e.g. John Doe"
              required
            />
          </label>

          <label className="field">
            Due date
            <input
              type="date"
              name="dueDate"
              value={form.dueDate}
              onChange={updateField}
              required
            />
          </label>

          <label className="field">
            Due time
            <input
              type="time"
              name="dueTime"
              value={form.dueTime}
              onChange={updateField}
              required
            />
          </label>
        </div>

        <div className="form-actions">
          <button type="submit" disabled={status.type === "loading"}>
            {status.type === "loading" ? "Sending..." : "Create assignment"}
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

export default NewCreateAssignment;
