import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./assignmentList.css";

const ASSIGNMENTS_API = "https://jsonplaceholder.typicode.com/posts";

const AssignmentList = () => {
  const [assignments, setAssignments] = useState([]);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");

  const fetchAssignments = useCallback(async () => {
    setStatus("loading");
    setError("");

    try {
      const response = await fetch(`${ASSIGNMENTS_API}?_limit=10`);

      if (!response.ok) {
        throw new Error("Could not load assignments.");
      }

      const posts = await response.json();
      setAssignments(posts);
      setStatus("success");
    } catch (requestError) {
      setError(requestError.message);
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    fetchAssignments();
  }, [fetchAssignments]);

  return (
    <main className="list-page">
      <section className="list-header">
        <div>
          <p className="eyebrow">Coursework studio</p>
          <h1>Assignments</h1>
          <p>Review the latest assignment briefs from the demo service.</p>
        </div>
        <Link className="primary-link" to="/assignments/new">
          + Create assignment
        </Link>
        <Link className="primary-link" to="/product/new">
          + Create Product
        </Link>
        <Link className="primary-link" to="/event/new">
          + Create Event
        </Link>
      </section>

      {status === "loading" && (
        <p className="list-message">Loading assignments...</p>
      )}

      {status === "error" && (
        <div className="list-message error-message">
          <p>{error}</p>
          <button type="button" onClick={fetchAssignments}>
            Try again
          </button>
        </div>
      )}

      {status === "success" && assignments.length === 0 && (
        <p className="list-message">No assignments found.</p>
      )}

      {status === "success" && assignments.length > 0 && (
        <section className="assignment-list" aria-label="Assignment list">
          {assignments.map((assignment, index) => (
            <article className="assignment-item" key={assignment.id}>
              <div className="assignment-number">
                {String(index + 1).padStart(2, "0")}
              </div>
              <div className="assignment-copy">
                <h2>{assignment.title}</h2>
                <p>{assignment.body}</p>
              </div>
              <span className="assignment-id">ID {assignment.id}</span>
            </article>
          ))}
        </section>
      )}
    </main>
  );
};

export default AssignmentList;
