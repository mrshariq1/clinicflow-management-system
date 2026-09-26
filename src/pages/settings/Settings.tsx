import React, { useState } from 'react';
import { useClinic } from '../../context/ClinicContext';
import {
  Settings as SettingsIcon,
  Building2,
  Moon,
  Sun,
  Bell,
  Globe,
  Save,
  Check,
} from 'lucide-react';

export default function Settings() {
  const { settings, updateSettings, theme, toggleTheme } = useClinic();

  const [formData, setFormData] = useState({ ...settings });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(formData);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Top Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          System & Clinic Settings
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Configure institutional metadata, theme aesthetics, and automated clinical notifications.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 1. Clinic Information */}
        <div className="p-4 sm:p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
            <Building2 className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0" />
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">Clinic Information</h2>
              <p className="text-xs text-slate-500">Official business profile displayed on invoices and prescriptions</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Clinic / Center Name
              </label>
              <input
                type="text"
                value={formData.clinicName}
                onChange={e => setFormData({ ...formData, clinicName: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Official Tax ID / License
              </label>
              <input
                type="text"
                value={formData.taxId}
                onChange={e => setFormData({ ...formData, taxId: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Reception Phone
              </label>
              <input
                type="text"
                value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Administrative Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Facility Address
              </label>
              <input
                type="text"
                value={formData.address}
                onChange={e => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* 2. Appearance & Theme */}
        <div className="p-4 sm:p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
            <Sun className="w-5 h-5 text-amber-500 shrink-0" />
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">Workspace Appearance</h2>
              <p className="text-xs text-slate-500">Toggle between high-contrast dark theme and clean light theme</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4 max-w-sm">
            <button
              type="button"
              onClick={() => {
                if (theme === 'dark') toggleTheme();
              }}
              className={`p-3.5 sm:p-4 rounded-xl border text-center transition-all cursor-pointer ${
                theme === 'light'
                  ? 'border-blue-600 bg-blue-50/50 text-blue-700 dark:text-blue-400 font-bold'
                  : 'border-slate-200 dark:border-slate-800 text-slate-600 hover:border-slate-300'
              }`}
            >
              <Sun className="w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-2 text-amber-500" />
              <span className="text-xs">Light Theme</span>
            </button>

            <button
              type="button"
              onClick={() => {
                if (theme === 'light') toggleTheme();
              }}
              className={`p-3.5 sm:p-4 rounded-xl border text-center transition-all cursor-pointer ${
                theme === 'dark'
                  ? 'border-blue-500 bg-blue-950/40 text-blue-300 font-bold'
                  : 'border-slate-200 dark:border-slate-800 text-slate-600 hover:border-slate-300'
              }`}
            >
              <Moon className="w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-2 text-blue-400" />
              <span className="text-xs">Dark Theme</span>
            </button>
          </div>
        </div>

        {/* 3. Notifications */}
        <div className="p-4 sm:p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
            <Bell className="w-5 h-5 text-indigo-500 shrink-0" />
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">Notification Triggers</h2>
              <p className="text-xs text-slate-500">System alerts and SMS notifications for patients & staff</p>
            </div>
          </div>

          <div className="space-y-3">
            <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 cursor-pointer">
              <div className="pr-2">
                <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                  Appointment Reminder Alerts
                </p>
                <p className="text-[11px] text-slate-500">Send automatic booking reminders to clinicians</p>
              </div>
              <input
                type="checkbox"
                checked={formData.appointmentNotifications}
                onChange={e => setFormData({ ...formData, appointmentNotifications: e.target.checked })}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 shrink-0"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 cursor-pointer">
              <div className="pr-2">
                <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                  Billing & Settlement Notifications
                </p>
                <p className="text-[11px] text-slate-500">Alert administrative staff when an invoice is settled</p>
              </div>
              <input
                type="checkbox"
                checked={formData.billingNotifications}
                onChange={e => setFormData({ ...formData, billingNotifications: e.target.checked })}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 shrink-0"
              />
            </label>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs transition-colors w-full sm:w-auto cursor-pointer"
          >
            <Save className="w-4 h-4" />
            Save Clinic Preferences
          </button>
        </div>
      </form>
    </div>
  );
}
