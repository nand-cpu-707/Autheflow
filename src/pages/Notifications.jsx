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
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Info,
  Trash2,
  CheckCheck,
  Search,
  ChevronRight,
  Filter
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

const allNotifications = [
  {
    id: 1, type: "Review",
    title: "Document Verified",
    message: "Your Project Proposal document has been verified by Dr. Meena Raj.",
    time: "2026-02-23 09:15:42",
    read: false,
    category: "Review Updates",
  },
  {
    id: 2, type: "Correction",
    title: "Correction Required",
    message: "Your Literature Review document needs corrections. Please revise the abstract section and resubmit.",
    time: "2026-02-22 14:30:11",
    read: false,
    category: "Corrections",
  },
  {
    id: 3, type: "Review",
    title: "Review Request Approved",
    message: "Your Mid-Term Review request has been approved. Review scheduled on 2026-02-28 at 10:00 AM in Seminar Hall.",
    time: "2026-02-21 11:05:20",
    read: true,
    category: "Review Updates",
  },
  {
    id: 4, type: "Correction",
    title: "Correction Required",
    message: "Implementation Report: Please add more detail in the system architecture section before the next review.",
    time: "2026-02-20 16:44:08",
    read: false,
    category: "Corrections",
  },
  {
    id: 5, type: "System",
    title: "Submission Received",
    message: "Your System Design document was successfully uploaded and is awaiting guide verification.",
    time: "2026-02-19 10:02:34",
    read: true,
    category: "System",
  },
  {
    id: 6, type: "Review",
    title: "Marks Entered",
    message: "Dr. Meena Raj has entered evaluation marks for your Project Proposal. Check Results & Marks for details.",
    time: "2026-02-18 13:20:55",
    read: true,
    category: "Review Updates",
  },
  {
    id: 7, type: "System",
    title: "Submission Deadline Reminder",
    message: "Reminder: The final project submission deadline is 2026-03-05. Please ensure all documents are uploaded.",
    time: "2026-02-17 08:00:00",
    read: true,
    category: "System",
  },
  {
    id: 8, type: "Correction",
    title: "Correction Required",
    message: "Testing Document: Resubmit with updated test cases covering edge scenarios as discussed in last review.",
    time: "2026-02-15 15:10:30",
    read: true,
    category: "Corrections",
  },
];

const student = {
  name: "Anandhu Sebastian",
  uid: "24004048",
};

const typeConfig = {
  Review: { icon: <CheckCircle2 size={18} />, color: "emerald" },
  Correction: { icon: <AlertTriangle size={18} />, color: "amber" },
  System: { icon: <Info size={18} />, color: "indigo" },
};

const filterTabs = ["All", "Review Updates", "Corrections", "System"];

function NotificationsContent() {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState("Notifications");
  const [activeFilter, setActiveFilter] = useState("All");
  const [notifications, setNotifications] = useState(allNotifications);

  const filtered = activeFilter === "All"
    ? notifications
    : notifications.filter((n) => n.category === activeFilter);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => setNotifications((n) => n.map((item) => ({ ...item, read: true })));
  const markRead = (id) => setNotifications((n) => n.map((item) => item.id === id ? { ...item, read: true } : item));
  const deleteNotification = (id, e) => {
    e.stopPropagation();
    setNotifications((n) => n.filter((item) => item.id !== id));
  };

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
                {item.label === "Notifications" && unreadCount > 0 && (
                  <span className="relative z-10 ml-auto bg-red-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full ring-2 ring-[#020617]">
                    {unreadCount}
                  </span>
                )}
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
            <h1 className="text-3xl font-bold text-white tracking-tight">Notification Center</h1>
            <p className="text-slate-500 text-sm mt-1">Stay informed about your project progress and guide feedback.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Search updates..." 
                className="bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-indigo-500 transition-all w-64"
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

        {/* --- Filter Bar --- */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[28px] p-4 mb-8 flex items-center justify-between shadow-2xl">
          <div className="flex items-center gap-2 px-4">
            <Filter size={16} className="text-indigo-400" />
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Filter By</span>
          </div>
          <div className="flex items-center gap-2">
            {filterTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 relative ${
                  activeFilter === tab 
                  ? "text-white" 
                  : "text-slate-500 hover:text-slate-300 hover:bg-white/5"
                }`}
              >
                {activeFilter === tab && (
                  <motion.div layoutId="filterActive" className="absolute inset-0 bg-indigo-600 rounded-xl shadow-lg shadow-indigo-600/20" />
                )}
                <span className="relative z-10">{tab}</span>
              </button>
            ))}
          </div>
          <div className="px-4">
            {unreadCount > 0 && (
              <button 
                onClick={markAllRead}
                className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 text-xs font-bold transition-colors"
              >
                <CheckCheck size={16} /> Mark all as read
              </button>
            )}
          </div>
        </div>

        {/* --- Notifications List --- */}
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {filtered.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white/5 border border-white/10 rounded-[32px] p-20 flex flex-col items-center text-center"
              >
                <div className="w-20 h-20 bg-indigo-500/10 rounded-3xl flex items-center justify-center text-indigo-400 mb-6">
                  <Bell size={40} className="opacity-20" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">You're all caught up!</h3>
                <p className="text-slate-500 text-sm">No new notifications found in this category.</p>
              </motion.div>
            ) : (
              filtered.map((notif, idx) => {
                const cfg = typeConfig[notif.type];
                const colorClasses = {
                  emerald: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
                  amber: "bg-amber-500/10 text-amber-400 border-amber-500/20",
                  indigo: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
                };

                return (
                  <motion.div
                    key={notif.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: idx * 0.05 }}
                    onClick={() => markRead(notif.id)}
                    className={`group relative bg-white/5 backdrop-blur-xl border rounded-[28px] p-6 cursor-pointer transition-all duration-300 hover:bg-white/[0.08] ${
                      notif.read ? "border-white/5 opacity-70" : "border-indigo-500/20 shadow-lg shadow-indigo-500/5"
                    }`}
                  >
                    {!notif.read && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-12 bg-indigo-500 rounded-r-full shadow-[0_0_15px_rgba(99,102,241,0.5)]" />
                    )}

                    <div className="flex gap-6">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border transition-transform duration-500 group-hover:scale-110 ${colorClasses[cfg.color]}`}>
                        {cfg.icon}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-3">
                            <h4 className="text-white font-bold tracking-tight">{notif.title}</h4>
                            {!notif.read && (
                              <span className="bg-indigo-500 text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter">New</span>
                            )}
                          </div>
                          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{notif.time}</span>
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed mb-3 pr-10">{notif.message}</p>
                        <div className="flex items-center justify-between">
                          <span className={`text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-lg border ${colorClasses[cfg.color]}`}>
                            {notif.category}
                          </span>
                          <button 
                            onClick={(e) => deleteNotification(notif.id, e)}
                            className="text-slate-600 hover:text-red-400 p-2 transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })
            )}
          </AnimatePresence>
        </div>

        <footer className="mt-20 pt-10 border-t border-white/5 text-center flex flex-col items-center">
          <div className="flex items-center gap-2 text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-2">
            <ShieldCheck size={12} className="text-indigo-400" />
            End-to-End Encrypted Notifications
          </div>
          <p className="text-slate-700 text-[10px] uppercase tracking-[0.4em] font-black">
            AuthenFlow Communication Layer • Secure Node 4.2.0
          </p>
        </footer>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <NotificationsContent />
    </BrowserRouter>
  );
}