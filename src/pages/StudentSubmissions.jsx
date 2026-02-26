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
  Calendar,
  CheckCircle2,
  Clock,
  Search,
  Filter,
  X,
  FileText,
  Presentation,
  FileCheck,
  Timer,
  ExternalLink,
  MoreVertical,
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

const allSubmissions = [
  {
    id: 1, date: "2026-02-10", title: "Project Proposal", type: "Report",
    submittedAt: "10:30 AM", guide: "Mrs. Heena Ansari", status: "Verified", remarks: "Good work, well structured."
  },
  {
    id: 2, date: "2026-02-15", title: "Literature Review", type: "Document",
    submittedAt: "02:15 PM", guide: "Mrs. Heena Ansari", status: "Pending", remarks: ""
  },
  {
    id: 3, date: "2026-02-19", title: "System Design", type: "Presentation",
    submittedAt: "11:00 AM", guide: "Mrs. Heena Ansari", status: "Submitted", remarks: ""
  },
  {
    id: 4, date: "2026-02-22", title: "Implementation Report", type: "Report",
    submittedAt: "09:45 AM", guide: "Mrs. Heena Ansari", status: "Verified", remarks: "Excellent implementation details."
  },
  {
    id: 5, date: "2026-02-25", title: "Testing Document", type: "Document",
    submittedAt: "03:30 PM", guide: "Mrs. Heena Ansari", status: "Pending", remarks: ""
  },
];

const student = {
  name: "Anandhu Sebastian",
  uid: "24004048",
};

const statusConfig = {
  Verified: { icon: <CheckCircle2 size={14} />, color: "emerald" },
  Pending: { icon: <Timer size={14} />, color: "amber" },
  Submitted: { icon: <FileCheck size={14} />, color: "indigo" },
};

const typeConfig = {
  Report: { icon: <FileText size={14} />, color: "fuchsia" },
  Document: { icon: <Files size={14} />, color: "violet" },
  Presentation: { icon: <Presentation size={14} />, color: "orange" },
};

function SubmissionsContent() {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState("My Submissions");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [filtered, setFiltered] = useState(allSubmissions);

  const handleFilter = () => {
    if (!fromDate && !toDate) return;
    const result = allSubmissions.filter((s) => {
      const d = new Date(s.date);
      const from = fromDate ? new Date(fromDate) : null;
      const to = toDate ? new Date(toDate) : null;
      return (!from || d >= from) && (!to || d <= to);
    });
    setFiltered(result);
  };

  const handleClear = () => {
    setFromDate("");
    setToDate("");
    setFiltered(allSubmissions);
  };

  const stats = [
    { label: "Total Submissions", value: allSubmissions.length, sub: "All time records", icon: <Files />, color: "indigo" },
    { label: "Verified", value: allSubmissions.filter(s => s.status === "Verified").length, sub: "Completed review", icon: <CheckCircle2 />, color: "emerald" },
    { label: "This Month", value: allSubmissions.filter(s => new Date(s.date).getMonth() === 1).length, sub: "February cycle", icon: <Calendar />, color: "violet" },
    { label: "Pending", value: allSubmissions.filter(s => s.status === "Pending").length, sub: "Awaiting guide", icon: <Timer />, color: "amber" },
  ];

  return (
    <div className="flex min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-indigo-500/30">
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
            <h1 className="text-3xl font-bold text-white tracking-tight">My Submissions</h1>
            <p className="text-slate-500 text-sm mt-1">Monitor and track your project document lifecycle.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Search documents..." 
                className="bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-indigo-500 transition-all w-64 shadow-inner"
              />
            </div>
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

        {/* --- Quick Stats --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-[28px] group hover:bg-white/[0.08] transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-2xl bg-${stat.color}-500/10 text-${stat.color}-400 group-hover:scale-110 transition-transform`}>
                  {stat.icon}
                </div>
                <MoreVertical size={16} className="text-slate-600" />
              </div>
              <h3 className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">{stat.label}</h3>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-white">{stat.value}</span>
                <span className="text-[10px] text-slate-600 font-bold uppercase tracking-tighter">{stat.sub}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* --- Advanced Filter --- */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 mb-8 shadow-2xl"
        >
          <div className="flex items-center gap-3 mb-6">
            <Filter size={18} className="text-indigo-400" />
            <h3 className="text-white font-bold tracking-tight">Filter Submission Log</h3>
          </div>
          <div className="flex flex-wrap items-end gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">From Date</label>
              <input 
                type="date" 
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500 transition-all w-48"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">To Date</label>
              <input 
                type="date" 
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500 transition-all w-48"
              />
            </div>
            <div className="flex gap-3">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleFilter}
                className="bg-indigo-600 text-white px-8 py-3 rounded-xl text-sm font-bold shadow-lg shadow-indigo-600/20"
              >
                Apply Filters
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleClear}
                className="bg-white/5 text-slate-400 px-6 py-3 rounded-xl text-sm font-bold border border-white/10 hover:text-white transition-colors"
              >
                Clear
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* --- Submissions Table --- */}
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[32px] overflow-hidden shadow-2xl">
          <div className="p-8 border-b border-white/5 flex items-center justify-between">
            <h3 className="text-white font-bold flex items-center gap-3">
              <Files size={18} className="text-indigo-400" />
              Recent Submissions
            </h3>
            <button className="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition-colors">
              Export Log <ExternalLink size={12} />
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/[0.02] border-b border-white/5">
                  {["#", "Date", "Document Title", "Type", "Submission Info", "Guide", "Status", "Remarks"].map((head) => (
                    <th key={head} className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">{head}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                <AnimatePresence mode="popLayout">
                  {filtered.length === 0 ? (
                    <motion.tr initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <td colSpan={8} className="px-6 py-20 text-center">
                        <div className="flex flex-col items-center opacity-30">
                          <Search size={48} className="mb-4" />
                          <p className="text-sm font-bold">No submissions found for the selected range.</p>
                        </div>
                      </td>
                    </motion.tr>
                  ) : (
                    filtered.map((row, idx) => {
                      const status = statusConfig[row.status];
                      const type = typeConfig[row.type];
                      const statusColors = {
                        emerald: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
                        amber: "bg-amber-500/10 text-amber-400 border-amber-500/20",
                        indigo: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
                      };
                      const typeColors = {
                        fuchsia: "bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/20",
                        violet: "bg-violet-500/10 text-violet-400 border-violet-500/20",
                        orange: "bg-orange-500/10 text-orange-400 border-orange-500/20",
                      };

                      return (
                        <motion.tr
                          key={row.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          className="group hover:bg-white/[0.03] transition-colors cursor-default"
                        >
                          <td className="px-6 py-5 text-slate-500 text-xs font-mono">{row.id.toString().padStart(2, '0')}</td>
                          <td className="px-6 py-5 text-slate-300 text-sm font-medium">{row.date}</td>
                          <td className="px-6 py-5">
                            <div className="text-white font-bold text-sm tracking-tight group-hover:text-indigo-400 transition-colors">{row.title}</div>
                          </td>
                          <td className="px-6 py-5">
                            <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border flex items-center gap-1.5 w-fit ${typeColors[type.color]}`}>
                              {type.icon} {row.type}
                            </span>
                          </td>
                          <td className="px-6 py-5">
                            <div className="flex flex-col">
                              <span className="text-indigo-400 text-xs font-bold flex items-center gap-1.5">
                                <UploadCloud size={12} /> {row.submittedAt}
                              </span>
                              <span className="text-[10px] text-slate-600 font-medium uppercase mt-0.5">V4.2.0 Node</span>
                            </div>
                          </td>
                          <td className="px-6 py-5">
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded-full bg-indigo-500/20 border border-indigo-500/20 flex items-center justify-center text-[10px] font-bold text-indigo-400">
                                {row.guide[0]}
                              </div>
                              <span className="text-slate-400 text-xs font-semibold">{row.guide}</span>
                            </div>
                          </td>
                          <td className="px-6 py-5">
                            <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border flex items-center gap-2 w-fit ${statusColors[status.color]}`}>
                              {status.icon} {row.status}
                            </span>
                          </td>
                          <td className="px-6 py-5">
                            <p className="text-slate-500 text-xs leading-relaxed max-w-[180px] line-clamp-2 italic">
                              {row.remarks || "Pending verification..."}
                            </p>
                          </td>
                        </motion.tr>
                      );
                    })
                  )}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </div>

        <footer className="mt-20 pt-10 border-t border-white/5 text-center flex flex-col items-center">
          <p className="text-slate-700 text-[10px] uppercase tracking-[0.4em] font-black mb-4">
            AuthenFlow Submissions Hub • Secure Node 4.2.0
          </p>
          <div className="flex gap-4">
            <div className="h-1 w-12 bg-indigo-500/30 rounded-full" />
            <div className="h-1 w-12 bg-purple-500/30 rounded-full" />
            <div className="h-1 w-12 bg-fuchsia-500/30 rounded-full" />
          </div>
        </footer>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <SubmissionsContent />
    </BrowserRouter>
  );
}