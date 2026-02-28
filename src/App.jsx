import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { 
  User, Lock, Eye, EyeOff, GraduationCap, Presentation, 
  ShieldCheck, LogOut, Loader2, LayoutDashboard,
  Files, History as HistoryIcon, UploadCloud, MessageSquare, BarChart3, Bell,
  Mail, Phone, Calendar, BookOpen, Award, Users, Building2, FileText,
  Clock, MapPin, Send, RotateCcw, Filter, CheckCheck, Trash2, Search,
  ExternalLink, ChevronDown, MoreVertical, Timer, FileCheck, Menu, X, Shield, Terminal, PieChart, Briefcase, Activity, Settings, ChevronRight
} from 'lucide-react';

// Mock for Vercel Speed Insights (Package should be installed locally)
// import { SpeedInsights } from "@vercel/speed-insights/react";
const SpeedInsights = () => null;

// --- SHARED DATA ---
const student = {
  name: "Anandhu Sebastian",
  uid: "24004048",
  department: "CSE (CYBER SECURITY)",
  email: "anandhuseban@gmail.com",
  guide: "Neha Zade",
  semester: "Semester IV",
  projectTitle: "AuthenFlow – Role-Based Project Management System",
};

const dummyCredentials = {
  Student: { username: "student", password: "stu@123", path: "/profile" },
  Faculty: { username: "faculty", password: "fac@123", path: "/faculty" },
  HOD: { username: "hod", password: "hod@123", path: "/hod" },
  Admin: { username: "admin", password: "admin@123", path: "/admin" },
};

const navConfigs = {
  Student: [
    { label: "Dashboard", icon: <LayoutDashboard size={18} />, path: "/profile" },
    { label: "My Profile", icon: <User size={18} />, path: "/profile" },
    { label: "Submissions", icon: <Files size={18} />, path: "/submit" },
    { label: "History", icon: <HistoryIcon size={18} />, path: "/history" },
    { label: "Request Review", icon: <MessageSquare size={18} />, path: "/review" },
    { label: "Notifications", icon: <Bell size={18} />, path: "/notifications" },
  ],
  Faculty: [
    { label: "Dashboard", icon: <LayoutDashboard size={18} />, path: "/faculty" },
    { label: "Student Projects", icon: <Briefcase size={18} />, path: "/faculty" },
    { label: "Verification Log", icon: <CheckCheck size={18} />, path: "/history" },
    { label: "Notifications", icon: <Bell size={18} />, path: "/notifications" },
  ],
  HOD: [
    { label: "Dashboard", icon: <LayoutDashboard size={18} />, path: "/hod" },
    { label: "Dept Overview", icon: <PieChart size={18} />, path: "/hod" },
    { label: "Faculty Records", icon: <Users size={18} />, path: "/hod" },
    { label: "Notifications", icon: <Bell size={18} />, path: "/notifications" },
  ],
  Admin: [
    { label: "Dashboard", icon: <LayoutDashboard size={18} />, path: "/admin" },
    { label: "User Management", icon: <Users size={18} />, path: "/admin" },
    { label: "System Health", icon: <Activity size={18} />, path: "/admin" },
    { label: "Notifications", icon: <Bell size={18} />, path: "/notifications" },
  ]
};

const roleThemes = {
  Student: { color: "text-indigo-400", border: "border-indigo-500/20", gradient: "from-indigo-500 to-purple-600", icon: <GraduationCap size={20} /> },
  Faculty: { color: "text-emerald-400", border: "border-emerald-500/20", gradient: "from-emerald-500 to-teal-600", icon: <Presentation size={20} /> },
  HOD: { color: "text-amber-400", border: "border-amber-500/20", gradient: "from-amber-500 to-orange-600", icon: <Building2 size={20} /> },
  Admin: { color: "text-rose-400", border: "border-rose-500/20", gradient: "from-rose-500 to-red-600", icon: <ShieldCheck size={20} /> },
};

// --- ANIMATION HELPERS ---
const springTransition = { type: "spring", stiffness: 300, damping: 30 };

// --- RESPONSIVE LAYOUT COMPONENT ---
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
      
      {/* Visual Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
        <div className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] bg-purple-600/10 blur-[120px] rounded-full" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[70%] h-[70%] bg-indigo-600/10 blur-[120px] rounded-full" />
      </div>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsMobileOpen(false)} className="fixed inset-0 bg-black/70 backdrop-blur-md z-[80] lg:hidden" />
        )}
      </AnimatePresence>

      <aside className={`fixed left-0 top-0 h-screen w-72 bg-[#020617]/90 backdrop-blur-3xl border-r border-white/5 z-[90] flex flex-col transition-transform duration-500 ease-in-out ${isMobileOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"} lg:translate-x-0`}>
        <div className="p-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={`w-10 h-10 bg-gradient-to-br ${theme.gradient} rounded-xl flex items-center justify-center text-white font-black italic shadow-lg`}>{role[0]}</div>
            <span className="text-white font-bold text-xl tracking-tight">AuthenFlow</span>
          </div>
          <button onClick={() => setIsMobileOpen(false)} className="lg:hidden p-2 text-slate-400 hover:text-white"><X size={24} /></button>
        </div>
        <nav className="flex-1 px-4 py-2 space-y-1 overflow-y-auto custom-scrollbar">
          {items.map((item) => (
            <Link key={item.label} to={item.path} className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all relative group ${location.pathname === item.path ? "text-white font-bold" : "text-slate-500 hover:text-slate-300"}`}>
              {location.pathname === item.path && <motion.div layoutId="sidebarActive" className={`absolute inset-0 bg-gradient-to-r ${theme.gradient} rounded-xl shadow-lg shadow-indigo-500/20`} />}
              <span className="relative z-10">{item.icon}</span>
              <span className="relative z-10 text-sm">{item.label}</span>
            </Link>
          ))}
        </nav>
        <div className="p-6">
          <button onClick={() => { localStorage.removeItem('userRole'); navigate("/"); }} className="w-full bg-white/5 border border-white/10 text-slate-400 py-3.5 rounded-2xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-red-500/10 hover:text-red-400 transition-all">
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 lg:ml-72 min-h-screen p-5 lg:p-10 relative z-10 flex flex-col">
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 lg:mb-12 gap-6">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsMobileOpen(true)} className="lg:hidden w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-slate-300"><Menu size={24} /></button>
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-white tracking-tight">{activeTitle}</h1>
              <div className="flex items-center gap-2 mt-1">
                <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded border ${theme.color} ${theme.border}`}>{role} NODE</span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-end gap-3">
             <div className="h-11 w-11 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white font-black text-sm">{role[0]}</div>
          </div>
        </header>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex-1">{children}</motion.div>
      </main>
    </div>
  );
};

// --- PREMIUM LOGIN PAGE ---

const LoginPage = () => {
  const navigate = useNavigate();
  const [activeRole, setActiveRole] = useState("Student");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const roles = [
    { key: "Student", icon: <GraduationCap size={16} /> },
    { key: "Faculty", icon: <Presentation size={16} /> },
    { key: "HOD", icon: <Building2 size={16} /> },
    { key: "Admin", icon: <ShieldCheck size={16} /> },
  ];

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    if (!username || !password) { setError("Please enter both credentials."); return; }
    
    const creds = dummyCredentials[activeRole];
    if (username === creds.username && password === creds.password) {
      setLoading(true);
      await new Promise(r => setTimeout(r, 1000));
      localStorage.setItem('userRole', activeRole);
      navigate(creds.path);
    } else { 
      setError(`Invalid credentials for ${activeRole}.`); 
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#020617] p-4 relative overflow-hidden">
      {/* Background FX */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-purple-600/10 blur-[120px] rounded-full" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />

      <motion.div initial={{ opacity: 0, y: 30, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} className="relative z-10 w-full max-w-[440px]">
        <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[40px] p-8 md:p-12 shadow-2xl">
          <div className="flex flex-col items-center mb-10">
            <motion.div whileHover={{ rotate: 10, scale: 1.1 }} className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-3xl font-black italic shadow-2xl mb-5">AF</motion.div>
            <h1 className="text-white text-3xl font-black tracking-tighter">AuthenFlow</h1>
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] mt-2">Secured Access Gateway</p>
          </div>

          {/* Role Selection */}
          <div className="mb-8">
            <div className="flex bg-white/5 p-1 rounded-2xl gap-1 border border-white/5">
              <LayoutGroup id="roles">
                {roles.map(r => (
                  <button key={r.key} type="button" onClick={() => { setActiveRole(r.key); setError(""); }} className={`relative flex-1 py-3 rounded-xl transition-all flex flex-col items-center gap-1 ${activeRole === r.key ? "text-white" : "text-slate-500 hover:text-slate-300"}`}>
                    {activeRole === r.key && <motion.div layoutId="roleIndicator" transition={springTransition} className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-lg" />}
                    <span className="relative z-10">{r.icon}</span>
                    <span className="relative z-10 text-[9px] font-bold uppercase tracking-tighter">{r.key}</span>
                  </button>
                ))}
              </LayoutGroup>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <AnimatePresence mode="wait">
              {error && <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="text-red-400 text-[11px] font-bold text-center bg-red-400/10 p-3 rounded-2xl border border-red-500/20">{error}</motion.div>}
            </AnimatePresence>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest ml-1">Username</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-indigo-400 transition-colors" size={18} />
                <input type="text" placeholder="Enter ID" value={username} onChange={e => setUsername(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 pl-12 text-white focus:outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/5 text-sm transition-all" />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest ml-1">Security Key</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-indigo-400 transition-colors" size={18} />
                <input type={showPass ? "text" : "password"} placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 pl-12 pr-12 text-white focus:outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/5 text-sm transition-all" />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 hover:text-white transition-colors">{showPass ? <EyeOff size={18} /> : <Eye size={18} />}</button>
              </div>
            </div>

            <motion.button type="submit" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} disabled={loading} className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-black uppercase tracking-[0.2em] py-4.5 rounded-2xl shadow-2xl shadow-indigo-600/30 flex items-center justify-center gap-3 mt-6 text-[11px]">
              {loading ? <Loader2 className="animate-spin" size={20} /> : <>Initialize Session <ChevronRight size={16}/></>}
            </motion.button>
          </form>
          <p className="mt-8 text-center text-slate-700 text-[9px] font-black uppercase tracking-[0.3em]">Build v4.2.5 • Premium Secured Environment</p>
        </div>
      </motion.div>
    </div>
  );
};

// --- DASHBOARDS ---

const StudentDashboard = () => (
  <AppLayout activeTitle="My Portfolio">
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
      <div className="xl:col-span-2 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-[32px] p-6 lg:p-10 shadow-2xl relative overflow-hidden group border border-white/10">
        <div className="relative z-10 flex flex-col sm:flex-row items-center gap-8 text-center sm:text-left">
          <div className="w-24 h-24 rounded-3xl bg-white/20 backdrop-blur-md border-2 border-white/30 flex items-center justify-center text-4xl font-black text-white shadow-2xl">{student.name[0]}</div>
          <div>
            <h2 className="text-3xl lg:text-4xl font-black text-white tracking-tighter">{student.name}</h2>
            <p className="text-indigo-100 text-xs font-black uppercase tracking-[0.2em] mt-1.5">{student.department}</p>
          </div>
        </div>
      </div>
      <div className="bg-white/5 border border-white/10 rounded-[32px] p-8 flex flex-col justify-center items-center text-center border-dashed border-2">
        <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] mb-3">Project Assignment</p>
        <h4 className="text-white font-bold text-sm lg:text-base leading-tight">{student.projectTitle}</h4>
      </div>
    </div>
  </AppLayout>
);

const UniversalPlaceholder = ({ title, desc }) => (
  <AppLayout activeTitle={title}>
    <div className="bg-white/5 border border-white/10 rounded-[32px] p-12 lg:p-20 text-center border-dashed border-2 flex flex-col items-center justify-center">
      <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-slate-500 mb-6">
        <Activity size={32} className="opacity-20 animate-pulse" />
      </div>
      <h3 className="text-slate-400 font-black text-xs uppercase tracking-[0.4em]">{desc}</h3>
    </div>
  </AppLayout>
);

// --- MAIN ROUTER ---
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/profile" element={<StudentDashboard />} />
        <Route path="/faculty" element={<UniversalPlaceholder title="Faculty Terminal" desc="Verification Queue Node" />} />
        <Route path="/hod" element={<UniversalPlaceholder title="Dept Oversight" desc="Departmental Performance Stream" />} />
        <Route path="/admin" element={<UniversalPlaceholder title="Root Admin" desc="System Health: Stable" />} />
        
        {/* Shared Modules */}
        <Route path="/submit" element={<UniversalPlaceholder title="Upload" desc="Secure Submission Gateway" />} />
        <Route path="/history" element={<UniversalPlaceholder title="Logs" desc="Audit Trail Verified" />} />
        <Route path="/review" element={<UniversalPlaceholder title="Reviews" desc="Pending Evaluation Stack" />} />
        <Route path="/notifications" element={<UniversalPlaceholder title="Alerts" desc="Broadcast Distribution Feed" />} />
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <SpeedInsights />
    </BrowserRouter>
  );
}