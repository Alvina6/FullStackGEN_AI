const { GoogleGenAI } = require("@google/genai");
const { z } = require("zod");

const questionSchema = z.object({
  question: z.string(),
  intention: z.string(),
  answer: z.string(),
});

const interviewReportSchema = z.object({
  matchScore: z.number().min(0).max(100),
  technicalQuestions: z.array(questionSchema),
  behavioralQuestions: z.array(questionSchema),
  skillGaps: z.array(
    z.object({
      skill: z.string(),
      severity: z.enum(["low", "medium", "high"]),
    }),
  ),
  preparationPlan: z.array(
    z.object({
      day: z.number().int().positive(),
      focus: z.string(),
      tasks: z.array(z.string()),
    }),
  ),
});

async function generateInterviewReport(resume, selfdescribe, jobdescribe) {
  if (!process.env.GOOGLE_GENAI_API_KEY) {
    throw new Error("GOOGLE_GENAI_API_KEY is missing from the .env file.");
  }

  if (!resume || !selfdescribe || !jobdescribe) {
    throw new Error("Resume, self-description, and job description are required.");
  }

  const prompt = `Generate an interview preparation report for this candidate.

Candidate resume:
${JSON.stringify(resume, null, 2)}

Candidate self-description:
${selfdescribe}

Job description:
${JSON.stringify(jobdescribe, null, 2)}

Return only JSON that follows the supplied response schema.`;

  const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GENAI_API_KEY });
  const response = await ai.models.generateContent({
    model: process.env.GEMINI_MODEL || "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseJsonSchema: z.toJSONSchema(interviewReportSchema),
    },
  });

  return interviewReportSchema.parse(JSON.parse(response.text));
}

module.exports = generateInterviewReport;
