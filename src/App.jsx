import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';

// --- VERCEL INTEGRATION ---
// import { SpeedInsights } from "@vercel/speed-insights/react";
const SpeedInsights = () => null; 

import { 
  User, Lock, Eye, EyeOff, GraduationCap, Presentation, 
  ShieldCheck, LogOut, Loader2, LayoutDashboard,
  Files, History as HistoryIcon, UploadCloud, MessageSquare, BarChart3, Bell,
  Mail, Phone, Calendar, BookOpen, Award, Users, Building2, FileText,
  Clock, MapPin, Send, RotateCcw, Filter, CheckCheck, Trash2, Search,
  ExternalLink, ChevronDown, MoreVertical, Timer, FileCheck, Menu, X, Shield, Terminal, PieChart, Briefcase, Activity, Settings, ChevronRight, UserPlus, UserMinus, Snowflake, CheckCircle2, MessageCircle
} from 'lucide-react';

// --- MOCK DATA ---
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

// --- NAVIGATION CONFIGURATIONS BY ROLE ---
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
  Incharge: [
    { label: "Overview", icon: <PieChart size={18} />, path: "/incharge" },
    { label: "Assign Students", icon: <UserPlus size={18} />, path: "/manage" },
    { label: "Evaluation Final", icon: <FileCheck size={18} />, path: "/finalize" },
  ],
  HOD: [
    { label: "Global View", icon: <LayoutDashboard size={18} />, path: "/hod" },
    { label: "Project Freeze", icon: <Snowflake size={18} />, path: "/freeze" },
    { label: "Verify Valuation", icon: <ShieldCheck size={18} />, path: "/verify" },
  ],
  Admin: [
    { label: "Master Panel", icon: <Terminal size={18} />, path: "/admin" },
    { label: "User Control", icon: <Users size={18} />, path: "/admin" },
    { label: "Security Logs", icon: <Shield size={18} />, path: "/admin" },
  ]
};

const roleThemes = {
  Student: { color: "text-indigo-400", bg: "bg-indigo-500", grad: "from-indigo-500 to-purple-600" },
  Faculty: { color: "text-emerald-400", bg: "bg-emerald-500", grad: "from-emerald-500 to-teal-600" },
  Incharge: { color: "text-blue-400", bg: "bg-blue-500", grad: "from-blue-500 to-indigo-600" },
  HOD: { color: "text-amber-400", bg: "bg-amber-500", grad: "from-amber-500 to-orange-600" },
  Admin: { color: "text-rose-400", bg: "bg-rose-500", grad: "from-rose-500 to-red-600" },
};

// --- ANIMATION CONFIG ---
const spring = { type: "spring", stiffness: 300, damping: 30 };

// --- LAYOUT COMPONENT ---
const AppLayout = ({ children, activeTitle }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const role = localStorage.getItem('userRole') || 'Student';
  const theme = roleThemes[role];
  const items = navConfigs[role];

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
        <nav className="flex-1 px-4 py-2 space-y-1 overflow-y-auto">
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
              <p className={`text-[10px] font-black uppercase tracking-[0.3em] mt-2 ${theme.color}`}>{role} Environment</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="h-11 w-11 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400"><Bell size={18} /></div>
            <div className={`h-11 w-11 rounded-2xl bg-gradient-to-br ${theme.grad} flex items-center justify-center text-white font-black text-sm shadow-xl`}>{role === 'Student' ? studentInfo.name[0] : role[0]}</div>
          </div>
        </header>
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="flex-1">{children}</motion.div>
        <footer className="mt-12 lg:mt-20 pt-8 border-t border-white/5 text-center text-slate-700 text-[9px] font-black uppercase tracking-[0.4em]">AuthenFlow v4.3.0 • Enterprise Project Logic</footer>
      </main>
    </div>
  );
};

// --- LOGIN PAGE ---
const LoginPage = () => {
  const navigate = useNavigate();
  const [activeRole, setActiveRole] = useState("Student");
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    const creds = dummyCredentials[activeRole];
    if (user === creds.username && pass === creds.password) {
      setLoading(true);
      await new Promise(r => setTimeout(r, 1000));
      localStorage.setItem('userRole', activeRole);
      navigate(creds.path);
    } else { setError(`Invalid ${activeRole} credentials.`); }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#020617] p-4 relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-purple-600/10 blur-[120px] rounded-full" />
      <motion.div initial={{ opacity: 0, scale: 0.9, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} className="relative z-10 w-full max-w-[420px]">
        <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[40px] p-8 lg:p-12 shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-3xl font-black italic shadow-2xl mx-auto mb-4">AF</div>
            <h1 className="text-white text-3xl font-black tracking-tighter">AuthenFlow</h1>
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] mt-2">Centralized Authority Portal</p>
          </div>
          <div className="grid grid-cols-2 bg-white/5 p-1 rounded-2xl gap-1 mb-8 overflow-hidden">
            {Object.keys(navConfigs).map(r => (
              <button key={r} onClick={() => setActiveRole(r)} className={`relative py-3 rounded-xl transition-all flex flex-col items-center gap-1 ${activeRole === r ? "text-white" : "text-slate-500 hover:text-slate-300"}`}>
                {activeRole === r && <motion.div layoutId="roleIndicator" transition={spring} className="absolute inset-0 bg-indigo-600 rounded-xl shadow-lg shadow-indigo-600/30" />}
                <span className="relative z-10 text-[9px] font-black uppercase tracking-widest">{r}</span>
              </button>
            ))}
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            {error && <p className="text-red-400 text-[10px] font-bold text-center bg-red-400/10 p-2 rounded-xl">{error}</p>}
            <input type="text" placeholder="Username" value={user} onChange={e => setUser(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-indigo-500/50 text-sm" />
            <input type="password" placeholder="Password" value={pass} onChange={e => setPass(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-indigo-500/50 text-sm" />
            <button type="submit" className="w-full bg-indigo-600 text-white font-black py-4.5 rounded-2xl shadow-xl flex items-center justify-center gap-2">
              {loading ? <Loader2 className="animate-spin" size={18}/> : <>Access Terminal <ChevronRight size={16}/></>}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

// --- ROLE-SPECIFIC COMPONENTS ---

// 1. STUDENT DASHBOARD & VIEWS
const StudentDashboard = () => (
  <AppLayout activeTitle="Dashboard">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-[32px] p-8 shadow-2xl relative overflow-hidden group">
        <div className="relative z-10 flex flex-col sm:flex-row items-center gap-8 text-center sm:text-left">
          <div className="w-24 h-24 rounded-3xl bg-white/20 backdrop-blur-md border-2 border-white/30 flex items-center justify-center text-4xl font-black text-white">{studentInfo.name[0]}</div>
          <div>
            <h2 className="text-3xl font-black text-white tracking-tighter">{studentInfo.name}</h2>
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
          <h3 className="text-2xl font-bold text-white mb-1">Group {studentInfo.group}</h3>
          <p className="text-slate-500 text-xs tracking-wide">Guide: <span className="text-indigo-400 font-bold">{studentInfo.guide}</span></p>
        </div>
        <div className="bg-indigo-500/10 border border-indigo-500/20 px-6 py-3 rounded-2xl text-indigo-400 font-bold text-xs uppercase tracking-widest">Team Size: 3 Members</div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {studentInfo.members.map((m, idx) => (
          <div key={m} className="bg-white/5 border border-white/10 rounded-3xl p-6 text-center hover:border-indigo-500/30 transition-all group">
            <div className="w-16 h-16 bg-white/5 rounded-2xl mx-auto mb-4 flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all">
              <User size={24} />
            </div>
            <p className="text-white font-bold">{m}</p>
            <p className="text-slate-500 text-[10px] mt-1">Project Associate {idx + 1}</p>
          </div>
        ))}
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
          <p className="text-slate-500 text-sm mb-8 leading-relaxed">{q.desc}</p>
          <button className="flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-[0.2em] group-hover:gap-4 transition-all">
            Initiate Query <Send size={14}/>
          </button>
        </div>
      ))}
    </div>
  </AppLayout>
);

// 2. FACULTY / GUIDE VIEWS
const FacultyDashboard = () => (
  <AppLayout activeTitle="Faculty Terminal">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {[
        { l: "Groups Guided", v: "04", c: "emerald", i: <Users/> },
        { l: "Total Students", v: "12", c: "blue", i: <User/> },
        { l: "Reviews Pending", v: "03", c: "amber", i: <Clock/> },
      ].map(s => (
        <div key={s.l} className="bg-white/5 border border-white/10 rounded-[32px] p-8">
          <div className={`w-12 h-12 bg-${s.c}-500/10 rounded-2xl flex items-center justify-center text-${s.c}-400 mb-6`}>{s.i}</div>
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1">{s.l}</p>
          <p className="text-3xl font-black text-white">{s.v}</p>
        </div>
      ))}
    </div>
    <div className="bg-white/5 border border-white/10 rounded-[40px] p-8 text-center border-dashed border-2">
       <p className="text-slate-600 font-black text-xs uppercase tracking-[0.3em]">Quick Nav: Marks Entry • Attendance Stream • Group Logs</p>
    </div>
  </AppLayout>
);

const EvaluateMarks = () => (
  <AppLayout activeTitle="Evaluation System">
    <div className="bg-white/5 border border-white/10 rounded-[40px] p-8 lg:p-12">
      <div className="mb-10">
        <h4 className="text-xl font-bold text-white mb-1">Marking Scheme: A-12</h4>
        <p className="text-slate-500 text-xs">Assign continuous assessment marks for the current semester.</p>
      </div>
      <div className="space-y-6">
        {[
          { label: "Seminar 1 Performance", weight: "20 Marks" },
          { label: "Seminar 2 Performance", weight: "20 Marks" },
          { label: "Research Outcome (Paper/IPR)", weight: "30 Marks" },
          { label: "Overall Contribution", weight: "30 Marks" },
        ].map(mark => (
          <div key={mark.label} className="bg-white/5 border border-white/5 rounded-3xl p-6 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <p className="text-white font-bold">{mark.label}</p>
              <p className="text-slate-600 text-[10px] font-bold uppercase tracking-widest">{mark.weight}</p>
            </div>
            <div className="flex items-center gap-4">
              <input type="number" placeholder="00" className="w-20 bg-white/5 border border-white/10 rounded-xl p-3 text-center text-white focus:outline-none focus:border-emerald-500" />
              <button className="bg-emerald-600 text-white p-3 rounded-xl hover:bg-emerald-500 transition-all"><CheckCheck size={18}/></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </AppLayout>
);

// 3. INCHARGE / HOD / ADMIN PLACEHOLDERS (STRUCTURED)
const ManageStudents = () => (
  <AppLayout activeTitle="Student Management">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-blue-600 rounded-[32px] p-8 text-white flex flex-col items-center justify-center text-center shadow-xl group cursor-pointer">
        <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"><UserPlus size={24}/></div>
        <h4 className="text-xl font-black italic">Assign Roll No</h4>
        <p className="text-blue-100 text-xs mt-2 font-bold uppercase tracking-widest opacity-70">Bulk Processing</p>
      </div>
      <div className="bg-white/5 border border-white/10 rounded-[32px] p-8 flex flex-col items-center justify-center text-center hover:bg-white/[0.08] transition-all cursor-pointer">
        <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-6"><UserPlus size={24}/></div>
        <h4 className="text-white font-bold">Allocate Groups</h4>
        <p className="text-slate-500 text-[10px] mt-1 font-bold">Map Students to Guides</p>
      </div>
      <div className="bg-white/5 border border-white/10 rounded-[32px] p-8 flex flex-col items-center justify-center text-center hover:bg-white/[0.08] transition-all cursor-pointer">
        <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-6 text-rose-400"><UserMinus size={24}/></div>
        <h4 className="text-white font-bold">Remove Student</h4>
        <p className="text-slate-500 text-[10px] mt-1 font-bold">Revoke Access Node</p>
      </div>
    </div>
  </AppLayout>
);

const HODOversight = () => (
  <AppLayout activeTitle="Department Oversight">
    <div className="space-y-8">
      <div className="bg-white/5 border border-white/10 rounded-[40px] p-12 text-center relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-4xl font-black text-white mb-4 tracking-tighter">Department Control Unit</h2>
          <p className="text-slate-500 text-sm max-w-lg mx-auto leading-relaxed">View all student clusters, faculty assignments, and overall department performance. You have the authority to freeze evaluation logs.</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-amber-600/10 border border-amber-600/20 rounded-[32px] p-8 flex flex-col items-center justify-center text-center group cursor-pointer hover:bg-amber-600/20 transition-all">
          <div className="w-16 h-16 bg-amber-600/20 rounded-2xl flex items-center justify-center text-amber-500 mb-6 group-hover:rotate-12 transition-transform"><Snowflake size={32}/></div>
          <h4 className="text-xl font-bold text-white mb-2 tracking-tight uppercase">Freeze All Projects</h4>
          <p className="text-slate-500 text-xs">Lock valuation for current term</p>
        </div>
        <div className="bg-emerald-600/10 border border-emerald-600/20 rounded-[32px] p-8 flex flex-col items-center justify-center text-center group cursor-pointer hover:bg-emerald-600/20 transition-all">
          <div className="w-16 h-16 bg-emerald-600/20 rounded-2xl flex items-center justify-center text-emerald-500 mb-6 group-hover:scale-110 transition-transform"><ShieldCheck size={32}/></div>
          <h4 className="text-xl font-bold text-white mb-2 tracking-tight uppercase">Verify Valuation</h4>
          <p className="text-slate-500 text-xs">Final approval of faculty marks</p>
        </div>
      </div>
    </div>
  </AppLayout>
);

// --- MAIN ROUTER ---

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        
        {/* Student Routes */}
        <Route path="/profile" element={<StudentDashboard />} />
        <Route path="/group" element={<AllottedGroup />} />
        <Route path="/query" element={<RaiseQuery />} />
        <Route path="/status" element={<AppLayout activeTitle="Submission Status"><div className="p-20 text-center border-dashed border-2 rounded-[40px] text-slate-600 font-black tracking-widest text-xs">LOGGED: {studentInfo.uploadStatus}</div></AppLayout>} />

        {/* Faculty Routes */}
        <Route path="/faculty" element={<FacultyDashboard />} />
        <Route path="/faculty-groups" element={<AppLayout activeTitle="My Groups"><div className="p-20 text-center border-dashed border-2 rounded-[40px] text-slate-600 font-black tracking-widest text-xs">ACTIVE: Group A-12, B-03, D-11</div></AppLayout>} />
        <Route path="/evaluate" element={<EvaluateMarks />} />
        <Route path="/attendance" element={<AppLayout activeTitle="Attendance Log"><div className="p-20 text-center border-dashed border-2 rounded-[40px] text-slate-600 font-black tracking-widest text-xs">SYSTEM: Stream Live • Mark Presence</div></AppLayout>} />

        {/* Incharge Routes */}
        <Route path="/incharge" element={<AppLayout activeTitle="Incharge View"><div className="p-20 text-center border-dashed border-2 rounded-[40px] text-slate-600 font-black tracking-widest text-xs">ADMIN: Department Cluster Online</div></AppLayout>} />
        <Route path="/manage" element={<ManageStudents />} />
        <Route path="/finalize" element={<AppLayout activeTitle="Finalize Evaluation"><div className="p-20 text-center border-dashed border-2 rounded-[40px] text-slate-600 font-black tracking-widest text-xs">PHASE: Final Review Cycle Active</div></AppLayout>} />

        {/* HOD Routes */}
        <Route path="/hod" element={<HODOversight />} />
        <Route path="/freeze" element={<AppLayout activeTitle="Freeze Console"><div className="p-20 text-center bg-amber-600/5 rounded-[40px] text-amber-500 font-black tracking-widest text-xs">DANGER ZONE: System Lock Access</div></AppLayout>} />
        <Route path="/verify" element={<AppLayout activeTitle="Valuation Hub"><div className="p-20 text-center border-dashed border-2 rounded-[40px] text-slate-600 font-black tracking-widest text-xs">AUDIT: Awaiting Faculty Submission</div></AppLayout>} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AppLayout activeTitle="Master Panel"><div className="p-20 text-center border-dashed border-2 rounded-[40px] text-slate-600 font-black tracking-widest text-xs">ROOT: Total System Control</div></AppLayout>} />
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <SpeedInsights />
    </BrowserRouter>
  );
}