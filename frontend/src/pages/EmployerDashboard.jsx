import { useEffect, useState } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import StatCard from "../components/StatCard";
import ProfileCard from "../components/ProfileCard";

function EmployerDashboard() {
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [jobs, setJobs] = useState([]);
  const [stats, setStats] = useState({
  totalJobs: 0,
  totalWorkers: 0,
  pendingPayments: 0,
});

  const [form, setForm] = useState({
    title: "",
    wagePerDay: "",
    lat: "",
    lng: "",
  });

  const fetchJobs = async () => {
    try {
      const res = await API.get("/jobs");
      setJobs(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  

  useEffect(() => {
    fetchJobs();
  }, []);
  useEffect(() => {
  setStats({
    totalJobs: jobs.length,
    totalWorkers: jobs.length * 2,
    pendingPayments: jobs.length * 800,
  });
}, [jobs]);
const getCurrentLocation = () => {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      setForm({
        ...form,
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    },
    (error) => {
      console.log(error);
      alert("Location access denied");
    }
  );
};
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/jobs", form);

      setForm({
        title: "",
        wagePerDay: "",
        lat: "",
        lng: "",
      });

      fetchJobs();

      alert("Job Created");
    } catch (error) {
      alert("Failed to create job");
    }
  };

  return (
  <div className="layout">
    <Sidebar />

    <div className="main-content">
      <Navbar />

      <div className="container">
        <h1 className="page-title">
          Employer Dashboard
        </h1>
        <ProfileCard />

        <div className="stats-grid">
          <StatCard
            title="Total Jobs"
            value={stats.totalJobs}
            color="blue"
          />

          <StatCard
            title="Workers"
            value={stats.totalWorkers}
            color="green"
          />

          <StatCard
            title="Pending"
            value={`₹${stats.pendingPayments}`}
            color="orange"
          />
        </div>

        <div className="card">
          <h3>Welcome {user?.name}</h3>
        </div>

        <div className="card">
          <h2>Create Job</h2>

          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <input
                placeholder="Job Title"
                value={form.title}
                onChange={(e) =>
                  setForm({
                    ...form,
                    title: e.target.value,
                  })
                }
              />

              <input
                placeholder="Daily Wage"
                value={form.wagePerDay}
                onChange={(e) =>
                  setForm({
                    ...form,
                    wagePerDay: e.target.value,
                  })
                }
              />

              <input
                placeholder="Latitude"
                value={form.lat}
                readOnly
              />

              <input
                placeholder="Longitude"
                value={form.lng}
                readOnly
              />
            </div>

            <br />

            <button
              type="button"
              className="primary-btn"
              onClick={getCurrentLocation}
            >
              📍 Use Current Location
            </button>

            <br />
            <br />

            <button
              type="submit"
              className="primary-btn"
            >
              Create Job
            </button>
          </form>
        </div>

        <div className="card">
          <h2>All Jobs</h2>

          {jobs.map((job) => (
            <div
              key={job._id}
              className="job-card"
            >
              <h3>{job.title}</h3>

              <p>
                ₹{job.wagePerDay} / day
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);
}

export default EmployerDashboard;