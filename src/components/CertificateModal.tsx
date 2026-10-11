import React, { useState } from "react";
import { X, Download, Printer, Award, CheckCircle } from "lucide-react";

interface CertificateData {
  _id?: string;
  id?: string;
  rollNo: string;
  name: string;
  photo?: string;
  course: string;
  percentage?: number;
  theoryExamMarks?: number;
  practicalExamMarks?: number;
  section1?: string;
  section2?: string;
  courseContent?: string;
  tag?: string;
  passOrFail?: string;
  dateOfIssue?: string;
}

interface CertificateModalProps {
  certificate: CertificateData;
  onClose: () => void;
}

const CertificateModal: React.FC<CertificateModalProps> = ({
  certificate,
  onClose,
}) => {
  const [downloading, setDownloading] = useState(false);

  const formattedDate = (dateStr?: string) => {
    if (!dateStr) return new Date().toLocaleDateString("en-GB");
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const totalMarks =
    (certificate.theoryExamMarks || 0) + (certificate.practicalExamMarks || 0);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = async () => {
    setDownloading(true);
    try {
      if (!(window as any).html2pdf) {
        await new Promise((resolve, reject) => {
          const script = document.createElement("script");
          script.src =
            "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js";
          script.onload = resolve;
          script.onerror = reject;
          document.body.appendChild(script);
        });
      }

      const element = document.getElementById("pcc-certificate-print-area");
      const opt = {
        margin: 0,
        filename: `Certificate_${certificate.name.replace(/\s+/g, "_")}_${certificate.rollNo}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          letterRendering: true,
          scrollY: 0,
          scrollX: 0,
        },
        jsPDF: { unit: "pt", format: "a4", orientation: "portrait" },
      };

      await (window as any).html2pdf().set(opt).from(element).save();
    } catch (err) {
      console.error("PDF generation failed:", err);
      // Fallback to window print
      window.print();
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-2 md:p-4 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-5xl rounded-3xl bg-white p-4 md:p-6 shadow-2xl max-h-[95vh] flex flex-col overflow-hidden text-left">
        {/* Top Header Controls (Hidden on Print) */}
        <div className="no-print flex flex-wrap items-center justify-between border-b pb-4 mb-4 gap-3">
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
              <CheckCircle className="h-5 w-5" />
            </span>
            <div>
              <h3 className="font-display text-base md:text-lg font-bold text-gray-900">
                Verified Certificate Found
              </h3>
              <p className="text-xs text-gray-500">
                Official PCC Record • Roll No: {certificate.rollNo}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadPDF}
              disabled={downloading}
              className="inline-flex items-center gap-1.5 rounded-xl bg-[#069ab7] px-4 py-2 text-xs md:text-sm font-semibold text-white shadow-md hover:bg-[#05849d] active:scale-95 transition cursor-pointer disabled:opacity-50"
            >
              <Download className="h-4 w-4" />
              {downloading ? "Generating PDF..." : "Download PDF"}
            </button>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 rounded-xl bg-gray-900 px-3.5 py-2 text-xs md:text-sm font-semibold text-white shadow-md hover:bg-gray-800 active:scale-95 transition cursor-pointer"
            >
              <Printer className="h-4 w-4" />
              Print
            </button>

            <button
              onClick={onClose}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 transition"
              title="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Certificate View Container */}
        <div className="flex-1 overflow-y-auto overflow-x-auto flex justify-center py-2 bg-gray-100 rounded-2xl">
          <style dangerouslySetInnerHTML={{ __html: `
            @media print {
              body * {
                visibility: hidden !important;
              }
              #pcc-certificate-print-area, #pcc-certificate-print-area * {
                visibility: visible !important;
              }
              #pcc-certificate-print-area {
                position: absolute !important;
                left: 0 !important;
                top: 0 !important;
                width: 794px !important;
                height: 1123px !important;
                margin: 0 !important;
                padding: 48px !important;
                background-image: url("/image.png") !important;
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
              }
            }
          `}} />

          <div
            id="pcc-certificate-print-area"
            style={{
              width: "794px",
              minHeight: "1123px",
              background: "#fff",
              backgroundImage: "url('/image.png')",
              backgroundSize: "100% 100%",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              padding: "48px",
              position: "relative",
              boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)",
              fontFamily: "Arial, Helvetica, sans-serif",
            }}
          >
            {/* INNER BLUE BORDER */}
            <div
              style={{
                width: "100%",
                height: "100%",
                border: "3px solid #2948a5",
                padding: "22px",
                position: "relative",
              }}
            >
              {/* TOP HEADER */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                <div
                  style={{
                    width: "165px",
                    height: "26px",
                    border: "1px solid #1f45a8",
                    fontSize: "12px",
                    fontWeight: "600",
                    padding: "4px 8px",
                    color: "#1f45a8",
                  }}
                >
                  Roll No. {certificate.rollNo}
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "12px",
                  }}
                >
                  <div
                    style={{
                      border: "1px solid #1f45a8",
                      padding: "5px 10px",
                      fontSize: "12px",
                      fontWeight: "600",
                      color: "#1f45a8",
                    }}
                  >
                    ISO 9001:2015
                  </div>

                  <div
                    style={{
                      width: "60px",
                      height: "60px",
                      borderRadius: "50%",
                      overflow: "hidden",
                      background: "#fff",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src="/logo.png"
                      alt="PCC Logo"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* CONTENT */}
              <div style={{ textAlign: "center", position: "relative" }}>
                {/* QR Code */}
                <div
                  style={{
                    width: "60px",
                    height: "60px",
                    border: "1px solid #1f45a8",
                    padding: "2px",
                    background: "#fff",
                    position: "absolute",
                    top: "10px",
                    right: "0px",
                  }}
                >
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
                      `${window.location.origin}/#certificate?roll=${certificate.rollNo}`
                    )}`}
                    alt="QR"
                    style={{ width: "100%", height: "100%", objectFit: "contain" }}
                  />
                </div>

                {/* Photo Box */}
                <div
                  style={{
                    width: "85px",
                    height: "100px",
                    margin: "0 auto 16px",
                    border: "1px solid #b5b5b5",
                    overflow: "hidden",
                    background: "#fff",
                  }}
                >
                  {certificate.photo ? (
                    <img
                      src={certificate.photo}
                      alt="Student"
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  ) : (
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "#f0f0f0",
                        color: "#999",
                        fontSize: "11px",
                      }}
                    >
                      Photo
                    </div>
                  )}
                </div>

                {/* Name Box */}
                <div
                  style={{
                    width: "165px",
                    height: "26px",
                    border: "1px solid #5a6db3",
                    margin: "0 auto 12px",
                    background: "#fff",
                    fontSize: "13px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#5a6db3",
                    fontWeight: "600",
                  }}
                >
                  Candidate
                </div>

                {/* Certify Text */}
                <div
                  style={{
                    fontFamily: '"Brush Script MT", cursive, sans-serif',
                    fontSize: "30px",
                    fontWeight: "bold",
                    color: "#222",
                  }}
                >
                  This is to certify that
                </div>

                {/* Student Name */}
                <div
                  style={{
                    marginTop: "4px",
                    marginBottom: "12px",
                    fontSize: "20px",
                    fontWeight: "700",
                    letterSpacing: "0.5px",
                    color: "#111",
                    textTransform: "uppercase",
                  }}
                >
                  {certificate.name}
                </div>

                {/* Description */}
                <div
                  style={{
                    fontSize: "15px",
                    lineHeight: "1.7",
                    color: "#111",
                    textAlign: "left",
                  }}
                >
                  has successfully completed the prescribed course of studies and
                  passed the examination conducted by{" "}
                  <span style={{ fontWeight: "700" }}>
                    PREMIUM COMPUTER CLASSES, Bhubaneswar, Odisha
                  </span>{" "}
                  with{" "}
                  <span
                    style={{
                      display: "inline-block",
                      borderBottom: "1px solid #000",
                      padding: "0 6px",
                      fontWeight: "700",
                      color: "#2948a5",
                    }}
                  >
                    {certificate.percentage || totalMarks}%
                  </span>{" "}
                  <span style={{ fontWeight: "700" }}>percent marks</span> and has
                  been awarded the
                </div>

                {/* Course Title */}
                <div
                  style={{
                    textAlign: "center",
                    marginTop: "16px",
                    marginBottom: "18px",
                    color: "#c96a00",
                    fontSize: "24px",
                    fontWeight: "700",
                    fontFamily: '"Times New Roman", serif',
                  }}
                >
                  {certificate.course}
                </div>

                {/* Marks Table */}
                <table
                  style={{
                    width: "84%",
                    margin: "auto",
                    borderCollapse: "collapse",
                    fontSize: "13px",
                  }}
                >
                  <thead>
                    <tr>
                      <th style={{ border: "1px solid #1f45a8", padding: "4px" }}>
                        Section Number
                      </th>
                      <th style={{ border: "1px solid #1f45a8", padding: "4px" }}>
                        Section Name
                      </th>
                      <th style={{ border: "1px solid #1f45a8", padding: "4px" }}>
                        Marks Obtained
                      </th>
                      <th style={{ border: "1px solid #1f45a8", padding: "4px" }}>
                        Maximum Marks
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ border: "1px solid #1f45a8", padding: "4px" }}>
                        I
                      </td>
                      <td style={{ border: "1px solid #1f45a8", padding: "4px" }}>
                        {certificate.section1 || "Theory Examination"}
                      </td>
                      <td style={{ border: "1px solid #1f45a8", padding: "4px" }}>
                        {certificate.theoryExamMarks || 0}
                      </td>
                      <td style={{ border: "1px solid #1f45a8", padding: "4px" }}>
                        50
                      </td>
                    </tr>
                    <tr>
                      <td style={{ border: "1px solid #1f45a8", padding: "4px" }}>
                        II
                      </td>
                      <td style={{ border: "1px solid #1f45a8", padding: "4px" }}>
                        {certificate.section2 || "Practical Examination"}
                      </td>
                      <td style={{ border: "1px solid #1f45a8", padding: "4px" }}>
                        {certificate.practicalExamMarks || 0}
                      </td>
                      <td style={{ border: "1px solid #1f45a8", padding: "4px" }}>
                        50
                      </td>
                    </tr>
                    <tr>
                      <td style={{ border: "1px solid #1f45a8", padding: "4px" }}></td>
                      <td
                        style={{
                          border: "1px solid #1f45a8",
                          padding: "4px",
                          fontWeight: "bold",
                        }}
                      >
                        Total Mark
                      </td>
                      <td
                        style={{
                          border: "1px solid #1f45a8",
                          padding: "4px",
                          fontWeight: "bold",
                        }}
                      >
                        {totalMarks}
                      </td>
                      <td
                        style={{
                          border: "1px solid #1f45a8",
                          padding: "4px",
                          fontWeight: "bold",
                        }}
                      >
                        100
                      </td>
                    </tr>
                    <tr>
                      <td
                        colSpan={2}
                        style={{
                          border: "1px solid #1f45a8",
                          padding: "4px",
                          fontWeight: "bold",
                        }}
                      >
                        Examination Result
                      </td>
                      <td
                        colSpan={2}
                        style={{
                          border: "1px solid #1f45a8",
                          padding: "4px",
                          fontWeight: "bold",
                          color:
                            certificate.passOrFail?.toLowerCase() === "pass"
                              ? "#16a34a"
                              : "#dc2626",
                        }}
                      >
                        {certificate.passOrFail?.toUpperCase() || "PASS"}
                      </td>
                    </tr>
                    <tr>
                      <td
                        colSpan={4}
                        style={{
                          border: "1px solid #1f45a8",
                          padding: "6px",
                          textAlign: "left",
                          lineHeight: "1.5",
                        }}
                      >
                        <b>Course Content:</b>{" "}
                        {certificate.courseContent ||
                          "Accounting Fundamentals, GST, Inventory Management, Payroll, Banking, Voucher Entry, Financial Reports."}
                      </td>
                    </tr>
                  </tbody>
                </table>

                {/* Rules */}
                <div
                  style={{
                    marginTop: "16px",
                    fontSize: "11px",
                    lineHeight: "1.6",
                    textAlign: "left",
                  }}
                >
                  Following are the criteria for passing the {certificate.tag || "Course"}{" "}
                  Examination successfully:
                  <ul style={{ marginLeft: "18px", marginTop: "4px" }}>
                    <li>
                      The candidate must obtain an aggregate minimum of 40% marks
                      out of the total maximum marks.
                    </li>
                    <li>A minimum of 40% marks in Theory is mandatory.</li>
                    <li>
                      A minimum of 40% marks in Practical / Project Work is
                      mandatory.
                    </li>
                    <li>
                      The candidate must pass both Theory and Practical
                      separately.
                    </li>
                  </ul>
                </div>

                {/* Signatures */}
                <div
                  style={{
                    marginTop: "60px",
                    display: "flex",
                    justifyContent: "space-between",
                    textAlign: "center",
                    fontSize: "10px",
                    fontWeight: "600",
                  }}
                >
                  <div>
                    Instructor<br />
                    Premium Computer Classes, Bhubaneswar, Odisha
                  </div>
                  <div>
                    Director<br />
                    Premium Computer Classes, Bhubaneswar, Odisha
                  </div>
                </div>

                {/* Date of Issue */}
                <div
                  style={{
                    width: "170px",
                    border: "1px solid #1f45a8",
                    margin: "20px auto 16px",
                    padding: "4px 8px",
                    fontSize: "12px",
                    textAlign: "left",
                    color: "#1f45a8",
                  }}
                >
                  Date of Issue: {formattedDate(certificate.dateOfIssue)}
                </div>

                {/* Footer */}
                <div
                  style={{
                    fontSize: "9px",
                    lineHeight: "1.4",
                    marginTop: "8px",
                    color: "#555",
                  }}
                >
                  @ Learning process Marks are as communicated by PCC<br />
                  @ Final examination marks are evaluated by PCC<br />
                  “The photograph of Candidate is printed on this certificate. If
                  the photograph is pasted externally this Certificate will not be
                  valid”<br />
                  MSME Registration No.: UDYAM-OD-19-0090591 | ISO Certificate
                  No.: D80A673B
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateModal;
