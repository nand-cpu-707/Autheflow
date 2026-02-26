import React, { useState } from 'react';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Lock, 
  Eye, 
  EyeOff, 
  ChevronRight, 
  GraduationCap, 
  Presentation, 
  ShieldCheck,
  Loader2,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';

const roles = [
  { key: "Student", label: "Student", icon: <GraduationCap size={18} />, uidLabel: "Student UID", placeholder: "Enter your UID" },
  { key: "Guide", label: "Guide", icon: <Presentation size={18} />, uidLabel: "Guide ID", placeholder: "Enter your Guide ID" },
  { key: "Admin", label: "Admin", icon: <ShieldCheck size={18} />, uidLabel: "Admin Username", placeholder: "Enter your username" },
];

const dummyCredentials = {
  Student: { uid: "24004048", password: "pass@123" }, // Matches Anandhu's UID
  Guide: { uid: "GUIDE001", password: "guide@123" },
  Admin: { uid: "admin", password: "admin@123" },
};

function LoginPageContent() {
  const navigate = useNavigate();
  const [activeRole, setActiveRole] = useState("Student");
  const [uid, setUid] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const currentRoleConfig = roles.find((r) => r.key === activeRole);

  const switchRole = (key) => {
    setActiveRole(key);
    setUid("");
    setPassword("");
    setError("");
    setSuccess("");
  };

  const handleLogin = async () => {
    setError("");
    setSuccess("");

    if (!uid.trim() || !password.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    setIsLoggingIn(true);
    await new Promise(r => setTimeout(r, 1200));

    const creds = dummyCredentials[activeRole];

    if (uid === creds.uid && password === creds.password) {
      setSuccess(`Welcome back! Authenticated as ${activeRole}.`);
      
      setTimeout(() => {
        setIsLoggingIn(false);
        // Navigate based on your App.jsx routes
        if (activeRole === "Student") navigate("/profile");
        else if (activeRole === "Guide") navigate("/review");
        else navigate("/notifications");
      }, 1000);
    } else {
      setIsLoggingIn(false);
      setError("Invalid credentials. Please verify your details.");
    }
  };

  return (
    <div className="min-h-screen w-full relative flex items-center justify-center overflow-hidden bg-[#020617] font-sans">
      
      {/* --- Animated Background Elements --- */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-purple-600/20 blur-[120px] rounded-full"
        />
        <motion.div 
          animate={{ scale: [1.2, 1, 1.2], x: [0, -40, 0], y: [0, 60, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[10%] -right-[10%] w-[60%] h-[60%] bg-indigo-600/15 blur-[120px] rounded-full"
        />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 pointer-events-none" />
      </div>

      <div className="relative z-10 w-full max-w-[440px] px-6">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[32px] p-8 md:p-10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)]"
        >
          {/* Logo Header */}
          <div className="flex flex-col items-center mb-8">
            <motion.div 
              whileHover={{ rotate: 10, scale: 1.1 }}
              className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20 mb-4"
            >
              <span className="text-white text-3xl font-black tracking-tighter italic">AF</span>
            </motion.div>
            <h1 className="text-white text-2xl font-bold tracking-tight">AuthenFlow</h1>
            <p className="text-indigo-400 text-[11px] font-bold uppercase tracking-[0.2em] mt-1">Project Portal</p>
          </div>

          {/* Role Switcher */}
          <div className="mb-8">
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-3 text-center">Identity</p>
            <div className="flex bg-white/5 p-1 rounded-2xl gap-1 border border-white/5">
              {roles.map((r) => (
                <button
                  key={r.key}
                  onClick={() => switchRole(r.key)}
                  className={`relative flex-1 flex flex-col items-center py-2.5 rounded-xl transition-all duration-300 ${
                    activeRole === r.key ? "text-white" : "text-slate-500 hover:text-slate-300 hover:bg-white/5"
                  }`}
                >
                  {activeRole === r.key && (
                    <motion.div 
                      layoutId="activeRoleBg"
                      className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-lg shadow-indigo-600/20"
                    />
                  )}
                  <span className="relative z-10">{r.icon}</span>
                  <span className="relative z-10 text-[11px] font-bold mt-1 tracking-wide">{r.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Form Content */}
          <div className="space-y-4">
            <AnimatePresence mode="wait">
              {error && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl text-xs flex items-center gap-3">
                  <AlertCircle size={14} /> {error}
                </motion.div>
              )}
              {success && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-4 py-3 rounded-xl text-xs flex items-center gap-3">
                  <CheckCircle2 size={14} /> {success}
                </motion.div>
              )}
            </AnimatePresence>

            <div>
              <label className="block text-slate-300 text-xs font-semibold mb-2 ml-1">{currentRoleConfig.uidLabel}</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors" size={18} />
                <input 
                  type="text"
                  value={uid}
                  onChange={(e) => setUid(e.target.value)}
                  placeholder={currentRoleConfig.placeholder}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all text-sm"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2 ml-1">
                <label className="text-slate-300 text-xs font-semibold">Password</label>
                <button className="text-indigo-400 text-[11px] font-bold hover:text-indigo-300 transition-colors">Forgot?</button>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors" size={18} />
                <input 
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-12 pr-12 text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all text-sm"
                />
                <button onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300">
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleLogin}
              disabled={isLoggingIn}
              className="w-full mt-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 shadow-xl shadow-indigo-600/20 transition-all disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden relative"
            >
              <AnimatePresence mode="wait">
                {isLoggingIn ? (
                  <motion.div key="loader" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex items-center gap-2">
                    <Loader2 className="animate-spin" size={20} /> <span>Verifying...</span>
                  </motion.div>
                ) : (
                  <motion.div key="text" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex items-center gap-2">
                    <span>Login as {activeRole}</span> <ChevronRight size={18} className="mt-0.5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <LoginPageContent />
    </BrowserRouter>
  );
}