import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useClinic } from '../context/ClinicContext';
import {
  HeartPulse,
  Lock,
  Mail,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Building2,
  Users,
} from 'lucide-react';

// Clinic interior photography
import clinicHeroImg from '../assets/images/clinic_hero_facility_1790450294911.jpg';

export default function Login() {
  const [email, setEmail] = useState('demo@clinicflow.com');
  const [password, setPassword] = useState('demo123');
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');

  const { login } = useAuth();
  const { showToast } = useClinic();
  const navigate = useNavigate();

  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Please provide an email and password.');
      return;
    }

    login({ email });
    showToast('✓ Welcome back, Dr. Alexander Wright!', 'success');
    navigate('/dashboard');
  };

  const handleQuickDemoLogin = () => {
    setEmail('demo@clinicflow.com');
    setPassword('demo123');
    login({ email: 'demo@clinicflow.com' });
    showToast('✓ Signed in with ClinicFlow Demo Credentials', 'success');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans">
      {/* Left Column: Login Form */}
      <div className="flex-1 flex flex-col justify-center px-6 sm:px-12 lg:px-16 py-12 max-w-xl mx-auto w-full">
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6 group">
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <HeartPulse className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-base text-slate-900 dark:text-white tracking-tight leading-none block">
                ClinicFlow
              </span>
              <span className="text-[10px] uppercase font-semibold text-blue-600 dark:text-blue-400 tracking-wider">
                Management System
              </span>
            </div>
          </Link>

          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Welcome to ClinicFlow
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Access your clinic workspace, patient roster, and electronic medical records.
          </p>
        </div>

        {/* 1-Click Demo Login Banner */}
        <div className="mb-6 p-4 rounded-2xl bg-blue-50/80 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-800/60 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-blue-700 dark:text-blue-300">
              <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>Instant Portfolio Evaluation</span>
            </div>
            <span className="text-[11px] font-mono text-blue-600/80 dark:text-blue-300/80">1-Click</span>
          </div>
          <p className="text-xs text-blue-900/80 dark:text-blue-200/80">
            Skip manual credential entry and instantly access the fully populated admin dashboard:
          </p>
          <button
            type="button"
            onClick={handleQuickDemoLogin}
            className="w-full mt-2 py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            Use Demo Account (Instant Access)
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Manual Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          {error && (
            <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 text-rose-700 dark:text-rose-300 text-xs">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="demo@clinicflow.com"
                className="w-full pl-9 pr-3 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="demo123"
                className="w-full pl-9 pr-3 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center gap-2 cursor-pointer text-slate-600 dark:text-slate-400">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={e => setRememberMe(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded"
              />
              <span>Remember me</span>
            </label>
            <span className="text-slate-400 font-mono">Password: demo123</span>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 px-4 bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors cursor-pointer"
          >
            Sign In to Dashboard
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 text-center">
          <p className="text-xs text-slate-400">
            Portfolio project demo · No real medical data is stored.
          </p>
        </div>
      </div>

      {/* Right Column: Hero Showcase with Authentic Medical Photography (Desktop only) */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden bg-slate-950 text-white">
        <img
          src={clinicHeroImg}
          alt="Modern Clinic Facility Reception"
          width={1200}
          height={800}
          loading="eager"
          decoding="sync"
          className="absolute inset-0 w-full h-full object-cover opacity-40 scale-105"
          onError={e => {
            e.currentTarget.style.display = 'none';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/40" />

        <div className="relative z-10 p-12 flex flex-col justify-between h-full w-full">
          <div className="space-y-4 max-w-md">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold border border-blue-400/30 backdrop-blur-xs">
              <ShieldCheck className="w-3.5 h-3.5" />
              Custom Healthcare Architecture
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight leading-snug">
              Precision Management Software for Modern Clinics
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              Engineered to demonstrate enterprise-grade state synchronization, responsive design patterns, and domain-authentic healthcare user interfaces.
            </p>
          </div>

          {/* Highlights */}
          <div className="space-y-3 max-w-sm text-xs bg-slate-900/80 backdrop-blur-md p-5 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-2.5 text-slate-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Interactive appointments calendar with real queues</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Multi-medicine digital prescription generation & print</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Itemized billing statements with receipt export</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-800/80 pt-4">
            <span>ClinicFlow Medical Center</span>
            <span className="font-mono">Demo Environment · v1.2</span>
          </div>
        </div>
      </div>
    </div>
  );
}
