import { useEffect, useState } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
console.log("EmployerLogs Loaded");
function EmployerLogs() {
  const [logs, setLogs] = useState([]);

  const fetchLogs = async () => {
    try {
      const res = await API.get("/worklogs/all");

console.log(res.data);

setLogs(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const markPaid = async (id) => {
    try {
      await API.put(
        `/worklogs/${id}/payment`,
        {
          paymentStatus: "paid",
        }
      );

      fetchLogs();

      alert("Payment Updated");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="layout">
      <Sidebar />

      <div className="main-content">
        <Navbar />

        <div className="container">
          <h1 className="page-title">
            Employer Work Logs
          </h1>

        {logs.length === 0 ? (
  <div className="card">
    <h3>No Work Logs Found</h3>
  </div>
) : (
  logs.map((log) => (
    <div
      key={log._id}
      className="card"
      style={{ marginBottom: "20px" }}
    >
      <h3>{log.job?.title}</h3>

      <p>
        <strong>Worker:</strong>{" "}
        {log.worker?.name}
      </p>

      <p>
        <strong>Email:</strong>{" "}
        {log.worker?.email}
      </p>

      <p>
        <strong>Payment:</strong>{" "}
        {log.paymentStatus}
      </p>

      <p>
        <strong>Dispute:</strong>{" "}
        {log.disputeStatus}
      </p>

      <button
        className="primary-btn"
        onClick={() => markPaid(log._id)}
      >
        Mark Paid
      </button>
    </div>
  ))
)}
        </div>
      </div>
    </div>
  );
}

export default EmployerLogs;