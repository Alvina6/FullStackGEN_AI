import { useContext , useEffect} from "react";


import {
  generateInterviewReport,
  getReportById as getReportByIdApi,
  getAllReport as getAllReportApi,
  generateResumePdf
} from "../services/interview.api";

import { InterviewContext } from "../interview.context";


export const useInterview = (interviewId) => {
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
const getResumePdf = async (interviewReportId) => {
        setLoading(true)
        let response = null
        try {
      // Ensure we pass the raw id string to the API
      response = await generateResumePdf(interviewReportId)
      const url = window.URL.createObjectURL(new Blob([response], { type: "application/pdf" }))
      const link = document.createElement("a")
      link.href = url
      const idValue = typeof interviewReportId === 'object' ? JSON.stringify(interviewReportId) : String(interviewReportId)
      link.setAttribute("download", `resume_${idValue}.pdf`)
            document.body.appendChild(link)
            link.click()
        }
        catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (interviewId) {
            getReportById(interviewId)
        } else {
            getReports()
        }
    }, [ interviewId ])

  return {
    loading,
    report,
    reports,
    generateReport,
    getReportById,
    getReports,
    getResumePdf,
  };
};