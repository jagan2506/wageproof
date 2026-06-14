import { useEffect, useState } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function MyLogs() {
  const [logs, setLogs] = useState([]);

  const fetchLogs = async () => {
    try {
      const res = await API.get("/worklogs/mylogs");
      setLogs(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

const handleCheckOut = (worklogId) => {
  navigator.geolocation.getCurrentPosition(
    async (position) => {
      try {
        await API.put(
          `/worklogs/${worklogId}/checkout`,
          {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }
        );

        alert("Checked Out Successfully");

        fetchLogs();
      } catch (error) {
        alert("Check Out Failed");
        console.log(error);
      }
    }
  );
};

const raiseDispute = async (id) => {
  try {
    await API.put(
      `/worklogs/${id}/dispute`,
      {
        disputeStatus: "raised",
      }
    );

    alert("Dispute Raised");

    fetchLogs();
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
            My Work Logs
          </h1>

          {logs.length === 0 ? (
            <div className="card">
              No work logs found
            </div>
          ) : (
            logs.map((log) => (
              <div
                key={log._id}
                className="job-card"
              >
                <h3>
                  {log.job?.title}
                </h3>

              <div
  className={`badge ${
    log.paymentStatus === "paid"
      ? "paid"
      : "pending"
  }`}
>
  {log.paymentStatus}
</div>

                <div
  className={`badge ${
    log.disputeStatus === "raised"
      ? "disputed"
      : "paid"
  }`}
>
  {log.disputeStatus}
</div>

                <p>
                  Log ID:
                  {" "}
                  {log._id}
                </p>
                <button
  className="primary-btn"
  onClick={() => handleCheckOut(log._id)}
>
  Check Out
</button>
<button
  className="danger-btn"
  onClick={() => raiseDispute(log._id)}
>
  Raise Dispute
</button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default MyLogs;