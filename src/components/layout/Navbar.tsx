import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useClinic } from '../../context/ClinicContext';
import {
  Search,
  Bell,
  Sun,
  Moon,
  Menu,
  User as UserIcon,
  Settings,
  LogOut,
  X,
  Calendar,
  Stethoscope,
  Receipt,
  Users,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import doctorPortraitImg from '../../assets/images/doctor_portrait_lead_1790450323837.jpg';

interface NavbarProps {
  onMobileMenuToggle: () => void;
}

export default function Navbar({ onMobileMenuToggle }: NavbarProps) {
  const { user, logout } = useAuth();
  const {
    theme,
    toggleTheme,
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    patients,
    doctors,
    appointments,
    invoices,
    openModal,
  } = useClinic();

  const navigate = useNavigate();

  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Dropdown states
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const unreadNotifs = notifications.filter(n => !n.read);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setIsNotifOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filtered search results across multiple entities
  const q = searchQuery.toLowerCase().trim();
  const filteredPatients = q
    ? patients.filter(p => p.name.toLowerCase().includes(q) || p.phone.includes(q)).slice(0, 3)
    : [];
  const filteredDoctors = q
    ? doctors.filter(d => d.name.toLowerCase().includes(q) || d.department.toLowerCase().includes(q)).slice(0, 3)
    : [];
  const filteredAppointments = q
    ? appointments.filter(a => a.patientName.toLowerCase().includes(q) || a.doctorName.toLowerCase().includes(q)).slice(0, 3)
    : [];
  const filteredInvoices = q
    ? invoices.filter(i => i.invoiceNumber.toLowerCase().includes(q) || i.patientName.toLowerCase().includes(q)).slice(0, 3)
    : [];

  const hasResults =
    filteredPatients.length > 0 ||
    filteredDoctors.length > 0 ||
    filteredAppointments.length > 0 ||
    filteredInvoices.length > 0;

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-3 sm:px-6 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 transition-colors">
      {/* Left: Mobile hamburger & Global Search */}
      <div className="flex items-center gap-1.5 sm:gap-3 flex-1 min-w-0 max-w-xl pr-2">
        <button
          onClick={onMobileMenuToggle}
          className="lg:hidden p-1.5 sm:p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0"
          aria-label="Open mobile navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Global Quick Search Bar */}
        <div ref={searchRef} className="relative w-full min-w-0 max-w-md">
          <div className="relative">
            <Search className="absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => {
                setSearchQuery(e.target.value);
                setIsSearchOpen(true);
              }}
              onFocus={() => setIsSearchOpen(true)}
              placeholder="Search..."
              className="w-full pl-8 sm:pl-9 pr-7 sm:pr-8 py-1.5 sm:py-2 text-xs sm:text-sm bg-slate-100/80 dark:bg-slate-800/80 border border-transparent focus:border-blue-500 dark:focus:border-blue-500 rounded-xl focus:bg-white dark:focus:bg-slate-900 focus:outline-hidden transition-all text-slate-900 dark:text-white placeholder:text-slate-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2 sm:right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Grouped Search Results Dropdown */}
          {isSearchOpen && q && (
            <div className="fixed inset-x-3 top-16 sm:absolute sm:inset-x-0 sm:top-auto sm:mt-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl overflow-hidden z-50 max-h-96 overflow-y-auto">
              {hasResults ? (
                <div className="p-2 space-y-3 text-xs">
                  {/* Patients */}
                  {filteredPatients.length > 0 && (
                    <div>
                      <div className="flex items-center gap-1.5 px-2 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        <Users className="w-3.5 h-3.5 text-blue-500" />
                        Patients
                      </div>
                      <div className="space-y-0.5 mt-1">
                        {filteredPatients.map(p => (
                          <button
                            key={p.id}
                            onClick={() => {
                              setIsSearchOpen(false);
                              openModal('patientDetail', p);
                            }}
                            className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-between transition-colors"
                          >
                            <span className="font-semibold text-slate-800 dark:text-slate-200">{p.name}</span>
                            <span className="text-slate-400">{p.phone}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Appointments */}
                  {filteredAppointments.length > 0 && (
                    <div>
                      <div className="flex items-center gap-1.5 px-2 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        <Calendar className="w-3.5 h-3.5 text-emerald-500" />
                        Appointments
                      </div>
                      <div className="space-y-0.5 mt-1">
                        {filteredAppointments.map(a => (
                          <button
                            key={a.id}
                            onClick={() => {
                              setIsSearchOpen(false);
                              navigate('/appointments');
                            }}
                            className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-between transition-colors"
                          >
                            <div>
                              <span className="font-semibold text-slate-800 dark:text-slate-200">{a.patientName}</span>
                              <span className="text-slate-400 ml-1.5">with {a.doctorName}</span>
                            </div>
                            <span className="text-slate-400">{a.time}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Doctors */}
                  {filteredDoctors.length > 0 && (
                    <div>
                      <div className="flex items-center gap-1.5 px-2 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        <Stethoscope className="w-3.5 h-3.5 text-indigo-500" />
                        Doctors
                      </div>
                      <div className="space-y-0.5 mt-1">
                        {filteredDoctors.map(d => (
                          <button
                            key={d.id}
                            onClick={() => {
                              setIsSearchOpen(false);
                              navigate('/doctors');
                            }}
                            className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-between transition-colors"
                          >
                            <span className="font-semibold text-slate-800 dark:text-slate-200">{d.name}</span>
                            <span className="text-slate-400">{d.department}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Invoices */}
                  {filteredInvoices.length > 0 && (
                    <div>
                      <div className="flex items-center gap-1.5 px-2 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        <Receipt className="w-3.5 h-3.5 text-amber-500" />
                        Invoices
                      </div>
                      <div className="space-y-0.5 mt-1">
                        {filteredInvoices.map(i => (
                          <button
                            key={i.id}
                            onClick={() => {
                              setIsSearchOpen(false);
                              openModal('printInvoice', i);
                            }}
                            className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-between transition-colors"
                          >
                            <span className="font-semibold text-slate-800 dark:text-slate-200">{i.invoiceNumber} — {i.patientName}</span>
                            <span className="font-bold text-slate-900 dark:text-white tabular-nums">${i.amount}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-4 text-center text-xs text-slate-500 dark:text-slate-400">
                  No matching records for "{searchQuery}"
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Right: Actions, Theme, Notifications, Profile */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Dark Mode Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
        </button>

        {/* Notifications Dropdown */}
        <div ref={notifRef} className="relative">
          <button
            onClick={() => setIsNotifOpen(prev => !prev)}
            className="relative p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="View notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadNotifs.length > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-600 ring-2 ring-white dark:ring-slate-900" />
            )}
          </button>

          {isNotifOpen && (
            <div className="absolute right-0 mt-2 w-72 sm:w-80 max-w-[calc(100vw-1.5rem)] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl overflow-hidden z-50">
              <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 dark:border-slate-800">
                <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  Notifications ({unreadNotifs.length})
                </span>
                {unreadNotifs.length > 0 && (
                  <button
                    onClick={markAllNotificationsRead}
                    className="text-[11px] font-medium text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Mark all read
                  </button>
                )}
              </div>

              <div className="divide-y divide-slate-100 dark:divide-slate-800 max-h-72 overflow-y-auto">
                {notifications.map(n => (
                  <div
                    key={n.id}
                    onClick={() => markNotificationRead(n.id)}
                    className={`p-3 text-xs transition-colors cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/60 ${
                      !n.read ? 'bg-blue-50/40 dark:bg-blue-950/20' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-semibold text-slate-800 dark:text-slate-200">{n.title}</span>
                      <span className="text-[10px] text-slate-400 shrink-0">{n.time}</span>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">{n.message}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Profile Dropdown */}
        <div ref={profileRef} className="relative">
          <button
            onClick={() => setIsProfileOpen(prev => !prev)}
            className="flex items-center gap-2 p-1 pl-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <div className="text-right hidden md:block">
              <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 leading-tight">
                {user?.name || 'Dr. Alexander Wright'}
              </p>
              <div className="flex items-center justify-end gap-1 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] text-slate-400 uppercase tracking-wider">Online</span>
              </div>
            </div>
            <div className="relative w-8 h-8 rounded-lg overflow-hidden bg-blue-600 text-white font-bold text-xs flex items-center justify-center shadow-xs border border-blue-500/30">
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
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl overflow-hidden z-50 p-1.5 text-xs">
              <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800 mb-1">
                <p className="font-bold text-slate-900 dark:text-white">{user?.name}</p>
                <p className="text-slate-400 text-[11px] truncate">{user?.email}</p>
              </div>

              <button
                onClick={() => {
                  setIsProfileOpen(false);
                  navigate('/profile');
                }}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <UserIcon className="w-3.5 h-3.5" />
                My Profile
              </button>

              <button
                onClick={() => {
                  setIsProfileOpen(false);
                  navigate('/settings');
                }}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <Settings className="w-3.5 h-3.5" />
                Clinic Settings
              </button>

              <div className="pt-1 mt-1 border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={() => {
                    setIsProfileOpen(false);
                    logout();
                    navigate('/login');
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
