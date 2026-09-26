import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Calendar,
  Stethoscope,
  Building2,
  Pill,
  ReceiptText,
  FileBarChart,
  Settings,
  HeartPulse,
  X,
  User,
  LogOut,
  ExternalLink,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useClinic } from '../../context/ClinicContext';
import doctorPortraitImg from '../../assets/images/doctor_portrait_lead_1790450323837.jpg';

interface SidebarProps {
  onClose?: () => void;
}

export default function Sidebar({ onClose }: SidebarProps) {
  const { user, logout } = useAuth();
  const { patients, appointments, doctors, departments } = useClinic();

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Patients', path: '/patients', icon: Users, badge: patients.length },
    { name: 'Appointments', path: '/appointments', icon: Calendar, badge: appointments.length },
    { name: 'Doctors', path: '/doctors', icon: Stethoscope, badge: doctors.length },
    { name: 'Departments', path: '/departments', icon: Building2, badge: departments.length },
    { name: 'Prescriptions', path: '/prescriptions', icon: Pill },
    { name: 'Billing', path: '/billing', icon: ReceiptText },
    { name: 'Reports', path: '/reports', icon: FileBarChart },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <aside className="w-64 h-full bg-slate-900 text-slate-300 flex flex-col border-r border-slate-800 select-none">
      {/* Brand Header */}
      <div className="shrink-0">
        <div className="flex items-center justify-between h-16 px-5 border-b border-slate-800/80">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 shrink-0">
              <HeartPulse className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <span className="font-bold text-base text-white tracking-tight leading-none block truncate">
                ClinicFlow
              </span>
              <span className="text-[10px] uppercase font-semibold text-blue-400 tracking-wider block">
                Management System
              </span>
            </div>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors shrink-0"
              aria-label="Close navigation sidebar"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Navigation Items */}
      <div className="flex-1 overflow-y-auto px-3 py-4 min-h-0">
        <span className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-2">
          Main Menu
        </span>
        <nav className="space-y-1">
          {navItems.map(item => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white font-semibold shadow-xs'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/70'
                }`
              }
            >
              <div className="flex items-center gap-3 min-w-0">
                <item.icon className="w-4 h-4 shrink-0" />
                <span className="truncate">{item.name}</span>
              </div>
              {item.badge !== undefined && (
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-slate-800 text-slate-300 shrink-0 ml-2">
                  {item.badge}
                </span>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Bottom Profile and Public Link Card */}
      <div className="p-3 border-t border-slate-800/80 space-y-2 shrink-0">
        <NavLink
          to="/"
          className="flex items-center justify-between px-3 py-2 rounded-xl text-xs text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <span className="flex items-center gap-2">
            <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
            Landing Page
          </span>
          <span className="text-[10px] text-slate-500 font-mono">Public</span>
        </NavLink>

        <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 flex items-center justify-between">
          <NavLink
            to="/profile"
            onClick={onClose}
            className="flex items-center gap-2.5 min-w-0 hover:opacity-80 transition-opacity"
          >
            <div className="relative w-8 h-8 rounded-lg overflow-hidden bg-blue-600/30 text-blue-400 font-bold text-xs flex items-center justify-center shrink-0 border border-blue-500/30">
              <span className="select-none text-[11px]">
                {user?.name ? user.name.split(' ').map(n => n[0]).join('').slice(0, 2) : 'AW'}
              </span>
              <img
                src={doctorPortraitImg}
                alt={user?.name || 'Dr. Alexander Wright'}
                width={32}
                height={32}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover"
                onError={e => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-white truncate leading-tight">
                {user?.name || 'Dr. Alexander Wright'}
              </p>
              <p className="text-[10px] text-slate-400 truncate">Administrator</p>
            </div>
          </NavLink>

          <button
            onClick={() => {
              if (onClose) onClose();
              logout();
            }}
            className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors"
            title="Sign out"
            aria-label="Sign out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
