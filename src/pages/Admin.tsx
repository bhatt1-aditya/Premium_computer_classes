import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import {
  LogOut, Upload, Trash2, Image, Award, Users, Plus, X, UsersRound, MessageSquare, Star, LinkIcon
} from "lucide-react";
import { toast } from "sonner";
import logo from "@/assets/logo.png";

type Tab = "gallery" | "certificates" | "users" | "team" | "testimonials" | "contacts";

const Admin = () => {
  const { user, isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("gallery");

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate("/signin");
    }
  }, [user, isAdmin, loading, navigate]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  const tabs = [
    { id: "gallery" as Tab, label: "Gallery", icon: Image },
    { id: "certificates" as Tab, label: "Certificates", icon: Award },
    { id: "users" as Tab, label: "Users", icon: Users },
    { id: "team" as Tab, label: "Team", icon: UsersRound },
    { id: "testimonials" as Tab, label: "Testimonials", icon: Star },
    { id: "contacts" as Tab, label: "Responses", icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card px-4 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/">
              <img src={logo} alt="PCC" className="h-10 w-auto rounded-full" />
            </Link>
            <h1 className="font-display text-lg font-bold text-foreground">Admin Panel</h1>
          </div>
          <button
            onClick={async () => { await signOut(); navigate("/"); }}
            className="flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm text-foreground hover:bg-muted"
          >
            <LogOut className="h-4 w-4" /> Sign Out
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-6">
        <div className="mb-8 flex flex-wrap gap-2">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition-all ${
                tab === t.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              <t.icon className="h-4 w-4" />
              {t.label}
            </button>
          ))}
        </div>

        {tab === "gallery" && <GalleryManager />}
        {tab === "certificates" && <CertificateManager />}
        {tab === "users" && <UserManager />}
        {tab === "team" && <TeamManager />}
        {tab === "testimonials" && <TestimonialManager />}
        {tab === "contacts" && <ContactResponses />}
      </div>
    </div>
  );
};

/* =================== GALLERY =================== */
function GalleryManager() {
  const [items, setItems] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);
  const [caption, setCaption] = useState("");

  const fetchItems = async () => {
    const { data } = await supabase.from("gallery").select("*").order("created_at", { ascending: false });
    if (data) setItems(data);
  };

  useEffect(() => { fetchItems(); }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const fileName = `${Date.now()}-${file.name}`;
    const { error: uploadError } = await supabase.storage.from("gallery").upload(fileName, file);
    if (uploadError) {
      toast.error("Upload failed");
      setUploading(false);
      return;
    }
    const { data: urlData } = supabase.storage.from("gallery").getPublicUrl(fileName);
    await supabase.from("gallery").insert([{ image_url: urlData.publicUrl, caption: caption || null }]);
    setCaption("");
    toast.success("Photo uploaded!");
    setUploading(false);
    fetchItems();
  };

  const handleDelete = async (id: string) => {
    await supabase.from("gallery").delete().eq("id", id);
    toast.success("Photo deleted");
    fetchItems();
  };

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-end gap-4 rounded-xl bg-card p-6 card-shadow">
        <div className="flex-1">
          <label className="mb-1.5 block text-sm font-medium text-foreground">Caption (optional)</label>
          <input
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-foreground outline-none focus:border-primary"
            placeholder="Enter a caption..."
          />
        </div>
        <label className="flex cursor-pointer items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:scale-105 transition-transform">
          <Upload className="h-4 w-4" />
          {uploading ? "Uploading..." : "Upload Photo"}
          <input type="file" accept="image/*" onChange={handleUpload} className="hidden" disabled={uploading} />
        </label>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <div key={item.id} className="group relative overflow-hidden rounded-xl card-shadow">
            <img src={item.image_url} alt={item.caption || ""} className="h-48 w-full object-cover" />
            {item.caption && (
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/80 to-transparent p-3">
                <p className="text-sm text-cream-light">{item.caption}</p>
              </div>
            )}
            <button
              onClick={() => handleDelete(item.id)}
              className="absolute right-2 top-2 rounded-lg bg-destructive p-1.5 text-destructive-foreground opacity-0 transition-opacity group-hover:opacity-100"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* =================== CERTIFICATES =================== */
function CertificateManager() {
  const [certs, setCerts] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [title, setTitle] = useState("");
  const [certLink, setCertLink] = useState("");
  const [saving, setSaving] = useState(false);

  const fetchData = async () => {
    const { data: certsData } = await supabase.from("certificates").select("*").order("created_at", { ascending: false });
    const { data: profilesData } = await supabase.from("profiles").select("*");
    if (certsData) setCerts(certsData);
    if (profilesData) setUsers(profilesData);
  };

  useEffect(() => { fetchData(); }, []);

  const handleSave = async () => {
    if (!selectedUser || !title.trim() || !certLink.trim()) {
      toast.error("Please select a user, enter a title, and provide a certificate link");
      return;
    }
    setSaving(true);
    const { error } = await supabase.from("certificates").insert([{
      user_id: selectedUser,
      title,
      certificate_url: certLink,
    }]);
    setSaving(false);
    if (error) {
      toast.error("Failed to save certificate");
    } else {
      setTitle("");
      setCertLink("");
      setSelectedUser("");
      toast.success("Certificate added!");
      fetchData();
    }
  };

  const handleDelete = async (id: string) => {
    await supabase.from("certificates").delete().eq("id", id);
    toast.success("Certificate deleted");
    fetchData();
  };

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-end gap-4 rounded-xl bg-card p-6 card-shadow">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">User</label>
          <select
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
            className="rounded-lg border border-border bg-background px-4 py-2.5 text-foreground outline-none focus:border-primary"
          >
            <option value="">Select user</option>
            {users.map((u) => (
              <option key={u.user_id} value={u.user_id}>{u.email || u.full_name || u.user_id}</option>
            ))}
          </select>
        </div>
        <div className="flex-1">
          <label className="mb-1.5 block text-sm font-medium text-foreground">Certificate Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-foreground outline-none focus:border-primary"
            placeholder="e.g. Python Course Completion"
          />
        </div>
        <div className="flex-1">
          <label className="mb-1.5 block text-sm font-medium text-foreground">Certificate Link</label>
          <input
            value={certLink}
            onChange={(e) => setCertLink(e.target.value)}
            className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-foreground outline-none focus:border-primary"
            placeholder="https://example.com/certificate.pdf"
          />
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:scale-105 transition-transform"
        >
          <LinkIcon className="h-4 w-4" />
          {saving ? "Saving..." : "Add Certificate"}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {certs.map((cert) => {
          const userName = users.find((u) => u.user_id === cert.user_id);
          return (
            <div key={cert.id} className="rounded-xl bg-card p-5 card-shadow">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="font-semibold text-foreground">{cert.title}</h3>
                <button onClick={() => handleDelete(cert.id)} className="text-destructive hover:text-destructive/80">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <p className="text-xs text-muted-foreground">
                User: {userName?.email || cert.user_id}
              </p>
              <a href={cert.certificate_url} target="_blank" rel="noopener noreferrer" className="mt-1 block text-xs text-primary hover:underline truncate">
                {cert.certificate_url}
              </a>
              <p className="text-xs text-muted-foreground mt-1">
                {new Date(cert.created_at).toLocaleDateString()}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* =================== USERS =================== */
function UserManager() {
  const [users, setUsers] = useState<any[]>([]);
  const [showCreate, setShowCreate] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newName, setNewName] = useState("");
  const [creating, setCreating] = useState(false);

  const fetchUsers = async () => {
    const { data } = await supabase.from("profiles").select("*").order("created_at", { ascending: false });
    if (data) setUsers(data);
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleCreateUser = async () => {
    if (!newEmail.trim() || !newPassword.trim()) {
      toast.error("Email and password are required");
      return;
    }
    setCreating(true);
    const { data, error } = await supabase.functions.invoke("manage-users", {
      body: { action: "create", email: newEmail, password: newPassword, full_name: newName },
    });
    setCreating(false);
    if (error || data?.error) {
      toast.error(data?.error || "Failed to create user");
    } else {
      toast.success("User created!");
      setNewEmail("");
      setNewPassword("");
      setNewName("");
      setShowCreate(false);
      fetchUsers();
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    const { data, error } = await supabase.functions.invoke("manage-users", {
      body: { action: "delete", user_id: userId },
    });
    if (error || data?.error) {
      toast.error(data?.error || "Failed to delete user");
    } else {
      toast.success("User deleted");
      fetchUsers();
    }
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-display text-xl font-bold text-foreground">Manage Users</h2>
        <button
          onClick={() => setShowCreate(!showCreate)}
          className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground"
        >
          {showCreate ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          {showCreate ? "Cancel" : "Create User"}
        </button>
      </div>

      {showCreate && (
        <div className="mb-6 flex flex-wrap items-end gap-4 rounded-xl bg-card p-6 card-shadow">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">Full Name</label>
            <input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="rounded-lg border border-border bg-background px-4 py-2.5 text-foreground outline-none focus:border-primary"
              placeholder="Full name"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">Email</label>
            <input
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              className="rounded-lg border border-border bg-background px-4 py-2.5 text-foreground outline-none focus:border-primary"
              placeholder="Email"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">Password</label>
            <input
              type="text"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="rounded-lg border border-border bg-background px-4 py-2.5 text-foreground outline-none focus:border-primary"
              placeholder="Password"
            />
          </div>
          <button
            onClick={handleCreateUser}
            disabled={creating}
            className="rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground"
          >
            {creating ? "Creating..." : "Create"}
          </button>
        </div>
      )}

      <div className="space-y-3">
        {users.map((u) => (
          <div key={u.id} className="flex items-center justify-between rounded-xl bg-card p-4 card-shadow">
            <div>
              <p className="font-medium text-foreground">{u.full_name || "No name"}</p>
              <p className="text-sm text-muted-foreground">{u.email}</p>
            </div>
            <button
              onClick={() => handleDeleteUser(u.user_id)}
              className="rounded-lg border border-destructive/20 px-3 py-1.5 text-sm text-destructive hover:bg-destructive/10"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* =================== TEAM =================== */
function TeamManager() {
  const [members, setMembers] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [uploading, setUploading] = useState(false);

  const fetchMembers = async () => {
    const { data } = await supabase.from("team_members").select("*").order("created_at", { ascending: true });
    if (data) setMembers(data);
  };

  useEffect(() => { fetchMembers(); }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !name.trim() || !subject.trim()) {
      toast.error("Please enter name, subject, and select a photo");
      return;
    }
    setUploading(true);
    const fileName = `${Date.now()}-${file.name}`;
    const { error: uploadError } = await supabase.storage.from("team-photos").upload(fileName, file);
    if (uploadError) {
      toast.error("Upload failed");
      setUploading(false);
      return;
    }
    const { data: urlData } = supabase.storage.from("team-photos").getPublicUrl(fileName);
    const { error } = await supabase.from("team_members").insert([{
      name,
      subject,
      photo_url: urlData.publicUrl,
    }]);
    if (error) {
      toast.error("Failed to add team member");
    } else {
      setName("");
      setSubject("");
      toast.success("Team member added!");
      fetchMembers();
    }
    setUploading(false);
  };

  const handleDelete = async (id: string) => {
    await supabase.from("team_members").delete().eq("id", id);
    toast.success("Team member removed");
    fetchMembers();
  };

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-end gap-4 rounded-xl bg-card p-6 card-shadow">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="rounded-lg border border-border bg-background px-4 py-2.5 text-foreground outline-none focus:border-primary"
            placeholder="Faculty name"
          />
        </div>
        <div className="flex-1">
          <label className="mb-1.5 block text-sm font-medium text-foreground">Subject / Description</label>
          <input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-foreground outline-none focus:border-primary"
            placeholder="e.g. Python & Data Science"
          />
        </div>
        <label className="flex cursor-pointer items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:scale-105 transition-transform">
          <Upload className="h-4 w-4" />
          {uploading ? "Uploading..." : "Add with Photo"}
          <input type="file" accept="image/*" onChange={handleUpload} className="hidden" disabled={uploading} />
        </label>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {members.map((m) => (
          <div key={m.id} className="group relative rounded-xl bg-card p-5 text-center card-shadow">
            <button
              onClick={() => handleDelete(m.id)}
              className="absolute right-2 top-2 rounded-lg bg-destructive p-1.5 text-destructive-foreground opacity-0 transition-opacity group-hover:opacity-100"
            >
              <Trash2 className="h-4 w-4" />
            </button>
            <img src={m.photo_url} alt={m.name} className="mx-auto mb-3 h-20 w-20 rounded-full object-cover" />
            <p className="font-semibold text-foreground">{m.name}</p>
            <p className="text-xs text-muted-foreground">{m.subject}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* =================== TESTIMONIALS =================== */
function TestimonialManager() {
  const [items, setItems] = useState<any[]>([]);
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [saving, setSaving] = useState(false);

  const fetchItems = async () => {
    const { data } = await supabase.from("testimonials").select("*").order("created_at", { ascending: false });
    if (data) setItems(data);
  };

  useEffect(() => { fetchItems(); }, []);

  const handleAdd = async () => {
    if (!imageUrl.trim()) {
      toast.error("Please enter an image URL");
      return;
    }
    setSaving(true);
    const { error } = await supabase.from("testimonials").insert([{
      image_url: imageUrl,
      description: description || null,
    }]);
    setSaving(false);
    if (error) {
      toast.error("Failed to add testimonial");
    } else {
      setImageUrl("");
      setDescription("");
      toast.success("Testimonial added!");
      fetchItems();
    }
  };

  const handleDelete = async (id: string) => {
    await supabase.from("testimonials").delete().eq("id", id);
    toast.success("Testimonial deleted");
    fetchItems();
  };

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-end gap-4 rounded-xl bg-card p-6 card-shadow">
        <div className="flex-1">
          <label className="mb-1.5 block text-sm font-medium text-foreground">Image URL</label>
          <input
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-foreground outline-none focus:border-primary"
            placeholder="https://example.com/photo.jpg"
          />
        </div>
        <div className="flex-1">
          <label className="mb-1.5 block text-sm font-medium text-foreground">Description (optional)</label>
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-foreground outline-none focus:border-primary"
            placeholder="Student feedback..."
          />
        </div>
        <button
          onClick={handleAdd}
          disabled={saving}
          className="flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:scale-105 transition-transform"
        >
          <Plus className="h-4 w-4" />
          {saving ? "Adding..." : "Add Testimonial"}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <div key={item.id} className="group relative overflow-hidden rounded-xl card-shadow">
            <img src={item.image_url} alt="Testimonial" className="h-48 w-full object-cover" />
            {item.description && (
              <div className="p-3 bg-card">
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            )}
            <button
              onClick={() => handleDelete(item.id)}
              className="absolute right-2 top-2 rounded-lg bg-destructive p-1.5 text-destructive-foreground opacity-0 transition-opacity group-hover:opacity-100"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* =================== CONTACT RESPONSES =================== */
function ContactResponses() {
  const [responses, setResponses] = useState<any[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from("contact_submissions").select("*").order("created_at", { ascending: false });
      if (data) setResponses(data);
    };
    fetch();
  }, []);

  return (
    <div>
      <h2 className="mb-6 font-display text-xl font-bold text-foreground">Contact Responses ({responses.length})</h2>
      {responses.length === 0 ? (
        <div className="rounded-xl bg-card p-8 text-center card-shadow">
          <p className="text-muted-foreground">No responses yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {responses.map((r) => (
            <div key={r.id} className="rounded-xl bg-card p-5 card-shadow">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="font-semibold text-foreground">{r.name}</p>
                  <p className="text-sm text-muted-foreground">{r.email}</p>
                  <p className="text-sm text-muted-foreground">{r.contact_no}</p>
                </div>
                <p className="text-xs text-muted-foreground">
                  {new Date(r.created_at).toLocaleDateString()} {new Date(r.created_at).toLocaleTimeString()}
                </p>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {r.interested_courses?.map((course: string) => (
                  <span key={course} className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    {course}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Admin;
