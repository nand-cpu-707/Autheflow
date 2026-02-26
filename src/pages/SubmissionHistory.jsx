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
  FileText,
  Presentation,
  ShieldCheck,
  Timer,
  ExternalLink,
  ChevronDown,
  RotateCcw,
  MoreVertical
} from "lucide-react";

// Navigation items matching your App.jsx routes
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

const allRecords = [
  {
    id: 1, type: "Report", submittedDate: "2026-02-10", submittedAt: "10 Feb 2026, 10:30",
    verifiedAt: "11 Feb 2026, 09:00", reviewedBy: "Mrs. Heena Ansari", group: "Group A",
    duration: "1 day", status: "Verified",
  },
  {
    id: 2, type: "Document", submittedDate: "2026-02-15", submittedAt: "15 Feb 2026, 02:15",
    verifiedAt: "—", reviewedBy: "Mrs. Heena Ansari", group: "Group A",
    duration: "—", status: "Pending",
  },
  {
    id: 3, type: "Presentation", submittedDate: "2026-02-19", submittedAt: "19 Feb 2026, 11:00",
    verifiedAt: "—", reviewedBy: "Mrs. Heena Ansari", group: "Group A",
    duration: "—", status: "Submitted",
  },
  {
    id: 4, type: "Report", submittedDate: "2026-02-22", submittedAt: "22 Feb 2026, 09:45",
    verifiedAt: "23 Feb 2026, 10:30", reviewedBy: "Mrs. Heena Ansari", group: "Group A",
    duration: "1 day", status: "Verified",
  },
  {
    id: 5, type: "Document", submittedDate: "2026-02-25", submittedAt: "25 Feb 2026, 03:30",
    verifiedAt: "—", reviewedBy: "Mrs. Heena Ansari", group: "Group A",
    duration: "—", status: "Pending",
  },
];

const student = {
  name: "Anandhu Sebastian",
  uid: "24004048",
};

const typeConfig = {
  Report: { icon: <FileText size={14} />, color: "fuchsia" },
  Document: { icon: <Files size={14} />, color: "violet" },
  Presentation: { icon: <Presentation size={14} />, color: "orange" },
};

const statusConfig = {
  Verified: { icon: <CheckCircle2 size={14} />, color: "emerald" },
  Pending: { icon: <Timer size={14} />, color: "amber" },
  Submitted: { icon: <UploadCloud size={14} />, color: "indigo" },
};

/**
 * Main Content Component
 */
function SubmissionHistoryContent() {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState("Submission History");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [typeFilter, setTypeFilter] = useState("All Types");
  const [filtered, setFiltered] = useState(allRecords);

  const handleFilter = () => {
    let result = allRecords;
    if (fromDate) result = result.filter((r) => new Date(r.submittedDate) >= new Date(fromDate));
    if (toDate) result = result.filter((r) => new Date(r.submittedDate) <= new Date(toDate));
    if (typeFilter !== "All Types") result = result.filter((r) => r.type === typeFilter);
    setFiltered(result);
  };

  const handleClear = () => {
    setFromDate("");
    setToDate("");
    setTypeFilter("All Types");
    setFiltered(allRecords);
  };

  const stats = [
    { label: "Total Submissions", value: allRecords.length, sub: "Historical log", icon: <History />, color: "indigo" },
    { label: "Reports", value: allRecords.filter(r => r.type === "Report").length, sub: "Official reports", icon: <FileText />, color: "fuchsia" },
    { label: "Documents", value: allRecords.filter(r => r.type === "Document").length, sub: "Supporting files", icon: <Files />, color: "violet" },
    { label: "This Month", value: allRecords.filter(r => new Date(r.submittedDate).getMonth() === 1).length, sub: "Feb 2026 cycle", icon: <Calendar />, color: "emerald" },
  ];

  return (
    <div className="flex min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-indigo-500/30">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] bg-indigo-600/10 blur-[120px] rounded-full" />
      </div>

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

      <main className="ml-72 flex-1 p-10 relative">
        <header className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">Submission History</h1>
            <p className="text-slate-500 text-sm mt-1">Audit trail of all project milestones and verifications.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Search history..." 
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
                <div className={`p-3 rounded-2xl bg-indigo-500/10 text-indigo-400 group-hover:scale-110 transition-transform`}>
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

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 mb-8 shadow-2xl"
        >
          <div className="flex items-center gap-3 mb-6">
            <Filter size={18} className="text-indigo-400" />
            <h3 className="text-white font-bold tracking-tight">Search Audit Logs</h3>
          </div>
          <div className="flex flex-wrap items-end gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">From Date</label>
              <input 
                type="date" 
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500 transition-all w-44"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">To Date</label>
              <input 
                type="date" 
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500 transition-all w-44"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Category</label>
              <div className="relative">
                <select 
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500 transition-all w-44 appearance-none cursor-pointer"
                >
                  <option className="bg-[#020617]">All Types</option>
                  <option className="bg-[#020617]">Report</option>
                  <option className="bg-[#020617]">Document</option>
                  <option className="bg-[#020617]">Presentation</option>
                </select>
                <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
              </div>
            </div>
            <div className="flex gap-3">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleFilter}
                className="bg-indigo-600 text-white px-8 py-3 rounded-xl text-sm font-bold shadow-lg shadow-indigo-600/20 flex items-center gap-2"
              >
                <Search size={16} /> Filter
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleClear}
                className="bg-white/5 text-slate-400 px-6 py-3 rounded-xl text-sm font-bold border border-white/10 hover:text-white transition-colors flex items-center gap-2"
              >
                <RotateCcw size={16} /> Reset
              </motion.button>
            </div>
          </div>
        </motion.div>

        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[32px] overflow-hidden shadow-2xl">
          <div className="p-8 border-b border-white/5 flex items-center justify-between">
            <h3 className="text-white font-bold flex items-center gap-3">
              <History size={18} className="text-indigo-400" />
              Full Submission Records
            </h3>
            <button className="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition-colors">
              Download Audit PDF <ExternalLink size={12} />
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/[0.02] border-b border-white/5">
                  {["#", "Type", "Submitted", "Verified", "Reviewed By", "Group", "Status"].map((head) => (
                    <th key={head} className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">{head}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                <AnimatePresence mode="popLayout">
                  {filtered.length === 0 ? (
                    <motion.tr initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <td colSpan={7} className="px-6 py-20 text-center">
                        <div className="flex flex-col items-center opacity-30">
                          <History size={48} className="mb-4" />
                          <p className="text-sm font-bold">No history records match the criteria.</p>
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
                          layout
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          className="group hover:bg-white/[0.03] transition-colors cursor-default"
                        >
                          <td className="px-6 py-5 text-slate-500 text-xs font-mono">{row.id.toString().padStart(2, '0')}</td>
                          <td className="px-6 py-5">
                            <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border flex items-center gap-1.5 w-fit ${typeColors[type.color]}`}>
                              {type.icon} {row.type}
                            </span>
                          </td>
                          <td className="px-6 py-5">
                            <div className="flex flex-col">
                              <span className="text-white text-xs font-bold">{row.submittedAt.split(', ')[0]}</span>
                              <span className="text-slate-500 text-[10px] font-medium mt-0.5">{row.submittedAt.split(', ')[1]}</span>
                            </div>
                          </td>
                          <td className="px-6 py-5">
                            {row.verifiedAt !== "—" ? (
                              <div className="flex flex-col text-emerald-400">
                                <span className="text-xs font-bold">Verified</span>
                                <span className="text-[10px] font-medium mt-0.5">{row.verifiedAt.split(', ')[1]}</span>
                              </div>
                            ) : (
                              <span className="text-slate-600 text-xs">—</span>
                            )}
                          </td>
                          <td className="px-6 py-5">
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded-full bg-indigo-500/20 border border-indigo-500/20 flex items-center justify-center text-[10px] font-bold text-indigo-400">
                                {row.reviewedBy[0]}
                              </div>
                              <span className="text-slate-400 text-xs font-semibold">{row.reviewedBy}</span>
                            </div>
                          </td>
                          <td className="px-6 py-5 text-slate-400 text-xs font-medium">{row.group}</td>
                          <td className="px-6 py-5">
                            <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border flex items-center gap-2 w-fit ${statusColors[status.color]}`}>
                              {status.icon} {row.status}
                            </span>
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
            AuthenFlow Archives • Secure Node 4.2.0
          </p>
          <div className="flex items-center gap-2 text-slate-600 text-[10px] font-bold uppercase tracking-widest">
            <ShieldCheck size={12} className="text-indigo-400" />
            Immutable Audit Trail Verified
          </div>
        </footer>
      </main>
    </div>
  );
}

/**
 * App Wrapper for Preview
 */
export default function App() {
  return (
    <BrowserRouter>
      <SubmissionHistoryContent />
    </BrowserRouter>
  );
}