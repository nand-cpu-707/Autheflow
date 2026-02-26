import React, { useState } from "react";
import { BrowserRouter, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, 
  User, 
  Files, 
  History, 
  UploadCloud, 
  MessageSquare, 
  BarChart3, 
  Bell, 
  LogOut,
  Mail,
  Phone,
  ShieldCheck,
  BookOpen,
  Award,
  Users,
  Building2,
  FileText,
  Calendar,
  Clock,
  MapPin,
  Send,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  FileUp,
  ChevronRight
} from "lucide-react";

const navItems = [
  { label: "Dashboard", icon: <LayoutDashboard size={18} />, path: "/profile" },
  { label: "My Profile", icon: <User size={18} />, path: "/profile" },
  { label: "My Submissions", icon: <Files size={18} />, path: "/submit" },
  { label: "Submission History", icon: <History size={18} />, path: "/history" },
  { label: "Upload Document", icon: <UploadCloud size={18} />, path: "/submit" },
  { label: "Request Review", icon: <MessageSquare size={18} />, path: "/review" },
  { label: "Results & Marks", icon: <BarChart3 size={18} />, path: "/history" },
  { label: "Notifications", icon: <Bell size={18} />, path: "/notifications" },
];

const student = {
  name: "Anandhu Sebastian",
  uid: "24004048",
  department: "CSE (CYBER SECURITY)",
  contact: "8330869045",
  guide: "Neha Zade",
  group: "Group A",
};

// --- Sub-components ---

function FormLabel({ icon, children, required }) {
  return (
    <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 mb-2 ml-1">
      <span className="text-indigo-400">{icon}</span>
      {children}
      {required && <span className="text-red-500 ml-0.5">*</span>}
    </label>
  );
}

function ReadOnlyField({ icon, label, value }) {
  return (
    <div className="bg-white/5 border border-white/5 rounded-2xl p-4 flex items-center gap-4 group transition-all duration-300">
      <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-0.5">{label}</p>
        <p className="text-slate-400 font-semibold text-sm truncate">{value}</p>
      </div>
    </div>
  );
}

function RequestReviewContent() {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState("Request Review");
  const [form, setForm] = useState({
    projectTitle: "",
    reviewType: "",
    phase: "",
    submissionDate: "",
    reviewDate: "",
    reviewTime: "",
    venue: "",
    description: "",
    attachments: null,
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.projectTitle) e.projectTitle = "Project title is required.";
    if (!form.reviewType) e.reviewType = "Please select a review type.";
    if (!form.phase) e.phase = "Please select a project phase.";
    if (!form.submissionDate) e.submissionDate = "Submission date is required.";
    if (!form.reviewDate) e.reviewDate = "Preferred review date is required.";
    if (!form.description) e.description = "Please provide a brief description.";
    return e;
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length > 0) {
      setErrors(e);
      return;
    }
    setErrors({});
    // Simulate loading
    const btn = document.getElementById("submit-btn");
    if(btn) btn.innerText = "Processing...";
    await new Promise(r => setTimeout(r, 1000));
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if(btn) btn.innerText = "Submit Application";
  };

  const handleReset = () => {
    setForm({
      projectTitle: "", reviewType: "", phase: "", submissionDate: "",
      reviewDate: "", reviewTime: "", venue: "", description: "", attachments: null
    });
    setErrors({});
    setSubmitted(false);
  };

  const set = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: null }));
  };

  return (
    <div className="flex min-h-screen bg-[#020617] text-slate-200 font-sans">
      {/* Animated Background Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] bg-indigo-600/10 blur-[120px] rounded-full" />
      </div>

      {/* --- Sidebar --- */}
      <aside className="fixed left-0 top-0 h-screen w-72 bg-white/[0.02] backdrop-blur-3xl border-r border-white/5 z-50 flex flex-col">
        <div className="p-8 flex items-center gap-4">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-black italic shadow-lg shadow-indigo-500/20">
            AF
          </div>
          <span className="text-white font-bold text-xl tracking-tight">AuthenFlow</span>
        </div>

        <nav className="flex-1 px-4 py-2 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <Link key={item.label} to={item.path} onClick={() => setActiveNav(item.label)} className="block relative group">
              <div className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                activeNav === item.label ? "text-white" : "text-slate-500 hover:text-slate-300 hover:bg-white/5"
              }`}>
                {activeNav === item.label && (
                  <motion.div layoutId="sidebarActive" className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-lg shadow-indigo-600/20" />
                )}
                <span className="relative z-10">{item.icon}</span>
                <span className="relative z-10 text-sm font-semibold">{item.label}</span>
              </div>
            </Link>
          ))}
        </nav>

        <div className="p-6">
          <div className="bg-white/5 border border-white/5 rounded-2xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm border-2 border-white/10">
              {student.name[0]}
            </div>
            <div className="min-w-0">
              <p className="text-white text-xs font-bold truncate">{student.name}</p>
              <p className="text-slate-500 text-[10px] truncate">{student.uid}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* --- Main Content --- */}
      <main className="ml-72 flex-1 p-10 relative">
        <header className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">Request Review</h1>
            <p className="text-slate-500 text-sm mt-1">Submit your project milestone for expert evaluation.</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all group">
              <Bell size={20} />
              <span className="absolute top-3 right-3 w-2 h-2 bg-indigo-500 rounded-full border-2 border-[#020617]" />
            </button>
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/")}
              className="bg-white/5 border border-white/10 text-slate-300 px-6 py-3 rounded-2xl flex items-center gap-2 text-sm font-bold hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/20 transition-all"
            >
              <LogOut size={18} /> Logout
            </motion.button>
          </div>
        </header>

        <AnimatePresence>
          {submitted && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-emerald-500/10 border border-emerald-500/20 rounded-3xl p-6 mb-8 flex items-center gap-6 shadow-xl shadow-emerald-500/5"
            >
              <div className="w-14 h-14 bg-emerald-500/20 rounded-2xl flex items-center justify-center text-emerald-400">
                <CheckCircle2 size={32} />
              </div>
              <div className="flex-1">
                <h3 className="text-emerald-400 font-bold text-lg">Request Submitted!</h3>
                <p className="text-emerald-400/70 text-sm">Your review request has been logged. {student.guide} will be notified shortly.</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleReset}
                className="bg-emerald-500 text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-emerald-500/20"
              >
                New Request
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* --- Form Section --- */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[32px] p-10 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
            <FileText size={160} />
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-8 border-b border-white/5 pb-6">
              <div className="p-2 bg-indigo-500/20 rounded-lg text-indigo-400">
                <FileText size={20} />
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight">New Review Application</h3>
            </div>

            {/* Read-only Personal Data Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
              <ReadOnlyField icon={<User />} label="Student Name" value={student.name} />
              <ReadOnlyField icon={<ShieldCheck />} label="Student UID" value={student.uid} />
              <ReadOnlyField icon={<Building2 />} label="Department" value={student.department} />
              <ReadOnlyField icon={<Phone />} label="Contact" value={student.contact} />
              <ReadOnlyField icon={<Users />} label="Assigned Guide" value={student.guide} />
              <ReadOnlyField icon={<Award />} label="Project Group" value={student.group} />
            </div>

            {/* Dynamic Form Fields */}
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <FormLabel icon={<FileText size={14} />} required>Project Title</FormLabel>
                  <input
                    type="text"
                    value={form.projectTitle}
                    onChange={set("projectTitle")}
                    placeholder="Enter the full title of your microproject"
                    className={`w-full bg-white/5 border rounded-2xl py-4 px-5 text-white placeholder:text-slate-600 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all text-sm ${
                      errors.projectTitle ? "border-red-500/50" : "border-white/10 focus:border-indigo-500"
                    }`}
                  />
                  {errors.projectTitle && <p className="text-red-400 text-[10px] font-bold mt-2 ml-1 flex items-center gap-1 uppercase tracking-wider"><AlertCircle size={10}/> {errors.projectTitle}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <FormLabel icon={<LayoutDashboard size={14} />} required>Review Type</FormLabel>
                  <select
                    value={form.reviewType}
                    onChange={set("reviewType")}
                    className={`w-full bg-white/5 border rounded-2xl py-4 px-5 text-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all text-sm appearance-none cursor-pointer ${
                      errors.reviewType ? "border-red-500/50" : "border-white/10 focus:border-indigo-500"
                    }`}
                  >
                    <option value="" className="bg-[#020617]">Select Review Type</option>
                    <option value="Proposal Review" className="bg-[#020617]">Proposal Review</option>
                    <option value="Mid-Term Review" className="bg-[#020617]">Mid-Term Review</option>
                    <option value="Final Review" className="bg-[#020617]">Final Review</option>
                    <option value="Viva / Presentation" className="bg-[#020617]">Viva / Presentation</option>
                  </select>
                  {errors.reviewType && <p className="text-red-400 text-[10px] font-bold mt-2 ml-1 flex items-center gap-1 uppercase tracking-wider"><AlertCircle size={10}/> {errors.reviewType}</p>}
                </div>
                <div>
                  <FormLabel icon={<Award size={14} />} required>Project Phase</FormLabel>
                  <select
                    value={form.phase}
                    onChange={set("phase")}
                    className={`w-full bg-white/5 border rounded-2xl py-4 px-5 text-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all text-sm appearance-none cursor-pointer ${
                      errors.phase ? "border-red-500/50" : "border-white/10 focus:border-indigo-500"
                    }`}
                  >
                    <option value="" className="bg-[#020617]">Select Phase</option>
                    <option value="Ideation" className="bg-[#020617]">Phase 1 – Ideation</option>
                    <option value="Design" className="bg-[#020617]">Phase 2 – Design</option>
                    <option value="Implementation" className="bg-[#020617]">Phase 3 – Implementation</option>
                    <option value="Testing" className="bg-[#020617]">Phase 4 – Testing</option>
                    <option value="Deployment" className="bg-[#020617]">Phase 5 – Deployment</option>
                  </select>
                  {errors.phase && <p className="text-red-400 text-[10px] font-bold mt-2 ml-1 flex items-center gap-1 uppercase tracking-wider"><AlertCircle size={10}/> {errors.phase}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <FormLabel icon={<Calendar size={14} />} required>Submission Date</FormLabel>
                  <input
                    type="date"
                    value={form.submissionDate}
                    onChange={set("submissionDate")}
                    className={`w-full bg-white/5 border rounded-2xl py-4 px-5 text-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all text-sm ${
                      errors.submissionDate ? "border-red-500/50" : "border-white/10 focus:border-indigo-500"
                    }`}
                  />
                  {errors.submissionDate && <p className="text-red-400 text-[10px] font-bold mt-2 ml-1 flex items-center gap-1 uppercase tracking-wider"><AlertCircle size={10}/> {errors.submissionDate}</p>}
                </div>
                <div>
                  <FormLabel icon={<Calendar size={14} />} required>Preferred Review Date</FormLabel>
                  <input
                    type="date"
                    value={form.reviewDate}
                    onChange={set("reviewDate")}
                    className={`w-full bg-white/5 border rounded-2xl py-4 px-5 text-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all text-sm ${
                      errors.reviewDate ? "border-red-500/50" : "border-white/10 focus:border-indigo-500"
                    }`}
                  />
                  {errors.reviewDate && <p className="text-red-400 text-[10px] font-bold mt-2 ml-1 flex items-center gap-1 uppercase tracking-wider"><AlertCircle size={10}/> {errors.reviewDate}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <FormLabel icon={<Clock size={14} />}>Preferred Time</FormLabel>
                  <input
                    type="time"
                    value={form.reviewTime}
                    onChange={set("reviewTime")}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-5 text-white focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all text-sm"
                  />
                </div>
                <div>
                  <FormLabel icon={<MapPin size={14} />}>Preferred Venue</FormLabel>
                  <input
                    type="text"
                    value={form.venue}
                    onChange={set("venue")}
                    placeholder="e.g. Seminar Hall, Lab 3"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-5 text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all text-sm"
                  />
                </div>
              </div>

              <div>
                <FormLabel icon={<MessageSquare size={14} />} required>Review Description</FormLabel>
                <textarea
                  rows="4"
                  value={form.description}
                  onChange={set("description")}
                  placeholder="Summarize the key milestones completed and specific areas where you need guidance..."
                  className={`w-full bg-white/5 border rounded-2xl py-4 px-5 text-white placeholder:text-slate-600 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all text-sm resize-none ${
                    errors.description ? "border-red-500/50" : "border-white/10 focus:border-indigo-500"
                  }`}
                />
                {errors.description && <p className="text-red-400 text-[10px] font-bold mt-2 ml-1 flex items-center gap-1 uppercase tracking-wider"><AlertCircle size={10}/> {errors.description}</p>}
              </div>

              <div>
                <FormLabel icon={<FileUp size={14} />}>Supporting Documents</FormLabel>
                <div className="relative border-2 border-dashed border-white/10 bg-white/[0.02] rounded-3xl p-8 flex flex-col items-center justify-center group hover:bg-white/5 hover:border-indigo-500/50 transition-all cursor-pointer">
                  <input 
                    type="file" 
                    className="absolute inset-0 opacity-0 cursor-pointer" 
                    onChange={(e) => setForm((f) => ({ ...f, attachments: e.target.files[0] }))}
                  />
                  <div className="w-12 h-12 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-400 mb-4 group-hover:scale-110 transition-transform">
                    <UploadCloud size={24} />
                  </div>
                  <p className="text-white font-bold text-sm">Click to upload or drag & drop</p>
                  <p className="text-slate-500 text-[10px] mt-1 uppercase tracking-widest font-medium">PDF, DOCX, ZIP (Max 10MB)</p>
                  
                  {form.attachments && (
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="mt-4 flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-xl text-emerald-400 text-xs font-bold">
                      <CheckCircle2 size={14} /> {form.attachments.name}
                    </motion.div>
                  )}
                </div>
              </div>

              <div className="pt-8 flex flex-col sm:flex-row items-center justify-end gap-4 border-t border-white/5">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleReset}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl border border-white/10 text-slate-400 font-bold text-sm hover:bg-white/5 hover:text-white transition-all flex items-center justify-center gap-2"
                >
                  <RotateCcw size={18} /> Reset Form
                </motion.button>
                <motion.button
                  id="submit-btn"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSubmit}
                  className="w-full sm:w-auto px-10 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-sm shadow-xl shadow-indigo-600/20 flex items-center justify-center gap-2"
                >
                  <Send size={18} /> Submit Application
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        <footer className="mt-20 pt-10 border-t border-white/5 text-center">
          <p className="text-slate-600 text-[10px] uppercase tracking-[0.4em] font-black">
            AuthenFlow Review Portal • Secure Layer v4.2.0
          </p>
        </footer>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <RequestReviewContent />
    </BrowserRouter>
  );
}