import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useClinic } from '../../context/ClinicContext';
import StatCard from '../../components/common/StatCard';
import Badge from '../../components/common/Badge';
import {
  Users,
  Calendar,
  Stethoscope,
  DollarSign,
  UserPlus,
  CalendarPlus,
  Pill,
  Receipt,
  Clock,
  CheckCircle2,
  X,
  TrendingUp,
  Activity,
  ArrowUpRight,
  Filter,
  ShieldCheck,
  Building2,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { monthlyRevenueData, appointmentStatusDistribution } from '../../data/mockData';
import { useNavigate } from 'react-router-dom';

// Generated authentic doctor and clinic imagery
import doctorPortraitImg from '../../assets/images/doctor_portrait_lead_1790450323837.jpg';
import clinicHeroImg from '../../assets/images/clinic_hero_facility_1790450294911.jpg';

export default function Dashboard() {
  const { user } = useAuth();
  const {
    patients,
    appointments,
    doctors,
    activities,
    onboardingDismissed,
    dismissOnboarding,
    openModal,
    updateAppointmentStatus,
  } = useClinic();

  const navigate = useNavigate();
  const [chartView, setChartView] = useState<'revenue' | 'patients'>('revenue');

  // Today's formatted date
  const todayFormatted = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  // Dynamic patient counts
  const totalPatientsCount = 1284 + (patients.length - 8);
  const todayAppointments = appointments.filter(a => a.date === '2026-09-26');

  return (
    <div className="space-y-6">
      {/* 1. Onboarding / Workspace Status Banner */}
      {!onboardingDismissed && (
        <div className="relative overflow-hidden p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-blue-900 to-indigo-950 text-white shadow-sm border border-blue-800/60">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <h3 className="text-sm font-bold tracking-tight">Clinic Operational Workspace Ready</h3>
              </div>
              <p className="text-xs text-blue-200">
                ClinicFlow is loaded with 7 active medical departments, physician rosters, electronic health records, and billing receipts.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-xs">
              <div className="flex items-center gap-1.5 text-blue-200 bg-blue-800/40 px-2.5 py-1 rounded-lg border border-blue-700/40">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Verified EHR</span>
              </div>
              <div className="flex items-center gap-1.5 text-blue-200 bg-blue-800/40 px-2.5 py-1 rounded-lg border border-blue-700/40">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>18 Physicians Active</span>
              </div>
              <div className="flex items-center gap-1.5 text-blue-200 bg-blue-800/40 px-2.5 py-1 rounded-lg border border-blue-700/40">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Billing System</span>
              </div>
              <button
                onClick={dismissOnboarding}
                className="p-1 rounded-lg text-blue-300 hover:text-white hover:bg-blue-800/60 transition-colors ml-1 cursor-pointer"
                aria-label="Dismiss setup banner"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Premium Dashboard Hero Area with Realistic Doctor Avatar */}
      <div className="p-4 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-5">
        <div className="flex items-center gap-3 sm:gap-4 min-w-0">
          <div className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-2xl overflow-hidden shadow-md border-2 border-white dark:border-slate-800 shrink-0 bg-blue-600 flex items-center justify-center text-white font-bold text-lg sm:text-xl">
            <span className="select-none">
              {user?.name ? user.name.split(' ').map(n => n[0]).join('').slice(0, 2) : 'AW'}
            </span>
            <img
              src={doctorPortraitImg}
              alt={user?.name || 'Dr. Alexander Wright'}
              width={64}
              height={64}
              loading="eager"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover"
              onError={e => {
                e.currentTarget.style.display = 'none';
              }}
            />
            <span className="absolute bottom-1 right-1 w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-900 z-10" />
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white truncate">
                Good Morning, {user?.name || 'Dr. Alexander Wright'}
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1 sm:line-clamp-none">
              ClinicFlow Medical Center · Outpatient Unit A · All 7 departments operating normally
            </p>
          </div>
        </div>

        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 sm:gap-3 shrink-0">
          <div className="px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700 flex items-center gap-2 text-xs font-medium text-slate-600 dark:text-slate-300">
            <Calendar className="w-4 h-4 text-blue-500 shrink-0" />
            <span className="whitespace-nowrap">{todayFormatted}</span>
          </div>

          <button
            onClick={() => openModal('addAppointment')}
            className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-xs transition-colors cursor-pointer whitespace-nowrap"
          >
            <CalendarPlus className="w-3.5 h-3.5" />
            + New Appointment
          </button>
        </div>
      </div>

      {/* 3. Smart Quick Actions Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
        <button
          onClick={() => openModal('addPatient')}
          className="flex items-center gap-2.5 sm:gap-3 p-3 sm:p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-xs transition-all text-left group cursor-pointer min-w-0"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center group-hover:scale-105 transition-transform shrink-0">
            <UserPlus className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-bold text-slate-900 dark:text-white truncate">Add Patient</p>
            <p className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 truncate">Register profile</p>
          </div>
        </button>

        <button
          onClick={() => openModal('addAppointment')}
          className="flex items-center gap-2.5 sm:gap-3 p-3 sm:p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs hover:border-emerald-500 dark:hover:border-emerald-500 hover:shadow-xs transition-all text-left group cursor-pointer min-w-0"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center group-hover:scale-105 transition-transform shrink-0">
            <CalendarPlus className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-bold text-slate-900 dark:text-white truncate">New Booking</p>
            <p className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 truncate">Doctor schedule</p>
          </div>
        </button>

        <button
          onClick={() => openModal('addPrescription')}
          className="flex items-center gap-2.5 sm:gap-3 p-3 sm:p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs hover:border-indigo-500 dark:hover:border-indigo-500 hover:shadow-xs transition-all text-left group cursor-pointer min-w-0"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center group-hover:scale-105 transition-transform shrink-0">
            <Pill className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-bold text-slate-900 dark:text-white truncate">Write Rx</p>
            <p className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 truncate">Medication plan</p>
          </div>
        </button>

        <button
          onClick={() => openModal('addInvoice')}
          className="flex items-center gap-2.5 sm:gap-3 p-3 sm:p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs hover:border-amber-500 dark:hover:border-amber-500 hover:shadow-xs transition-all text-left group cursor-pointer min-w-0"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center group-hover:scale-105 transition-transform shrink-0">
            <Receipt className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-bold text-slate-900 dark:text-white truncate">Create Invoice</p>
            <p className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 truncate">Billing receipt</p>
          </div>
        </button>
      </div>

      {/* 4. Advanced Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Patients"
          value={totalPatientsCount.toLocaleString()}
          change="+12.5%"
          trend="up"
          icon={Users}
          color="blue"
        />
        <StatCard
          title="Today's Appointments"
          value="36"
          change="+8.2%"
          trend="up"
          icon={Calendar}
          color="emerald"
        />
        <StatCard
          title="Monthly Revenue"
          value="$24,680"
          change="+14.6%"
          trend="up"
          icon={DollarSign}
          color="indigo"
        />
        <StatCard
          title="Available Doctors"
          value="18"
          subtext="18 currently on duty"
          icon={Stethoscope}
          color="amber"
        />
      </div>

      {/* 5. Main Charts & Clinic Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Revenue / Patient Growth Chart */}
        <div className="lg:col-span-2 p-5 sm:p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                {chartView === 'revenue' ? 'Monthly Revenue Analytics' : 'Patient Registration Intake'}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {chartView === 'revenue' ? 'Past 6 months clinic income trajectory' : 'Growth across all outpatient clinics'}
              </p>
            </div>

            <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
              <button
                onClick={() => setChartView('revenue')}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                  chartView === 'revenue'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-2xs font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Revenue ($)
              </button>
              <button
                onClick={() => setChartView('patients')}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                  chartView === 'patients'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-2xs font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Patients (Total)
              </button>
            </div>
          </div>

          <div className="h-64 sm:h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              {chartView === 'revenue' ? (
                <AreaChart data={monthlyRevenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563EB" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#2563EB" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" opacity={0.6} />
                  <XAxis dataKey="month" stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis
                    stroke="#94A3B8"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={val => `$${val / 1000}k`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0F172A',
                      borderColor: '#1E293B',
                      borderRadius: '0.75rem',
                      color: '#FFFFFF',
                      fontSize: '12px',
                    }}
                    formatter={(value: any) => [`$${value.toLocaleString()}`, 'Revenue']}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#2563EB"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#revenueGrad)"
                  />
                </AreaChart>
              ) : (
                <AreaChart data={monthlyRevenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="patientsGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" opacity={0.6} />
                  <XAxis dataKey="month" stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0F172A',
                      borderColor: '#1E293B',
                      borderRadius: '0.75rem',
                      color: '#FFFFFF',
                      fontSize: '12px',
                    }}
                    formatter={(value: any) => [value.toLocaleString(), 'Patients']}
                  />
                  <Area
                    type="monotone"
                    dataKey="patients"
                    stroke="#10B981"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#patientsGrad)"
                  />
                </AreaChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>

        {/* Clinic Overview Metrics & Appointment Status */}
        <div className="p-5 sm:p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">Clinic Operational Health</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Real-time facility load indicators</p>

            <div className="space-y-4 mt-5">
              <div>
                <div className="flex justify-between items-center text-xs mb-1.5">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">Patient Bed Capacity</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white tabular-nums">78%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 rounded-full transition-all duration-500" style={{ width: '78%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center text-xs mb-1.5">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">Appointments Completed</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white tabular-nums">86%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full transition-all duration-500" style={{ width: '86%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center text-xs mb-1.5">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">Doctor Availability</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white tabular-nums">92%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500 rounded-full transition-all duration-500" style={{ width: '92%' }} />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-5 mt-5 border-t border-slate-100 dark:border-slate-800">
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block mb-2">
              Appointment Distribution
            </span>
            <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400">
              {appointmentStatusDistribution.map(item => (
                <div key={item.name} className="flex items-center gap-1.5 shrink-0">
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                  <span className="text-[11px] sm:text-xs">{item.name}: <strong className="text-slate-700 dark:text-slate-200 tabular-nums">{item.value}%</strong></span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 6. Today's Schedule & Recent Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Schedule (2 cols on desktop) */}
        <div className="lg:col-span-2 p-5 sm:p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">Today's Clinic Schedule</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {todayAppointments.length} confirmed outpatient visits today
              </p>
            </div>
            <button
              onClick={() => navigate('/appointments')}
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              View Full Calendar
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {todayAppointments.map(apt => (
              <div
                key={apt.id}
                className="py-3 sm:py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/60 dark:hover:bg-slate-800/40 rounded-xl px-2 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="px-2.5 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-mono text-xs font-bold shrink-0">
                    {apt.time}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-900 dark:text-white">
                        {apt.patientName}
                      </span>
                      <span className="text-slate-400 text-xs">·</span>
                      <span className="text-xs text-slate-600 dark:text-slate-300">{apt.type}</span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      Physician: <strong className="text-slate-700 dark:text-slate-300">{apt.doctorName}</strong> ({apt.room})
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <Badge status={apt.status} />
                  {apt.status === 'Confirmed' && (
                    <button
                      onClick={() => updateAppointmentStatus(apt.id, 'Completed')}
                      className="px-2.5 py-1 text-[11px] font-medium text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 hover:bg-emerald-100 rounded-md transition-colors cursor-pointer"
                    >
                      Complete
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity Timeline */}
        <div className="p-5 sm:p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">Recent Activity</h2>
            <Activity className="w-4 h-4 text-slate-400" />
          </div>

          <div className="relative pl-6 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800">
            {activities.slice(0, 5).map(act => (
              <div key={act.id} className="relative group">
                <span className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-blue-500 ring-4 ring-white dark:ring-slate-900" />
                <p className="text-xs font-medium text-slate-800 dark:text-slate-200 leading-snug">
                  {act.text}
                </p>
                <span className="text-[11px] text-slate-400 mt-0.5 block">{act.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
