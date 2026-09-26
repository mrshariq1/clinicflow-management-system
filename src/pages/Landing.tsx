import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  HeartPulse,
  Users,
  Calendar,
  Stethoscope,
  Pill,
  Receipt,
  FileBarChart,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Zap,
  Activity,
  Layers,
  Sparkles,
  PhoneCall,
  ChevronRight,
  Building2,
  Clock,
  ExternalLink,
  Award,
  Lock,
} from 'lucide-react';
import ContactModal from '../components/modals/ContactModal';

// Generated authentic medical imagery
import clinicHeroImg from '../assets/images/clinic_hero_facility_1790450294911.jpg';
import doctorConsultImg from '../assets/images/doctor_consult_scene_1790450308918.jpg';
import deptCardiologyImg from '../assets/images/department_cardiology_1790450343914.jpg';
import deptRadiologyImg from '../assets/images/dept_radiology_tech_1790450357024.jpg';

export default function Landing() {
  const navigate = useNavigate();
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [previewTab, setPreviewTab] = useState<'overview' | 'appointments' | 'billing'>('overview');

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* 1. Top Bar Navigation */}
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <HeartPulse className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-base text-slate-900 dark:text-white tracking-tight leading-none block">
                ClinicFlow
              </span>
              <span className="text-[10px] uppercase font-semibold text-blue-600 dark:text-blue-400 tracking-wider">
                Custom Systems
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-xs font-semibold text-slate-600 dark:text-slate-300">
            <a href="#preview" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Live Preview
            </a>
            <a href="#clinical-care" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Care Experience
            </a>
            <a href="#features" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Modules
            </a>
            <a href="#departments-showcase" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Facilities
            </a>
            <a href="#why-custom" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Why Custom
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsContactOpen(true)}
              className="hidden sm:inline-flex px-3.5 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Contact Developer
            </button>
            <button
              onClick={() => navigate('/login')}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs transition-all hover:shadow-blue-500/25"
            >
              Explore Live Demo
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* 2. Hero Section with Real Medical Facility Photography */}
      <section className="relative overflow-hidden pt-12 pb-16 md:pt-16 md:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Col: Narrative & CTAs */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-800/60 text-blue-700 dark:text-blue-300 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                Portfolio Demonstration · Custom Clinical Management Platform
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
                High-Performance Management Systems Built for Modern Healthcare
              </h1>

              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
                ClinicFlow consolidates outpatient registrations, multi-specialty doctor schedules, electronic prescriptions, and diagnostic billing into a unified, zero-bloat digital workspace designed specifically around clinical workflows.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <button
                  onClick={() => navigate('/login')}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-lg shadow-blue-500/20 transition-all cursor-pointer"
                >
                  Launch Demo Workspace
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsContactOpen(true)}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  Request Custom Build
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="pt-4 grid grid-cols-3 gap-2 sm:gap-4 border-t border-slate-200/80 dark:border-slate-800 text-xs">
                <div>
                  <span className="font-mono text-base sm:text-lg font-bold text-slate-900 dark:text-white block tabular-nums">
                    100%
                  </span>
                  <span className="text-[10px] sm:text-[11px] text-slate-500">Frontend Client Architecture</span>
                </div>
                <div>
                  <span className="font-mono text-base sm:text-lg font-bold text-slate-900 dark:text-white block tabular-nums">
                    7 Depts
                  </span>
                  <span className="text-[10px] sm:text-[11px] text-slate-500">Pre-Configured Medical Wings</span>
                </div>
                <div>
                  <span className="font-mono text-base sm:text-lg font-bold text-slate-900 dark:text-white block tabular-nums">
                    Zero Setup
                  </span>
                  <span className="text-[10px] sm:text-[11px] text-slate-500">Instant In-Browser Evaluation</span>
                </div>
              </div>
            </div>

            {/* Right Col: High-Res Medical Facility Showcase with Live Overlay */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-900 aspect-16/10 group">
                <img
                  src={clinicHeroImg}
                  alt="Modern Clinic Reception and Healthcare Center Interior"
                  width={800}
                  height={500}
                  loading="eager"
                  decoding="sync"
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
                  onError={e => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

                {/* Floating Operational Badge */}
                <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 p-3 sm:p-3.5 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-lg flex items-center justify-between text-xs min-w-0">
                  <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                    <div className="min-w-0">
                      <p className="font-bold text-slate-900 dark:text-white leading-tight truncate">
                        ClinicFlow Medical Center
                      </p>
                      <p className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 truncate">
                        18 Specialists On-Duty · Outpatient Wing A
                      </p>
                    </div>
                  </div>
                  <span className="px-2 sm:px-2.5 py-1 rounded-md bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-semibold text-[10px] sm:text-[11px] shrink-0">
                    Active Status
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Interactive Live Dashboard Preview */}
      <section id="preview" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 w-full">
        <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            Interactive Workspace Preview
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Explore the Real System in Action
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Switch between modules below to review live clinic metrics, appointment schedules, and billing clearance.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden">
          {/* Mock Browser Header */}
          <div className="px-4 py-3 bg-slate-100 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-400" />
              <span className="w-3 h-3 rounded-full bg-amber-400" />
              <span className="w-3 h-3 rounded-full bg-emerald-400" />
              <span className="ml-2 text-xs font-mono text-slate-400 hidden sm:inline">
                https://demo.clinicflow.app/dashboard
              </span>
            </div>

            <div className="flex items-center gap-1 bg-slate-200/60 dark:bg-slate-700/60 p-1 rounded-lg text-xs font-medium overflow-x-auto max-w-full">
              <button
                onClick={() => setPreviewTab('overview')}
                className={`px-2.5 sm:px-3 py-1 rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                  previewTab === 'overview'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-2xs font-semibold'
                    : 'text-slate-600 dark:text-slate-300'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setPreviewTab('appointments')}
                className={`px-2.5 sm:px-3 py-1 rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                  previewTab === 'appointments'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-2xs font-semibold'
                    : 'text-slate-600 dark:text-slate-300'
                }`}
              >
                Today's Schedule
              </button>
              <button
                onClick={() => setPreviewTab('billing')}
                className={`px-2.5 sm:px-3 py-1 rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                  previewTab === 'billing'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-2xs font-semibold'
                    : 'text-slate-600 dark:text-slate-300'
                }`}
              >
                Revenue
              </button>
            </div>
          </div>

          {/* Interactive Preview Content */}
          <div className="p-6 sm:p-8 bg-slate-50/50 dark:bg-slate-950/50 space-y-6">
            {previewTab === 'overview' && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xs">
                    <span className="text-xs text-slate-400 uppercase font-bold">Total Patients</span>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1 tabular-nums">1,284</p>
                    <span className="text-xs text-emerald-600 font-semibold">+12.5% this month</span>
                  </div>
                  <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xs">
                    <span className="text-xs text-slate-400 uppercase font-bold">Today's Visits</span>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1 tabular-nums">36</p>
                    <span className="text-xs text-emerald-600 font-semibold">+8.2% vs yesterday</span>
                  </div>
                  <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xs">
                    <span className="text-xs text-slate-400 uppercase font-bold">Revenue</span>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1 tabular-nums">$24,680</p>
                    <span className="text-xs text-emerald-600 font-semibold">+14.6% margin</span>
                  </div>
                  <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xs">
                    <span className="text-xs text-slate-400 uppercase font-bold">Doctors</span>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1 tabular-nums">18</p>
                    <span className="text-xs text-slate-400">All departments active</span>
                  </div>
                </div>

                <div className="p-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      Instant Access to Demo Workspace
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Test-drive adding patients, generating prescriptions, and printing invoices directly.
                    </p>
                  </div>
                  <button
                    onClick={() => navigate('/login')}
                    className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs self-start sm:self-auto cursor-pointer"
                  >
                    Open Full System →
                  </button>
                </div>
              </div>
            )}

            {previewTab === 'appointments' && (
              <div className="space-y-2.5 sm:space-y-3">
                <div className="p-3 sm:p-3.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2.5 sm:gap-3">
                    <span className="font-mono font-bold text-blue-600 shrink-0">08:30 AM</span>
                    <div className="min-w-0">
                      <span className="font-bold text-slate-900 dark:text-white">Ahmed Khan</span>
                      <span className="text-slate-400 mx-1.5">·</span>
                      <span className="text-slate-500">Dr. Sarah Ahmed (Cardiology)</span>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[11px] font-semibold self-start sm:self-auto">
                    Confirmed
                  </span>
                </div>

                <div className="p-3 sm:p-3.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2.5 sm:gap-3">
                    <span className="font-mono font-bold text-blue-600 shrink-0">10:00 AM</span>
                    <div className="min-w-0">
                      <span className="font-bold text-slate-900 dark:text-white">Ayesha Noor</span>
                      <span className="text-slate-400 mx-1.5">·</span>
                      <span className="text-slate-500">Dr. Hamza Khan (General)</span>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-700 text-[11px] font-semibold self-start sm:self-auto">
                    Pending
                  </span>
                </div>

                <div className="p-3 sm:p-3.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2.5 sm:gap-3">
                    <span className="font-mono font-bold text-blue-600 shrink-0">12:30 PM</span>
                    <div className="min-w-0">
                      <span className="font-bold text-slate-900 dark:text-white">Usman Ali</span>
                      <span className="text-slate-400 mx-1.5">·</span>
                      <span className="text-slate-500">Dr. Omar Farooq (Neurology)</span>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 text-[11px] font-semibold self-start sm:self-auto">
                    Completed
                  </span>
                </div>
              </div>
            )}

            {previewTab === 'billing' && (
              <div className="p-4 sm:p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                  <span className="text-slate-500 font-semibold uppercase">Monthly Settlement Velocity</span>
                  <span className="font-bold text-emerald-600 tabular-nums">$21,800 Cleared / $2,880 Pending</span>
                </div>
                <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden flex">
                  <div className="h-full bg-emerald-500" style={{ width: '88%' }} />
                  <div className="h-full bg-amber-400" style={{ width: '12%' }} />
                </div>
                <p className="text-xs text-slate-400">
                  Automated receipt generation with downloadable and printable PDF layouts.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 4. Clinical Care Spotlight with Doctor-Patient Consultation Scene */}
      <section id="clinical-care" className="py-16 md:py-20 bg-white dark:bg-slate-900/60 border-t border-slate-200/80 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Consultation Photography */}
            <div className="lg:col-span-6 relative">
              <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-800 aspect-4/3 group">
                <img
                  src={doctorConsultImg}
                  alt="Doctor consulting with patient in modern consultation room"
                  width={640}
                  height={480}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
                  onError={e => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
              <div className="absolute -bottom-4 -right-4 p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xl text-xs max-w-xs hidden sm:block">
                <div className="flex items-center gap-2 text-emerald-600 font-bold mb-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Real-Time Clinical Charting</span>
                </div>
                <p className="text-slate-500 dark:text-slate-400 text-[11px] leading-snug">
                  Physicians enter vitals, diagnostics, and prescriptions directly into the patient timeline without delays.
                </p>
              </div>
            </div>

            {/* Narrative Content */}
            <div className="lg:col-span-6 space-y-5">
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                Physician & Patient Experience
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight">
                Designed for Consultation Rooms, Not Bureaucracy
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Traditional healthcare software burdens doctors with 15-click forms and confusing navigation. ClinicFlow prioritizes clinical focus: rapid electronic notes, 1-click drug dosage entry, and instant printable letterheads.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Activity className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                      Instant Patient Medical Timeline
                    </h4>
                    <p className="text-xs text-slate-500">
                      Blood type, allergies, emergency contacts, and past clinical visits visible at a glance.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Pill className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                      Smart Multi-Drug Prescription Builder
                    </h4>
                    <p className="text-xs text-slate-500">
                      Add multiple medications with dosage, frequency, and instructions, ready for official print.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-lg bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                      Queue & Bed Status Visibility
                    </h4>
                    <p className="text-xs text-slate-500">
                      Never wonder which room is occupied or which patient has checked in at reception.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Medical Departments & Infrastructure Showcase */}
      <section id="departments-showcase" className="py-16 md:py-20 bg-slate-50 dark:bg-slate-950 border-t border-slate-200/80 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              Specialized Infrastructure
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Multi-Department Hospital & Clinic Roster
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Pre-configured suites for specialized departments with high-precision diagnostics and capacity planning.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Cardiology Suite Card */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-all flex flex-col justify-between">
              <div>
                <div className="aspect-16/9 overflow-hidden bg-slate-100 dark:bg-slate-800 relative">
                  <img
                    src={deptCardiologyImg}
                    alt="Cardiology Diagnostic Suite and Cardiac Monitoring Room"
                    width={640}
                    height={360}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                    onError={e => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-white/90 dark:bg-slate-900/90 text-xs font-semibold text-blue-600 backdrop-blur-xs">
                    12 Clinical Suites
                  </div>
                </div>
                <div className="p-5 space-y-2">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Department of Cardiology & Diagnostics
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Lead: <strong>Dr. Sarah Ahmed</strong> · Non-invasive cardiac ultrasound, Holter monitoring, stress test scheduling, and preventative cardiovascular health tracking.
                  </p>
                </div>
              </div>
              <div className="px-5 pb-5 pt-2 flex items-center justify-between text-xs border-t border-slate-100 dark:border-slate-800">
                <span className="text-slate-400">4 Physicians On Duty</span>
                <button
                  onClick={() => navigate('/login')}
                  className="font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                >
                  View Department Schedule →
                </button>
              </div>
            </div>

            {/* Radiology & Neurology Suite Card */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-all flex flex-col justify-between">
              <div>
                <div className="aspect-16/9 overflow-hidden bg-slate-100 dark:bg-slate-800 relative">
                  <img
                    src={deptRadiologyImg}
                    alt="Neurology & High-Precision Radiology Suite"
                    width={640}
                    height={360}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                    onError={e => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-white/90 dark:bg-slate-900/90 text-xs font-semibold text-blue-600 backdrop-blur-xs">
                    6 Imaging Labs
                  </div>
                </div>
                <div className="p-5 space-y-2">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Department of Neurology & Diagnostic Imaging
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Lead: <strong>Dr. Omar Farooq</strong> · Advanced brain scan coordination, sleep apnea diagnostic telemetry, neurological reflex assessments, and digital radiology logs.
                  </p>
                </div>
              </div>
              <div className="px-5 pb-5 pt-2 flex items-center justify-between text-xs border-t border-slate-100 dark:border-slate-800">
                <span className="text-slate-400">3 Specialists On Duty</span>
                <button
                  onClick={() => navigate('/login')}
                  className="font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                >
                  View Department Schedule →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Core Modules Grid */}
      <section id="features" className="py-20 bg-white dark:bg-slate-900/60 border-t border-slate-200/80 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              Complete Clinic Infrastructure
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Every Module Designed for Operational Velocity
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Eliminate paper records, double-booking errors, and manual billing reconciliation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200/60 dark:border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Patient EHR Records</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Centralized medical history, emergency contacts, blood group tracking, allergies, and visit timelines.
              </p>
            </div>

            <div className="p-6 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200/60 dark:border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <Calendar className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Smart Scheduling</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Calendar and list views with real-time status transitions (Confirmed, Pending, Completed, Cancelled).
              </p>
            </div>

            <div className="p-6 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200/60 dark:border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                <Stethoscope className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Physician Roster</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Staff directory with weekly on-duty schedules, specializations, consulting rooms, and patient ratings.
              </p>
            </div>

            <div className="p-6 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200/60 dark:border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950/80 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                <Pill className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Digital Prescriptions</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Dynamic medication prescribing with dosage, frequency, and an official printable letterhead layout.
              </p>
            </div>

            <div className="p-6 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200/60 dark:border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                <Receipt className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Billing & Invoices</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Invoice generation with itemized diagnostic charges, payment method tracking, and printable receipts.
              </p>
            </div>

            <div className="p-6 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200/60 dark:border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-rose-100 dark:bg-rose-950/80 text-rose-600 dark:text-rose-400 flex items-center justify-center">
                <FileBarChart className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Analytics & Reports</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Operational velocity, department revenue yields, patient wait time metrics, and exportable data.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Why Custom Systems vs Generic Software */}
      <section id="why-custom" className="py-20 bg-slate-50 dark:bg-slate-950 border-t border-slate-200/80 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                Tailored Architecture
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight">
                Why Custom Systems Outperform Commercial Bloatware
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Generic medical software forces clinics into paying thousands per physician per month while navigating outdated, sluggish forms. ClinicFlow demonstrates how clean, purpose-built business software can match your clinic's exact operational flow.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">Zero Bloat & Fast Clinical Entry</h4>
                    <p className="text-xs text-slate-500">Only the fields, queues, and workflows your clinicians actually need.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">Specialty Customization</h4>
                    <p className="text-xs text-slate-500">Easily tailor forms for Dental, Cardiology, Dermatology, or Orthopedics.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">Direct Production Deployability</h4>
                    <p className="text-xs text-slate-500">Instant Vercel deployment, zero server configuration required.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Private Practices</h4>
                <p className="text-xs text-slate-500 mt-1">Single-doctor clinics needing streamlined appointments and prescriptions.</p>
              </div>
              <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Dental Clinics</h4>
                <p className="text-xs text-slate-500 mt-1">Procedure billing, multi-chair schedule management, and recall alerts.</p>
              </div>
              <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Diagnostic Centers</h4>
                <p className="text-xs text-slate-500 mt-1">Pathology intake, lab report generation, and payment status tracking.</p>
              </div>
              <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Multi-Wing Clinics</h4>
                <p className="text-xs text-slate-500 mt-1">Multi-department triage, staff rosters, and patient capacity routing.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Call to Action Banner */}
      <section className="py-16 bg-gradient-to-br from-blue-900 via-indigo-950 to-slate-950 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Need a Custom Management System for Your Business?
          </h2>
          <p className="text-xs sm:text-sm text-blue-200 max-w-xl mx-auto leading-relaxed">
            ClinicFlow is a portfolio demonstration of how custom business management software can be designed around your specific workflow. Let's discuss a tailored build for your clinic or enterprise.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => setIsContactOpen(true)}
              className="px-6 py-3.5 text-xs sm:text-sm font-semibold text-slate-900 bg-white hover:bg-slate-100 rounded-xl shadow-lg transition-colors cursor-pointer"
            >
              Contact Developer for Custom Build
            </button>
            <button
              onClick={() => navigate('/login')}
              className="px-6 py-3.5 text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors cursor-pointer"
            >
              Open Live Demo
            </button>
          </div>
        </div>
      </section>

      {/* 9. Footer */}
      <footer className="mt-auto py-8 bg-white dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-800 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <HeartPulse className="w-4 h-4 text-blue-600" />
            <span className="font-bold text-slate-800 dark:text-slate-200">ClinicFlow Custom Systems</span>
          </div>

          <p className="text-center text-[11px] text-slate-400">
            ClinicFlow is a portfolio demonstration using fictional demo data and is not intended for real medical record management.
          </p>

          <div className="flex items-center gap-4 text-xs">
            <button onClick={() => navigate('/login')} className="hover:text-blue-600 cursor-pointer">
              Demo Login
            </button>
            <button onClick={() => setIsContactOpen(true)} className="hover:text-blue-600 cursor-pointer">
              Inquire
            </button>
          </div>
        </div>
      </footer>

      {/* Contact Inquiry Modal */}
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </div>
  );
}
