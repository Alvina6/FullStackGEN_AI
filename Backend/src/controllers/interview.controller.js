const { PDFParse } = require("pdf-parse");

const generateInterviewReport = require("../services/ai.service");
const interviewReportModel = require("../models/interviewReport.model");


// Generate Interview Report
async function generateReport(req, res, next) {
  try {
    const selfDescription =
      req.body.selfDescription ?? req.body.selfdescribe ?? "";

    const jobDescription =
      req.body.jobDescription ?? req.body.jobdescribe;

    // Check resume
    if (!req.file) {
      return res.status(400).json({
        message: "A PDF resume file is required",
      });
    }

    // Check required fields
    const missingFields = [
      !String(selfDescription ?? "").trim() &&
        "selfDescription",

      !String(jobDescription ?? "").trim() &&
        "jobDescription",
    ].filter(Boolean);

    if (missingFields.length) {
      return res.status(400).json({
        message: `Missing required field(s): ${missingFields.join(
          ", "
        )}`,

        acceptedFieldNames: {
          selfDescription: [
            "selfDescription",
            "selfdescribe",
          ],
          jobDescription: [
            "jobDescription",
            "jobdescribe",
          ],
        },
      });
    }

    // Parse PDF
    const parser = new PDFParse({
      data: req.file.buffer,
    });

    let resumeText;
    let totalPages = null;

    try {
      resumeText = await parser.getText();
      totalPages = parser.doc?.numPages ?? null;
    } finally {
      await parser.destroy();
    }

    // Check extracted text
    if (!String(resumeText ?? "").trim()) {
      return res.status(400).json({
        message:
          "The resume PDF does not contain readable text",
      });
    }

    // Generate AI report
    const report = await generateInterviewReport(
      resumeText,
      selfDescription,
      jobDescription
    );

    // Save report
    const interviewReport =
      await interviewReportModel.create({
        user: req.user.id,

        title: report.title,

        resume: {
          text: resumeText,
          totalPages,
        },

        selfdescribe: selfDescription,
        jobdescribe: jobDescription,

        matchScore: report.matchScore,

        technicalQuestions:
          report.technicalQuestions,

        behavioralQuestions:
          report.behavioralQuestions,

        skillGaps:
          report.skillGaps,

        preparationPlan:
          report.preparationPlan,
      });

    return res.status(201).json({
      message:
        "Interview report generated successfully",

      interviewReport,
    });
  } catch (error) {
    return next(error);
  }
}


// Get single report
async function getReport(req, res, next) {
  try {
    const { interviewId } = req.params;

    const report =
      await interviewReportModel.findOne({
        _id: interviewId,
        user: req.user.id,
      });

    if (!report) {
      return res.status(404).json({
        message: "Interview report not found",
      });
    }

    return res.status(200).json({
      message: "Interview report found",
      interviewReport: report,
    });
  } catch (error) {
    return next(error);
  }
}


// Get all reports
async function getAllReports(req, res, next) {
  try {
    const reports =
      await interviewReportModel
        .find({
          user: req.user.id,
        })
        .sort({
          createdAt: -1,
        })
        .select(
          "-resume -selfdescribe -jobdescribe"
        );

    return res.status(200).json({
      message: "Interview reports found",
      interviewReports: reports,
    });
  } catch (error) {
    return next(error);
  }
}


module.exports = {
  generateReport,
  getReport,
  getAllReports,
};