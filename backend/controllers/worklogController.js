const WorkLog = require("../models/WorkLog");
const Job = require("../models/Job");

exports.checkIn = async (req, res) => {
  try {
    const { jobId, lat, lng } = req.body;

    const worklog = await WorkLog.create({
      worker: req.user.id,
      job: jobId,
      checkIn: {
        time: new Date(),
        lat,
        lng,
      },
    });

    res.status(201).json(worklog);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.checkOut = async (req, res) => {
  try {
    const { lat, lng } = req.body;

    const worklog = await WorkLog.findByIdAndUpdate(
      req.params.id,
      {
        checkOut: {
          time: new Date(),
          lat,
          lng,
        },
      },
      { new: true }
    );

    res.json(worklog);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.updatePayment = async (req, res) => {
  try {
    const worklog = await WorkLog.findByIdAndUpdate(
      req.params.id,
      {
        paymentStatus: req.body.paymentStatus,
      },
      { new: true }
    );

    res.json(worklog);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.raiseDispute = async (req, res) => {
  try {
    const worklog = await WorkLog.findByIdAndUpdate(
      req.params.id,
      {
        disputeStatus: "raised",
      },
      { new: true }
    );

    res.json(worklog);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getSummary = async (req, res) => {
  try {
    const workerId = req.params.workerId;

    const logs = await WorkLog.find({
      worker: workerId,
    }).populate("job");

    let totalDaysWorked = logs.length;
    let totalEarned = 0;
    let totalPending = 0;

    logs.forEach((log) => {
      if (log.job) {
        totalEarned += log.job.wagePerDay;

        if (log.paymentStatus === "pending") {
          totalPending += log.job.wagePerDay;
        }
      }
    });

    res.json({
      totalDaysWorked,
      totalEarned,
      totalPending,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
exports.getMyLogs = async (req, res) => {
  try {
    const logs = await WorkLog.find({
      worker: req.user.id,
    }).populate("job");

    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
exports.getAllLogs = async (req, res) => {
  try {
    const logs = await WorkLog.find()
      .populate("worker")
      .populate("job");

    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
