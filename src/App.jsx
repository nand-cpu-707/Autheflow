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
  ExternalLink, ChevronDown, MoreVertical, Timer, FileCheck, Menu, X, Shield, Terminal, PieChart, Briefcase, Activity, Settings, ChevronRight, UserPlus, UserMinus, Snowflake, CheckCircle2, MessageCircle, MonitorDot, LogIn, HardDrive, Cpu, ClipboardCheck, ArrowLeft, Globe, Zap
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
    { label: "Security Logs", icon: <HistoryIcon size={18} />, path: "/history" },
    { label: "Configuration", icon: <Settings size={18} />, path: "/admin" },
  ]
};

const roleThemes = {
  Student: { color: "text-indigo-400", border: "border-indigo-500/20", grad: "from-indigo-500 to-purple-600" },
  Faculty: { color: "text-emerald-400", border: "border-emerald-500/20", grad: "from-emerald-500 to-teal-600" },
  HOD: { color: "text-amber-400", border: "border-amber-500/20", grad: "from-amber-500 to-orange-600" },
  Admin: { color: "text-rose-400", border: "border-rose-500/20", grad: "from-rose-500 to-red-600" },
};

const spring = { type: "spring", stiffness: 350, damping: 35 };

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
        <motion.div animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }} transition={{ duration: 20, repeat: Infinity }} className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] bg-blue-600/10 blur-[120px] rounded-full" />
        <motion.div animate={{ scale: [1.2, 1, 1.2], rotate: [0, -90, 0] }} transition={{ duration: 15, repeat: Infinity }} className="absolute -bottom-[10%] -right-[10%] w-[70%] h-[70%] bg-violet-600/10 blur-[120px] rounded-full" />
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
            <span className="text-white font-black text-xl tracking-tighter uppercase tracking-widest italic">AuthenFlow</span>
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

  // Deep dark, Bluish and Violetish environment
  const portalGlows = {
    Student: "rgba(37, 99, 235, 0.25)",
    Faculty: "rgba(16, 185, 129, 0.2)",
    HOD: "rgba(139, 92, 246, 0.25)",
  };

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
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-[#020617] transition-all duration-1000">
      
      {/* THE DYNAMIC DARK BLUISH/VIOLETISH BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-40 pointer-events-none" />
        
        {/* Constant Sapphire Glow */}
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-[-10%] left-[-5%] w-[80%] h-[80%] bg-blue-600/20 blur-[160px] rounded-full" 
        />
        
        {/* Role-Dynamic Violet/Purple Glow */}
        <motion.div 
          key={isAdminView ? 'admin' : activeRole}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          style={{ backgroundColor: isAdminView ? 'rgba(225, 29, 72, 0.15)' : portalGlows[activeRole] }}
          className="absolute bottom-[-10%] right-[-5%] w-[70%] h-[70%] blur-[160px] rounded-full transition-colors duration-1000" 
        />
      </div>

      <motion.div layout transition={spring} className="relative z-10 w-full max-w-[500px] px-4">
        {/* PREMIUM DARK GLASS CARD */}
        <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[56px] p-10 lg:p-14 shadow-[0_64px_128px_-24px_rgba(0,0,0,0.9)] overflow-hidden relative">
          
          <AnimatePresence mode="wait">
            <motion.div 
              key={isAdminView ? 'admin-form' : 'user-form'}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <div className="text-center mb-10">
                <div className="flex justify-center mb-8">
                  <motion.div 
                    whileHover={{ rotate: 10, scale: 1.1 }} 
                    className={`w-16 h-16 rounded-3xl flex items-center justify-center text-white text-3xl font-black italic shadow-2xl shadow-indigo-600/20 ${isAdminView ? 'bg-rose-600' : 'bg-indigo-600'}`}
                  >
                    AF
                  </motion.div>
                </div>
                <h1 className="text-4xl font-black tracking-tight uppercase italic text-white leading-tight">
                  {isAdminView ? "Admin Terminal" : "AuthenFlow"}
                </h1>
                <p className="text-[11px] mt-3 font-black uppercase tracking-[0.4em] text-indigo-400 opacity-80">
                  {isAdminView ? "System Root Access" : "Identity Gateway Layer"}
                </p>
              </div>

              {!isAdminView && (
                <div className="bg-white/5 p-1.5 rounded-3xl grid grid-cols-3 gap-1 mb-10 border border-white/5 shadow-inner backdrop-blur-md">
                  {["Student", "Faculty", "HOD"].map(r => (
                    <button key={r} onClick={() => setActiveRole(r)} className={`relative py-4 rounded-2xl transition-all flex flex-col items-center gap-1 ${activeRole === r ? "text-white font-black" : "text-slate-500 font-bold"}`}>
                      {activeRole === r && <motion.div layoutId="roleIndicator" transition={spring} className="absolute inset-0 bg-indigo-600 rounded-xl shadow-lg shadow-indigo-600/40" />}
                      <span className="relative z-10 text-[11px] font-black uppercase tracking-widest">{r}</span>
                    </button>
                  ))}
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest ml-2 text-slate-400">Identity Identifier</label>
                  <div className="relative group">
                    <User className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${isAdminView ? 'text-rose-400' : 'text-indigo-400'}`} size={18} />
                    <input type="text" placeholder="Enter UID Number" value={user} onChange={e => setUser(e.target.value)} className="w-full p-4.5 pl-12 rounded-2xl text-sm focus:outline-none transition-all shadow-sm bg-white/5 border border-white/10 text-white placeholder:text-slate-600 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 font-medium" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest ml-2 text-slate-400">Security Password</label>
                  <div className="relative group">
                    <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${isAdminView ? 'text-rose-400' : 'text-indigo-400'}`} size={18} />
                    <input type={showPass ? "text" : "password"} placeholder="••••••••" value={pass} onChange={e => setPass(e.target.value)} className="w-full p-4.5 pl-12 pr-12 rounded-2xl text-sm focus:outline-none transition-all shadow-sm bg-white/5 border border-white/10 text-white placeholder:text-slate-600 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 font-medium" />
                    <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 transition-colors text-slate-500 hover:text-white">{showPass ? <EyeOff size={16} /> : <Eye size={16} />}</button>
                  </div>
                </div>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" className={`w-full py-5 rounded-2xl font-black uppercase tracking-[0.25em] text-[11px] shadow-2xl transition-all relative overflow-hidden group ${isAdminView ? "bg-rose-600 text-white hover:bg-rose-500" : "bg-indigo-600 text-white hover:bg-indigo-700"}`}>
                   <div className="absolute inset-0 bg-white/5 -skew-x-12 translate-x-full group-hover:translate-x-0 transition-transform duration-700" />
                   <span className="relative z-10 flex items-center justify-center gap-2">
                    {loading ? <Loader2 className="animate-spin" size={16}/> : <>{isAdminView ? "Initialize Root Session" : "Sync & Login Portal"} <ChevronRight size={16}/></>}
                  </span>
                </motion.button>
              </form>

              <div className="mt-10 text-center border-t border-white/5 pt-8">
                <button onClick={() => { setIsAdminView(!isAdminView); setActiveRole("Student"); }} className="text-[10px] font-black uppercase tracking-widest transition-all px-6 py-2 rounded-full border text-indigo-400 hover:text-white border-indigo-500/20 hover:bg-indigo-500/10">
                  {isAdminView ? "← Return to Main Portal" : "Access Administrator Node"}
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

// --- HOD GROUP EVALUATIONS ---
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
                  <input type="text" placeholder="Filter Registry..." value={search} onChange={e => setSearch(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 pl-12 text-sm text-white focus:border-amber-500/50 outline-none transition-all shadow-inner" />
               </div>
               <div className="flex gap-3">
                  <div className="bg-white/5 px-6 py-4 rounded-2xl border border-white/10 text-center shadow-xl"><p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Batches</p><p className="text-xl font-black text-white italic">16</p></div>
                  <div className="bg-white/5 px-6 py-4 rounded-2xl border border-white/10 text-center shadow-xl"><p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Audit</p><p className="text-xl font-black text-emerald-400 italic">09/16</p></div>
               </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
              {filteredGroups.map((group) => (
                <motion.div key={group.id} whileHover={{ y: -5, scale: 1.02 }} onClick={() => setSelectedGroup(group)} className="bg-white/5 border border-white/10 rounded-[32px] p-8 cursor-pointer transition-all group overflow-hidden relative shadow-2xl">
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-[10px] font-black text-amber-500 uppercase tracking-[0.2em]">{group.id}</span>
                    <div className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-tighter ${group.status === 'Verified' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-500/10 text-slate-400'}`}>{group.status}</div>
                  </div>
                  <h4 className="text-white font-bold text-sm mb-4 tracking-tight group-hover:text-amber-400 transition-colors uppercase italic leading-tight line-clamp-2">{group.title}</h4>
                  <div className="flex items-center gap-3 mt-auto border-t border-white/5 pt-5 text-slate-500 text-[10px] font-black uppercase tracking-widest italic">{group.guide}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div key="detail" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="bg-white/5 border border-white/10 rounded-[48px] p-10 lg:p-16 shadow-2xl relative overflow-hidden">
            <button onClick={() => setSelectedGroup(null)} className="mb-12 flex items-center gap-2 text-slate-500 hover:text-white transition-all text-[11px] font-black uppercase tracking-[0.3em]"><ArrowLeft size={16}/> Return to Batch Registry</button>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
               <div className="lg:col-span-2">
                  <span className="text-amber-500 font-black text-sm uppercase tracking-[0.3em] mb-4 block">{selectedGroup.id}</span>
                  <h2 className="text-4xl lg:text-6xl font-black text-white tracking-tighter uppercase italic leading-none mb-8 underline decoration-amber-500/50 decoration-[12px]">{selectedGroup.title}</h2>
                  <p className="text-slate-500 text-[11px] font-black uppercase tracking-widest">Authorized Guide: <span className="text-white ml-2">{selectedGroup.guide}</span></p>
               </div>
               <div className="space-y-5">
                  {[
                    { l: "Seminar 1", v: selectedGroup.marks.seminar1, max: 20 },
                    { l: "Seminar 2", v: selectedGroup.marks.seminar2, max: 20 },
                    { l: "Outcome Metric", v: selectedGroup.marks.outcome, max: 30 },
                    { l: "Performance Node", v: selectedGroup.marks.overall, max: 30 },
                  ].map(m => (
                    <div key={m.l} className="bg-white/5 p-7 rounded-[32px] border border-white/5 flex items-center justify-between group hover:bg-white/10 transition-all shadow-xl">
                      <div><p className="text-[11px] font-black text-slate-500 uppercase tracking-widest mb-1">{m.l}</p><p className="text-3xl font-black text-white tracking-tighter italic">{m.v}<span className="text-sm text-slate-700 ml-2">/ {m.max}</span></p></div>
                      <div className="w-14 h-14 rounded-2xl border-4 border-amber-500/20 flex items-center justify-center text-[11px] font-black text-amber-500">{Math.round((m.v / m.max) * 100)}%</div>
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

// --- REMAINING DASHBOARDS ---

const AdminDashboard = () => {
  const activities = [
    { u: "Anandhu Sebastian", a: "Uploaded Literature Review", t: "2 mins ago", r: "Student" },
    { u: "Prof. Neha Zade", a: "Authorized Group A-12 Valuation", t: "15 mins ago", r: "Faculty" },
    { u: "HOD CSE", a: "Accessed GRP-24-16 Log", t: "1 hour ago", r: "HOD" },
  ];
  return (
    <AppLayout activeTitle="Master Panel">
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 mb-8">
         {[
           { l: "Active Nodes", v: "1,248", i: <Cpu/>, c: "rose" },
           { l: "Authority Lvl", v: "Root-Master", i: <Shield/>, c: "emerald" },
           { l: "Uptime Pulse", v: "99.9%", i: <Activity/>, c: "blue" },
           { l: "Database Load", v: "Secure", i: <HardDrive/>, c: "indigo" },
         ].map(s => (
           <div key={s.l} className="bg-white/5 border border-white/10 rounded-[32px] p-8 group transition-all hover:bg-white/[0.08] shadow-2xl">
             <div className="flex items-center justify-between mb-6"><div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-slate-500 group-hover:scale-110 group-hover:text-white transition-all">{s.i}</div></div>
             <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1">{s.l}</p><p className="text-3xl font-black text-white uppercase italic tracking-tighter">{s.v}</p>
           </div>
         ))}
      </div>
      <div className="bg-white/5 border border-white/10 rounded-[48px] overflow-hidden shadow-2xl">
        <div className="p-10 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
           <h3 className="text-white font-black text-xl flex items-center gap-4 uppercase tracking-tighter"><MonitorDot size={24} className="text-rose-500" /> Intelligence Monitor</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead><tr className="bg-white/[0.01] border-b border-white/5">
                <th className="px-10 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Authorized User</th>
                <th className="px-10 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Action Node</th>
                <th className="px-10 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Sync</th>
            </tr></thead>
            <tbody className="divide-y divide-white/5">
              {activities.map((act, i) => (
                <tr key={i} className="hover:bg-white/[0.04] transition-all group">
                  <td className="px-10 py-7"><span className="text-sm font-bold text-white uppercase italic tracking-tight">{act.u}</span></td>
                  <td className="px-10 py-7 text-sm text-slate-400 group-hover:text-white transition-colors">{act.a}</td>
                  <td className="px-10 py-7 text-[11px] text-slate-600 font-black uppercase tracking-widest">{act.t}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppLayout>
  );
};

const StudentDashboard = () => (
  <AppLayout activeTitle="Dashboard">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-[48px] p-10 lg:p-14 shadow-2xl relative overflow-hidden group border border-white/10">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 blur-[90px] rounded-full -mr-32 -mt-32 pointer-events-none group-hover:scale-110 transition-transform duration-700" />
        <div className="relative z-10 flex flex-col sm:flex-row items-center gap-10 text-center sm:text-left">
          <div className="w-32 h-32 rounded-[40px] bg-white/20 backdrop-blur-md border-2 border-white/40 flex items-center justify-center text-6xl font-black text-white shadow-2xl">{studentInfo.name[0]}</div>
          <div>
            <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tighter leading-none uppercase italic">{studentInfo.name}</h2>
            <p className="text-indigo-100/70 text-[13px] font-black uppercase tracking-[0.3em] mt-4">{studentInfo.department}</p>
            <div className="flex gap-2 mt-8">
               <span className="bg-white/15 px-4 py-2 rounded-2xl text-[10px] font-black text-white uppercase border border-white/10">UID: {studentInfo.uid}</span>
               <span className="bg-white/15 px-4 py-2 rounded-2xl text-[10px] font-black text-white uppercase border border-white/10 italic">Term IV Cycle</span>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 lg:gap-6">
        {[
          { l: "Attendance Pulse", v: studentInfo.attendance, i: <CheckCircle2 size={18}/>, c: "emerald" },
          { l: "Cluster Node ID", v: studentInfo.group, i: <Users size={18}/>, c: "indigo" },
          { l: "Upload Sync", v: "Live", i: <Activity size={18}/>, c: "blue" },
          { l: "Term Year Node", v: "2nd Year", i: <Calendar size={18}/>, c: "rose" },
        ].map(s => (
          <div key={s.l} className="bg-white/5 border border-white/10 rounded-[32px] p-8 hover:bg-white/[0.08] transition-all shadow-xl group">
            <span className={`text-${s.c}-400 opacity-40 block mb-4 group-hover:scale-110 transition-transform`}>{s.i}</span>
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-2">{s.l}</p>
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
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin-monitor" element={<AdminDashboard />} />
        <Route path="/hod" element={<AppLayout activeTitle="Global View"><div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">{[{ l: "Dept Health", v: "Optimal", c: "emerald" }, { l: "Active Clusters", v: "16 Groups", c: "amber" }, { l: "Pending Audit", v: "04 Nodes", c: "rose" }].map(s => (<div key={s.l} className="bg-white/5 border border-white/10 p-10 rounded-[40px] group hover:bg-white/[0.08] transition-all shadow-2xl"><p className="text-slate-500 text-[11px] font-black uppercase tracking-[0.4em] mb-4">{s.l}</p><p className="text-4xl font-black text-white uppercase italic tracking-tighter leading-none">{s.v}</p></div>))}</div><div className="bg-white/5 border border-white/10 rounded-[56px] p-24 text-center border-dashed border-[3px] shadow-inner relative overflow-hidden"><Activity size={56} className="mx-auto text-slate-700 mb-8 animate-pulse opacity-40" /><p className="text-slate-600 font-black text-sm uppercase tracking-[0.6em] italic">Intelligence Node Connectivity Synchronized</p></div></AppLayout>} />
        <Route path="/hod-evaluations" element={<GroupEvaluations />} />
        <Route path="/profile" element={<StudentDashboard />} />
        <Route path="/group" element={<AppLayout activeTitle="Allotted Group"><div className="p-24 text-center border-dashed border-[3px] rounded-[56px] text-slate-700 font-black tracking-[0.5em] text-sm uppercase italic">Authorized Node: {studentInfo.group} • Lead: {studentInfo.guide}</div></AppLayout>} />
        <Route path="/status" element={<AppLayout activeTitle="My Status"><div className="p-24 text-center border-dashed border-[3px] rounded-[56px] text-slate-700 font-black tracking-[0.5em] text-sm uppercase italic">Log Sync Status: {studentInfo.uploadStatus}</div></AppLayout>} />
        <Route path="/query" element={<AppLayout activeTitle="Communication"><div className="p-24 text-center border-dashed border-[3px] rounded-[56px] text-slate-700 font-black tracking-[0.5em] text-sm uppercase italic">Encrypted Secure Line Ready</div></AppLayout>} />
        <Route path="/faculty" element={<AppLayout activeTitle="Faculty Console"><div className="p-24 text-center border-dashed border-[3px] rounded-[56px] text-slate-700 font-black tracking-[0.5em] text-sm uppercase italic">Faculty Performance Registry</div></AppLayout>} />
        <Route path="/faculty-groups" element={<AppLayout activeTitle="Assigned Batches"><div className="p-24 text-center border-dashed border-[3px] rounded-[56px] text-slate-700 font-black tracking-[0.5em] text-sm uppercase italic">Guide Registry Node Online</div></AppLayout>} />
        <Route path="/evaluate" element={<AppLayout activeTitle="Marking Terminal"><div className="bg-white/5 border border-white/10 rounded-[56px] p-14 lg:p-20 shadow-2xl relative overflow-hidden"><div className="relative z-10 mb-14 border-b border-white/10 pb-10"><h4 className="text-4xl font-black text-white mb-3 tracking-tighter uppercase italic underline decoration-indigo-500 decoration-[12px]">Assessment Stack: GRP-24-12</h4><p className="text-slate-500 text-[11px] font-black uppercase tracking-[0.5em] opacity-60">Continuous Valuation Logic • Semester IV Lifecycle</p></div><div className="space-y-5 max-w-4xl">{[{ label: "Seminar 1 Valuation", weight: "20 Marks" }, { label: "Seminar 2 Valuation", weight: "20 Marks" }, { label: "Outcome Log", weight: "30 Marks" }, { label: "Performance Pulse", weight: "30 Marks" }].map(mark => (<div key={mark.label} className="bg-white/5 border border-white/10 rounded-[32px] p-8 flex flex-col md:flex-row justify-between items-center gap-10 group hover:bg-white/[0.08] transition-all"><div className="text-center md:text-left"><p className="text-white font-black tracking-tight uppercase text-lg italic">{mark.label}</p><p className="text-slate-600 text-[11px] font-black uppercase tracking-[0.3em] mt-2">{mark.weight}</p></div><div className="flex items-center gap-5"><input type="number" placeholder="00" className="w-28 bg-[#020617] border border-white/10 rounded-2xl p-5 text-center text-white focus:border-indigo-500/50 font-black text-2xl" /><button className="bg-indigo-600 text-white p-5 rounded-2xl hover:bg-indigo-500 transition-all shadow-xl active:scale-95"><CheckCheck size={24}/></button></div></div>))}</div></div></AppLayout>} />
        <Route path="/attendance" element={<AppLayout activeTitle="Presence Log"><div className="p-24 text-center border-dashed border-[3px] rounded-[56px] text-slate-700 font-black tracking-[0.5em] text-sm uppercase italic">Biometric Identity Sync Active</div></AppLayout>} />
        <Route path="/freeze" element={<AppLayout activeTitle="Freeze Console"><div className="p-24 text-center bg-amber-600/5 rounded-[56px] text-amber-500 font-black tracking-[0.5em] text-sm uppercase italic underline decoration-amber-500/50 decoration-[8px]">System Interlock Active</div></AppLayout>} />
        <Route path="/verify" element={<AppLayout activeTitle="Audit Valuation"><div className="p-24 text-center border-dashed border-[3px] rounded-[56px] text-slate-700 font-black tracking-[0.5em] text-sm uppercase italic">Global Valuation Audit Node Verified</div></AppLayout>} />
        <Route path="/history" element={<AppLayout activeTitle="Audit Logs"><div className="p-24 text-center border-dashed border-[3px] rounded-[56px] text-slate-700 font-black tracking-[0.5em] text-sm uppercase italic">Immutable Ledger Stream Online</div></AppLayout>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <SpeedInsights />
    </BrowserRouter>
  );
}