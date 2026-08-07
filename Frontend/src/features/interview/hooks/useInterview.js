import { useContext } from "react";

import {
  generateInterviewReport,
  getReportById as getReportByIdApi,
  getAllReport as getAllReportApi,
} from "../services/interview.api";

import { InterviewContext } from "../interview.context";


export const useInterview = () => {
    const context = useContext(InterviewContext);

  if (!context) {
    throw new Error(
      "useInterview must be used inside an InterviewProvider"
    );
  }

  const {
    loading,
    setLoading,
    report,
    setReport,
    reports,
    setReports,
  } = context;


  // Generate Report
  const generateReport = async ({
    jobDescription,
    selfDescription,
    resumeFile,
  }) => {
    setLoading(true);

    try {
      const response =
        await generateInterviewReport({
          jobDescription,
          selfDescription,
          resumeFile,
        });

      setReport(response.interviewReport);

      return response.interviewReport;
    } catch (error) {
      console.error(
        "Generate report error:",
        error
      );

      throw error;
    } finally {
      setLoading(false);
    }
  };


  // Get Report By ID
  const getReportById = async (interviewId) => {
    setLoading(true);

    try {
      const response =
        await getReportByIdApi(interviewId);

      setReport(response.interviewReport);

      return response.interviewReport;
    } catch (error) {
      console.error(
        "Get report error:",
        error
      );

      throw error;
    } finally {
      setLoading(false);
    }
  };


  // Get All Reports
  const getReports = async () => {
    setLoading(true);

    try {
      const response =
        await getAllReportApi();

      setReports(response.interviewReports);

      return response.interviewReports;
    } catch (error) {
      console.error(
        "Get reports error:",
        error
      );

      throw error;
    } finally {
      setLoading(false);
    }
  };


  return {
    loading,
    report,
    reports,
    generateReport,
    getReportById,
    getReports,
  };
};