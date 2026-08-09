const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    intention: { type: String, required: true },
    answer: { type: String, required: true },
  },
  { _id: false },
);

const skillGapSchema = new mongoose.Schema(
  {
    skill: { type: String, required: true },
    severity: { type: String, enum: ["low", "medium", "high"], required: true },
  },
  { _id: false },
);

const preparationPlanSchema = new mongoose.Schema(
  {
    day: { type: Number, required: true },
    focus: { type: String, required: true },
    tasks: [{ type: String, required: true }],
  },
  { _id: false },
);

const interviewReportSchema = new mongoose.Schema(
  {
    jobdescribe: { type: mongoose.Schema.Types.Mixed, required: true },
    resume: { type: mongoose.Schema.Types.Mixed, required: true },
    selfdescribe: { type: String, required: true },
    matchScore: { type: Number, min: 0, max: 100, required: true },
    technicalQuestions: { type: [questionSchema], default: [] },
    behavioralQuestions: { type: [questionSchema], default: [] },
    skillGaps: { type: [skillGapSchema], default: [] },
    preparationPlan: { type: [preparationPlanSchema], default: []
    },
    user:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User"
    },
    title: {
      type: String,
      required: true,
    }
  },
  { timestamps: true },
);

module.exports = mongoose.model("InterviewReport", interviewReportSchema);
