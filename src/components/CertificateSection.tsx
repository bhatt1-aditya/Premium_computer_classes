import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Award, Search, Download, Eye, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import CertificateModal from "./CertificateModal";

const CertificateSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [rollNo, setRollNo] = useState("");
  const [loading, setLoading] = useState(false);
  const [certificate, setCertificate] = useState<any | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleSearchCertificate = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanRoll = rollNo.trim();
    if (!cleanRoll) {
      setErrorMsg("Please enter your Roll Number.");
      return;
    }

    setLoading(true);
    setErrorMsg("");
    setCertificate(null);

    try {
      const apiUrl =
        import.meta.env.VITE_API_URL ||
        "https://premium-computer-classes-dashboard.onrender.com/api";

      const res = await fetch(
        `${apiUrl}/certificate/get-certificate-by-roll/${encodeURIComponent(cleanRoll)}`
      );
      const data = await res.json();

      if (data && data.success && data.certificate) {
        setCertificate(data.certificate);
      } else {
        setErrorMsg(
          data?.message ||
            `No certificate found with Roll Number "${cleanRoll}". Please check and try again.`
        );
      }
    } catch (err) {
      console.error("Error fetching certificate:", err);
      setErrorMsg(
        "Unable to connect to certificate verification service. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="certificate" className="section-padding bg-background relative overflow-hidden" ref={ref}>
      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-4xl text-center relative z-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Badge Icon */}
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20 shadow-inner">
            <Award className="h-10 w-10 text-primary" />
          </div>

          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">
            Official Certification
          </p>

          <h2 className="mb-4 font-display text-3xl font-bold text-foreground md:text-5xl">
            Download Your <span className="text-gradient">Certificate</span>
          </h2>

          <p className="mx-auto mb-8 max-w-xl text-base md:text-lg text-muted-foreground">
            Completed your course at PCC? Enter your registered Roll Number below to verify and download your official certificate.
          </p>

          {/* Roll Number Search Form */}
          <div className="mx-auto max-w-lg mb-8">
            <form
              onSubmit={handleSearchCertificate}
              className="flex flex-col sm:flex-row items-stretch gap-2.5 p-2 rounded-2xl bg-card border border-border card-shadow"
            >
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Enter your Roll Number (e.g. 101, PCC/001)"
                  value={rollNo}
                  onChange={(e) => setRollNo(e.target.value)}
                  className="w-full h-12 px-4 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-primary transition"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="h-12 px-6 rounded-xl bg-primary text-primary-foreground font-semibold text-sm flex items-center justify-center gap-2 hover:opacity-95 active:scale-95 transition shadow-md disabled:opacity-50 cursor-pointer shrink-0"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Searching...
                  </>
                ) : (
                  <>
                    <Search className="h-4 w-4" />
                    Get Certificate
                  </>
                )}
              </button>
            </form>

            {/* Error Message */}
            {errorMsg && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 flex items-center gap-2 rounded-xl bg-red-500/10 border border-red-500/20 p-3.5 text-xs text-red-600 text-left"
              >
                <AlertCircle className="h-4 w-4 shrink-0 text-red-600" />
                <span>{errorMsg}</span>
              </motion.div>
            )}
          </div>

          {/* Found Certificate Preview Card */}
          {certificate && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mx-auto max-w-xl text-left rounded-3xl border border-primary/20 bg-card p-6 md:p-8 card-shadow mb-8 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl -mr-10 -mt-10" />

              <div className="flex items-center justify-between border-b border-border pb-4 mb-5">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                    Officially Verified
                  </span>
                </div>
                <span className="font-mono text-xs font-bold text-muted-foreground bg-muted px-2.5 py-1 rounded-full">
                  Roll: {certificate.rollNo}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-0.5">
                    Student Name
                  </p>
                  <p className="text-lg font-bold text-foreground">
                    {certificate.name}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-0.5">
                    Course Completed
                  </p>
                  <p className="text-sm font-semibold text-foreground">
                    {certificate.course}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-0.5">
                    Score / Marks
                  </p>
                  <p className="text-sm font-bold text-foreground">
                    {certificate.percentage ||
                      (certificate.theoryExamMarks || 0) +
                        (certificate.practicalExamMarks || 0)}
                    % Marks
                  </p>
                </div>

                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-0.5">
                    Result Status
                  </p>
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700">
                    {certificate.passOrFail?.toUpperCase() || "PASS"}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={() => setShowModal(true)}
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 transition active:scale-95 shadow-md cursor-pointer"
                >
                  <Eye className="h-4 w-4" />
                  View & Download PDF
                </button>
              </div>
            </motion.div>
          )}

          {/* Quick fallback helper for sign in */}
          <div className="pt-2 text-xs text-muted-foreground">
            Have questions regarding your roll number? Contact institute helpdesk at{" "}
            <a href="tel:+919583778772" className="text-primary font-semibold hover:underline">
              +91 9583778772
            </a>
          </div>
        </motion.div>
      </div>

      {/* Modal Popup */}
      {showModal && certificate && (
        <CertificateModal
          certificate={certificate}
          onClose={() => setShowModal(false)}
        />
      )}
    </section>
  );
};

export default CertificateSection;
