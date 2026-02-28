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
  ExternalLink, ChevronDown, MoreVertical, Timer, FileCheck, Menu, X, Shield, Terminal, PieChart, Briefcase, Activity, Settings, ChevronRight, UserPlus, UserMinus, Snowflake, CheckCircle2, MessageCircle, MonitorDot, LogIn, HardDrive, Cpu, ClipboardCheck, ArrowLeft, Globe
} from 'lucide-react';

// --- DATA CONFIGURATION: 16 GROUPS FOR HOD/ADMIN ---
const groupData = Array.from({ length: 16 }, (_, i) => ({
  id: `GRP-24-${(i + 1).toString().padStart(2, '0')}`,
  title: [
    "AI-Driven Threat Detection", "Blockchain Supply Chain", "Smart Health Monitor", 
    "Autonomous Drone Nav", "Cyber-Physical Security", "FinTech Auth Layer", 
    "Quantum Encryption Lab", "Edge Computing Node", "Zero-Trust Architecture", 
    "Biometric Security Hub", "Vulnerability Scanner", "Cloud Native Firewall", 
    "Deepfake Recognition", "IoT Security Protocol", "Privacy-Preserving AI", "Malware Sandbox"
  ][i],
  guide: [
    "Prof. Neha Zade", "Dr. Meena Raj", "Mrs. Heena Ansari", "Mr. Rahul Deshmukh",
    "Prof. Amit Shah", "Dr. Sunil Patil", "Mrs. Kavita R.", "Mr. S. Kulkarni"
  ][i % 8],
  status: i % 3 === 0 ? "Verified" : i % 5 === 0 ? "Pending" : "Evaluated",
  marks: {
    seminar1: Math.floor(Math.random() * 5) + 15,
    seminar2: Math.floor(Math.random() * 5) + 14,
    outcome: Math.floor(Math.random() * 10) + 20,
    overall: Math.floor(Math.random() * 10) + 20,
  }
}));

const studentInfo = {
  name: "Anandhu Sebastian",
  uid: "24004048",
  rollNo: "44",
  department: "CSE (CYBER SECURITY)",
  guide: "Prof. Neha Zade",
  group: "GRP-24-12",
  attendance: "92%",
  uploadStatus: "Pending (Seminar 2)",
  projectTitle: "AuthenFlow – Role-Based Project Management System",
};

const dummyCredentials = {
  Student: { username: "student", password: "pass@123", path: "/profile" },
  Faculty: { username: "faculty", password: "fac@123", path: "/faculty" },
  HOD: { username: "hod", password: "hod@123", path: "/hod" },
  Admin: { username: "admin", password: "admin@123", path: "/admin" },
};

// --- NAVIGATION CONFIGURATIONS ---
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
    { label: "Group Evaluations", icon: <ClipboardCheck size={18} />, path: "/hod-evaluations" },
    { label: "Project Freeze", icon: <Snowflake size={18} />, path: "/freeze" },
    { label: "Verify Valuation", icon: <ShieldCheck size={18} />, path: "/verify" },
  ],
  Admin: [
    { label: "Master Panel", icon: <Terminal size={18} />, path: "/admin" },
    { label: "System Monitor", icon: <MonitorDot size={18} />, path: "/admin-monitor" },
    { label: "Group Registry", icon: <Globe size={18} />, path: "/hod-evaluations" },
    { label: "Evaluation Hub", icon: <Award size={18} />, path: "/evaluate" },
    { label: "Dept Oversight", icon: <Building2 size={18} />, path: "/hod" },
    { label: "Freeze Ops", icon: <Snowflake size={18} />, path: "/freeze" },
    { label: "Audit Logs", icon: <HistoryIcon size={18} />, path: "/history" },
    { label: "Configuration", icon: <Settings size={18} />, path: "/admin" },
  ]
};

const roleThemes = {
  Student: { color: "text-indigo-400", border: "border-indigo-500/20", grad: "from-indigo-500 to-purple-600" },
  Faculty: { color: "text-emerald-400", border: "border-emerald-500/20", grad: "from-emerald-500 to-teal-600" },
  HOD: { color: "text-amber-400", border: "border-amber-500/20", grad: "from-amber-500 to-orange-600" },
  Admin: { color: "text-rose-400", border: "border-rose-500/20", grad: "from-rose-500 to-red-600" },
};

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
      <div className="fixed inset-0 pointer-events-none z-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] bg-indigo-600/5 blur-[120px] rounded-full" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[70%] h-[70%] bg-purple-600/5 blur-[120px] rounded-full" />
      </div>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsMobileOpen(false)} className="fixed inset-0 bg-black/70 backdrop-blur-md z-[80] lg:hidden" />
        )}
      </AnimatePresence>

      <aside className={`fixed left-0 top-0 h-screen w-72 bg-[#020617]/95 backdrop-blur-3xl border-r border-white/5 z-[90] flex flex-col transition-transform duration-500 ${isMobileOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"} lg:translate-x-0`}>
        <div className="p-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={`w-10 h-10 bg-gradient-to-br ${theme.grad} rounded-xl flex items-center justify-center text-white font-black italic shadow-lg uppercase`}>{role[0]}</div>
            <span className="text-white font-black text-xl tracking-tighter uppercase">AuthenFlow</span>
          </div>
          <button onClick={() => setIsMobileOpen(false)} className="lg:hidden text-slate-400"><X size={24} /></button>
        </div>
        <nav className="flex-1 px-4 py-2 space-y-1.5 overflow-y-auto custom-scrollbar">
          <LayoutGroup id="sidebar">
            {items.map((item) => (
              <Link key={item.label} to={item.path} className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all relative group ${location.pathname === item.path ? "text-white font-bold" : "text-slate-500 hover:text-slate-300"}`}>
                {location.pathname === item.path && <motion.div layoutId="activeNav" transition={spring} className={`absolute inset-0 bg-gradient-to-r ${theme.grad} rounded-xl shadow-lg shadow-indigo-500/10`} />}
                <span className="relative z-10">{item.icon}</span>
                <span className="relative z-10 text-[13px] tracking-wide font-medium">{item.label}</span>
              </Link>
            ))}
          </LayoutGroup>
        </nav>
        <div className="p-6">
          <button onClick={() => { localStorage.removeItem('userRole'); navigate("/"); }} className="w-full bg-white/5 border border-white/10 text-slate-400 py-3.5 rounded-2xl text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-red-500/10 hover:text-red-400 transition-all">
            <LogOut size={16} /> Logout System
          </button>
        </div>
      </aside>

      <main className="flex-1 lg:ml-72 min-h-screen p-5 lg:p-10 relative z-10 flex flex-col">
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 lg:mb-12 gap-6">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsMobileOpen(true)} className="lg:hidden w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-slate-300 shadow-xl"><Menu size={24} /></button>
            <div>
              <h1 className="text-2xl lg:text-3xl font-black text-white tracking-tight leading-none uppercase italic">{activeTitle}</h1>
              <div className="flex items-center gap-2 mt-2">
                <span className={`text-[9px] font-black uppercase tracking-[0.2em] px-2 py-0.5 rounded border ${theme.color} ${theme.border}`}>{role} ACCESS</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 group cursor-pointer hover:bg-white/10 transition-all"><Bell size={18} /></div>
            <div className={`h-11 w-11 rounded-2xl bg-gradient-to-br ${theme.grad} flex items-center justify-center text-white font-black text-sm shadow-xl uppercase italic`}>{role === 'Student' ? studentInfo.name[0] : role[0]}</div>
          </div>
        </header>
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="flex-1">{children}</motion.div>
        <footer className="mt-12 lg:mt-20 pt-8 border-t border-white/5 text-center text-slate-700 text-[9px] font-black uppercase tracking-[0.5em]">Academic Integrity Engine • AuthenFlow Secured</footer>
      </main>
    </div>
  );
};

// --- DUAL-THEMED LOGIN ---
const LoginPage = () => {
  const navigate = useNavigate();
  const [isAdminView, setIsAdminView] = useState(false);
  const [activeRole, setActiveRole] = useState("Student");
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    const currentRole = isAdminView ? "Admin" : activeRole;
    const creds = dummyCredentials[currentRole];
    if (user === creds.username && pass === creds.password) {
      setLoading(true);
      await new Promise(r => setTimeout(r, 1200));
      localStorage.setItem('userRole', currentRole);
      navigate(creds.path);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden transition-colors duration-700">
      <AnimatePresence mode="wait">
        {isAdminView ? (
          <motion.div key="admin-bg" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069')] bg-cover bg-center grayscale brightness-50" />
            <div className="absolute inset-0 backdrop-blur-[12px] bg-black/40" />
          </motion.div>
        ) : (
          <motion.div key="user-bg" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-0 bg-[#f8fafc]">
             <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-40 pointer-events-none" />
             <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] bg-indigo-500/10 blur-[140px] rounded-full animate-pulse" />
             <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-purple-500/10 blur-[140px] rounded-full animate-pulse" />
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-tr from-white via-indigo-50/20 to-white pointer-events-none" />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div layout className="relative z-10 w-full max-w-[500px] px-4">
        <div className={`transition-all duration-500 border ${isAdminView ? "bg-white/5 backdrop-blur-3xl border-white/20 rounded-[48px] p-10 lg:p-14 shadow-2xl" : "bg-white/80 backdrop-blur-2xl border-white/60 rounded-[40px] p-10 lg:p-14 shadow-[0_48px_80px_-16px_rgba(99,102,241,0.15)]"}`}>
          <div className="text-center mb-10">
            {!isAdminView && (
              <div className="flex justify-center mb-6">
                 <motion.div whileHover={{ rotate: 10, scale: 1.1 }} className="flex items-center gap-3 text-indigo-900 font-black tracking-tighter text-2xl uppercase group cursor-default">
                   <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white italic shadow-lg shadow-indigo-600/30">AF</div>
                   AuthenFlow
                 </motion.div>
              </div>
            )}
            <h1 className={`text-4xl font-black tracking-tight uppercase italic ${isAdminView ? "text-white" : "text-slate-900"}`}>{isAdminView ? "Admin Login" : "Centralized Portal"}</h1>
            <p className={`text-[11px] mt-3 font-black uppercase tracking-[0.4em] ${isAdminView ? "text-slate-400" : "text-indigo-600/60"}`}>Authentication Layer v4.3</p>
          </div>

          {!isAdminView && (
            <div className="bg-indigo-50/50 p-1.5 rounded-2xl grid grid-cols-3 gap-1 mb-10 border border-indigo-100 shadow-inner">
              {["Student", "Faculty", "HOD"].map(r => (
                <button key={r} onClick={() => setActiveRole(r)} className={`relative py-3.5 rounded-xl transition-all flex flex-col items-center gap-1 ${activeRole === r ? "text-indigo-600 font-black" : "text-slate-400 font-bold"}`}>
                  {activeRole === r && <motion.div layoutId="roleIndicator" className="absolute inset-0 bg-white rounded-xl shadow-lg border border-indigo-50" />}
                  <span className="relative z-10 text-[10px] font-black uppercase tracking-widest">{r}</span>
                </button>
              ))}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className={`text-[10px] font-black uppercase tracking-widest ml-2 ${isAdminView ? "text-slate-400" : "text-slate-500"}`}>Identity UID</label>
              <input type="text" placeholder="Enter UID Number" value={user} onChange={e => setUser(e.target.value)} className={`w-full p-4.5 rounded-2xl text-sm focus:outline-none transition-all shadow-sm ${isAdminView ? "bg-white/5 border-white/10 text-white placeholder:text-slate-600" : "bg-white border border-indigo-100 text-slate-900 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 placeholder:text-slate-400"}`} />
            </div>
            <div className="space-y-2">
              <label className={`text-[10px] font-black uppercase tracking-widest ml-2 ${isAdminView ? "text-slate-400" : "text-slate-500"}`}>Account Password</label>
              <div className="relative">
                 <input type={showPass ? "text" : "password"} placeholder="••••••••" value={pass} onChange={e => setPass(e.target.value)} className={`w-full p-4.5 rounded-2xl text-sm focus:outline-none transition-all shadow-sm ${isAdminView ? "bg-white/5 border-white/10 text-white placeholder:text-slate-600" : "bg-white border border-indigo-100 text-slate-900 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 placeholder:text-slate-400"}`} />
                 <button type="button" onClick={() => setShowPass(!showPass)} className={`absolute right-4 top-1/2 -translate-y-1/2 transition-colors ${isAdminView ? "text-slate-500 hover:text-white" : "text-slate-300 hover:text-indigo-600"}`}>{showPass ? <EyeOff size={16} /> : <Eye size={16} />}</button>
              </div>
            </div>
            <button type="submit" className={`w-full py-5 rounded-2xl font-black uppercase tracking-[0.25em] text-[11px] shadow-2xl transition-all relative overflow-hidden group ${isAdminView ? "bg-indigo-600 text-white hover:bg-indigo-500" : "bg-indigo-600 text-white hover:bg-indigo-700"}`}>
              {isAdminView && <div className="absolute inset-0 bg-white/5 -skew-x-12 translate-x-full group-hover:translate-x-0 transition-transform duration-700" />}
              <span className="relative z-10 flex items-center justify-center gap-2">
                {loading ? <Loader2 className="animate-spin" size={16}/> : <>Sync & Login <ChevronRight size={16}/></>}
              </span>
            </button>
          </form>

          <div className="mt-10 text-center border-t border-slate-100 pt-8">
            <button onClick={() => setIsAdminView(!isAdminView)} className={`text-[10px] font-black uppercase tracking-widest transition-all ${isAdminView ? "text-slate-400 hover:text-white" : "text-indigo-600 hover:text-indigo-800"}`}>
              {isAdminView ? "← Return to User Portal" : "Administrator Terminal"}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// --- HOD/ADMIN GROUP EVALUATIONS ---
const GroupEvaluations = () => {
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [search, setSearch] = useState("");

  const filteredGroups = groupData.filter(g => 
    g.id.toLowerCase().includes(search.toLowerCase()) || 
    g.title.toLowerCase().includes(search.toLowerCase()) ||
    g.guide.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AppLayout activeTitle="Cluster Evaluations">
      <AnimatePresence mode="wait">
        {!selectedGroup ? (
          <motion.div key="list" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
            <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
               <div className="relative w-full md:w-96">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={18} />
                  <input type="text" placeholder="Filter by Group, Guide or Project..." value={search} onChange={e => setSearch(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 pl-12 text-sm text-white focus:border-amber-500/50 outline-none transition-all" />
               </div>
               <div className="flex gap-3">
                  <div className="bg-white/5 px-6 py-4 rounded-2xl border border-white/10 text-center"><p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Total Batches</p><p className="text-xl font-black text-white uppercase italic">16 Groups</p></div>
                  <div className="bg-white/5 px-6 py-4 rounded-2xl border border-white/10 text-center"><p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Evaluated</p><p className="text-xl font-black text-emerald-400 uppercase italic">09/16</p></div>
               </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
              {filteredGroups.map((group) => (
                <motion.div key={group.id} whileHover={{ y: -5, backgroundColor: "rgba(255,255,255,0.06)" }} onClick={() => setSelectedGroup(group)} className="bg-white/5 border border-white/10 rounded-[32px] p-8 cursor-pointer transition-all group overflow-hidden relative">
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest">{group.id}</span>
                    <div className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-tighter ${group.status === 'Verified' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-500/10 text-slate-400'}`}>{group.status}</div>
                  </div>
                  <h4 className="text-white font-bold text-sm mb-4 tracking-tight group-hover:text-amber-400 transition-colors uppercase italic leading-tight line-clamp-2">{group.title}</h4>
                  <div className="flex items-center gap-2 mt-auto border-t border-white/5 pt-4">
                    <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Guide:</span>
                    <span className="text-white text-[11px] font-bold italic">{group.guide}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div key="detail" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="bg-white/5 border border-white/10 rounded-[40px] p-8 lg:p-14 shadow-2xl relative">
            <button onClick={() => setSelectedGroup(null)} className="mb-12 flex items-center gap-2 text-slate-500 hover:text-white transition-colors text-[10px] font-black uppercase tracking-widest"><ArrowLeft size={16}/> Return to Repository</button>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
               <div className="lg:col-span-2">
                  <span className="text-amber-500 font-black text-sm uppercase tracking-[0.2em] mb-4 block">{selectedGroup.id}</span>
                  <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tighter uppercase italic leading-none mb-6 underline decoration-amber-500 decoration-8">{selectedGroup.title}</h2>
                  <div className="flex flex-wrap gap-4 mt-10">
                     <div className="bg-white/5 border border-white/5 px-6 py-4 rounded-3xl"><p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Lead Guide</p><p className="text-white font-bold">{selectedGroup.guide}</p></div>
                     <div className="bg-white/5 border border-white/5 px-6 py-4 rounded-3xl"><p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Dept Status</p><p className="text-emerald-400 font-black italic uppercase">Synchronized</p></div>
                  </div>
               </div>
               <div className="space-y-4">
                  {[
                    { l: "Seminar 1", v: selectedGroup.marks.seminar1, max: 20 },
                    { l: "Seminar 2", v: selectedGroup.marks.seminar2, max: 20 },
                    { l: "Outcome Log", v: selectedGroup.marks.outcome, max: 30 },
                    { l: "Contribution", v: selectedGroup.marks.overall, max: 30 },
                  ].map(m => (
                    <div key={m.l} className="bg-white/5 p-6 rounded-3xl border border-white/5 flex items-center justify-between group hover:bg-white/10 transition-all">
                      <div><p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{m.l}</p><p className="text-2xl font-black text-white tracking-tight">{m.v}<span className="text-xs text-slate-700 ml-1 italic">/ {m.max}</span></p></div>
                      <div className="w-12 h-12 rounded-full border-4 border-amber-500/20 flex items-center justify-center text-[10px] font-black text-amber-500 group-hover:scale-110 transition-transform">{Math.round((m.v / m.max) * 100)}%</div>
                    </div>
                  ))}
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </AppLayout>
  );
};

// --- ADMIN DASHBOARD ---
const AdminDashboard = () => {
  const activities = [
    { u: "Anandhu Sebastian", a: "Uploaded Literature Review", t: "2 mins ago", r: "Student" },
    { u: "Prof. Neha Zade", a: "Verified Group A-12 Marks", t: "15 mins ago", r: "Faculty" },
    { u: "HOD CSE", a: "Authorized Final Valuation GRP-16", t: "1 hour ago", r: "HOD" },
    { u: "Sneha K.", a: "Modified Project Abstract", t: "5 hours ago", r: "Student" },
  ];
  return (
    <AppLayout activeTitle="Master Panel">
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 mb-8">
         {[
           { l: "Nodes Online", v: "1,248", i: <Cpu/>, c: "rose" },
           { l: "Storage Load", v: "84.2 GB", i: <HardDrive/>, c: "indigo" },
           { l: "Global Sync", v: "Secure", i: <Shield/>, c: "emerald" },
           { l: "Uptime Node", v: "99.9%", i: <Activity/>, c: "blue" },
         ].map(s => (
           <div key={s.l} className="bg-white/5 border border-white/10 rounded-[32px] p-6 group transition-all">
             <div className="flex items-center justify-between mb-4"><div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-500 group-hover:scale-110 transition-transform">{s.i}</div></div>
             <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1">{s.l}</p><p className="text-2xl font-black text-white uppercase italic">{s.v}</p>
           </div>
         ))}
      </div>
      <div className="bg-white/5 border border-white/10 rounded-[40px] overflow-hidden shadow-2xl">
        <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
           <h3 className="text-white font-black text-lg flex items-center gap-3 uppercase tracking-tighter"><MonitorDot size={20} className="text-rose-500" /> Intelligence Monitor</h3>
           <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Network Synchronized</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead><tr className="bg-white/[0.01] border-b border-white/5">
                <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest">Operator</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest">Action Node</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest">Timestamp</th>
            </tr></thead>
            <tbody className="divide-y divide-white/5">
              {activities.map((act, i) => (
                <tr key={i} className="hover:bg-white/[0.03] transition-all">
                  <td className="px-8 py-6"><span className="text-sm font-bold text-white uppercase italic">{act.u}</span></td>
                  <td className="px-8 py-6"><p className="text-sm text-slate-400 font-medium">{act.a}</p></td>
                  <td className="px-8 py-6"><span className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">{act.t}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppLayout>
  );
};

// --- STUDENT DASHBOARD ---
const StudentDashboard = () => (
  <AppLayout activeTitle="Dashboard">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-[32px] p-8 lg:p-12 shadow-2xl relative overflow-hidden group border border-white/10">
        <div className="relative z-10 flex flex-col sm:flex-row items-center gap-8 text-center sm:text-left">
          <div className="w-28 h-28 rounded-[35px] bg-white/20 backdrop-blur-md border-2 border-white/30 flex items-center justify-center text-5xl font-black text-white shadow-2xl">{studentInfo.name[0]}</div>
          <div>
            <h2 className="text-3xl font-black text-white tracking-tighter leading-none uppercase italic">{studentInfo.name}</h2>
            <p className="text-indigo-100/70 text-xs font-black uppercase tracking-[0.2em] mt-3">{studentInfo.department}</p>
            <div className="flex gap-2 mt-6">
               <span className="bg-white/10 px-3 py-1.5 rounded-full text-[9px] font-black text-white uppercase border border-white/5">Node ID: {studentInfo.uid}</span>
               <span className="bg-white/10 px-3 py-1.5 rounded-full text-[9px] font-black text-white uppercase border border-white/5 italic">Term IV</span>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {[
          { l: "Attendance", v: studentInfo.attendance, i: <CheckCircle2 size={16}/>, c: "emerald" },
          { l: "Cluster Node", v: studentInfo.group, i: <Users size={16}/>, c: "indigo" },
          { l: "Sync Status", v: "Active", i: <Activity size={16}/>, c: "blue" },
          { l: "Term Year", v: "2nd Year", i: <Calendar size={16}/>, c: "rose" },
        ].map(s => (
          <div key={s.l} className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/[0.08] transition-all">
            <span className={`text-${s.c}-400 opacity-50 block mb-3`}>{s.i}</span>
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1">{s.l}</p>
            <p className="text-2xl font-black text-white uppercase italic tracking-tighter">{s.v}</p>
          </div>
        ))}
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
        
        {/* Admin Specific */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin-monitor" element={<AdminDashboard />} />

        {/* HOD Specific */}
        <Route path="/hod" element={<AppLayout activeTitle="Global View"><div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">{[{ l: "Dept Health", v: "Optimal", c: "emerald" }, { l: "Active Groups", v: "16 Nodes", c: "amber" }, { l: "Pending Audit", v: "04 Logs", c: "rose" }].map(s => (<div key={s.l} className="bg-white/5 border border-white/10 p-8 rounded-[32px] group hover:bg-white/[0.08] transition-all"><p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] mb-3">{s.l}</p><p className="text-3xl font-black text-white uppercase italic">{s.v}</p></div>))}</div><div className="bg-white/5 border border-white/10 rounded-[40px] p-20 text-center border-dashed border-2"><Activity size={40} className="mx-auto text-slate-600 mb-6 animate-pulse opacity-30" /><p className="text-slate-600 font-black text-xs uppercase tracking-[0.5em] italic">Streaming Batch Intelligence Node Active</p></div></AppLayout>} />
        <Route path="/hod-evaluations" element={<GroupEvaluations />} />
        <Route path="/freeze" element={<AppLayout activeTitle="Freeze Console"><div className="p-20 text-center bg-amber-600/5 rounded-[40px] text-amber-500 font-black tracking-widest text-xs uppercase tracking-[0.4em] italic underline decoration-amber-500 decoration-2">System Interlock: Terminal Access Freeze Active</div></AppLayout>} />
        <Route path="/verify" element={<AppLayout activeTitle="Verify Valuation"><div className="p-20 text-center border-dashed border-2 rounded-[40px] text-slate-600 font-black tracking-widest text-xs uppercase tracking-[0.4em]">Global Audit Chain Verified</div></AppLayout>} />

        {/* Student Routes */}
        <Route path="/profile" element={<StudentDashboard />} />
        <Route path="/group" element={<AppLayout activeTitle="Allotted Group"><div className="p-20 text-center border-dashed border-2 rounded-[40px] text-slate-600 font-black tracking-widest text-xs uppercase tracking-[0.4em]">Node Cluster: {studentInfo.group} • Guide ID: {studentInfo.guide}</div></AppLayout>} />
        <Route path="/status" element={<AppLayout activeTitle="My Status"><div className="p-20 text-center border-dashed border-2 rounded-[40px] text-slate-600 font-black tracking-widest text-xs uppercase tracking-[0.4em] italic">Current Sync: {studentInfo.uploadStatus}</div></AppLayout>} />
        <Route path="/query" element={<AppLayout activeTitle="Raise Query"><div className="p-20 text-center border-dashed border-2 rounded-[40px] text-slate-600 font-black tracking-widest text-xs uppercase tracking-[0.4em]">Communication Port Ready</div></AppLayout>} />

        {/* Faculty Routes */}
        <Route path="/faculty" element={<AppLayout activeTitle="Faculty Terminal"><div className="p-20 text-center border-dashed border-2 rounded-[40px] text-slate-600 font-black tracking-widest text-xs uppercase tracking-[0.4em]">Faculty Performance Analytics</div></AppLayout>} />
        <Route path="/faculty-groups" element={<AppLayout activeTitle="Assigned Groups"><div className="p-20 text-center border-dashed border-2 rounded-[40px] text-slate-600 font-black tracking-widest text-xs uppercase tracking-[0.4em]">Active Cluster Registry Online</div></AppLayout>} />
        <Route path="/evaluate" element={<AppLayout activeTitle="Evaluation System"><div className="bg-white/5 border border-white/10 rounded-[40px] p-10 lg:p-14 shadow-2xl"><div className="mb-10 border-b border-white/5 pb-8"><h4 className="text-3xl font-black text-white mb-2 tracking-tighter uppercase italic">Assessment Node: A-12</h4><p className="text-slate-500 text-[10px] font-black tracking-widest uppercase opacity-60">Continuous Valuation Flow • Semester IV</p></div><div className="space-y-4">{[{ label: "Seminar 1", weight: "20 Marks" }, { label: "Seminar 2", weight: "20 Marks" }, { label: "Outcome (Paper)", weight: "30 Marks" }, { label: "Performance", weight: "30 Marks" }].map(mark => (<div key={mark.label} className="bg-white/5 border border-white/5 rounded-3xl p-6 flex flex-col md:flex-row justify-between items-center gap-6 group hover:bg-white/[0.08] transition-all"><div className="text-center md:text-left"><p className="text-white font-black tracking-tight uppercase text-sm">{mark.label}</p><p className="text-slate-600 text-[10px] font-black uppercase tracking-widest mt-1">{mark.weight}</p></div><div className="flex items-center gap-4"><input type="number" placeholder="00" className="w-24 bg-white/5 border border-white/10 rounded-xl p-4 text-center text-white focus:border-indigo-500/50 font-black text-lg" /><button className="bg-indigo-600 text-white p-4 rounded-xl hover:bg-indigo-500 transition-all shadow-lg active:scale-95"><CheckCheck size={20}/></button></div></div>))}</div></div></AppLayout>} />
        <Route path="/attendance" element={<AppLayout activeTitle="Attendance Log"><div className="p-20 text-center border-dashed border-2 rounded-[40px] text-slate-600 font-black tracking-widest text-xs uppercase tracking-[0.4em]">Presence Registry Terminal Online</div></AppLayout>} />

        {/* Global Audit */}
        <Route path="/history" element={<AppLayout activeTitle="Audit Logs"><div className="p-20 text-center border-dashed border-2 rounded-[40px] text-slate-600 font-black tracking-widest text-xs uppercase tracking-[0.4em]">Immutable Ledger Stream Online</div></AppLayout>} />
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <SpeedInsights />
    </BrowserRouter>
  );
}