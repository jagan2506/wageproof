function JobCard({ job, onCheckIn }) {
  return (
    <div className="job-card">
      <h3>{job.title}</h3>

      <p>₹{job.wagePerDay} / day</p>

      <button onClick={() => onCheckIn(job._id)}>
        Check In
      </button>
    </div>
  );
}

export default JobCard;