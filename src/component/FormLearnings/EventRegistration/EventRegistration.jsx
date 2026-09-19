import { useState } from "react";
import "./eventRegistration.css";

const initialForm = {
  participantName: "",
  email: "",
  phone: "",
  collegeName: "",
  faculty: "Science and Technology",
  semester: "1st",
  event: "Web Development Workshop",
  participationType: "Individual",
  teamMembers: "",
  foodPreference: "Vegetarian",
  requirements: [],
  comments: "",
  agreeToRules: false,
};

const EventRegistration = () => {
  const [form, setForm] = useState(initialForm);

  const [status, setStatus] = useState({
    type: "",
    message: "",
  });

  const updateField = (event) => {
    const { name, value, type, checked } = event.target;

    if (name === "requirements") {
      setForm((currentForm) => ({
        ...currentForm,
        requirements: checked
          ? [...currentForm.requirements, value]
          : currentForm.requirements.filter(
              (requirement) => requirement !== value,
            ),
      }));

      return;
    }

    setForm((currentForm) => ({
      ...currentForm,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.agreeToRules) {
      setStatus({
        type: "error",
        message: "You must agree to the event rules.",
      });

      return;
    }

    if (
      form.participationType === "Team" &&
      (!form.teamMembers || Number(form.teamMembers) < 2)
    ) {
      setStatus({
        type: "error",
        message: "A team must have at least 2 members.",
      });

      return;
    }

    setStatus({
      type: "loading",
      message: "Submitting registration...",
    });

    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to submit registration.");
      }

      const result = await response.json();

      setStatus({
        type: "success",
        message: `Registration successful! Demo Registration ID: ${result.id}`,
      });

      setForm(initialForm);
    } catch (error) {
      setStatus({
        type: "error",
        message:
          "Something went wrong while submitting the registration. Please try again.",
      });
    }
  };

  return (
    <main className="event-page">
      <section className="event-intro">
        <p className="eyebrow">College Event</p>

        <h1>Event Registration</h1>

        <p>
          Register for your preferred college event by providing the required
          information.
        </p>
      </section>

      <form className="event-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          {/* Participant Name */}
          <label className="field field-wide">
            Participant Name
            <input
              type="text"
              name="participantName"
              value={form.participantName}
              onChange={updateField}
              placeholder="Enter participant name"
              required
            />
          </label>

          {/* Email */}
          <label className="field">
            Email
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={updateField}
              placeholder="example@gmail.com"
              required
            />
          </label>

          {/* Phone */}
          <label className="field">
            Phone
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={updateField}
              placeholder="98XXXXXXXX"
              required
            />
          </label>

          {/* College Name */}
          <label className="field field-wide">
            College Name
            <input
              type="text"
              name="collegeName"
              value={form.collegeName}
              onChange={updateField}
              placeholder="Enter college name"
              required
            />
          </label>

          {/* Faculty */}
          <label className="field">
            Faculty
            <select
              name="faculty"
              value={form.faculty}
              onChange={updateField}
              required
            >
              <option>Science and Technology</option>
              <option>Management</option>
              <option>Humanities</option>
              <option>Education</option>
              <option>Law</option>
            </select>
          </label>

          {/* Semester */}
          <label className="field">
            Semester
            <select
              name="semester"
              value={form.semester}
              onChange={updateField}
              required
            >
              <option>1st</option>
              <option>2nd</option>
              <option>3rd</option>
              <option>4th</option>
              <option>5th</option>
              <option>6th</option>
              <option>7th</option>
              <option>8th</option>
            </select>
          </label>

          {/* Event */}
          <label className="field field-wide">
            Event
            <select
              name="event"
              value={form.event}
              onChange={updateField}
              required
            >
              <option>Web Development Workshop</option>
              <option>AI Seminar</option>
              <option>Coding Competition</option>
              <option>UI/UX Workshop</option>
            </select>
          </label>

          {/* Participation Type */}
          <fieldset className="field field-wide">
            <legend>Participation Type</legend>

            <div className="radio-group">
              {["Individual", "Team"].map((type) => (
                <label className="radio-option" key={type}>
                  <input
                    type="radio"
                    name="participationType"
                    value={type}
                    checked={form.participationType === type}
                    onChange={updateField}
                  />

                  {type}
                </label>
              ))}
            </div>
          </fieldset>

          {/* Number of Team Members */}
          {form.participationType === "Team" && (
            <label className="field">
              Number of Team Members
              <input
                type="number"
                name="teamMembers"
                value={form.teamMembers}
                onChange={updateField}
                placeholder="Enter number of members"
                min="2"
                required
              />
            </label>
          )}

          {/* Food Preference */}
          <fieldset className="field field-wide">
            <legend>Food Preference</legend>

            <div className="radio-group">
              {["Vegetarian", "Non-Vegetarian"].map((preference) => (
                <label className="radio-option" key={preference}>
                  <input
                    type="radio"
                    name="foodPreference"
                    value={preference}
                    checked={form.foodPreference === preference}
                    onChange={updateField}
                  />

                  {preference}
                </label>
              ))}
            </div>
          </fieldset>

          {/* Requirements */}
          <fieldset className="field field-wide">
            <legend>Requirements</legend>

            <div className="checkbox-group">
              {["Certificate", "Lunch", "Workshop Materials"].map(
                (requirement) => (
                  <label className="checkbox-option" key={requirement}>
                    <input
                      type="checkbox"
                      name="requirements"
                      value={requirement}
                      checked={form.requirements.includes(requirement)}
                      onChange={updateField}
                    />

                    {requirement}
                  </label>
                ),
              )}
            </div>
          </fieldset>

          {/* Comments / Special Request */}
          <label className="field field-wide">
            Comments / Special Request
            <textarea
              name="comments"
              value={form.comments}
              onChange={updateField}
              placeholder="Enter any comments or special requests"
              rows="5"
            />
          </label>

          {/* Agree to Event Rules */}
          <label className="checkbox-option field-wide">
            <input
              type="checkbox"
              name="agreeToRules"
              checked={form.agreeToRules}
              onChange={updateField}
              required
            />
            I agree to the event rules and regulations.
          </label>
        </div>

        {/* Submit */}
        <div className="form-actions">
          <button type="submit" disabled={status.type === "loading"}>
            {status.type === "loading" ? "Submitting..." : "Register for Event"}
          </button>

          {/* Status Message */}
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

export default EventRegistration;
