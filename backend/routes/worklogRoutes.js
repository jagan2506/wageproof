const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  checkIn,
  checkOut,
  updatePayment,
  raiseDispute,
  getSummary,
} = require("../controllers/worklogController");

router.post("/checkin", authMiddleware, checkIn);

router.put("/:id/checkout", authMiddleware, checkOut);

router.put("/:id/payment", authMiddleware, updatePayment);

router.put("/:id/dispute", authMiddleware, raiseDispute);

router.get("/summary/:workerId", authMiddleware, getSummary);

module.exports = router;