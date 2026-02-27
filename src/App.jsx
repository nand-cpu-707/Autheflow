import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Lock, Eye, EyeOff, GraduationCap, Presentation, 
  ShieldCheck, LogOut, Loader2, LayoutDashboard,
  Files, History as HistoryIcon, UploadCloud, MessageSquare, BarChart3, Bell,
  Award, BookOpen, Users, Settings, Activity, PieChart, Shield, Terminal,
  Building2, Briefcase, Clock, CheckCheck, Filter, Search, Trash2, Send,
  RotateCcw, FileText, CheckCircle2, AlertTriangle, Info, FileUp, ExternalLink,
  ChevronDown, MoreVertical, Timer, FileCheck
} from 'lucide-react';
import { SpeedInsights } from '@vercel/speed-insights/react';

// --- SHARED DATA ---
const studentData = {
  name: "Anandhu Sebastian",
  uid: "24004048",
  department: "CSE (CYBER SECURITY)",
  email: "anandhuseban@gmail.com",
  mobile: "8330869045",
  guide: "Neha Zade",
  rollNo: "44",
  semester: "Semester IV",
  group: "Group A",
  projectTitle: "AuthenFlow – Role-Based Project Management System",
};

// --- UPDATED CREDENTIALS CONFIGURATION ---
const dummyCredentials = {
  Student: { username: "student", password: "stu@123" },
  Faculty: { username: "faculty", password: "fac@123" },
  HOD: { username: "hod", password: "hod@123" },
  Admin: { username: "admin", password: "admin@123" },
};

// --- NAVIGATION CONFIGURATIONS BY ROLE ---
const navConfigs = {
  Student: [
    { label: "Dashboard", icon: <LayoutDashboard size={18} />, path: "/dashboard" },
    { label: "My Profile", icon: <User size={18} />, path: "/profile" },
    { label: "My Submissions", icon: <Files size={18} />, path: "/submit" },
    { label: "Submission History", icon: <HistoryIcon size={18} />, path: "/history" },
    { label: "Request Review", icon: <MessageSquare size={18} />, path: "/review" },
    { label: "Results & Marks", icon: <BarChart3 size={18} />, path: "/results" },
    { label: "Notifications", icon: <Bell size={18} />, path: "/notifications" },
  ],
  Faculty: [
    { label: "Faculty Home", icon: <LayoutDashboard size={18} />, path: "/faculty" },
    { label: "Student Projects", icon: <Briefcase size={18} />, path: "/faculty" },
    { label: "Pending Reviews", icon: <Clock size={18} />, path: "/faculty" },
    { label: "Verification Log", icon: <CheckCheck size={18} />, path: "/history" },
    { label: "Notifications", icon: <Bell size={18} />, path: "/notifications" },
  ],
  HOD: [
    { label: "HOD Console", icon: <Building2 size={18} />, path: "/hod" },
    { label: "Dept Overview", icon: <PieChart size={18} />, path: "/hod" },
    { label: "Faculty Records", icon: <Users size={18} />, path: "/hod" },
    { label: "Global History", icon: <HistoryIcon size={18} />, path: "/history" },
    { label: "Notifications", icon: <Bell size={18} />, path: "/notifications" },
  ],
  Admin: [
    { label: "Admin Panel", icon: <Shield size={18} />, path: "/admin" },
    { label: "User Management", icon: <Users size={18} />, path: "/admin" },
    { label: "System Health", icon: <Activity size={18} />, path: "/admin" },
    { label: "Config Settings", icon: <Settings size={18} />, path: "/admin" },
    { label: "Global Logs", icon: <HistoryIcon size={18} />, path: "/history" },
    { label: "Notifications", icon: <Bell size={18} />, path: "/notifications" },
  ]
};

const roleThemes = {
  Student: { color: "text-indigo-400", gradient: "from-indigo-500 to-purple-600", icon: <GraduationCap size={20} /> },
  Faculty: { color: "text-emerald-400", gradient: "from-emerald-500 to-teal-600", icon: <Presentation size={20} /> },
  HOD: { color: "text-amber-400", gradient: "from-amber-500 to-orange-600", icon: <Building2 size={20} /> },
  Admin: { color: "text-rose-400", gradient: "from-rose-500 to-red-600", icon: <ShieldCheck size={20} /> },
};

// --- DYNAMIC LAYOUT WRAPPER ---
const AppLayout = ({ children, activeTitle }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const role = localStorage.getItem('userRole') || 'Student';
  const theme = roleThemes[role];
  const items = navConfigs[role];

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    navigate("/");
  };

  return (
    <div className="flex min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-indigo-500/30">
      <aside className="fixed left-0 top-0 h-screen w-72 bg-white/[0.02] backdrop-blur-3xl border-r border-white/5 z-50 flex flex-col">
        <div className="p-8 flex items-center gap-4">
          <div className={`w-10 h-10 bg-gradient-to-br ${theme.gradient} rounded-xl flex items-center justify-center text-white shadow-lg`}>
            {theme.icon}
          </div>
          <span className="text-white font-bold text-xl tracking-tight">AuthenFlow</span>
        </div>

        <nav className="flex-1 px-4 py-2 space-y-1 overflow-y-auto">
          {items.map((item) => (
            <Link key={item.label} to={item.path} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 relative group ${location.pathname === item.path ? "text-white" : "text-slate-500 hover:text-slate-300 hover:bg-white/5"}`}>
              {location.pathname === item.path && (
                <motion.div layoutId={`navActive-${role}`} className={`absolute inset-0 bg-gradient-to-r ${theme.gradient} rounded-xl shadow-lg`} />
              )}
              <span className="relative z-10">{item.icon}</span>
              <span className="relative z-10 text-sm font-semibold">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="p-6">
          <div className="bg-white/5 border border-white/5 rounded-2xl p-4 flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${theme.gradient} flex items-center justify-center text-white font-bold text-sm border-2 border-white/10`}>
              {role[0]}
            </div>
            <div className="min-w-0">
              <p className="text-white text-xs font-bold truncate">{role} Portal</p>
              <p className="text-slate-500 text-[10px] truncate">{role === 'Student' ? studentData.name : 'System User'}</p>
            </div>
          </div>
        </div>
      </aside>

      <main className="ml-72 flex-1 p-10 relative">
        <header className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">{activeTitle}</h1>
            <p className="text-slate-500 text-sm mt-1"><span className={`${theme.color} font-bold uppercase tracking-wider`}>{role} Interface</span> • Management System</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-slate-400 hover:text-white transition-all">
              <Bell size={20} />
              <span className={`absolute top-3 right-3 w-2 h-2 rounded-full border-2 border-[#020617] ${theme.color.replace('text-', 'bg-')}`} />
            </button>
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleLogout} className="bg-white/5 border border-white/10 text-slate-300 px-6 py-3 rounded-2xl flex items-center gap-2 text-sm font-bold hover:bg-red-500/10 hover:text-red-400 transition-all">
              <LogOut size={18} /> Logout
            </motion.button>
          </div>
        </header>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          {children}
        </motion.div>
      </main>
    </div>
  );
};

// --- LOGIN PAGE ---
const LoginPage = () => {
  const navigate = useNavigate();
  const [activeRole, setActiveRole] = useState("Student");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const roles = [
    { id: "Student", icon: <GraduationCap size={18} />, path: "/dashboard" },
    { id: "Faculty", icon: <Presentation size={18} />, path: "/faculty" },
    { id: "HOD", icon: <Building2 size={18} />, path: "/hod" },
    { id: "Admin", icon: <ShieldCheck size={18} />, path: "/admin" },
  ];

  const handleLogin = async () => {
    setError("");
    const creds = dummyCredentials[activeRole];
    
    if (username === creds.username && password === creds.password) {
      setIsLoggingIn(true);
      localStorage.setItem('userRole', activeRole);
      await new Promise(r => setTimeout(r, 800));
      const roleObj = roles.find(r => r.id === activeRole);
      navigate(roleObj.path);
    } else {
      setError(`Invalid ${activeRole} credentials.`);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#020617] relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-600/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-600/10 blur-[120px] rounded-full" />
      
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 w-full max-w-[440px] px-6">
        <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[32px] p-10 shadow-2xl">
          <div className="flex flex-col items-center mb-10">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-3xl font-black italic shadow-lg mb-4">AF</div>
            <h1 className="text-white text-3xl font-bold tracking-tight text-center font-sans">AuthenFlow</h1>
            <p className="text-indigo-400 text-xs font-bold uppercase tracking-[0.3em] mt-1 text-center">Secure Multi-Role Access</p>
          </div>
          
          <div className="flex bg-white/5 p-1 rounded-2xl gap-1 mb-8">
            {roles.map((r) => (
              <button key={r.id} onClick={() => { setActiveRole(r.id); setError(""); }} className={`flex-1 py-3 rounded-xl transition-all relative flex flex-col items-center gap-1 ${activeRole === r.id ? "text-white" : "text-slate-500"}`}>
                {activeRole === r.id && <motion.div layoutId="roleActive" className="absolute inset-0 bg-indigo-600 rounded-xl" />}
                <span className="relative z-10">{r.icon}</span>
                <span className="relative z-10 text-[10px] font-bold">{r.id}</span>
              </button>
            ))}
          </div>

          <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }} className="space-y-4">
            {error && <p className="text-red-400 text-xs font-bold text-center bg-red-400/10 p-2 rounded-lg">{error}</p>}
            <div className="relative group">
               <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors" size={18} />
               <input type="text" placeholder={`${activeRole} Username`} value={username} onChange={e => setUsername(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 pl-12 text-white focus:outline-none focus:border-indigo-500" />
            </div>
            <div className="relative group">
               <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors" size={18} />
               <input type={showPass ? "text" : "password"} placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 pl-12 text-white focus:outline-none focus:border-indigo-500" />
               <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors">{showPass ? <EyeOff size={18} /> : <Eye size={18} />}</button>
            </div>
            <motion.button type="submit" whileTap={{ scale: 0.98 }} className="w-full bg-indigo-600 text-white font-bold py-4 rounded-2xl shadow-xl flex items-center justify-center gap-2">
              {isLoggingIn ? <Loader2 className="animate-spin" size={20}/> : "Secure Login"}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

// --- PAGE COMPONENTS ---

const StudentDashboard = () => (
  <AppLayout activeTitle="Student Dashboard">
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
      <div className="lg:col-span-2 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-[32px] p-10 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[80px] rounded-full -mr-20 -mt-20" />
        <h2 className="text-3xl font-black mb-2">Welcome back, {studentData.name.split(' ')[0]}!</h2>
        <p className="text-indigo-100 text-sm mb-8 opacity-80">You have 2 pending tasks for the system implementation phase.</p>
        <div className="flex gap-4">
          <Link to="/submit" className="bg-white text-indigo-600 px-6 py-3 rounded-2xl font-bold text-sm shadow-xl">New Submission</Link>
          <Link to="/history" className="bg-indigo-500/20 border border-white/20 text-white px-6 py-3 rounded-2xl font-bold text-sm">View History</Link>
        </div>
      </div>
      <div className="bg-white/5 border border-white/10 rounded-[32px] p-8 flex flex-col justify-between">
        <div className="flex justify-between items-center mb-4">
          <p className="text-slate-500 text-xs font-bold uppercase">Overall Progress</p>
          <BarChart3 className="text-indigo-400" size={18} />
        </div>
        <div>
          <p className="text-4xl font-black text-white">85%</p>
          <div className="w-full bg-white/5 h-2 rounded-full mt-4 overflow-hidden"><div className="w-[85%] h-full bg-indigo-500" /></div>
        </div>
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
       {[ {l:"Submissions", v:"05"}, {l:"Verified", v:"03"}, {l:"Guides Alerts", v:"01"} ].map(s => (
         <div key={s.l} className="bg-white/5 border border-white/10 rounded-[28px] p-6">
           <p className="text-slate-500 text-xs font-bold uppercase mb-1">{s.l}</p>
           <p className="text-3xl font-black text-white">{s.v}</p>
         </div>
       ))}
    </div>
  </AppLayout>
);

const StudentProfile = () => (
  <AppLayout activeTitle="My Profile">
    <div className="relative bg-gradient-to-r from-indigo-600 to-purple-600 rounded-[32px] p-10 mb-10 shadow-2xl overflow-hidden">
      <div className="relative flex flex-col md:flex-row items-center gap-8">
        <div className="w-32 h-32 rounded-[40px] bg-white/20 backdrop-blur-md border-4 border-white/30 flex items-center justify-center text-5xl font-black text-white">{studentData.name[0]}</div>
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-4xl font-black text-white mb-2">{studentData.name}</h2>
          <div className="flex flex-wrap gap-4 text-indigo-100/80 text-sm font-medium justify-center md:justify-start">
             <span className="flex items-center gap-2"><Award size={16}/> {studentData.department}</span>
             <span className="flex items-center gap-2"><ShieldCheck size={16}/> UID: {studentData.uid}</span>
             <span className="flex items-center gap-2"><Users size={16}/> Guide: {studentData.guide}</span>
          </div>
        </div>
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-white/5 border border-white/10 rounded-[32px] p-8">
        <h3 className="text-white font-bold mb-6 flex items-center gap-2 text-lg"><User size={20} className="text-indigo-400"/> Personal Records</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center p-4 bg-white/5 rounded-2xl"><span className="text-slate-500 text-xs font-bold uppercase">Email</span><span className="text-white font-bold">{studentData.email}</span></div>
          <div className="flex justify-between items-center p-4 bg-white/5 rounded-2xl"><span className="text-slate-500 text-xs font-bold uppercase">Semester</span><span className="text-white font-bold">{studentData.semester}</span></div>
        </div>
      </div>
      <div className="bg-white/5 border border-white/10 rounded-[32px] p-8 flex flex-col items-center justify-center border-dashed border-2 border-white/5">
        <h4 className="text-white font-bold mb-2 uppercase tracking-widest text-xs">Project Status</h4>
        <p className="text-indigo-400 text-3xl font-black">85% Complete</p>
      </div>
    </div>
  </AppLayout>
);

const StudentSubmissions = () => (
  <AppLayout activeTitle="My Submissions">
    <div className="bg-white/5 border border-white/10 rounded-[32px] p-10 mb-8 relative overflow-hidden">
      <div className="relative z-10 flex flex-col items-center justify-center py-20 border-2 border-dashed border-white/10 rounded-[28px] group hover:border-indigo-500/50 transition-all cursor-pointer">
         <div className="w-16 h-16 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-400 mb-4 group-hover:scale-110 transition-transform">
           <UploadCloud size={32} />
         </div>
         <h3 className="text-white font-bold text-lg">Click to upload document</h3>
         <p className="text-slate-500 text-sm mt-1 uppercase tracking-widest font-black">PDF, DOCX, ZIP (MAX 15MB)</p>
         <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" />
      </div>
    </div>
    <div className="bg-white/5 border border-white/10 rounded-[32px] overflow-hidden">
      <div className="p-8 border-b border-white/5"><h3 className="text-white font-bold">Recent Uploads</h3></div>
      <div className="p-8 text-center text-slate-500 italic text-sm">No recent uploads in the last 24 hours.</div>
    </div>
  </AppLayout>
);

const SubmissionHistory = () => (
  <AppLayout activeTitle="Submission History">
    <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[32px] overflow-hidden shadow-2xl">
      <div className="p-8 border-b border-white/5 flex items-center justify-between">
        <h3 className="text-white font-bold flex items-center gap-3"><HistoryIcon size={18} className="text-indigo-400" /> Full Audit Trail</h3>
        <button className="text-xs font-bold text-indigo-400 hover:underline">Download PDF</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead><tr className="bg-white/[0.02] border-b border-white/5">{["Date", "Type", "Status", "Guide"].map(h => <th key={h} className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest">{h}</th>)}</tr></thead>
          <tbody className="divide-y divide-white/5">
            {[{ d: "10 Feb 2026", t: "Synopsis", s: "Verified" }, { d: "15 Feb 2026", t: "Literature", s: "Pending" }].map((row, i) => (
              <tr key={i} className="hover:bg-white/[0.03] transition-colors">
                <td className="px-8 py-6 text-sm text-slate-300">{row.d}</td>
                <td className="px-8 py-6"><span className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-3 py-1 rounded-lg text-[10px] font-black uppercase">{row.t}</span></td>
                <td className="px-8 py-6"><span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${row.s === 'Verified' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'}`}>{row.s}</span></td>
                <td className="px-8 py-6 text-sm text-slate-400 font-semibold">{studentData.guide}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </AppLayout>
);

const ResultsMarks = () => (
  <AppLayout activeTitle="Results & Marks">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {[ {l:"Synopsis", m:"18/20"}, {l:"Internal-I", m:"23/25"}, {l:"Mid-Term", m:"42/50"}, {l:"VIVA", m:"Pending"} ].map(m => (
        <div key={m.l} className="bg-white/5 border border-white/10 rounded-[28px] p-8 text-center">
           <p className="text-slate-500 text-[10px] font-black uppercase mb-1">{m.l}</p>
           <p className={`text-2xl font-black ${m.m === 'Pending' ? 'text-amber-400' : 'text-white'}`}>{m.m}</p>
        </div>
      ))}
    </div>
    <div className="bg-white/5 border border-white/10 rounded-[32px] p-8">
      <h3 className="text-white font-bold mb-6">Evaluation Remarks</h3>
      <p className="text-slate-500 text-sm leading-relaxed italic border-l-4 border-indigo-500 pl-6">"Implementation logic for role-based access is well executed. Focus on optimizing the database queries for HOD dashboard in the final phase." — Neha Zade</p>
    </div>
  </AppLayout>
);

const RequestReview = () => {
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (e) => { e.preventDefault(); setSubmitted(true); };
  return (
    <AppLayout activeTitle="Request Review">
      {submitted ? (
        <motion.div initial={{opacity:0, scale:0.95}} animate={{opacity:1, scale:1}} className="p-20 text-center bg-emerald-500/10 border border-emerald-500/20 rounded-[32px]">
           <CheckCircle2 className="mx-auto text-emerald-400 mb-4" size={48} />
           <h3 className="text-white font-bold text-xl">Review Request Sent!</h3>
           <p className="text-slate-500 text-sm mt-2">Neha Zade has been notified of your request.</p>
           <button onClick={()=>setSubmitted(false)} className="mt-8 bg-emerald-600 text-white px-8 py-3 rounded-2xl font-bold">New Request</button>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white/5 border border-white/10 rounded-[32px] p-10 max-w-2xl mx-auto shadow-2xl">
          <div className="space-y-6">
            <div><label className="text-[10px] uppercase font-black text-slate-500 mb-2 block">Project Title</label><input type="text" defaultValue={studentData.projectTitle} readOnly className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-slate-400" /></div>
            <div><label className="text-[10px] uppercase font-black text-slate-500 mb-2 block">Review Objective</label><select className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white appearance-none"><option>Milestone Verification</option><option>UI/UX Design Check</option><option>Logic Debugging</option></select></div>
            <div><label className="text-[10px] uppercase font-black text-slate-500 mb-2 block">Description</label><textarea placeholder="What do you need the guide to look at?" className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white h-32" /></div>
            <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-4 rounded-2xl shadow-xl shadow-indigo-600/20">Send Application</button>
          </div>
        </form>
      )}
    </AppLayout>
  );
};

const Notifications = () => (
  <AppLayout activeTitle="Notifications">
    <div className="space-y-4">
      {[ {t:"Document Verified", m:"Your Project Proposal has been verified by Mrs Neha Zade.", c:"Review"}, {t:"New Announcement", m:"Mid-term evaluations start from March 1st.", c:"System"} ].map((n, i) => (
        <motion.div key={i} initial={{opacity:0, x:-20}} animate={{opacity:1, x:0}} transition={{delay: i*0.1}} className="bg-white/5 border border-white/10 rounded-[28px] p-6 hover:bg-white/[0.08] transition-all cursor-pointer">
           <div className="flex gap-4">
             <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400"><Bell size={20} /></div>
             <div>
               <div className="flex items-center gap-3 mb-1"><h4 className="text-white font-bold">{n.t}</h4><span className="text-[10px] uppercase font-black text-indigo-400 tracking-widest">{n.c}</span></div>
               <p className="text-slate-400 text-sm leading-relaxed">{n.m}</p>
               <p className="text-[10px] font-bold text-slate-600 mt-2">Today, 09:15 AM</p>
             </div>
           </div>
        </motion.div>
      ))}
    </div>
  </AppLayout>
);

const FacultyDashboard = () => (
  <AppLayout activeTitle="Faculty Control Center">
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
      <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-[32px] p-8">
        <h3 className="text-white font-bold mb-6 flex items-center gap-2 text-lg"><Clock size={20} className="text-emerald-400"/> Awaiting Verification</h3>
        <div className="space-y-4">
          {[1, 2].map(i => (
            <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold">B</div>
                <div><p className="text-white text-sm font-bold">Batch 2024-S{i}</p><p className="text-slate-500 text-[10px]">Project review pending</p></div>
              </div>
              <button className="bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-black uppercase px-4 py-2 rounded-lg transition-all">Verify</button>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-gradient-to-br from-emerald-600 to-teal-600 rounded-[32px] p-8 flex flex-col justify-between">
        <h3 className="text-white font-bold text-lg mb-2">Guide Performance</h3>
        <div className="space-y-3">
          <div className="flex justify-between text-xs font-bold text-white"><span>Accuracy</span><span>92%</span></div>
          <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden"><div className="w-[92%] h-full bg-white" /></div>
        </div>
      </div>
    </div>
  </AppLayout>
);

const HODDashboard = () => (
  <AppLayout activeTitle="HOD Administration">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {[ { l: "Total Projects", v: "42" }, { l: "Verified", v: "28" }, { l: "Alerts", v: "03" } ].map(s => (
        <div key={s.l} className="bg-white/5 border border-white/10 p-8 rounded-[32px]">
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">{s.l}</p>
          <p className="text-4xl font-black text-white">{s.v}</p>
        </div>
      ))}
    </div>
    <div className="bg-white/5 border border-white/10 rounded-[32px] p-8">
      <h3 className="text-white font-bold mb-6 text-lg flex items-center gap-2"><PieChart size={20} className="text-amber-400"/> Departmental Stats</h3>
      <div className="p-10 border-2 border-dashed border-white/5 rounded-2xl text-center text-slate-500 font-bold uppercase tracking-widest text-xs">Analytics Visualization Hub</div>
    </div>
  </AppLayout>
);

const AdminDashboard = () => (
  <AppLayout activeTitle="System Root Control">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="bg-white/5 border border-white/10 rounded-[32px] p-8">
        <h3 className="text-white font-bold mb-6 flex items-center gap-2 text-lg"><Shield size={20} className="text-rose-400"/> Security Firewall</h3>
        <div className="grid grid-cols-2 gap-4">
           <div className="p-4 bg-white/5 rounded-2xl border border-white/5 text-center">
             <p className="text-rose-400 text-2xl font-black">2.4k</p>
             <p className="text-slate-500 text-[10px] uppercase font-bold">Threats Blocked</p>
           </div>
           <div className="p-4 bg-white/5 rounded-2xl border border-white/5 text-center">
             <p className="text-emerald-400 text-2xl font-black">99.9%</p>
             <p className="text-slate-500 text-[10px] uppercase font-bold">Uptime</p>
           </div>
        </div>
      </div>
      <div className="bg-white/5 border border-white/10 rounded-[32px] p-8">
        <h3 className="text-white font-bold mb-6 text-lg flex items-center gap-2"><Terminal size={20} className="text-rose-400"/> Console Logs</h3>
        <div className="font-mono text-[10px] text-slate-500 space-y-1">
          <p><span className="text-emerald-500">[OK]</span> Connection established to AuthenFlow Node</p>
          <p><span className="text-rose-500">[ERR]</span> Blocked unauthorized API access attempt</p>
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
        
        {/* Dashboards */}
        <Route path="/dashboard" element={<StudentDashboard />} />
        <Route path="/faculty" element={<FacultyDashboard />} />
        <Route path="/hod" element={<HODDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        
        {/* Unique Student Functional Routes */}
        <Route path="/profile" element={<StudentProfile />} />
        <Route path="/submit" element={<StudentSubmissions />} />
        <Route path="/history" element={<SubmissionHistory />} />
        <Route path="/results" element={<ResultsMarks />} />
        <Route path="/review" element={<RequestReview />} />
        <Route path="/notifications" element={<Notifications />} />
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <SpeedInsights />
    </BrowserRouter>
  );
}