

import React from "react";
import "./ReportsLayout.css";

const ReportsLayout = () => {
  const reports = []; // Empty array for testing UI when no reports exist

  const handleDownload = (url) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = url.split("/").pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="reports-container">
      <h2 className="reports-title">Your Reports</h2>
      <table className="reports-table">
        <thead>
          <tr>
            <th>Serial No</th>
            <th>Doctor Name</th>
            <th>Speciality</th>
            <th>View Report</th>
            <th>Download Report</th>
          </tr>
        </thead>
        <tbody>
          {reports.length > 0 ? (
            reports.map((report, index) => (
              <tr key={report.id}>
                <td>{index + 1}</td>
                <td>{report.doctor}</td>
                <td>{report.speciality}</td>
                <td>
                  <a href={report.reportUrl} target="_blank" rel="noopener noreferrer" className="view-btn">
                    View Report
                  </a>
                </td>
                <td>
                  <button onClick={() => handleDownload(report.reportUrl)} className="download-btn">
                    Download Report
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="no-reports">No reports available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ReportsLayout;



// dummy report 

