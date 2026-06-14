import { useEffect, useState } from "react";
import API from "../api/axios";
import StatCard from "../components/StatCard";
import JobCard from "../components/JobCard";
import "../styles/dashboard.css";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import ProfileCard from "../components/ProfileCard";

function WorkerDashboard() {
  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const [jobs, setJobs] = useState([]);

  const [summary, setSummary] = useState({
    totalDaysWorked: 0,
    totalEarned: 0,
    totalPending: 0,
  });

  const fetchJobs = async () => {
    try {
      const res = await API.get("/jobs");
      setJobs(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSummary = async () => {
    try {
      const res = await API.get(
        `/worklogs/summary/${user._id}`
      );

      setSummary(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchJobs();
    fetchSummary();
  }, []);

  const handleCheckIn = (jobId) => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          await API.post("/worklogs/checkin", {
            jobId,
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });

          alert("Checked In Successfully");

          fetchSummary();
        } catch (error) {
          alert("Check In Failed");
          console.log(error);
        }
      }
    );
  };

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

          fetchSummary();
        } catch (error) {
          alert("Check Out Failed");
          console.log(error);
        }
      }
    );
  };

  
    return (
  <div className="layout">
    <Sidebar />

    <div className="main-content">
      <Navbar />

      <div className="container">
        <h1 className="page-title">
          Worker Dashboard
        </h1>
        <ProfileCard />

        <div className="stats-grid">
          <StatCard
            title="Days Worked"
            value={summary.totalDaysWorked}
            color="blue"
          />

          <StatCard
            title="Total Earned"
            value={`₹${summary.totalEarned}`}
            color="green"
          />

          <StatCard
            title="Pending"
            value={`₹${summary.totalPending}`}
            color="orange"
          />
        </div>

        <div className="card">
          <h2>Available Jobs</h2>

          {jobs.map((job) => (
            <JobCard
              key={job._id}
              job={job}
              onCheckIn={handleCheckIn}
            />
          ))}
        </div>
      </div>
    </div>
  </div>
);
  
}

export default WorkerDashboard;