const Job = require("../models/Job");

exports.createJob = async (req, res) => {
  try {
    const { title, wagePerDay, lat, lng } = req.body;

    const job = await Job.create({
      title,
      wagePerDay,
      location: {
        lat,
        lng,
      },
      postedBy: req.user.id,
    });

    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate(
      "postedBy",
      "name email"
    );

    res.json(jobs);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};