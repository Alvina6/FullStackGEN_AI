import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});


// Generate report
export async function generateInterviewReport({
  jobDescription,
  selfDescription,
  resumeFile,
}) {
  const formData = new FormData();

  formData.append(
    "jobDescription",
    jobDescription
  );

  formData.append(
    "selfDescription",
    selfDescription
  );

  formData.append(
    "resumeFile",
    resumeFile
  );

  const response = await api.post(
    "/api/interview",
    formData
  );

  return response.data;
}


// Get single report
export async function getReportById(interviewId) {
  const response = await api.get(
    `/api/interview/interview/${interviewId}`
  );

  return response.data;
}


// Get all reports
export async function getAllReport() {
  const response = await api.get(
    "/api/interview"
  );

  return response.data;
}

export async function generateResumePdf(interviewReportId) {
  const response = await api.post(
    `/api/interview/resume/pdf/${interviewReportId}`,
    null,
    {
      responseType: "blob",
    }
  );

  return response.data;
}
