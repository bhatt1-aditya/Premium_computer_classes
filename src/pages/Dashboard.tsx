import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { LogOut, Download, Award } from "lucide-react";
import logo from "@/assets/logo.png";
import DemoPopup from "@/components/DemoPopup";

interface Certificate {
  id: string;
  title: string;
  certificate_url: string;
  created_at: string;
}

const Dashboard = () => {
  const { user, isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [certificates, setCertificates] = useState<Certificate[]>([]);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/signin");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (!user) return;
    const fetchCerts = async () => {
      const { data } = await supabase
        .from("certificates")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
      if (data) setCertificates(data);
    };
    fetchCerts();
  }, [user]);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card px-4 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/">
              <img src={logo} alt="PCC" className="h-10 w-auto rounded-full" />
            </Link>
            <div>
              <h1 className="font-display text-lg font-bold text-foreground">My Dashboard</h1>
              <p className="text-xs text-muted-foreground">{user?.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {isAdmin && (
              <Link
                to="/admin"
                className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
              >
                Admin Panel
              </Link>
            )}
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-muted"
            >
              <LogOut className="h-4 w-4" /> Sign Out
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-10">
        <div className="mb-8 flex items-center gap-3">
          <Award className="h-6 w-6 text-primary" />
          <h2 className="font-display text-2xl font-bold text-foreground">My Certificates</h2>
        </div>

        {certificates.length === 0 ? (
          <div className="rounded-2xl border border-border bg-card p-12 text-center">
            <Award className="mx-auto mb-4 h-12 w-12 text-muted-foreground/30" />
            <p className="text-muted-foreground">No certificates available yet.</p>
            <p className="mt-1 text-sm text-muted-foreground/70">
              Your certificates will appear here once uploaded by admin.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {certificates.map((cert) => (
              <div key={cert.id} className="hover-lift rounded-2xl bg-card p-6 card-shadow">
                <div className="mb-4 flex h-32 items-center justify-center rounded-lg bg-primary/5">
                  <Award className="h-12 w-12 text-primary/40" />
                </div>
                <h3 className="mb-2 font-display text-lg font-semibold text-foreground">
                  {cert.title}
                </h3>
                <p className="mb-4 text-xs text-muted-foreground">
                  Issued: {new Date(cert.created_at).toLocaleDateString()}
                </p>
                <a
                  href={cert.certificate_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:scale-105 transition-transform"
                >
                  <Download className="h-4 w-4" /> View Certificate
                </a>
              </div>
            ))}
          </div>
        )}
      </main>

      <DemoPopup />
    </div>
  );
};

export default Dashboard;
