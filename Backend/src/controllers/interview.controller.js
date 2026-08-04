const { PDFParse } = require('pdf-parse');
const generateInterviewReport = require('../services/ai.service');
const interviewReportModel = require('../models/interviewReport.model');

async function generateReport(req, res, next) {
  try {
    const selfDescription = req.body.selfDescription ?? req.body.selfdescribe;
    const jobDescription = req.body.jobDescription ?? req.body.jobdescribe;

    if (!req.file) {
      return res.status(400).json({ message: 'A PDF resume file is required' });
    }

    const missingFields = [
      !String(selfDescription ?? '').trim() && 'selfDescription',
      !String(jobDescription ?? '').trim() && 'jobDescription',
    ].filter(Boolean);

    if (missingFields.length) {
      return res.status(400).json({
        message: `Missing required field(s): ${missingFields.join(', ')}`,
        acceptedFieldNames: {
          selfDescription: ['selfDescription', 'selfdescribe'],
          jobDescription: ['jobDescription', 'jobdescribe'],
        },
      });
    }

    const parser = new PDFParse({ data: req.file.buffer });
    let resumeContent;
    try {
      resumeContent = await parser.getText();
    } finally {
      await parser.destroy();
    }

    if (!resumeContent.text.trim()) {
      return res.status(400).json({ message: 'The resume PDF does not contain readable text' });
    }

    const report = await generateInterviewReport(resumeContent.text, selfDescription, jobDescription);
    const interviewReport = await interviewReportModel.create({
      user: req.user.id,
      resume: { text: resumeContent.text, totalPages: resumeContent.total },
      selfdescribe: selfDescription,
      jobdescribe: jobDescription,
      matchScore: report.matchScore,
      technicalQuestions: report.technicalQuestions,
      behavioralQuestions: report.behavioralQuestions,
      skillGaps: report.skillGaps,
      preparationPlan: report.preparationPlan,
    });

    return res.status(201).json({ message: 'Interview report generated successfully', interviewReport });
  } catch (error) {
    return next(error);
  }
}

module.exports = { generateReport };
