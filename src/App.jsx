import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';

// --- VERCEL INTEGRATION ---
const SpeedInsights = () => null; 

import { 
  User, Lock, Eye, EyeOff, GraduationCap, Presentation, 
  ShieldCheck, LogOut, Loader2, LayoutDashboard,
  Files, History as HistoryIcon, UploadCloud, MessageSquare, BarChart3, Bell,
  Mail, Phone, Calendar, BookOpen, Award, Users, Building2, FileText,
  Clock, MapPin, Send, RotateCcw, Filter, CheckCheck, Trash2, Search,
  ExternalLink, ChevronDown, MoreVertical, Timer, FileCheck, Menu, X, Shield, Terminal, PieChart, Briefcase, Activity, Settings, ChevronRight, UserPlus, UserMinus, Snowflake, CheckCircle2, MessageCircle, MonitorDot
} from 'lucide-react';

// --- DATA CONFIGURATION ---
const studentInfo = {
  name: "Anandhu Sebastian",
  uid: "24004048",
  rollNo: "44",
  department: "CSE (CYBER SECURITY)",
  guide: "Prof. Neha Zade",
  group: "Group A-12",
  members: ["Anandhu Sebastian", "Rahul V.", "Sneha K."],
  attendance: "92%",
  uploadStatus: "Pending (Seminar 2)",
  projectTitle: "AuthenFlow – Role-Based Project Management System",
};

const dummyCredentials = {
  Student: { username: "student", password: "pass@123", path: "/profile" },
  Faculty: { username: "faculty", password: "fac@123", path: "/faculty" },
  Incharge: { username: "incharge", password: "inc@123", path: "/incharge" },
  HOD: { username: "hod", password: "hod@123", path: "/hod" },
  Admin: { username: "admin", password: "admin@123", path: "/admin" },
};

// --- NAVIGATION CONFIGURATIONS ---
// Admin now contains ALL functional links
const navConfigs = {
  Student: [
    { label: "Dashboard", icon: <LayoutDashboard size={18} />, path: "/profile" },
    { label: "Allotted Group", icon: <Users size={18} />, path: "/group" },
    { label: "My Status", icon: <Activity size={18} />, path: "/status" },
    { label: "Raise Query", icon: <MessageSquare size={18} />, path: "/query" },
  ],
  Faculty: [
    { label: "Dashboard", icon: <LayoutDashboard size={18} />, path: "/faculty" },
    { label: "Assigned Groups", icon: <Users size={18} />, path: "/faculty-groups" },
    { label: "Evaluation/Marks", icon: <Award size={18} />, path: "/evaluate" },
    { label: "Attendance", icon: <CheckCircle2 size={18} />, path: "/attendance" },
  ],
  HOD: [
    { label: "Global View", icon: <LayoutDashboard size={18} />, path: "/hod" },
    { label: "Project Freeze", icon: <Snowflake size={18} />, path: "/freeze" },
    { label: "Verify Valuation", icon: <ShieldCheck size={18} />, path: "/verify" },
  ],
  Admin: [
    { label: "Master Panel", icon: <Terminal size={18} />, path: "/admin" },
    { label: "User Monitor", icon: <MonitorDot size={18} />, path: "/admin-monitor" },
    { label: "Student Cluster", icon: <Users size={18} />, path: "/group" },
    { label: "Evaluation Hub", icon: <Award size={18} />, path: "/evaluate" },
    { label: "Dept Control", icon: <Building2 size={18} />, path: "/hod" },
    { label: "Freeze Ops", icon: <Snowflake size={18} />, path: "/freeze" },
    { label: "Audit Logs", icon: <HistoryIcon size={18} />, path: "/history" },
    { label: "System Config", icon: <Settings size={18} />, path: "/admin" },
  ]
};

const roleThemes = {
  Student: { color: "text-indigo-400", border: "border-indigo-500/20", grad: "from-indigo-500 to-purple-600" },
  Faculty: { color: "text-emerald-400", border: "border-emerald-500/20", grad: "from-emerald-500 to-teal-600" },
  Incharge: { color: "text-blue-400", border: "border-blue-500/20", grad: "from-blue-500 to-indigo-600" },
  HOD: { color: "text-amber-400", border: "border-amber-500/20", grad: "from-amber-500 to-orange-600" },
  Admin: { color: "text-rose-400", border: "border-rose-500/20", grad: "from-rose-500 to-red-600" },
};

// --- ANIMATION CONFIG ---
const spring = { type: "spring", stiffness: 300, damping: 30 };

// --- SHARED LAYOUT ---
const AppLayout = ({ children, activeTitle }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const role = localStorage.getItem('userRole') || 'Student';
  const theme = roleThemes[role];
  const items = navConfigs[role] || navConfigs.Student;

  useEffect(() => { setIsMobileOpen(false); }, [location.pathname]);

  return (
    <div className="flex min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-indigo-500/30 overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10" />
        <div className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] bg-purple-600/10 blur-[120px] rounded-full" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[70%] h-[70%] bg-indigo-600/10 blur-[120px] rounded-full" />
      </div>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsMobileOpen(false)} className="fixed inset-0 bg-black/70 backdrop-blur-md z-[80] lg:hidden" />
        )}
      </AnimatePresence>

      <aside className={`fixed left-0 top-0 h-screen w-72 bg-[#020617]/90 backdrop-blur-3xl border-r border-white/5 z-[90] flex flex-col transition-transform duration-500 ${isMobileOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}>
        <div className="p-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={`w-10 h-10 bg-gradient-to-br ${theme.grad} rounded-xl flex items-center justify-center text-white font-black italic shadow-lg`}>{role[0]}</div>
            <span className="text-white font-bold text-xl tracking-tight">AuthenFlow</span>
          </div>
          <button onClick={() => setIsMobileOpen(false)} className="lg:hidden text-slate-400"><X size={24} /></button>
        </div>
        <nav className="flex-1 px-4 py-2 space-y-1 overflow-y-auto custom-scrollbar">
          <LayoutGroup id="sidebar">
            {items.map((item) => (
              <Link key={item.label} to={item.path} className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all relative group ${location.pathname === item.path ? "text-white font-bold" : "text-slate-500 hover:text-slate-300"}`}>
                {location.pathname === item.path && <motion.div layoutId="activeNav" transition={spring} className={`absolute inset-0 bg-gradient-to-r ${theme.grad} rounded-xl shadow-lg shadow-indigo-500/10`} />}
                <span className="relative z-10">{item.icon}</span>
                <span className="relative z-10 text-sm tracking-wide">{item.label}</span>
              </Link>
            ))}
          </LayoutGroup>
        </nav>
        <div className="p-6">
          <button onClick={() => { localStorage.removeItem('userRole'); navigate("/"); }} className="w-full bg-white/5 border border-white/10 text-slate-400 py-3.5 rounded-2xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-red-500/10 hover:text-red-400 transition-all active:scale-95">
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 lg:ml-72 min-h-screen p-5 lg:p-10 relative z-10 flex flex-col">
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 lg:mb-12 gap-6">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsMobileOpen(true)} className="lg:hidden w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-slate-300 shadow-xl"><Menu size={24} /></button>
            <div>
              <h1 className="text-2xl lg:text-3xl font-black text-white tracking-tight leading-none">{activeTitle}</h1>
              <div className="flex items-center gap-2 mt-2">
                <span className={`text-[10px] font-black uppercase tracking-[0.2em] px-2 py-0.5 rounded border ${theme.color} ${theme.border}`}>{role}</span>
                <span className="text-slate-500 text-[9px] font-black uppercase tracking-widest opacity-50">AuthenFlow Node v4.3.0</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="h-11 w-11 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 group cursor-pointer hover:bg-white/10 transition-all"><Bell size={18} /></div>
            <div className={`h-11 w-11 rounded-2xl bg-gradient-to-br ${theme.grad} flex items-center justify-center text-white font-black text-sm shadow-xl`}>{role === 'Student' ? studentInfo.name[0] : role[0]}</div>
          </div>
        </header>
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="flex-1">{children}</motion.div>
        <footer className="mt-12 lg:mt-20 pt-8 border-t border-white/5 text-center text-slate-700 text-[9px] font-black uppercase tracking-[0.4em]">AuthenFlow Security Infrastructure • Authorized Environment Only</footer>
      </main>
    </div>
  );
};

// --- LOGIN PAGE ---
const LoginPage = () => {
  const navigate = useNavigate();
  // "Incharge" removed from the visual toggle array
  const [activeRole, setActiveRole] = useState("Student");
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const displayRoles = ["Student", "Faculty", "HOD", "Admin"];

  const handleLogin = async (e) => {
    e.preventDefault();
    const creds = dummyCredentials[activeRole];
    if (user === creds.username && pass === creds.password) {
      setLoading(true);
      await new Promise(r => setTimeout(r, 1000));
      localStorage.setItem('userRole', activeRole);
      navigate(creds.path);
    } else { 
      setError(`Invalid Access Keys for ${activeRole}.`); 
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#020617] p-4 relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-purple-600/10 blur-[120px] rounded-full" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
      
      <motion.div initial={{ opacity: 0, scale: 0.9, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ type: "spring", damping: 25, stiffness: 150 }} className="relative z-10 w-full max-w-[440px]">
        <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[48px] p-8 lg:p-12 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)]">
          <div className="text-center mb-10">
            <motion.div whileHover={{ rotate: 10, scale: 1.1 }} className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl flex items-center justify-center text-white text-3xl font-black italic shadow-2xl mx-auto mb-6">AF</motion.div>
            <h1 className="text-white text-3xl font-black tracking-tighter">AuthenFlow</h1>
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.4em] mt-2">Authority Terminal</p>
          </div>
          
          <div className="bg-white/5 p-1 rounded-2xl grid grid-cols-4 gap-1 mb-8 overflow-hidden border border-white/5">
            <LayoutGroup id="login-roles">
              {displayRoles.map(r => (
                <button key={r} onClick={() => { setActiveRole(r); setError(""); }} className={`relative py-3 rounded-xl transition-all flex flex-col items-center gap-1 ${activeRole === r ? "text-white" : "text-slate-500 hover:text-slate-300"}`}>
                  {activeRole === r && <motion.div layoutId="roleBubble" transition={spring} className="absolute inset-0 bg-indigo-600 rounded-xl shadow-lg shadow-indigo-600/30" />}
                  <span className="relative z-10 text-[8px] font-black uppercase tracking-tighter">{r}</span>
                </button>
              ))}
            </LayoutGroup>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <AnimatePresence mode="wait">
              {error && <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="text-red-400 text-[10px] font-bold text-center bg-red-400/10 p-3 rounded-2xl border border-red-500/20">{error}</motion.div>}
            </AnimatePresence>
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest ml-1">Account ID</label>
              <input type="text" placeholder="Username" value={user} onChange={e => setUser(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-indigo-500/50 text-sm transition-all focus:ring-4 focus:ring-indigo-500/5" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest ml-1">Access Token</label>
              <input type="password" placeholder="••••••••" value={pass} onChange={e => setPass(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-indigo-500/50 text-sm transition-all focus:ring-4 focus:ring-indigo-500/5" />
            </div>
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-black py-4.5 rounded-2xl shadow-xl flex items-center justify-center gap-3 mt-4 text-[11px] uppercase tracking-widest">
              {loading ? <Loader2 className="animate-spin" size={18}/> : <>Initialize Entry <ChevronRight size={16}/></>}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

// --- COMPONENTS ---

const AdminDashboard = () => {
  const activities = [
    { u: "Anandhu S.", a: "Uploaded Literature Review", t: "2 mins ago", r: "Student" },
    { u: "Prof. Neha", a: "Verified Group A-12 Marks", t: "15 mins ago", r: "Faculty" },
    { u: "HOD CSE", a: "Attempted to Freeze Batch 24", t: "1 hour ago", r: "HOD" },
    { u: "Rahul V.", a: "Raised Query to Guide", t: "3 hours ago", r: "Student" },
  ];

  return (
    <AppLayout activeTitle="Master Panel">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Core Stats */}
        <div className="xl:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { l: "Total Users", v: "1,248", c: "indigo", i: <Users/> },
            { l: "Security Grade", v: "A+", c: "emerald", i: <Shield/> },
            { l: "System Load", v: "12%", c: "rose", i: <Activity/> },
          ].map(s => (
            <div key={s.l} className="bg-white/5 border border-white/10 rounded-[32px] p-8 group hover:bg-white/[0.08] transition-all">
              <div className={`w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-slate-400 mb-6 group-hover:scale-110 transition-transform`}>{s.i}</div>
              <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1">{s.l}</p>
              <p className="text-3xl font-black text-white">{s.v}</p>
            </div>
          ))}
        </div>
        
        {/* Quick Config */}
        <div className="bg-gradient-to-br from-indigo-600/20 to-purple-600/20 border border-white/10 rounded-[32px] p-8 flex flex-col justify-center border-dashed border-2">
           <h4 className="text-white font-black text-xs uppercase tracking-[0.3em] mb-4 text-center">Root Directives</h4>
           <div className="space-y-3">
              <button className="w-full py-3 bg-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 transition-all">Broadcast Alert</button>
              <button className="w-full py-3 bg-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-600 transition-all">Flush User Cache</button>
           </div>
        </div>

        {/* User Monitor: Check all users and what they are doing */}
        <div className="xl:col-span-3 bg-white/5 border border-white/10 rounded-[40px] overflow-hidden shadow-2xl">
          <div className="p-8 border-b border-white/5 flex items-center justify-between">
            <h3 className="text-white font-black text-lg flex items-center gap-3 uppercase tracking-tighter">
              <MonitorDot size={20} className="text-rose-400" />
              Live User Activity Monitor
            </h3>
            <span className="text-[10px] font-black text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full animate-pulse uppercase tracking-widest">System Sync: Live</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/[0.02] border-b border-white/5">
                  <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest">Authorized User</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest">Active Role</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest">Process / Action</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {activities.map((act, i) => (
                  <tr key={i} className="hover:bg-white/[0.03] transition-all group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center text-xs font-black text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all">{act.u[0]}</div>
                        <span className="text-sm font-bold text-white">{act.u}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                       <span className="text-[9px] font-black uppercase border border-white/10 px-3 py-1 rounded-full text-slate-400">{act.r}</span>
                    </td>
                    <td className="px-8 py-6">
                       <p className="text-sm text-slate-300 font-medium">{act.a}</p>
                    </td>
                    <td className="px-8 py-6">
                       <span className="text-[10px] text-slate-500 font-bold uppercase">{act.t}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

const StudentDashboard = () => (
  <AppLayout activeTitle="Dashboard">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-[32px] p-8 shadow-2xl relative overflow-hidden group">
        <div className="relative z-10 flex flex-col sm:flex-row items-center gap-8 text-center sm:text-left">
          <div className="w-24 h-24 rounded-3xl bg-white/20 backdrop-blur-md border-2 border-white/30 flex items-center justify-center text-4xl font-black text-white">{studentInfo.name[0]}</div>
          <div>
            <h2 className="text-3xl font-black text-white tracking-tighter leading-tight">{studentInfo.name}</h2>
            <p className="text-indigo-100/70 text-xs font-black uppercase tracking-widest mt-1">{studentInfo.department}</p>
            <p className="text-white/40 text-[10px] font-bold mt-4 uppercase">Roll No: {studentInfo.rollNo}</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {[
          { l: "Attendance", v: studentInfo.attendance, i: <CheckCircle2 size={16}/> },
          { l: "Group ID", v: studentInfo.group, i: <Users size={16}/> },
          { l: "Status", v: "Active", i: <Activity size={16}/> },
          { l: "Year", v: "2nd Year", i: <Calendar size={16}/> },
        ].map(s => (
          <div key={s.l} className="bg-white/5 border border-white/10 rounded-3xl p-6 hover:bg-white/[0.08] transition-all">
            <span className="text-indigo-400 opacity-50 block mb-2">{s.i}</span>
            <p className="text-slate-500 text-[9px] font-black uppercase tracking-widest mb-1">{s.l}</p>
            <p className="text-xl font-black text-white">{s.v}</p>
          </div>
        ))}
      </div>
    </div>
  </AppLayout>
);

const AllottedGroup = () => (
  <AppLayout activeTitle="Allotted Group">
    <div className="bg-white/5 border border-white/10 rounded-[40px] p-8 lg:p-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 border-b border-white/5 pb-8">
        <div>
          <h3 className="text-2xl font-bold text-white mb-1 tracking-tight">Group {studentInfo.group}</h3>
          <p className="text-slate-500 text-xs tracking-wide font-medium">Guide: <span className="text-indigo-400 font-bold">{studentInfo.guide}</span></p>
        </div>
        <div className="bg-indigo-500/10 border border-indigo-500/20 px-6 py-3 rounded-2xl text-indigo-400 font-bold text-xs uppercase tracking-widest shadow-xl shadow-indigo-500/5">Primary Cluster Node</div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {studentInfo.members.map((m, idx) => (
          <div key={m} className="bg-white/5 border border-white/10 rounded-3xl p-8 text-center hover:border-indigo-500/30 transition-all group relative overflow-hidden">
            <div className="w-16 h-16 bg-white/5 rounded-2xl mx-auto mb-6 flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-inner">
              <User size={24} />
            </div>
            <p className="text-white font-bold text-sm tracking-tight">{m}</p>
            <p className="text-slate-500 text-[9px] mt-2 font-black uppercase tracking-widest">Project Associate {idx + 1}</p>
          </div>
        ))}
      </div>
    </div>
  </AppLayout>
);

const FacultyDashboard = () => (
  <AppLayout activeTitle="Faculty Terminal">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {[
        { l: "Groups Guided", v: "04", c: "emerald", i: <Users/> },
        { l: "Total Students", v: "12", c: "blue", i: <User/> },
        { l: "Reviews Pending", v: "03", c: "amber", i: <Clock/> },
      ].map(s => (
        <div key={s.l} className="bg-white/5 border border-white/10 rounded-[32px] p-8 hover:bg-white/[0.08] transition-all">
          <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-slate-400 mb-6">{s.i}</div>
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1">{s.l}</p>
          <p className="text-3xl font-black text-white">{s.v}</p>
        </div>
      ))}
    </div>
  </AppLayout>
);

const EvaluateMarks = () => (
  <AppLayout activeTitle="Evaluation System">
    <div className="bg-white/5 border border-white/10 rounded-[40px] p-8 lg:p-12 shadow-2xl">
      <div className="mb-10 border-b border-white/5 pb-8">
        <h4 className="text-2xl font-black text-white mb-2 tracking-tighter uppercase">Cluster Assessment: A-12</h4>
        <p className="text-slate-500 text-xs font-bold tracking-widest uppercase opacity-60">Continuous Assessment Cycle • Semester IV</p>
      </div>
      <div className="space-y-4">
        {[
          { label: "Seminar 1 Performance", weight: "20 Marks" },
          { label: "Seminar 2 Performance", weight: "20 Marks" },
          { label: "Research Outcome (Paper/IPR)", weight: "30 Marks" },
          { label: "Overall Contribution", weight: "30 Marks" },
        ].map(mark => (
          <div key={mark.label} className="bg-white/5 border border-white/5 rounded-3xl p-6 flex flex-col md:flex-row justify-between items-center gap-6 group hover:bg-white/[0.08] transition-all">
            <div className="text-center md:text-left">
              <p className="text-white font-bold tracking-tight">{mark.label}</p>
              <p className="text-slate-600 text-[10px] font-black uppercase tracking-widest mt-1">{mark.weight}</p>
            </div>
            <div className="flex items-center gap-4">
              <input type="number" placeholder="00" className="w-24 bg-white/5 border border-white/10 rounded-xl p-4 text-center text-white focus:outline-none focus:border-indigo-500/50 font-black text-lg" />
              <button className="bg-indigo-600 text-white p-4 rounded-xl hover:bg-indigo-500 transition-all shadow-lg active:scale-95"><CheckCheck size={20}/></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </AppLayout>
);

const HODOversight = () => (
  <AppLayout activeTitle="Department Oversight">
    <div className="space-y-8">
      <div className="bg-white/5 border border-white/10 rounded-[40px] p-12 text-center relative overflow-hidden group">
        <div className="relative z-10">
          <h2 className="text-4xl font-black text-white mb-4 tracking-tighter leading-none">Global Control Node</h2>
          <p className="text-slate-500 text-sm max-w-lg mx-auto leading-relaxed font-medium">Monitoring departmental project cycles. You hold the authority to freeze evaluators and finalize official scorecards.</p>
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-amber-600/5 border border-amber-600/20 rounded-[32px] p-10 flex flex-col items-center justify-center text-center group cursor-pointer hover:bg-amber-600/15 transition-all">
          <div className="w-16 h-16 bg-amber-600/20 rounded-2xl flex items-center justify-center text-amber-500 mb-6 group-hover:rotate-12 transition-transform"><Snowflake size={32}/></div>
          <h4 className="text-xl font-black text-white mb-2 tracking-tight uppercase">Freeze All Projects</h4>
          <p className="text-slate-500 text-xs font-bold tracking-widest uppercase">System-Wide Valuation Lock</p>
        </div>
        <div className="bg-emerald-600/5 border border-emerald-600/20 rounded-[32px] p-10 flex flex-col items-center justify-center text-center group cursor-pointer hover:bg-emerald-600/15 transition-all">
          <div className="w-16 h-16 bg-emerald-600/20 rounded-2xl flex items-center justify-center text-emerald-500 mb-6 group-hover:scale-110 transition-transform"><ShieldCheck size={32}/></div>
          <h4 className="text-xl font-black text-white mb-2 tracking-tight uppercase">Verify Valuation</h4>
          <p className="text-slate-500 text-xs font-bold tracking-widest uppercase">Final Audit Authorization</p>
        </div>
      </div>
    </div>
  </AppLayout>
);

const RaiseQuery = () => (
  <AppLayout activeTitle="Communication Hub">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {[
        { target: "Incharge / Head", desc: "For administrative or project management queries.", icon: <Shield size={24}/> },
        { target: "Allotted Guide", desc: "For technical guidance or project evaluation queries.", icon: <Presentation size={24}/> },
      ].map(q => (
        <div key={q.target} className="bg-white/5 border border-white/10 rounded-[32px] p-8 hover:bg-white/[0.08] transition-all group">
          <div className="w-12 h-12 bg-indigo-600/20 rounded-2xl flex items-center justify-center text-indigo-400 mb-6 group-hover:scale-110 transition-transform">
            {q.icon}
          </div>
          <h4 className="text-xl font-bold text-white mb-2">Chat with {q.target}</h4>
          <p className="text-slate-500 text-sm mb-8 leading-relaxed font-medium">{q.desc}</p>
          <button className="flex items-center gap-2 text-indigo-400 font-black text-[10px] uppercase tracking-[0.3em] group-hover:gap-4 transition-all">
            Initiate Query <Send size={14}/>
          </button>
        </div>
      ))}
    </div>
  </AppLayout>
);

const UniversalPlaceholder = ({ title, desc }) => (
  <AppLayout activeTitle={title}>
    <div className="bg-white/5 border border-white/10 rounded-[40px] p-20 text-center border-dashed border-2 flex flex-col items-center justify-center">
      <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center text-slate-600 mb-8 border border-white/5">
        <Activity size={32} className="opacity-30 animate-pulse" />
      </div>
      <p className="text-slate-600 font-black text-xs uppercase tracking-[0.5em]">{desc}</p>
    </div>
  </AppLayout>
);

// --- MAIN ROUTER ---

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        
        {/* Admin Specific */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin-monitor" element={<AdminDashboard />} />

        {/* Student Routes */}
        <Route path="/profile" element={<StudentDashboard />} />
        <Route path="/group" element={<AllottedGroup />} />
        <Route path="/query" element={<RaiseQuery />} />
        <Route path="/status" element={<AppLayout activeTitle="Submission Status"><div className="p-20 text-center border-dashed border-2 rounded-[40px] text-slate-600 font-black tracking-widest text-xs uppercase tracking-[0.4em]">Node Sync: {studentInfo.uploadStatus}</div></AppLayout>} />

        {/* Faculty Routes */}
        <Route path="/faculty" element={<FacultyDashboard />} />
        <Route path="/faculty-groups" element={<AppLayout activeTitle="My Groups"><div className="p-20 text-center border-dashed border-2 rounded-[40px] text-slate-600 font-black tracking-widest text-xs uppercase tracking-[0.4em]">Active Clusters: Group A-12, B-03, D-11</div></AppLayout>} />
        <Route path="/evaluate" element={<EvaluateMarks />} />
        <Route path="/attendance" element={<AppLayout activeTitle="Attendance Log"><div className="p-20 text-center border-dashed border-2 rounded-[40px] text-slate-600 font-black tracking-widest text-xs uppercase tracking-[0.4em]">Security Node: Mark Student Presence</div></AppLayout>} />

        {/* HOD Routes */}
        <Route path="/hod" element={<HODOversight />} />
        <Route path="/freeze" element={<AppLayout activeTitle="Freeze Console"><div className="p-20 text-center bg-amber-600/5 rounded-[40px] text-amber-500 font-black tracking-widest text-xs uppercase tracking-[0.4em]">Authorized Access: System Lock Active</div></AppLayout>} />
        <Route path="/verify" element={<AppLayout activeTitle="Valuation Hub"><div className="p-20 text-center border-dashed border-2 rounded-[40px] text-slate-600 font-black tracking-widest text-xs uppercase tracking-[0.4em]">Valuation Audit Stream: 100% Ready</div></AppLayout>} />

        {/* Global Shared */}
        <Route path="/history" element={<AppLayout activeTitle="System Logs"><div className="p-20 text-center border-dashed border-2 rounded-[40px] text-slate-600 font-black tracking-widest text-xs uppercase tracking-[0.4em]">Immutable Transaction Audit Log</div></AppLayout>} />
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <SpeedInsights />
    </BrowserRouter>
  );
}