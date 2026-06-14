const express = require("express");
const router = express.Router();


const authMiddleware = require("../middleware/authMiddleware");

const {
  createJob,
  getJobs,
} = require("../controllers/jobController");

router.post("/", authMiddleware, createJob);

router.get("/", getJobs);

module.exports = router;