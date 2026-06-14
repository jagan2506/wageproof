const express = require("express");
const authRoutes = require("./routes/authRoutes");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const jobRoutes = require("./routes/jobRoutes");
const worklogRoutes = require("./routes/worklogRoutes");

dotenv.config();

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://wageproof-ten.vercel.app",
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use("/api/jobs", jobRoutes);
app.use("/api/worklogs", worklogRoutes);
// ADD THIS LINE
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("WageProof Backend Running");
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");

    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });