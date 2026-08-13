const express = require("express");

const router = express.Router();

const authMiddleware = require("../middlewares/auth.middleware");
const fileMiddleware = require("../middlewares/file.middleware");

const interviewController = require("../controllers/interview.controller");

// Generate interview report
router.post(
  "/",
  authMiddleware,
  fileMiddleware.single("resumeFile"),
  interviewController.generateReport
);

// Get single interview report
router.get(
  "/interview/:interviewId",
  authMiddleware,
  interviewController.getReport
);

// Get all interview reports
router.get(
  "/",
  authMiddleware,
  interviewController.getAllReports
);

router.post('/resume/pdf/:interviewReportId',authMiddleware, interviewController.generateResumePdfController )

module.exports = router;