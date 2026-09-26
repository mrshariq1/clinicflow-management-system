import React, { useState } from 'react';
import { useClinic } from '../../context/ClinicContext';
import EmptyState from '../../components/common/EmptyState';
import {
  Pill,
  Search,
  Plus,
  Printer,
  FileText,
  Calendar,
  User,
  Stethoscope,
} from 'lucide-react';

export default function Prescriptions() {
  const { prescriptions, openModal } = useClinic();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPrescriptions = prescriptions.filter(rx => {
    return (
      rx.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rx.doctorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rx.diagnosis.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Digital Prescriptions
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Generate, audit, and print electronic medical prescriptions with dynamic dosages.
          </p>
        </div>

        <button
          onClick={() => openModal('addPrescription')}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-xs transition-colors w-full sm:w-auto shrink-0"
        >
          <Plus className="w-4 h-4" />
          Write Prescription
        </button>
      </div>

      {/* Search Bar */}
      <div className="p-3.5 sm:p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center justify-between">
        <div className="relative w-full sm:w-80 min-w-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search by patient, diagnosis or doctor..."
            className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Prescriptions Table */}
      {filteredPrescriptions.length === 0 ? (
        <EmptyState
          title="No prescriptions found"
          description="There are no prescriptions registered under this criteria."
          actionText="Issue First Prescription"
          onAction={() => openModal('addPrescription')}
        />
      ) : (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs overflow-hidden">
          <div className="overflow-x-auto min-w-0">
            <table className="w-full text-left text-xs border-collapse min-w-[650px]">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">
                  <th className="py-3.5 px-4">Rx Number</th>
                  <th className="py-3.5 px-4">Patient</th>
                  <th className="py-3.5 px-4">Physician</th>
                  <th className="py-3.5 px-4">Diagnosis</th>
                  <th className="py-3.5 px-4">Medicines</th>
                  <th className="py-3.5 px-4">Date Issued</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredPrescriptions.map(rx => (
                  <tr
                    key={rx.id}
                    className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    <td className="py-3.5 px-4 font-mono font-bold text-blue-600 dark:text-blue-400">
                      #{rx.id.toUpperCase()}
                    </td>

                    <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">
                      {rx.patientName}
                    </td>

                    <td className="py-3.5 px-4 text-slate-700 dark:text-slate-300">
                      {rx.doctorName}
                    </td>

                    <td className="py-3.5 px-4 font-medium text-slate-800 dark:text-slate-200 max-w-xs truncate">
                      {rx.diagnosis}
                    </td>

                    <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400">
                      <span className="font-semibold text-slate-800 dark:text-slate-200">
                        {rx.medicines.length} items
                      </span>
                      <span className="text-[11px] text-slate-400 block truncate max-w-xs">
                        {rx.medicines.map(m => m.name).join(', ')}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-slate-500 tabular-nums">
                      {rx.date}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => openModal('printPrescription', rx)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 rounded-lg transition-colors"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        Print Rx
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
