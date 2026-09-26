import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useClinic } from '../../context/ClinicContext';
import {
  User,
  ShieldCheck,
  Mail,
  Building2,
  Key,
  CheckCircle2,
  Save,
  Lock,
} from 'lucide-react';
import doctorPortraitImg from '../../assets/images/doctor_portrait_lead_1790450323837.jpg';

export default function Profile() {
  const { user, updateUserProfile } = useAuth();
  const { showToast } = useClinic();

  const [name, setName] = useState(user?.name || 'Dr. Alexander Wright');
  const [email, setEmail] = useState(user?.email || 'demo@clinicflow.com');
  const [role, setRole] = useState(user?.role || 'Clinical Administrator');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({ name, email, role });
    showToast('✓ Profile updated successfully', 'success');
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Top Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Administrator Profile
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Manage your clinical identity, authentication parameters, and organizational role.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column: Avatar & Role Summary Card */}
        <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs text-center space-y-4">
          <div className="relative w-24 h-24 rounded-2xl overflow-hidden bg-blue-600 text-white font-bold text-2xl flex items-center justify-center mx-auto shadow-md shadow-blue-500/20 border-2 border-white dark:border-slate-800">
            <span className="select-none">
              {user?.name ? user.name.split(' ').map(n => n[0]).join('').slice(0, 2) : 'AW'}
            </span>
            <img
              src={doctorPortraitImg}
              alt={user?.name || 'Dr. Alexander Wright'}
              width={96}
              height={96}
              loading="eager"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover"
              onError={e => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">{user?.name}</h2>
            <p className="text-xs text-blue-600 dark:text-blue-400 font-medium mt-0.5">{user?.role}</p>
            <p className="text-[11px] text-slate-400 mt-1">ClinicFlow Medical Center</p>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2 text-left text-xs">
            <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
              <span>Account Type:</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">Super Admin</span>
            </div>
            <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
              <span>Security Level:</span>
              <span className="font-semibold text-emerald-600 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                Verified
              </span>
            </div>
            <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
              <span>Session Status:</span>
              <span className="text-slate-500">Active</span>
            </div>
          </div>
        </div>

        {/* Right Column: Edit Profile Details */}
        <div className="md:col-span-2 p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-5">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
            <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Profile Information</h3>
              <p className="text-xs text-slate-500">Update personal identification in the demo system</p>
            </div>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Full Display Name
              </label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Primary Account Email
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Clinical Position / Role
              </label>
              <input
                type="text"
                value={role}
                onChange={e => setRole(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs transition-colors w-full sm:w-auto cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                Update Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
