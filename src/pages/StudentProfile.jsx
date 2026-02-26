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
  Calendar,
  ShieldCheck,
  BookOpen,
  Award,
  Users,
  Building2,
  Lock,
  Search,
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
  department: "CSE (CYBER SECURITY)",
  email: "anandhuseban@gmail.com",
  uid: "24004048",
  mobile: "8330869045",
  gender: "Male",
  dob: "July 22, 2004",
  rollNo: "44",
  year: "Second Year",
  semester: "Semester IV",
  guide: "Neha Zade",
  group: "Group A",
  projectTitle: "AuthenFlow – Role-Based Project Management System",
  admissionYear: "2023",
};

// --- Sub-components ---

function InfoTile({ icon, label, value, delay = 0 }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-white/5 border border-white/5 rounded-2xl p-4 flex items-center gap-4 group hover:bg-white/10 hover:border-white/10 transition-all duration-300"
    >
      <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-0.5">{label}</p>
        <p className="text-slate-200 font-semibold text-sm truncate">{value}</p>
      </div>
    </motion.div>
  );
}

function SectionWrapper({ title, icon, children, delay = 0 }) {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 shadow-2xl mb-8 overflow-hidden group"
    >
      <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
        {React.cloneElement(icon, { size: 120 })}
      </div>
      <div className="flex items-center gap-3 mb-6 relative z-10">
        <div className="p-2 bg-indigo-500/20 rounded-lg text-indigo-400">
          {React.cloneElement(icon, { size: 20 })}
        </div>
        <h3 className="text-lg font-bold text-white tracking-tight">{title}</h3>
      </div>
      <div className="relative z-10">{children}</div>
    </motion.section>
  );
}

function StudentProfileContent() {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState("My Profile");

  return (
    <div className="flex min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-indigo-500/30">
      
      {/* --- Animated Background Blobs --- */}
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
            <Link
              key={item.label}
              to={item.path}
              onClick={() => setActiveNav(item.label)}
              className="block relative group"
            >
              <div className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                activeNav === item.label 
                ? "text-white" 
                : "text-slate-500 hover:text-slate-300 hover:bg-white/5"
              }`}>
                {activeNav === item.label && (
                  <motion.div 
                    layoutId="sidebarActive"
                    className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-lg shadow-indigo-600/20"
                  />
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
        
        {/* Top Header */}
        <header className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">Student Profile</h1>
            <p className="text-slate-500 text-sm mt-1">Manage your academic identity and personal records.</p>
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

        {/* --- Profile Banner Card --- */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative bg-gradient-to-r from-indigo-600 to-purple-600 rounded-[32px] p-10 mb-10 shadow-2xl shadow-indigo-500/20 overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[80px] rounded-full -mr-20 -mt-20 pointer-events-none" />
          
          <div className="relative flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", damping: 12, stiffness: 200, delay: 0.2 }}
              className="w-32 h-32 rounded-[40px] bg-white/20 backdrop-blur-md border-4 border-white/30 flex items-center justify-center text-5xl font-black text-white shadow-2xl"
            >
              {student.name[0]}
            </motion.div>
            
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-3 justify-center md:justify-start">
                <h2 className="text-4xl font-black text-white tracking-tight">{student.name}</h2>
                <span className="bg-emerald-400/20 text-emerald-300 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-emerald-400/30">Active Student</span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-8 text-indigo-100/80 text-sm font-medium">
                <div className="flex items-center gap-2 justify-center md:justify-start">
                  <Award size={16} className="text-indigo-200" /> {student.department}
                </div>
                <div className="flex items-center gap-2 justify-center md:justify-start">
                  <Mail size={16} className="text-indigo-200" /> {student.email}
                </div>
                <div className="flex items-center gap-2 justify-center md:justify-start">
                  <ShieldCheck size={16} className="text-indigo-200" /> UID: {student.uid}
                </div>
                <div className="flex items-center gap-2 justify-center md:justify-start">
                  <Calendar size={16} className="text-indigo-200" /> Admitted: {student.admissionYear}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* --- Content Sections --- */}
        <div className="grid grid-cols-1 gap-8">
          
          {/* Section: Personal Info */}
          <SectionWrapper title="Personal Information" icon={<User />} delay={0.1}>
            <div className="bg-indigo-500/5 border border-indigo-500/10 rounded-2xl p-4 mb-6 flex items-center gap-4">
              <div className="p-2 bg-indigo-500/20 rounded-lg text-indigo-400">
                <Lock size={16} />
              </div>
              <p className="text-xs text-indigo-300/80 font-medium">
                Profile editing is restricted. Contact your department administrator to request changes.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <InfoTile icon={<User />} label="Full Name" value={student.name} delay={0.2} />
              <InfoTile icon={<ShieldCheck />} label="Student UID" value={student.uid} delay={0.25} />
              <InfoTile icon={<Mail />} label="Email Address" value={student.email} delay={0.3} />
              <InfoTile icon={<Phone />} label="Mobile Number" value={student.mobile} delay={0.35} />
              <InfoTile icon={<Users />} label="Gender" value={student.gender} delay={0.4} />
              <InfoTile icon={<Calendar />} label="Date of Birth" value={student.dob} delay={0.45} />
            </div>
          </SectionWrapper>

          {/* Section: Academic Info */}
          <SectionWrapper title="Academic Records" icon={<BookOpen />} delay={0.2}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <InfoTile icon={<Award />} label="Roll Number" value={student.rollNo} delay={0.3} />
              <InfoTile icon={<Calendar />} label="Academic Year" value={student.year} delay={0.35} />
              <InfoTile icon={<BookOpen />} label="Current Semester" value={student.semester} delay={0.4} />
              <InfoTile icon={<Building2 />} label="Admission Year" value={student.admissionYear} delay={0.45} />
              <InfoTile icon={<Users />} label="Assigned Guide" value={student.guide} delay={0.5} />
              <InfoTile icon={<Users />} label="Project Group" value={student.group} delay={0.55} />
            </div>
            
            {/* Project Full Width Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              className="bg-gradient-to-br from-indigo-500/10 to-purple-600/10 border border-indigo-500/20 rounded-2xl p-6 flex items-start gap-5"
            >
              <div className="w-12 h-12 bg-indigo-500 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg shadow-indigo-500/20">
                <LayoutDashboard size={24} />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-indigo-400 font-black mb-1">Microproject Title</p>
                <h4 className="text-lg font-bold text-white leading-tight">{student.projectTitle}</h4>
              </div>
            </motion.div>
          </SectionWrapper>

          {/* Section: Security */}
          <SectionWrapper title="Account Security" icon={<Lock />} delay={0.3}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
              <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InfoTile icon={<Lock />} label="Password Status" value="Secure (Last changed 2 months ago)" delay={0.4} />
                <InfoTile icon={<Calendar />} label="Last Activity" value="Today, 19:42 PM" delay={0.45} />
              </div>
              <div className="flex flex-col gap-3">
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 shadow-xl shadow-indigo-600/20"
                >
                  <Lock size={18} /> Change Password
                </motion.button>
              </div>
            </div>
          </SectionWrapper>

        </div>

        {/* Footer */}
        <footer className="mt-20 pt-10 border-t border-white/5 text-center">
          <p className="text-slate-600 text-[10px] uppercase tracking-[0.4em] font-black">
            AuthenFlow Student Management Interface • Build 4.2.0
          </p>
        </footer>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <StudentProfileContent />
    </BrowserRouter>
  );
}